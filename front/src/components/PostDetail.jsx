// 프로젝트 상세정보 페이지

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';

const Detail = () => {
    const { empid } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({});

    const LoadEdit = (id) => {
        navigate('/edit/' + id);
    };

    const RemoveFunction = async (e) => {
        if (window.confirm('Do you want to remove')) {
            try {
                const resp = await axios.get(
                    // 'http://localhost:8080/comments',
                    'http://localhost:8000/post/delete/' + e.target.id,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                fetchData();
                navigate('/list');
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
        const { data } = await axios.get('http://localhost:8000/post/' + empid);
        console.log(data);
        setData(data[0]);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {data && (
                <div>
                    <h1>{data.postId}</h1>
                    <h2>{data.title}</h2>
                    <p>{data.body}</p>
                    <button
                        onClick={() => {
                            LoadEdit(data.postId);
                        }}
                    >
                        Edit
                    </button>
                    <button onClick={RemoveFunction} id={data.postId}>
                        Remove
                    </button>
                    <Comment postId={empid} />
                    <Link to="/">Back to List</Link>
                </div>
            )}
        </>
    );
};

export default Detail;
