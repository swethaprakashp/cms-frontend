import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("dashboard");
    }
    return (
        <div className='container'>
            <h1 className='heading'>Welcome to CMS</h1>
            <div className='button' onClick={handleClick} on>
                <h1 className='btn-txt'>Continue</h1>
            </div>
        </div>
    )
}

export default Home;
