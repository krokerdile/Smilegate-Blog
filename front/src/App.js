import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import DetailPost from "./pages/DetailPost";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      <h1>SmileGate BlogProject</h1>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/Detail" element={<DetailPost />} />
        <Route path="/Edit" element={<EditPost />} />
        <Route path="/Create" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
