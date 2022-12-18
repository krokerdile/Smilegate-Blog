import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate('/post/' + id);
    };

    const LoadEdit = (id) => {
        navigate('/edit/' + id);
    };

    const RemoveFunction = async (e) => {
        if (window.confirm('Do you want to remove')) {
            // fetch('http://localhost:8080/posts/' + id, {
            //     method: 'DELETE',
            // })
            //     .then((res) => {
            //         alert('Removed succesfully.');
            //         window.location.reload();
            //     })
            //     .catch((err) => {
            //         console.log(err.message);
            //     });
            try {
                const resp = await axios.get(
                    // 'http://localhost:8080/comments',
                    'http://localhost:8000/post/delete/' + e.target.id,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                fetchData();
                console.log(data);
                console.log(resp);
            } catch (err) {
                let status = err.response?.status;
                console.log(status);
                console.log(err);
            }
        }
    };

    const fetchData = async () => {
        const { data } = await axios.get('http://localhost:8000/post');
        console.log(data);
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
                            <tr key={item.postId}>
                                <td>{item.title}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            LoadEdit(item.postId);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={RemoveFunction}
                                        id={item.postId}
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => {
                                            LoadDetail(item.postId);
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

export default PostList;
