import * as React from "react";
import {useState} from "react"
import {Button, Form, FormGroup, Input} from "reactstrap";
import {pick} from "ramda"

import * as AuthServices from "../../services/auth.service"
import {saveAccessToken, saveRefreshToken} from "../../services/localStorage.service";
import {actions as authActions, connect} from "../../context/appStore"

interface IProps {
    isAuthenticate: boolean;
    email: string
}

const AuthenticationForm: React.FC<IProps> = (props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>("")

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const handleSubmitButton = async () => {
        try {
            const payload = {email, password}

            const {token, refreshToken} = await AuthServices.loginUser(payload)

            saveAccessToken(token)
            saveRefreshToken(refreshToken)

            authActions.setAuthenticate(true)
            authActions.setUserEmail(email)
        }catch(e) {
            setError(e.response.data.message)
        }


    }

    return props.isAuthenticate ? <p>Welcome ! {props.email}</p > : (
        <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input aria-label="email-input" type="email" name="email" placeholder="Email" value={email} onChange={onChangeEmail} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChangePassword}
                    />
                    {error && error}
                </div>

            </FormGroup>
            <Button onClick={handleSubmitButton}>Login / Register</Button>

        </Form>
    )
}

const enhance = connect(pick(['isAuthenticate', 'email']))

export default enhance(AuthenticationForm)