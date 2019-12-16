import React from 'react'
import Helmet from 'react-helmet'
import { Route, Switch } from 'react-router-dom'

import Routes from './Navigator.route'
import Pages from './Navigator.page'

import NavigationBar from "../../components/NavigationBar/NavigationBar.component";


const Navigator: React.FC = () => (
  <React.Fragment>
    <Helmet defaultTitle="Funny Video" titleTemplate="%s | Funny Video" />
    <NavigationBar/>
    <Switch>
      <Route exact={true} path={Routes.Home} component={Pages.Home} />
      <Route path={Routes.ShareVideo} component={Pages.ShareVideoPage} />
      <Route path={Routes.Login} component={Pages.LoginPage} />
      <Route path={Routes.Register} component={Pages.RegisterPage} />
      <Route component={Pages.NotFoundPage}/>
    </Switch>
  </React.Fragment>
)

export default Navigator
