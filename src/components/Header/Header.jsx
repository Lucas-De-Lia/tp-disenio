import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import './Header.css';
export const Header = () => {
    return (
        <div>
            <header className='header'>
                <div className='logo-container'>
                    <Link to="/"><img src={logo} alt="logo" className='logo' /></Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/faq">Preguntas Frecuentes</Link></li>
                        <li><Link to="/about">Sobre Nosotros</Link></li>
                        <li><Link to="/auth/login" className='login-button'>Iniciar Sesión</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};