import * as Hapi from "hapi";

export interface ICredentials extends Hapi.AuthCredentials {
    id: string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
    credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
    auth: IRequestAuth;
}

export interface ILoginRequest extends IRequest {
    payload: {
        email: string;
        password: string;
    };
}

export interface IReGenerateToken extends IRequest{
    payload: {
        token: string;
        refreshToken: string;
    }
}

export interface IShareVideoRequest extends IRequest{
    title: string;
    description: string;
    videoURL: string;
}

export interface IVideoListRequest extends IRequest {
    query: {
        page: string,
        limit: string
    }
}