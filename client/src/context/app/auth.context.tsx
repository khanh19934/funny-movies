export default {
    initialState: {
        isAuthenticate: false,
        email: ''
    } as IAuthState,
    actionsCreators: {
        setAuthenticate: (prevState,_,payload) => {
            return {
                isAuthenticate: payload
            }
        },
        setUserEmail: (prevState, _, payload) => {
            return {
                email: payload
            }
        }
    } as IAuthActions
}

export interface IAuthState {
    isAuthenticate: boolean;
    email: string
}

export interface IAuthActions {
    setAuthenticate(isAuthenticated: boolean): any;
    setUserEmail( email: string): any;
}
