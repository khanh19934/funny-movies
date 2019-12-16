declare module 'react-waterfall' {
    import { Config, Store } from 'react-waterfall/types';

    const rw: ReactWaterfall;

    interface ReactWaterfall {
        <S, A>(config: Config<S, A>, middlewares?: any[]): Store<S, A>;
    }

    export default rw;
}

declare module 'react-waterfall/types' {
    import * as React from 'react';

    type RemoveArgumentTypes<S, A, T> = T extends (
        state: S,
        actions: A,
        ...args: infer U
        ) => infer R
        ? U
        : any;

    export interface Config<S, A> {
        initialState: S;
        actionsCreators: {
            [K in keyof A]: (
                state: S,
                actions: A,
                ...args: any[]
            ) => Partial<S> | Promise<Partial<S>>
        };
    }

    export interface Connect<S> {
        <P, K>(selector: (state: S) => K): (
            baseComponent: React.ComponentType<P & K>
        ) => React.ComponentType<P>;
    }

    export type Store<S, A> = {
        Provider: React.ComponentType;
        connect: Connect<S>;
        actions: { [K in keyof A]: (...a: RemoveArgumentTypes<S, A, A[K]>) => void };
        subscribe: any;
        unsubscribe: any;
    };
}

type Props = {
    children: React.ReactNode,
    componentDecorator?: (decoratedHref: string, decoratedText: string, key: number) => React.ReactNode,
    hrefDecorator?: (href: string) => string,
    matchDecorator?: (text: string) => Array<Object>,
    textDecorator?: (text: string) => string,
    properties?: any
};

declare module 'react-linkify' {
    export default class Linkify extends React.Component<Props> {}
}