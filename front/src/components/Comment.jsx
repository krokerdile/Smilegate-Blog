import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Comment = (props) => {
    const [data, setData] = useState(null);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const RemoveFunction = async (e) => {
        console.log(e);
        if (window.confirm('Do you want to remove')) {
            // fetch('http://localhost:8080/comments/' + id, {
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
                    'http://localhost:8000/comment/delete/' + e.target.id,
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
    const postId = props['postId'];
    const fetchData = async () => {
        const { data } = await axios.get(
            // 'http://localhost:8080/comments?postId=' + commentId
            'http://localhost:8000/comment/' + postId
        );
        // console.log(data);
        setData(data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { body: comment, postId: props['postId'] };
        console.log(data);
        try {
            const resp = await axios.post(
                // 'http://localhost:8080/comments',
                'http://localhost:8000/commentcreate',
                data,
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
    };
    return (
        <>
            {/* <Link to="/write">
                <button>Add new</button>
            </Link> */}

            <table>
                <thead>
                    <tr>
                        <td>
                            <h1>Comment</h1>
                            <form onSubmit={handleSubmit}>
                                <label>Title</label>
                                <label>Body</label>
                                <input
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></input>
                                <button type="submit">Save</button>
                            </form>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item) => (
                            <tr key={item.commentId}>
                                <td>{item.body}</td>
                                <td>
                                    <button
                                        onClick={RemoveFunction}
                                        id={item.commentId}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default Comment;
