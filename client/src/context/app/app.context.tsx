export default {
  initialState: {
    accessToken: ''
  } as IAppState,
  actionsCreators: {}
}

export interface IAppState {
  accessToken: string
}

export interface IAppActions {}
