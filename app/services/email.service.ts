import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config(); // Cargar variables de entorno

// Asignar variables de entorno
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_USER = process.env.SMTP_USER; 




// Función para enviar correos electrónicos
const sendMail = async (
    to: string,
    subject: string,
    title: string,
    text: string,
    name: string,
    job: string,
    country: string,
    city: string,
    web: string
): Promise<boolean | Error> => {
    let result: boolean | Error;
    try {
        const layoutPath = 'app/layouts/layout.html'; 

         // Verificar si el archivo de plantilla existe
        if (!fs.existsSync(layoutPath)) {
            throw new Error(`El archivo de plantilla no existe en la ruta: ${layoutPath}`);
        }




        // Leer el contenido de la plantilla y reemplazar variables dinámicas
        const body: string = fs.readFileSync(layoutPath, 'utf-8')
            .replace('{{title}}', title)
            .replace('{{body}}', text)
            .replace('{{name}}', name)
            .replace('{{job}}', job)
            .replace('{{country}}', country)
            .replace('{{city}}', city)
            .replace('{{web}}', web.substring(11));




        // Configuración del servicio de correo
        const transporter = nodemailer.createTransport({
            host: "smtp.ionos.es",
            port: 587,
            secure: false,
            auth: {
                user: SMTP_USER, //usuario
                pass: SMTP_PASS, //contraseña
            },
        });




         // Opciones del correo
        const mailOptions = {
            from: SMTP_USER, //remitente
            to, //destinatario
            subject, //asunto
            html: body, //cuerpo del correo
        };




         // Enviar el correo y manejar el resultado
        return new Promise<boolean | Error>((resolve) => {
            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    console.error("Error al enviar correo:", err);
                    resolve(err);  // Devuelve el errorr
                } else {
                    resolve(true); // Devuelve true si el correo se ha enviado con éxito
                }
            });
        });

    } catch (error) {
        console.error("Error en sendMail:", error);
        return error instanceof Error ? error : new Error(String(error)); 
    }
};




// Exportar la función para su uso en otros módulos
export default { sendMail };
