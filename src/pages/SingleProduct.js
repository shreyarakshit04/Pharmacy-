
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import Lightbox from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css';
import './SingleProduct.css';
import { useCart } from 'react-use-cart';
import { BsCartPlus } from 'react-icons/bs';
import { useParams } from '@reach/router';
import axios from 'axios';

const SingleProduct = () => {

    const [data, setData] = useState([]);
    // const getData = async() => {
    //    await fetch("https://res.cloudinary.com/dh9ziealg/raw/upload/Products_shwow9.json"
    //         , {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         }
    //     )
    //         .then(function (response) {
    //             console.log(response)
    //             return response.json();
    //         })
    //         .then(function (myJson) {
    //             console.log(myJson);
    //             setData(myJson)
    //         });
    // }
    
    useEffect(() => {
        getData()
    }, [])

const getData=async()=>{
    await axios.get("https://res.cloudinary.com/dh9ziealg/raw/upload/Products_shwow9.json")
    .then((res)=>{
        console.log(res);
        setData(res.data);
    }).catch((err)=>{
        console.log(err);
    })
}

    const [productData, setProductData] = useState([]);
    const [theme] = useThemeHook();
    const { addItem } = useCart();

    useEffect(() => {
        getResponse();
    }, []);
    const params = useParams();
    console.log(params);
    console.log({data});
    // data={data}

    const getResponse = async () => {
        console.log(data);
        const res = data?data.find(prod =>
            prod.id === params.productId
        ):null;
       
        console.log(res);
        setProductData(res);
        // console.log(props);
    }
    return (
        <Container className="py-5">
            <Row className="justify-content-center mt-5">
                <Col xs={10} md={7} lg={5} className="p-0">
                    <Lightbox
                        images={[
                            {
                                src: productData.image?productData.image:null,
                                title: productData.title,
                                description: 'img 1'
                            },
                            {
                                src: productData.image,
                                title: productData.title,
                                description: 'img 2'
                            },
                            {
                                src: productData.image,
                                title: productData.title,
                                description: 'img 3'
                            },
                            {
                                src: productData.image,
                                title: productData.title,
                                description: 'img 4'
                            }
                        ]}
                    />
                </Col>
                <Col xs={10} md={7} lg={7} className={`${theme ? 'text-light' : 'text-black'} product-details`}>
                    <h1>{productData.title}</h1>
                    <Button
                        onClick={() => addItem(productData)}
                        className={theme ? 'bg-dark-primary text-black' : 'bg-light-primary'}
                        style={{ borderRadius: '0', border: 0 }}
                    >
                        <BsCartPlus size="1.8rem" />
                        Add to cart
                    </Button>
                    <br />
                    <b className={`${theme ? 'text-dark-primary' : 'text-light-primary'} h4 mt-3 d-block`}>
                        Rs. {productData.price}
                    </b>
                    <br />
                    <b className="h5">4.1 ⭐</b>
                    <p className="mt-3 h5" style={{ opacity: '0.8', fontWeight: '400' }}>
                        {productData.description}
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default SingleProduct;
