import React, { useState, useEffect } from 'react';
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
        <div className="app" data-bs-theme={theme}>
            <header className={`container-fluid ${theme}`}>
                <nav className="navbar fixed-top">
                    <a className="navbar-brand" href="index.html">Quiz Maker<sup>&reg;</sup></a>

                    <div id="navControls" className="nav-controls">
                        <menu className="navbar-nav">
                            <li className="nav-item"><a className="nav-link active" href="dashboard.html">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="scores.html">Scores</a></li>
                            <li className="nav-item"><a className="nav-link" href="about.html">About</a></li>
                        </menu>
                    </div>

                    <div className="form-check form-switch">
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
                Components go here
            </main>

            <footer className={`container-fluid ${theme}`}>
                <div>
                    <span className="text-reset">Lehi Alcantara</span>
                    <a className="text-reset" href="https://github.com/ylehilds/startup">GitHub</a>
                </div>
            </footer>
        </div>
    )
}

