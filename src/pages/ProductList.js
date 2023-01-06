import { useNavigate } from '@reach/router';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Row, Table } from 'react-bootstrap';

import {  RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { useThemeHook } from '../GlobalComponents/ThemeProvider';

const ProductList = () => {
  const [theme] = useThemeHook();
  // console.log(props);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [count, setCount] = useState('');
  const [curInd, setCurInd] = useState();

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false)

  const navigate = useNavigate();

  const getData = () => {
    fetch("http://localhost:3001/products"
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
      
        return response.json();
      })
      .then(function (myJson) {
       
        setData(myJson)
      });
  }
  useEffect(() => {
    getData()
  }, [])
 
  const handleDelete = (index) => {
    data.splice(index, 1)
    setData([...data])
  }

  const AddNewProducts = () => {

    navigate("/admin/new-product");
  };


  const handleClose = () => setShow(false);
  const handleShow = (i) => {

    setCurInd(i);
    const res = data.find(prod =>
      prod.id === i + 1
    )

    setName(res.title);
    setPrice(res.price);
    setDescription(res.description);
    setCategory(res.category);
    setCount(res.count);
    setRating(res.rating);

    setShow(true);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const upd_obj = data.findIndex((obj => obj.id == curInd + 1));
    data[upd_obj].title = name;
    data[upd_obj].description = description;
    data[upd_obj].price = price;
    data[upd_obj].category = category;
    data[upd_obj].rating = rating;
    data[upd_obj].count = count;
    console.log("Before Object Updation: ", data[upd_obj]);

    setShow(false);
  }

  return (
    <div>
      <Container className="py-4 mt-5">

        <Button style={{backgroundColor:"orange",borderColor:"white",borderRadius: "4px"}}variant="success" onClick={AddNewProducts}
          className="m-2"
        >Add New Product</Button>

        <Row className="justify-content-center">
          <Table responsive="lg" bordered hover variant={theme ? 'dark' : 'light'} className="mb-5 mt-2"style={{textAlign:"center"}}>
            <thead>
              <tr>
                <th scope="col" >Product</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => {
                return (

                  <tr key={index}>
                    <td>
                      <div style={{
                        background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
                        justifyContent: 'center', alignItems: 'center'
                      }}>
                        <div style={{ padding: '.5rem' }}>
                          <img src={data.image} style={{ width: '4rem' }} alt={data.title} />
                        </div>
                      </div>
                    </td>
                    <td style={{  width: '15rem', textOverFlow: 'ellipsis' }}>
                    {data.title}
                    </td>
                    <td style={{width: '20rem',overflow: 'hidden',textOverFlow: 'ellipsis'}} > {data.description.length>30?data.description.slice(0,30)+'...':data.description }</td>
                    <td> {data.category}</td>
                    <td>Rs. {data.price}</td>
                    <td>Quantity ({data.count})</td>
                    <td>

                      <Button style={{backgroundColor:"#FFD700",borderColor:"white",borderRadius: "1px"}}className="edit" onClick={() => handleShow(index)} ><RiEdit2Fill/></Button>

                      <Button style={{backgroundColor:"#FFD700",borderColor:"white",borderRadius: "1px"}}className="delete" onClick={() => handleDelete(index)}><RiDeleteBin5Fill/></Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Tille</Form.Label>
                              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}
                              />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Price</Form.Label>
                              <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Description</Form.Label>
                              <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Category</Form.Label>
                              <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Rating</Form.Label>
                              <Form.Control type="number" value={rating} onChange={(e) => setRating(e.target.value)} />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Count</Form.Label>
                              <Form.Control type="number" value={count} onChange={(e) => setCount(e.target.value)} />

                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Image</Form.Label>
                              <Form.Control type="file" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                              <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button type="submit" variant="primary">
                              Save
                            </Button>
                          </Form></Modal.Body>
                        
                      </Modal>
                    </td>

                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
