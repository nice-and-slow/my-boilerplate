import React, { useContext } from 'react';

const GlobalStateContext = React.createContext({
    globalState: {},
});

export function withGlobalState(Component) {
    return function WrapperComponent(props) {
        return (
            <GlobalStateContext.Consumer>
                {contexts => <Component {...props} {...contexts} />}
            </GlobalStateContext.Consumer>
        );
    };
}

export const useGlobalStateContext = () => {
    const context = useContext(GlobalStateContext);
    return { ...context.globalState };
};

export const GlobalStateProvider = GlobalStateContext.Provider;
export const GlobalStateConsumer = GlobalStateContext.Consumer;
