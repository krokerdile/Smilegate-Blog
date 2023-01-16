import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Responsive from './Responsive';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { createTheme } from '@mui/material/styles';
const Comment = (props) => {
    const [data, setData] = useState(null);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const RemoveFunction = async (e) => {
        console.log(e);
        if (window.confirm('댓글 삭제하시겠습니까?')) {
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
        console.log(data);
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
        <Wrapper>
            {/* <Link to="/write">
                <button>Add new</button>
            </Link> */}

            <h3>댓글</h3>
            <table>
                <thead>
                    <tr>
                        <td>
                            <form
                                className="commentForm"
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    className="commentField"
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="댓글 작성"
                                    multiline
                                    rows={1}
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <br />
                                <br />
                                <Button variant="contained" type="submit">
                                    댓글 등록하기
                                </Button>
                            </form>
                        </td>
                    </tr>
                </thead>
                <br />
                <br />
                <tbody>
                    {data &&
                        data.map((item) => (
                            <tr key={item.commentId}>
                                <td>
                                    <Card
                                        variant="outlined"
                                        sx={{ minWidth: 275 }}
                                    >
                                        <CardContent>
                                            <Typography variant="body2">
                                                {item.body}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                onClick={RemoveFunction}
                                                id={item.commentId}
                                            >
                                                Remove
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .table {
        width: 100%;
    }
    .commentForm {
        width: 100%;
    }
    .commentField {
        width: 960px;
    }
`;

export default Comment;
