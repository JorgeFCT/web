import { Link } from 'react-router-dom';

const Footer = () => {
return (
    <div className="logo-cs mt-10">
        <div className="flex justify-center">
            <Link to="https://www.cryptospace.es/" target="_blank" rel="noopener noreferrer">
            <p className="flex items-center">
                Powered by
                <img src="src/assets/img/CryptoSpace-logo.png" alt="CryptoSpace Logo" width="50px" className="ml-2" />
            </p>
            </Link>
        </div>
    </div>
);
};

export default Footer;
