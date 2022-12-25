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
            <Responsive>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>PostID</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">글 작성시간</TableCell>
                                <TableCell align="right">글 보러가기</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data.map((item) => (
                                    <TableRow
                                        key={item.postId}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.title}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.title}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.time}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            onClick={() => {
                                                LoadDetail(item.postId);
                                            }}
                                        >
                                            <Button variant="outlined">
                                                글 보러가기
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Responsive>
        </>
    );
};

export default PostList;
