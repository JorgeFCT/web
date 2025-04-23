import { useState } from "react";
import { MainLayout } from "../../layout";
import styles from "../comercios/Comercios.module.css";

type FaqItem = {
    question: string;
    answer: string;
};

const faqData: FaqItem[] = [
    {
        question: "¿Cómo puedo registrarme?",
        answer: "Haz clic en el botón 'Registrarse' y completa el formulario.",
    },
    {
        question: "¿Dónde puedo cambiar mi contraseña?",
        answer: "Puedes cambiarla desde tu perfil en la sección de configuración.",
    },
    {
        question: "¿Cómo contacto con soporte?",
        answer: "Escríbenos a soporte@ejemplo.com y te responderemos lo antes posible.",
    },
    {
        question: "¿Necesito una billetera para usar la app?",
        answer: "No para buscar negocios, pero sí para pagar con cripto en el comercio.",
    },
    {
        question: "¿Puedo registrar mi negocio en la app?",
        answer: "Sí, ve a la sección 'Agregar negocio' y completa el formulario.",
    },
    {
        question: "¿Está disponible en mi país?",
        answer: "La app funciona globalmente, pero la disponibilidad de negocios varía por región.",
    },
    {
        question: "¿Qué tan segura es la app?",
        answer: "Protegemos tus datos con cifrado y no almacenamos tus llaves privadas ni fondos.",
    },
];

const FaqPage = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-4 py-10">
                <h1 className={`text-3xl font-bold mb-6 text-center ${styles.title}`}>Preguntas Frecuentes</h1>
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="border border-gray-300 rounded-xl bg-white">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full text-left px-6 py-4 font-medium text-lg flex justify-between items-center "
                            >
                                {item.question}
                                <span className="ml-4">
                                    {activeIndex === index ? "−" : "+"}
                                </span>
                            </button>
                            {activeIndex === index && (
                                <div className="px-6 pb-4">{item.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default FaqPage;
