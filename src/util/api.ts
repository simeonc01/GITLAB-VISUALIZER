import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { Branch, Commit, Issue, Project, UpdateData } from './types';

function wrapPromise<T>(axios: AxiosPromise<T>) {
    return new Promise<T>((resolve, reject) => {
        axios
            .then((d) => {
                console.log(d.headers);
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
            timeout: 3000,
            headers: {
                'PRIVATE-TOKEN': token
            }
        });

        this.handler.interceptors.request.use((config) => {
            console.log(config);
            
            return config;
        })
    }

    // public async init(): Promise<void> {
    //     // eslint-disable-next-line no-async-promise-executor
    //     return new Promise<void>(async (resolve, reject) => {
    //         const projects = await this.getProjects();
    //         console.log(projects);

    //         // const project = d.find(e => e.name === this.projectName);
    //         // if (project) {
    //         //     this.id = project.id;
    //         //     resolve();
    //         // }

    //         // if (!project) 
    //         //     reject({
    //         //         message: "Project was not found",
    //         //         data: null
    //         //     });

    //         // reject({
    //         //     message: "Unknown error",
    //         //     data: null
    //         // })
    //     })
    // }

    public async update(): Promise<UpdateData> {
        return new Promise<UpdateData>((resolve, reject) => {
            Promise.all([
                this.getCommits(),
                this.getBranches(),
                this.getIssues()
            ]).then(data => {
                resolve({
                    commits: data[0],
                    branches: data[1],
                    issues: data[2]
                });
            }).catch(error => {
                reject({
                    message: error,
                    data: null
                });
            });
        })
    }

    public async updateDetails(token: string, projectString: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.token === token && this.originalProjectString === projectString) resolve(false);
            this.handler.defaults.headers.common["PRIVATE-TOKEN"] = token;
            const r = projectString.match(/(?<=\.no\/)[^\]]+/);
            if (r !== null) this.projectString = r[0];
            else this.projectString = "";
            this.id = -1;
            resolve(true);
        })
    }

    public async getProjects(page?: number): Promise<Project[]> {
        if (page) {
            return wrapPromise<Project[]>(this.handler.get(`/projects?per_page=100&page=${page}`));
        }

        return wrapPromise<Project[]>(this.handler.get(`/projects?per_page=100`));
    }

    public async getCommits(): Promise<Commit[]> {
        return wrapPromise<Commit[]>(
            this.handler.get(`/projects/${encodeURIComponent(this.projectString).replace('%', '%%8F')}/repository/commits?per_page=100`, {
                validateStatus: (code: number) => code === 200,
            })
        );
    }

    public async getIssues(): Promise<Issue[]> {
        // if (this.id < 0)
        //     return Promise.reject<Issue[]>({
        //         message: "Project ID was not set", 
        //         data: null
        //     });
        
        return wrapPromise<Issue[]>(
            this.handler.get(`/projects/${this.projectString}/issues?per_page=100`, {
                validateStatus: (code: number) => code === 200
            })
        );
    }

    public async getBranches(): Promise<Branch[]> {
        // if (this.id < 0)
        //     return Promise.reject<Branch[]>({
        //         message: "Project ID was not set", 
        //         data: null
        //     });
        
        return wrapPromise<Branch[]>(
            this.handler.get(`/projects/${encodeURIComponent(this.projectString)}/repository/branches?per_page=100`, {
                validateStatus: (code: number) => code === 200
            })
        );
    }
}