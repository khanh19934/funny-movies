import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {BrowserRouter} from 'react-router-dom'
import {render, fireEvent} from "@testing-library/react"

import {testSnapshots} from "../../../utils/test.util"
import NavigationBar from "../NavigationBar.component";

const NavigationBarComponent: React.FC<{isAuthenticate: boolean}> = (props) => (
    <BrowserRouter>
        <NavigationBar {...props} />
    </BrowserRouter>
)

describe('Navigation Bar', () => {
    testSnapshots(() => (
        NavigationBarComponent
    ), [
        {
            description: 'NavigationBar',
            props: {
                isAuthenticate: false
            }
        },
        {
            description: 'NavigationBar',
            props: {
                isAuthenticate: true
            }
        }
    ])

    test('should show logout and share movie button when user logged in', () => {
        const {getByText} = render(<NavigationBarComponent isAuthenticate={true}/>)

        expect(getByText(`Logout`)).toBeInTheDocument()
        expect(getByText(`Share a movie`)).toBeInTheDocument()
    })

    test('should show login form', () => {
        const {getByText} = render(<NavigationBarComponent isAuthenticate={false}/>)

        expect(getByText(`Login / Register`)).toBeInTheDocument()
    })

    test('Logout button', () => {
        const {getByText} = render(<NavigationBarComponent isAuthenticate={true}/>)
        const button = getByText('Logout')

        fireEvent.click(button)

        expect(window.localStorage.getItem('accessToken')).toEqual(null)
        expect(window.localStorage.getItem('refreshToken')).toEqual(null)

    })

    test('Collapse Button Nav', () => {
        const {getByLabelText, getByText} = render(<NavigationBarComponent isAuthenticate={true}/>)

        const buttonToggle = getByLabelText('Toggle navigation')
        fireEvent.click(buttonToggle)

        expect(getByText('Logout')).toBeInTheDocument()


    })
})