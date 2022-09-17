import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { Branch, Commit, Issue } from './types';

function wrapPromise<T>(axios: AxiosPromise<T>) {
    return new Promise<T>((resolve, reject) => {
        axios
            .then((d) => resolve(d.data))
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
    private projectName: string;

    constructor(token: string, projectName: string) {
        this.projectName = projectName;
        this.handler = axios.create({
            baseURL: `https://gitlab.stud.idi.ntnu.no/api/v4`,
            timeout: 3000,
            headers: {
                'PRIVATE-TOKEN': token
            }
        });
    }

    public getId () {
        return this.id;
    }

    public async init() {
        return new Promise<void>((resolve, _) => {
            wrapPromise(this.handler.get("/projects?per_page=100")).then((d) => {
                const project = (d as []).find(e => (e as unknown as any).name === this.projectName);
                this.id = (project as unknown as any).id;
                resolve();
            });
        })
    }

    public updateDetails(token: string, projectName: string) {
        this.handler.defaults.baseURL = `https://gitlab.stud.idi.ntnu.no/api/v4`;
        this.handler.defaults.headers.common["PRIVATE-TOKEN"] = token;
        this.projectName = projectName;
    }

    public async getCommits(): Promise<Commit[]> {
        return wrapPromise<Commit[]>(
            this.handler.get(`/projects/${this.id}/repository/commits?per_page=100`, {
                validateStatus: (code: number) => code === 200
            })
        );
    }

    public async getIssues(): Promise<Issue[]> {
        return wrapPromise<Issue[]>(
            this.handler.get(`/projects/${this.id}/issues?per_page=100`)
        );
    }

    public async getBranches(): Promise<Branch[]> {
        return wrapPromise<Branch[]>(
            this.handler.get(`/projects/${this.id}/repository/branches?per_page=100`)
        );
    }
}