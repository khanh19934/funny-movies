import React from "react";
import "@testing-library/jest-dom/extend-expect";
import mockAxios from 'jest-mock-axios';

import {loginUser} from "../../../services/auth.service"


import {testSnapshots} from "../../../utils/test.util"

import AuthenticationForm from "../AuthenticationForm.component";
import {render, fireEvent} from "@testing-library/react"

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

const consoleError = console.error;
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((...args) => {
        if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
            consoleError(...args);
        }
    });
});

describe('AuthenticationForm', () => {

    testSnapshots(AuthenticationForm, [
        {
            description: 'should match snapshot', props: {
                isAuthenticate: false,
                email: ''
            }
        },
        {
            description: 'should match snapshot', props: {
                isAuthenticate: true,
                email: 'test@gmail.com'
            }
        }
    ])

    // test('Snapshot', () => {
    //     const {asFragment} = render(<AuthenticationForm/>)
    //
    //     expect(asFragment()).toMatchSnapshot()
    // })


    test('Should have email field', () => {
        const {getByPlaceholderText} = render(<AuthenticationForm/>)
        const emailInput = getByPlaceholderText('Email')
        expect(emailInput).toHaveAttribute('type', 'email')
    })

    test('Should have password field', () => {
        const {getByPlaceholderText} = render(<AuthenticationForm/>)
        const password = getByPlaceholderText('Password')
        expect(password).toHaveAttribute('type', 'password')
    })

    test('Should send form payload to api login', async () => {

        const catchFn = jest.fn()
        const thenFn = jest.fn()

        const {getByPlaceholderText, getByText} = render(<AuthenticationForm/>)
        const emailInput = getByPlaceholderText('Email')
        const password = getByPlaceholderText('Password')
        fireEvent.change(emailInput, {target: {value: 'test@gmail.com'}})
        fireEvent.change(password, {target: {value: 'qwe213'}})
        fireEvent.click(getByText('Login / Register'))

        // @ts-ignore
        loginUser({email: emailInput.value, password: password.value}).then(thenFn).catch(catchFn)

        expect(mockAxios.post).toHaveBeenCalledWith('/login', {
            // @ts-ignore
            email: emailInput.value,
            // @ts-ignore
            password: password.value
        })

        mockAxios.mockResponse({data: {token: ""}})

        expect(catchFn).not.toHaveBeenCalled();


    })

    test('Should so welcome message when user authenticated', () => {
        const email = "test@gmail.com"
        // @ts-ignore
        const {getByText} = render(<AuthenticationForm isAuthenticate={true} email={email}/>)

        expect(getByText(`Welcome ! ${email}`)).toBeInTheDocument()
    })



})

