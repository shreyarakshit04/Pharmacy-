import React from 'react';
import { Container, Row, Col, Tab, Nav, Image } from 'react-bootstrap';

import Heading from '../components/Heading';
import profile from '../Images/profile.png';
import { FaClipboardList, FaAngleRight } from 'react-icons/fa';
import OrderCard from '../components/OrderCard';
import './MyAccount.css';

import { useCart } from 'react-use-cart';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';

const MyAccount = () => {
    const [theme] = useThemeHook();

    const {

        items,

    } = useCart();
console.log(items);


    return (
        <Container className="py-5 mt-5">
            <h1  style={{color:"orange",textAlign:"center"}}>MY ACCOUNT</h1>
            <Tab.Container defaultActiveKey="my-orders">
                <Row className="justify-content-evenly mt-4 p-1">
                    <Col sm={3} className={`${theme ? 'bg-light-black text-light' : 'bg-light text-balck'} p-2 rounded h-100 mb-3 user-menu`}>
                        <Row className="mb-3 py-2">
                            <Col xs={3} className="pe-0">
                                <Image
                                    src={profile}
                                    thumbnail
                                    fluid
                                    roundedCircle
                                    className="p-0"
                                />
                            </Col>
                            <Col xs={6} className="pt-1">
                                <h5>Hello,User</h5>
                            </Col>
                        </Row>
                        <Nav variant="pills" className="flex-column" >
                            <Nav.Item className="mb-3">
                                <Nav.Link eventKey="my-orders"style={{backgroundColor:"orange",color:"white"}}>
                                    <FaClipboardList size="1.4rem" />
                                    MY ORDERS
                                    <FaAngleRight size="1.4rem" style={{ float: "right" }} />

                                </Nav.Link>

                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8} className={`${theme? 'text-light bg-dark' : 'text-black bg-light'} p-2 rounded`}>
                        <Tab.Content >
                            <Tab.Pane eventKey="my-orders">
                                <Heading heading=" MY ORDERS" size="h3" style={{color:"orange"}} />

                                {
                                    items && items.map(item => (
                                        <OrderCard
                                            orderDate={item.orderDate}
                                            orderId={item.id}
                                            title={item.title}
                                            img={item.image}
                                        />
                                    ))
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="account-details">
                                <Heading heading="Account details" size="h3" />
                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default MyAccount;