import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';

const OrderCard = (props) => {
    const [theme] = useThemeHook();
    const d = new Date();
    const text = d.toLocaleDateString();
    return (
        <Card className={`${theme? 'bg-light-black text-light' : 'bg-light text-black'} mb-3`} border={theme? 'warning' : 'primary'}>
            <Card.Header>
                <b>{props.orderDate}</b>
                <small className="float-end">Order ID: {props.orderId}</small>
            </Card.Header>
            <Row className="p-2">
                <Col xs={3} sm={2}>
                    <Card.Img variant="top" src={props.img} />
                </Col>
                <Col>
                    <Card.Body>
                        <div className='d-flex'>
                            <Card.Title>{props.title}</Card.Title>
                            <Card.Text style={{float:"inline-end"}}>
                                <Badge pill bg="success"className='ms-5'>
                                    Delivered on
                                </Badge>
                                <h6 className='ms-5'>{text}</h6>
                            </Card.Text>
                            </div>



                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default OrderCard;