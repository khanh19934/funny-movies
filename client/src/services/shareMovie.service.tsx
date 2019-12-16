import axios from "axios"
import {pathOr} from "ramda"

import axiosApi from "../utils/api.util"
import axiosPublic from "../utils/apiPublic.util";

interface IYoutubeDetail {
    title: string;
    description: string;
    publishedAt: Date;
}

interface IShareVideoPayload {
    description: string;
    title: string;
    videoURL: string
}

interface IShareVideoPayloadResponse {
    title: string;
    description: string;
    videoURL: string;
    sharedBy: string;
    createdAt: string;
    updatedAt: string
}

export interface IMovieList {
    _id: string;
    title: string;
    description: string;
    videoURL: string;
    sharedBy: {
        email: string
    }
    totalThumbUp: number
    totalThumbDown: number
    isThumbUpAlready: boolean
    isThumbDownAlready: boolean
}

export interface IMovieListResponse  {
    total: number;
    page: number;
    videoList: IMovieList[];
    hasMore: boolean
}

export const getYoutubeVideoDetail = (videoId: string): Promise<IYoutubeDetail> =>
    axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyD6IZEdm2tNPMEPTD3A8iS9LLY3it0Nnoo&part=snippet`)
        .then(pathOr<any>({}, ['data', 'items', 0, 'snippet']))


export const shareYoutubeVideo = (payload: IShareVideoPayload): Promise<IShareVideoPayloadResponse> =>
    axiosApi.post('/api/share-video', payload)
        .then(pathOr<any>({}, ['data']))

export const getMovieList = (page = 1, limit= 10): Promise<IMovieListResponse> =>
    axiosPublic.get(`/api/video-list?page=${page}&limit=${limit}`)
        .then(pathOr<any>({}, ['data']))