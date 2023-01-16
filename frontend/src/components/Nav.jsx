import styled from 'styled-components';
import React from 'react';
import Responsive from './Responsive';
import { Link, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';

const HeaderBlock = styled.div`
    position: fixed;
    display: block;
    z-index: 9999;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
        color: orangered;
    }
    .right {
        display: flex;
        align-items: center;
    }
    .link {
        text-decoration: none;
    }
`;

const Spacer = styled.div`
    height: 4rem;
`;

const Nav = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <HeaderBlock>
                <Wrapper>
                    <Link className="link" to="/">
                        <div className="logo">SmileGate Blog</div>
                    </Link>
                    <div className="right">
                        <Stack spacing={2} direction="row">
                            <Link className="link" to="/admin">
                                <Button variant="outlined">
                                    관리자 페이지
                                </Button>
                            </Link>
                            <Link className="link" to="/write">
                                <Button variant="outlined">글 작성하기</Button>
                            </Link>
                        </Stack>
                    </div>
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </React.Fragment>
    );
};

export default Nav;
