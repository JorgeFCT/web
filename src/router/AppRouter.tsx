import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Comercios } from '../features/comercios/Comercios'
import { Calculadora } from '../features/calculadora/Calculadora'
import Registro from '../features/registro/Registro'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/comercios" />} /> {/* Redirige la raíz a /comercios */}
            <Route path="/comercios" element={<Comercios />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/calculadora" element={<Calculadora />} />
        </Routes>
    )
}
