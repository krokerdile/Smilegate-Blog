import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import moment from 'moment';
import Responsive from '../components/Responsive';
import Button from '@mui/material/Button';
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
        const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(nowTime);
        const data = { title: title, body: body, time: nowTime };
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
        <Responsive>
            <div>
                <h1>글 작성하기</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="제목"
                            multiline
                            rows={2}
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <br />
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="내용"
                            multiline
                            rows={6}
                            required
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />

                        <br />
                        <br />
                        <Button variant="contained" type="submit">
                            저장하기
                        </Button>
                    </form>
                </div>
            </div>
        </Responsive>
    );
};

export default CreatePost;
