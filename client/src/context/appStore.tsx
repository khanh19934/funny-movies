import { mergeAll } from 'ramda';
import { ComponentType } from 'react';
import createStore from 'react-waterfall';
import { ComponentEnhancer } from 'recompose';

import appState, { IAppState, IAppActions } from './app/app.context';
import authState ,{ IAuthState, IAuthActions} from "./app/auth.context";

const config = {
    initialState: mergeAll([appState.initialState, authState.initialState]),
    actionsCreators: mergeAll([appState.actionsCreators, authState.actionsCreators])
};

type TConnectFunction = <TNewProps, TOutter>(
    mapFunction: (state: StateType) => TNewProps // TODO: connect with props
) => ComponentEnhancer<TOutter & TNewProps, TOutter>;

export type StateType = IAppState & IAuthState;
// &
//   ICategoryState &
//   IShoppingCartState &
//   IProfileState &
//   IRegisterNewStoreState

type Actions = IAppActions & IAuthActions;
// &
//   IProfileActions &
//   ICategoryActions &
//   IShoppingCartActions &
//   IRegisterNewStoreActions

interface IStore {
    Provider: ComponentType<{}>;
    connect: TConnectFunction;
    actions: Actions;
    subscribe(
        subscription: (action: Actions, state: Partial<StateType>, args: {}) => void
    ): void;
    unsubscribe(
        subscription: (action: Actions, state: Partial<StateType>, args: {}) => void
    ): void;
}

export const { Provider, connect, actions, subscribe, unsubscribe } = createStore(
    config as any
) as IStore;