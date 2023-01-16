import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import Responsive from '../components/Responsive';
import Button from '@mui/material/Button';

const EditPost = () => {
    const { empid } = useParams();
    const [data, setData] = useState({});
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [inputs, setInputs] = useState({
        title: '',
        body: '',
        postId: empid,
    });
    // const { title, body } = inputs; // 비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        console.log(value, name);
        setInputs({
            ...inputs, // 기존의 input 객체를 전개 구문으로 펼쳐서 /복사한 뒤
            [name]: value, // name 키를 가진 값을 value 로 설정 (이때 [name]은 계산된 속성명 구문 사용)
        });
    };
    const navigate = useNavigate();
    const fetchData = async () => {
        const { data } = await axios.get('http://localhost:8000/post/' + empid);
        console.log(data);
        setData(data[0]);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ title, body });
        console.log(title, body);
        console.log(data);
        try {
            const resp = await axios.post(
                // 'http://localhost:8080/posts/' + empid,
                'http://localhost:8000/post/edit/',
                inputs,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            navigate('/list');
            console.log(data);
            console.log(resp);
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
            <h1>글 수정하기</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="제목"
                        multiline
                        rows={2}
                        name="title"
                        required
                        defaultValue={data.title}
                        onChange={onChange}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="내용"
                        multiline
                        name="body"
                        rows={6}
                        required
                        defaultValue={data.body}
                        onChange={onChange}
                    />
                    <br />
                    <br />
                    <Button variant="contained" type="submit">
                        수정하기
                    </Button>
                </form>
            </div>
        </Responsive>
    );
};

export default EditPost;
