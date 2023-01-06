import React, { useContext } from 'react';
import { Button, Container, Col, Row, Table } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { BsCartCheck, BsCartX } from 'react-icons/bs';
import { Context } from '../context/orderContext';
import { useNavigate } from '@reach/router';
import '../components/ProductCard.css';
import { RiDeleteBinLine } from "react-icons/ri";

const Cart = () => {
    const [theme] = useThemeHook();
    const { addOrders } = useContext(Context);

    const {
        isEmpty,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    const navigate = useNavigate();
    const placeOrder = () => {
        addOrders(items, cartTotal);
        navigate("/my-account");
    };

    return (
        <Container className="py-4 mt-5">
            <h1 className={`my-5 text-center`} style={{color:"orange"}}>
                {isEmpty ? 'Your Cart is Empty' : 'My Cart'}
            </h1>
            <Row className="justify-content-center">
                <Table responsive="sm" bordered hover variant={theme ? 'dark' : 'light'} className="mb-5">
                    <tbody>
                        {items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div style={{
                                            background: 'transparent', height: '6rem', overflow: 'hidden', display: 'flex',
                                            justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <div style={{ padding: '.5rem',background:"transparent" }}>
                                                <img src={item.image} style={{ width: '4rem' }} alt={item.title} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h5 >
                                            {item.title}
                                        </h5>
                                    </td>
                                    <td style={{ justifyContent: 'center', alignItems: 'center' ,marginTop:"2px"}}>
                                        <h5>Rs. {item.price}</h5></td>

                                    <td style={{ justifyContent: 'center', alignItems: 'center' }}>

                                        <Button  style={{backgroundColor:"#FFD700",borderColor:"white",borderRadius: "1px"}} onClick={() => updateItemQuantity(item.id, item.quantity - 1)} >-</Button>
                                        <Button style={{backgroundColor:"#FFD700",borderColor:"white",borderRadius: "1px"}} >{item.quantity}</Button>
                                        <Button  style={{ backgroundColor:"#FFD700",borderColor:"white",borderRadius: "1px" }}  className="me-4" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</Button>
                                        <Button style={{backgroundColor:"#FFD700",borderColor:"#FFD700"}} onClick={() => removeItem(item.id)} className="ms-4"><RiDeleteBinLine/></Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {!isEmpty &&
                    <Row
                        style={{ position: 'fixed', bottom: 0 }}
                        className={`${theme ? 'bg-light-black text-light' : 'bg-light text-balck'} justify-content-center w-100`}
                    >
                        <Col className="py-2">
                            <h4>Total Price: Rs. {cartTotal}</h4>
                        </Col>
                        <Col className="p-0" md={4}>
                            <Button size="lg"
                                className="m-2"
                                style={{ background: "#FFD700", borderColor:"#FFD700"  }}
                                onClick={() => emptyCart()}
                            >
                                <BsCartX size="1.7rem" style={{marginRight:"15px"}}/>
                                Clear Cart
                            </Button>
                            <Button size="lg" onClick={placeOrder}
                                className="m-2" style={{ background: "orange", borderColor:"orange"  }}
                            >
                                <BsCartCheck size="1.7rem" style={{marginRight:"15px"}}/>
                                Place Order
                            </Button>
                        </Col>
                    </Row>}
            </Row>
        </Container>
    );
};

export default Cart;