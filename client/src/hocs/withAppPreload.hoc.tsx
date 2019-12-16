import React, {useEffect} from "react"
import {isNilOrEmpty, isUndefined} from "ramda-adjunct"

import {actions as AuthActions} from "../context/appStore"
import {getAccessToken} from "../services/localStorage.service"
import {getUserInfo} from "../services/user.service"


const withAppPreload = (Comp: React.FC) => props => {
    useEffect(() => {
        const token = getAccessToken();
        if(!isNilOrEmpty(token) && !isUndefined(token)) {
            AuthActions.setAuthenticate(true)
            getUserInfo().then(data => AuthActions.setUserEmail(data.email))
            return
        }
    }, [])
    return (
        <Comp/>
    )
}

export default withAppPreload