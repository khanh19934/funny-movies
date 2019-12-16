import React from 'react'
import { compose } from 'recompose'
import { BrowserRouter } from 'react-router-dom'

import Navigator from './modules/Navigator/Navigator.container'
import withContextProvider from './hocs/withContextProvider.hoc'
import withAppPreload from "./hocs/withAppPreload.hoc";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigator />
    </BrowserRouter>
  )
}

const enhance = compose(withContextProvider, withAppPreload)

export default enhance(App)
