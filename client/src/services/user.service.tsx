import {pathOr} from "ramda"
import axios from "../utils/api.util"

interface IUserInfo {
    email: string
}
const getUserInfo = ():Promise<IUserInfo> => axios.get('/api/users-info').then(pathOr<any>({}, ['data']))

export {getUserInfo}