import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate('/post/' + id);
    };

    const LoadEdit = (id) => {
        navigate('/edit/' + id);
    };

    const RemoveFunction = (id) => {
        if (window.confirm('Do you want to remove')) {
            fetch('http://localhost:8080/projects/' + id, {
                method: 'DELETE',
            })
                .then((res) => {
                    alert('Removed succesfully.');
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    const fetchData = async () => {
        const { data } = await axios.get('http://localhost:8080/posts');
        setData(data);
    };
    useEffect(() => {
        fetchData();
        console.log(data);
    }, []);
    return (
        <>
            <Link to="/write">
                <button>Add new</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <td>
                            <h1>id</h1>
                        </td>
                        <td>
                            <h1>title</h1>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            LoadEdit(item.id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            RemoveFunction(item.id);
                                        }}
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => {
                                            LoadDetail(item.id);
                                        }}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default AdminPage;
