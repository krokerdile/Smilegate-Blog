import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        setErrMsg('');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { title: title, body: body };
        console.log(data);
        try {
            // const resp = await axios.post('http://localhost:8080/posts', data, {
            //     headers: { 'Content-Type': 'application/json' },
            // });
            const resp = await axios.post(
                'http://localhost:8000/create',
                data,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(data);
            console.log(resp);
            navigate('/');
        } catch (err) {
            let status = err.response?.status;
            console.log(status);
            console.log(err);
            // if (status === 200) {
            //     console.log('로그인');
            if (status === 401) {
                // console.log('unauthorized');
                setErrMsg('unauthorized');
            } else if (status === 403) {
                // console.log('Forbidden');
                setErrMsg('Forbidden');
            } else if (status === 404) {
                // console.log('Not Found');
                setErrMsg('Not Found');
            } else {
                // console.log('Login Failed');
                setErrMsg('Login Failed');
            }
        }
    };
    return (
        <div>
            <h1>createPost</h1>
            <div>
                <h2>글 쓰기</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <label>Body</label>
                    <input
                        required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></input>
                    <button type="submit">Save</button>
                </form>
                <Link to="/">Back</Link>
            </div>
        </div>
    );
};

export default CreatePost;
