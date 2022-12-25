import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import Detail from './components/PostDetail';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';
import PostList from './pages/PostList';
import Nav from './components/Nav';

function App() {
    return (
        <div className="App">
            <Nav />
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
