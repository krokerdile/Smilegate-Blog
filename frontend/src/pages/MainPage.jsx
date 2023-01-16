import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const MainPage = () => {
    return (
        <div>
            <h2>POST LIST</h2>
            <PostList />
        </div>
    );
};

export default MainPage;
