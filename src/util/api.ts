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

    constructor(token: string, projectId: string) {
        this.handler = axios.create({
            baseURL: `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${projectId}`,
            timeout: 3000,
            headers: {
                'PRIVATE-TOKEN': token
            }
        });
    }

    public updateDetails(token: string, projectId: string) {
        this.handler.defaults.baseURL = `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${projectId}`;
        this.handler.defaults.headers.common["PRIVATE-TOKEN"] = token;
    }

    public getCommits(): Promise<any> {
        return wrapPromise(
            this.handler.get("/", {
                validateStatus: (code: number) => code === 200
            })
        );
    }
}