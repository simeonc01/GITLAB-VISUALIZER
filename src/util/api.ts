import axios, { AxiosInstance, AxiosPromise, AxiosResponseHeaders } from 'axios';
import { Branch, Commit, Issue, Project, UpdateData, Event, Label } from './types';

function wrapPromise<T>(axios: AxiosPromise<T>) {
    return new Promise<T>((resolve, reject) => {
        axios
            .then((d) => {
                resolve(d.data);
            })
        .catch(async (error) => {
            if (error.response) {
                reject(error.response.data.message);
            } else {
                reject(error.message);
            }
        });
    });
}

function wrapPromiseHeaderIncluded<T>(axios: AxiosPromise<T>) {
    return new Promise<{data: T, headers: AxiosResponseHeaders}>((resolve, reject) => {
        axios.then(d => {
            resolve({data: d.data, headers: d.headers});
        }).catch(async (error) => {
            if (error.response) {
                reject(error.response.data.message);
            } else {
                reject(error.message);
            }
        });
    })
}




export class ApiHandler {
    private readonly handler: AxiosInstance;
    private id = -1;
    private projectString: string;
    private originalProjectString: string;
    private initialized = false;
    private token: string;

    constructor(token: string, projectString: string) {
        this.originalProjectString = projectString;
        const r = projectString.match(/(?<=\.no\/)[^\]]+/);
        this.projectString = encodeURIComponent(r !== null ? r[0] : "");
        this.token = token;
        this.handler = axios.create({
            baseURL: `https://gitlab.stud.idi.ntnu.no/api/v4`,
            timeout: 3000
        });
        this.handler.defaults.headers.common["PRIVATE-TOKEN"] = token;
    }

    public async update(): Promise<UpdateData> {
        return new Promise<UpdateData>((resolve, reject) => {
            Promise.all([
                this.getCommits(),
                this.getBranches(),
                this.getIssues(),
                this.getCurrentProject(),
                this.getEvents(),
                this.getLabels()
            ]).then(data => {
                resolve({
                    commits: data[0],
                    branches: data[1],
                    issues: data[2],
                    currentProject: data[3],
                    events: data[4],
                    labels: data[5]
                });
            }).catch(error => {
                reject({
                    message: error,
                    data: null
                });
            });
        })
    }

    private async getProjectId(projectString: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${encodeURIComponent(projectString)}`, {
                headers: {
                    'PRIVATE-TOKEN': this.token
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then((d: Project) => resolve(d.id));
                } else
                    reject(-1);
            })

        });
    }

    public async getCurrentProject(): Promise<Project> {
        if (this.id < 0)
            return Promise.reject<Project>({
                message: "Project ID was not set", 
                data: null
            });
        return wrapPromise<Project>(this.handler.get(`/projects/${this.id}`, {
            validateStatus: (status) => status === 200
        }));
    }

    public async updateDetails(token: string, projectString: string): Promise<boolean> {
        if (this.token === token && this.originalProjectString === projectString) return Promise.resolve<boolean>(true);
        this.token = token;
        this.handler.defaults.headers.common["PRIVATE-TOKEN"] = this.token;
        const r = projectString.match(/(?<=\.no\/)[^\]]+/);
        if (r !== null) this.projectString = r[0];
        else this.projectString = "";
        const id = await this.getProjectId(this.projectString);
        if (id < 0) Promise.resolve<boolean>(false);
        this.id = id;
        return Promise.resolve<boolean>(true);
    }

    public async getProjects(page?: number): Promise<Project[]> {
        if (page) {
            return wrapPromise<Project[]>(this.handler.get(`/projects?per_page=100&page=${page}`));
        }

        return wrapPromise<Project[]>(this.handler.get(`/projects?per_page=100`));
    }

    public async getCommits(): Promise<Commit[]> {
        if (this.id < 0)
            return Promise.reject<Commit[]>({
                message: "Project ID was not set", 
                data: null
            });
        
        try {
            const data = await wrapPromiseHeaderIncluded<Commit[]>(
                this.handler.get(`/projects/${this.id}/repository/commits?per_page=100`, {
                    validateStatus: (code: number) => code === 200
                })
            )

            let iteration = 2
            let stopIteration = data.headers["x-next-page"] === "";
    
            while (!stopIteration) {
                const d = await wrapPromise(this.handler.get(`/projects/${this.id}/repository/commits?per_page=100&page=${iteration}`))
                data.data.push(...d);

                const dataHeader = await wrapPromiseHeaderIncluded<Commit[]>(
                    this.handler.get(`/projects/${this.id}/repository/commits?per_page=100&page=${iteration}`, {
                        validateStatus: (code: number) => code === 200
                    })
                )

                if (dataHeader.headers["x-next-page"] !== "") {
                    iteration++;
                }
                else {
                    stopIteration = true;
                }
            }

            
            return Promise.resolve<Commit[]>(data.data);
            
        } catch (e) {
            return Promise.reject<Commit[]>({
                message: e, 
                data: null
            });
        } 
    }

    
    public async getIssues(): Promise<Issue[]> {
        if (this.id < 0)
            return Promise.reject<Issue[]>({
                message: "Project ID was not set", 
                data: null
            });


            try {
                const data = await wrapPromiseHeaderIncluded<Issue[]>(
                    this.handler.get<Issue[]>(`/projects/${this.id}/issues?per_page=100`, {
                        validateStatus: (code: number) => code === 200
                    })
                );
        
                if (parseInt(data.headers["x-total-pages"]) > 1) {
                    for (let i = 2; i <= parseInt(data.headers["x-total-pages"]); i++) {
                        const d = await wrapPromise(this.handler.get(`/projects/${this.id}/issues?per_page=100&page=${i}`))
                        data.data.push(...d);
                    }
                }
        
                return Promise.resolve<Issue[]>(data.data);
            } catch (e) {
                return Promise.reject<Issue[]>({
                    message: e, 
                    data: null
                });
            }
    }

    public async getBranches(): Promise<Branch[]> {
        if (this.id < 0)
            return Promise.reject<Branch[]>({
                message: "Project ID was not set", 
                data: null
            });
        
            try {
                const data = await wrapPromiseHeaderIncluded<Branch[]>(
                    this.handler.get<Branch[]>(`/projects/${this.id}/repository/branches?per_page=100`, {
                        validateStatus: (code: number) => code === 200
                    })
                );
        
                if (parseInt(data.headers["x-total-pages"]) > 1) {
                    for (let i = 2; i <= parseInt(data.headers["x-total-pages"]); i++) {
                        const d = await wrapPromise(this.handler.get(`/projects/${this.id}/repository/brances?per_page=100&page=${i}`))
                        data.data.push(...d);
                    }
                }
        
                return Promise.resolve<Branch[]>(data.data);
            } catch (e) {
                return Promise.reject<Branch[]>({
                    message: e, 
                    data: null
                });
            }
    }

    public async getEvents(): Promise<Event[]> {
        if (this.id < 0)
            return Promise.reject<Event[]>({
                message: "Project ID was not set", 
                data: null
            });

        try {
            const data = await wrapPromiseHeaderIncluded<Event[]>(
                this.handler.get<Event[]>(`/projects/${this.id}/events?per_page=100`, {
                    validateStatus: (code: number) => code === 200
                })
            );
            if (parseInt(data.headers["x-total-pages"]) > 1) {
                for (let i = 2; i <= parseInt(data.headers["x-total-pages"]); i++) {
                    const d = await wrapPromise(this.handler.get(`/projects/${this.id}/events?per_page=100&page=${i}`))
                    data.data.push(...d);
                    console.log(d.length);
                }
            }
    
            return Promise.resolve<Event[]>(data.data);
        } catch (e) {
            return Promise.reject<Event[]>({
                message: e, 
                data: null
            });
        }
    }   

    public async getLabels(): Promise<Label[]> {
        if (this.id < 0)
            return Promise.reject<Label[]>({
                message: "Project ID was not set", 
                data: null
            });
        
        return wrapPromise<Label[]>(
            this.handler.get<Label[]>(`/projects/${this.id}/labels`, {
                validateStatus: (code: number) => code === 200
            })
        )
    }
}