import { useNavigate } from '@reach/router';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Row, Table } from 'react-bootstrap';
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
    const[curInd,setCurInd]=useState();
  
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
          //   console.log(response)
          return response.json();
        })
        .then(function (myJson) {
            // console.log(myJson.products);
          setData(myJson)
        });
    }
    useEffect(() => {
      getData()
    }, [])
    // console.log(data);
  
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
        prod.id === i+1
    )
  
    setName(res.title);
    setPrice(res.price);
    setDescription(res.description);
    setCategory(res.category);
    setCount(res.count);
    setRating(res.rating);
        
      setShow(true);
    };
    const handleUpdate=(e)=>{
      e.preventDefault();
      const upd_obj = data.findIndex((obj => obj.id==curInd+1 ));
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
         
            <Button variant="success" onClick={AddNewProducts}
              className="m-2" 
            >Add New Product</Button>
         
          <Row className="justify-content-center">
            <Table responsive="sm" striped bordered hover variant={theme ? 'dark' : 'light'} className="mb-5">
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
                      <td>
                        <h6 style={{ whiteSpace: 'nowrap', width: '14rem', overflow: 'hidden', textOverFlow: 'ellipsis' }}>
                          {data.title}
                        </h6>
                      </td>
                      <td>Rs. {data.price}</td>
                      <td>Quantity ({data.count})</td>
                      <td>
                        
                        <button className="edit" onClick={() => handleShow(index)} >Edit</button>
  
                        <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
  
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Product</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Tille</Form.Label>
                              <Form.Control type="text"  value={name} onChange= {(e) => setName(e.target.value)}
                              />
  
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Price</Form.Label>
                              <Form.Control type="number" value={price} onChange= {(e) => setPrice(e.target.value)}/>
  
                            </Form.Group>
  
  
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Description</Form.Label>
                              <Form.Control type="text" value={description} onChange= {(e) => setDescription(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Category</Form.Label>
                              <Form.Control type="text"value={category} onChange= {(e) => setCategory(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Rating</Form.Label>
                              <Form.Control type="number" value={rating} onChange= {(e) => setRating(e.target.value)}/>
  
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Count</Form.Label>
                              <Form.Control type="number" value={count} onChange= {(e) => setCount(e.target.value)}/>
  
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
                            <Button  type="submit"variant="primary">
                              Save 
                            </Button>
                          </Form></Modal.Body>
                          <Modal.Footer>
                            
                          </Modal.Footer>
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
