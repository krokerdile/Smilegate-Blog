import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import Detail from './components/PostDetail';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';
import PostList from './pages/PostList';
import Header from './components/Header';
import Layout from './components/Layout';

function App() {
    return (
        <div className="App">
            <h1>SmileGate BlogProject</h1>

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/post/:empid" element={<Detail />} />
                <Route path="/edit/:empid" element={<EditPost />} />
                <Route path="/write" element={<CreatePost />} />
                <Route path="/List" element={<PostList />} />
            </Routes>
        </div>
    );
}

export default App;
