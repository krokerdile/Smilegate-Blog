import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <Link to="/">
                <h1>main</h1>
            </Link>
            <Link to="/admin">
                <h1>Admin</h1>
            </Link>
            <Link to="/Detail">
                <h1>Detail</h1>
            </Link>
            <Link to="/edit">
                <h1>Edit</h1>
            </Link>
            <Link to="/write">
                <h1>Create</h1>
            </Link>
            <Link to="/List">
                <h1>List</h1>
            </Link>

            <h2>POST LIST</h2>
        </div>
    );
};

export default MainPage;
