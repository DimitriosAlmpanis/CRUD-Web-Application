import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigator = useNavigate();
    
    return(
        <header>
            <nav>
                <h3 id='logo' onClick={() => navigator('/')}>CRUD Web Application</h3>
            </nav>
        </header>
    );
}

export default Header