import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Responsive from '../components/Responsive';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const AdminPage = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate('/post/' + id);
    };

    const LoadEdit = (id) => {
        navigate('/edit/' + id);
    };

    const RemoveFunction = async (id) => {
        if (window.confirm('Do you want to remove')) {
            try {
                const resp = await axios.get(
                    // 'http://localhost:8080/comments',
                    'http://localhost:8000/post/delete/' + id,
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

    const RemoveComment = async (id) => {
        if (window.confirm('Do you want to remove')) {
            try {
                const resp = await axios.get(
                    'http://localhost:8000/comment/deleteAll/' + id,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
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
        <Responsive>
            <br />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>PostID</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">글 보러가기</TableCell>
                            <TableCell align="right">글 삭제하기</TableCell>
                            <TableCell align="right">글 수정하기</TableCell>
                            <TableCell align="right">댓글 비우기</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((item) => (
                                <TableRow
                                    key={item.postId}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.postId}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.title}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        onClick={() => {
                                            LoadDetail(item.postId);
                                        }}
                                    >
                                        <Button variant="outlined">조회</Button>
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        onClick={() => {
                                            RemoveFunction(item.postId);
                                        }}
                                    >
                                        <Button variant="outlined">삭제</Button>
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        onClick={() => {
                                            LoadEdit(item.postId);
                                        }}
                                    >
                                        <Button variant="outlined">수정</Button>
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        onClick={() => {
                                            RemoveComment(item.postId);
                                        }}
                                    >
                                        <Button variant="outlined">
                                            댓글삭제
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Responsive>
    );
};

export default AdminPage;
