import StoreContext from './context'

type StoreProviderProps = {
    store: any
    children: React.ReactNode
}

export default function StoreProvider(props: StoreProviderProps) {
    const { store, children } = props

    return (
        <StoreContext.Provider
            value={{
                store,
            }}>
            {children}
        </StoreContext.Provider>
    )
}
