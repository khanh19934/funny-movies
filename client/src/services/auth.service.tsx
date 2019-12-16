import {pathOr} from "ramda"

import axios from "../utils/apiAuth.util"


interface ILoginPayload {
    email: string;
    password: string;
}

interface ILoginResponse {
    refreshToken: string;
    token: string;
    email: string
}
const loginUser = (payload: ILoginPayload): Promise<ILoginResponse> => axios.post('/login', payload).then(pathOr<any>({}, ['data']))

export {loginUser}