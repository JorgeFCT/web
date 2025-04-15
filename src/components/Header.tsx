import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; 


export const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="container mx-auto px-4">
            <nav className="py-4">
                <div className={`flex justify-between items-center ${styles.navbar}`}>
                    {/* Logo y título */}
                    <Link to="/comercios" className={`flex items-center ${styles.navLink}`}>
                        <img
                            src= "/assets/img/mapamask-logo.png"
                            alt="Logo Mapamask"
                            width="60"
                            className={`inline-block mr-2 ${styles.logoCs}`}
                        />
                        <span className={`${styles.span} text-lg font-bold`}>Bitcoin21</span>
                    </Link>

                    {/* Botón hamburguesa en móvil */}
                    <button
                        className="md:hidden text-[#804617] focus:outline-none"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>

                    {/* Menú normal en escritorio */}
                    <div className="hidden md:flex space-x-6 ">
                        <ul className="flex items-center space-x-6 font-montserrat">
                            <li><Link to="/calculadora">Calculadora</Link></li>
                            <li><Link to="/registro">Registro</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Menú desplegable en móvil */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 border border-[#804617] rounded-lg p-2">
                        <ul className="flex flex-col items-start space-y-2 font-montserrat">
                            <li className="border border-[#804617] rounded-full px-4 py-1 hover:bg-[#f5f0eb] transition"><Link to="/calculadora">Calculadora</Link></li>
                            <li className="border border-[#804617] rounded-full px-4 py-1 hover:bg-[#f5f0eb] transition"><Link to="/registro">Registro</Link></li>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
};
