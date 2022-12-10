import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <Link to="/">
                <h1>mainPage</h1>
            </Link>
            <h2>POST LIST</h2>
        </div>
    );
};

export default MainPage;
