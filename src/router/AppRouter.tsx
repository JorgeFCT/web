import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Comercios } from '../features/comercios/Comercios'
import FaqPage from '../features/faq/FaqPage'
import Registro from '../features/registro/Registro'
import { ComercioDetalle } from '../features/comercios/ComercioDetalle'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/comercios" />} /> {/* Redirige la raíz a /comercios */}
            <Route path="/comercios" element={<Comercios />} />
            <Route path="/comercios/:id" element={<ComercioDetalle />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/faqPage" element={<FaqPage />} />
        </Routes>
    )
}
