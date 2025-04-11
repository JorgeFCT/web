import { ReactNode, FC } from 'react'
import { Header } from '../components/Header'
import Footer from '../components/Footer'

interface Props{
    children: ReactNode
}

export const MainLayout: FC<Props> = ({children}) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}