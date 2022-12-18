import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
    return (
        <>
            <Title>
                <Route path={'/post'}>
                    <BackBnt>
                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                            🔙
                        </Link>
                    </BackBnt>
                </Route>
                SmileGate-Blog
            </Title>
        </>
    );
};

const Title = styled.header`
    background-color: orangered;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0px;
    font-size: 30px;
    height: 64px;
    font-weight: bold;
    text-align: center;
    line-height: 64px;
`;
const BackBnt = styled.button`
    background-color: orangered;
    position: absolute;
    left: 0;
    height: 64px;
    border: 10px;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    cursor: pointer;
    text-decoration: none;
    margin: 0px;
    padding: 20px;
    outline: none;
    font-size: 30px;
    overflow: visible;
    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
`;

export default Header;
