import React, {useState} from 'react'
import {pick} from "ramda"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'
import {NavLink as RRNavLink} from "react-router-dom"
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm.component";

import Routes from "../../modules/Navigator/Navigator.route"
import {clearAllToken} from "../../services/localStorage.service";
import {actions as authActions, connect} from "../../context/appStore"

interface IProps {
    isAuthenticate: boolean
}

const NavigationBar: React.FC<IProps> = props => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggle = () => setIsOpen(!isOpen)

    const handleLogOut = () => {
        clearAllToken()
        authActions.setAuthenticate(false)
    }

    return (
        <div>
            <Navbar fixed={"top"} color="light" light expand="md">
                <NavbarBrand href="/">Funny Movies</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="mr-4 authenticate-form">
                            <AuthenticationForm/>
                        </NavItem>
                        {props.isAuthenticate && (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink tag={RRNavLink} exact to={Routes.ShareVideo} activeClassName="active">Share
                                        a
                                        movie</NavLink>
                                </NavItem>
                                <NavItem onClick={handleLogOut}>
                                    <NavLink style={{cursor: 'pointer'}}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </React.Fragment>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

const enhance = connect(pick(['isAuthenticate']))

export default enhance(NavigationBar)
