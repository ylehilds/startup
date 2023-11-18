import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Scores } from './scores/scores';
import { About } from './about/about';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const mainElement = document.querySelector('main');
        mainElement.style.backgroundColor = theme === 'dark' ? 'DarkSlateGrey' : 'LightGrey';
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <BrowserRouter>
            <div className="app" data-bs-theme={theme}>
                <header className={`container-fluid ${theme}`}>
                    <nav className="navbar fixed-top">
                        <NavLink className="navbar-brand" to="">Quiz Maker<sup>&reg;</sup></NavLink>

                        <div id="navControls">
                            <menu className="navbar-nav">
                                <li className="nav-item"><NavLink className="nav-link active" to="dashboard">Home</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to="scores">Scores</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to="about">About</NavLink></li>
                            </menu>
                        </div>
                        <div className="form-check form-switch ms-auto">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                onChange={handleThemeToggle}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                        </div>
                    </nav>
                </header>

                <main className={`container-fluid text-center ${theme}`}>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/scores' element={<Scores />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                </main>



                <footer className={`container-fluid ${theme}`}>
                    <div>
                        <span className="text-reset">Lehi Alcantara</span>
                        <NavLink className="text-reset" to="https://github.com/ylehilds/startup">GitHub</NavLink>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    )
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
