// 프로젝트 상세정보 페이지

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';
import Responsive from './Responsive';
import styled from 'styled-components';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

const Detail = () => {
    const { empid } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const LoadEdit = (id) => {
        navigate('/edit/' + id);
    };

    const bull = (
        <Box
            component="span"
            sx={{
                display: 'inline-block',
                mx: '2px',
                transform: 'scale(0.8)',
            }}
        >
            •
        </Box>
    );

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
        <Wrapper>
            <Responsive>
                <br />
                <Paper elevation={3} className="paper">
                    {data && (
                        <div>
                            <Card variant="outlined" sx={{ minWidth: 100 }}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {data.postId}번째 글
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Title
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {bull}
                                        {data.title}
                                    </Typography>
                                    <br />
                                    <Typography color="text.secondary">
                                        본문
                                    </Typography>
                                    <Typography variant="body2">
                                        {data.body}
                                    </Typography>
                                    <br />
                                    <Typography color="text.secondary">
                                        작성 시간
                                    </Typography>
                                    <Typography variant="body2">
                                        {data.time}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={() => {
                                            LoadEdit(data.postId);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={RemoveFunction}
                                        id={data.postId}
                                    >
                                        Remove
                                    </Button>
                                </CardActions>
                            </Card>
                            <Comment postId={empid} />
                        </div>
                    )}
                </Paper>
            </Responsive>
        </Wrapper>
    );
};

export default Detail;

const Wrapper = styled(Responsive)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .paper {
        padding: 16px;
    }
`;
