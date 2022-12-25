import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import axios from "axios";

const AddnewProduct = () => {

  const [formData,setFormData]=useState({
    title:"",
    price:"",
    description:"",
    category:"",
    image:"",
    rating:"",
    count:"",
    
  });
  const handleFormSubmit=(event)=>{
    event.preventDefault();
    fetch("http://localhost:3000/Products.json"
        , {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body:{
            formData
          }
        }
      )
        .then(function (response) {
          //   console.log(response)
          return response.json();
        });
        
    // let response=  axios.post("Products.json",formData);
    // console.log(response);
    // if(response){
    //   alert("data inserted successfully");
    // }
    // else{
    //   alert("problem arouse");
    // }

    setFormData({
      title:"",
    price:"",
    description:"",
    category:"",
    image:"",
    rating:"",
    count:"",
    });
    console.log(formData);
  }
  // useEffect(() => {
  //   handleFormSubmit()
  // }, [])


  return (
    <div>
    <Container className="py-4 mt-5">
   <Form onSubmit={handleFormSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Tille</Form.Label>
    <Form.Control type="text" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} />
    
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Price</Form.Label>
    <Form.Control type="text" value={formData.price} onChange={(e)=>setFormData({...formData,price:e.target.value})} />
    
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Description</Form.Label>
    <Form.Control type="text" value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Category</Form.Label>
    <Form.Control type="text" value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Rating</Form.Label>
    <Form.Control type="text" value={formData.rating} onChange={(e)=>setFormData({...formData,rating:e.target.value})} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Count</Form.Label>
    <Form.Control type="text" value={formData.count} onChange={(e)=>setFormData({...formData,count:e.target.value})} />
  </Form.Group>
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload Product Image</Form.Label>
    <Form.Control type="file" value={formData.image} onChange={(e)=>setFormData({...formData,image:e.target.value})}/>
  </Form.Group>
  
  <Button variant="success" type='submit'>
    Submit
  </Button>
</Form>
</Container>
</div>
  )
}

export default AddnewProduct;
