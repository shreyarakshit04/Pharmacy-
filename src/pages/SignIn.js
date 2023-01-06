import React,{ useState} from 'react';
import { Container, Row, Col, Button, Form, Spinner, InputGroup} from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { Link, useNavigate } from "@reach/router";


import { AiOutlineUser } from 'react-icons/ai';
import { VscKey } from 'react-icons/vsc';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [theme] = useThemeHook();
    const [show,setShow] = useState(true);
    const navigate = useNavigate();

     const handleSubmitAdmin = (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        const username = form.username.value;
        const password = form.password.value;
        if(username && password){
           
            fetch('Users.json',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res=>res.json())
           
            .catch(error=> console.error(error))
            .finally(()=>{
                setShow(false);
                setLoading(false);
                navigate('/admin/all-product', {replace: true})
                alert('Admin Login successful');
            })
        }
    }

    const handleSubmit = (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        const username = form.username.value;
        const password = form.password.value;
        if(username && password){
            setLoading(true);
            fetch('Users.json',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res=>res.json())
           
            .catch(error=> console.error(error))
            .finally(()=>{
                setLoading(false);
                navigate('/home', {replace: true})
                alert('User Login successful');
            })
        }
    }
    return (
       <Container className="py-5 mt-5">
            <Row className="justify-content-center mt-5">
                <Col   xs={11} sm={10} md={8} lg={4} className={`p-4 me-5 rounded ${theme? 'text-light bg-dark' : 'text-black bg-light'}`}>
                    <h1 className={`text-center border-bottom pb-3 ${theme? 'text-white' : 'text-black'}`}>
                        Sign in As Admin
                    </h1>
                    <Form onSubmit={handleSubmitAdmin}>
                        <InputGroup className="mb-4 mt-5">
                            <InputGroup.Text>
                                <AiOutlineUser size="1.8rem" />
                            </InputGroup.Text>
                            <Form.Control name="username" type="text" placeholder="Username" minLength={3} required />
                        </InputGroup>
                        <InputGroup className="mb-4">
                            <InputGroup.Text>
                                <VscKey size="1.8rem" />
                            </InputGroup.Text>
                            <Form.Control name="password" type="password" placeholder="Password" minLength={6} required />
                        </InputGroup>
                        <Button
                            type="submit"
                            className={` m-auto d-block`}
                            // disabled={loading}
                            style={{border: 0,backgroundColor:"orange"}}
                        > Sign In
                        
                        </Button>
                        <Form.Group className="mt-3 text-center">
                            <Form.Text className="text-muted fw-bold">
                                New to E-cart?
                            </Form.Text>
                            <Row className="py-2 border-bottom mb-3"/>
                            <Link to='/sign-up' className="btn rounded-0" style={{border: 0,backgroundColor:"orange" ,color:"white"}}>
                                Create your E-cart account 
                            </Link>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={11} sm={10} md={8} lg={4} className={`p-4 rounded ${theme? 'text-light bg-dark' : 'text-black bg-light'}`}>
                    <h1 className={`text-center border-bottom pb-3 ${theme? 'text-white' : 'text-black'}`}>
                        Sign in As User
                    </h1>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-4 mt-5">
                            <InputGroup.Text>
                                <AiOutlineUser size="1.8rem" />
                            </InputGroup.Text>
                            <Form.Control name="username" type="text" placeholder="Username" minLength={3} required />
                        </InputGroup>
                        <InputGroup className="mb-4">
                            <InputGroup.Text>
                                <VscKey size="1.8rem" />
                            </InputGroup.Text>
                            <Form.Control name="password" type="password" placeholder="Password" minLength={6} required />
                        </InputGroup>
                        <Button
                            type="submit"
                            className={` m-auto d-block`}
                           
                            style={{border: 0,backgroundColor:"orange"}}
                        > Sign In
                        
                        </Button>
                        <Form.Group className="mt-3 text-center">
                            <Form.Text className="text-muted fw-bold">
                                New to E-cart?
                            </Form.Text>
                            <Row className="py-2 border-bottom mb-3"/>
                            <Link to='/sign-up' className="btn rounded-0" style={{border: 0,backgroundColor:"orange" ,color:"white"}}>
                                Create your E-cart account 
                            </Link>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
       </Container>
    );
};

export default SignIn;