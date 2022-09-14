import axios, { AxiosInstance, AxiosPromise } from 'axios';

function wrapPromise<T>(axios: AxiosPromise<T>) {
    return new Promise((resolve, reject) => {
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
    private id: number = -1;
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
            wrapPromise(this.handler.get("/projects")).then((d) => {
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

    public async getCommits(): Promise<any> {
        return wrapPromise(
            this.handler.get(`/projects/${this.id}/repository/commits`, {
                validateStatus: (code: number) => code === 200
            })
        );
    }
}