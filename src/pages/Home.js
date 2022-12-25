import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import ProductCard from '../components/ProductCard';

import { Toaster } from 'react-hot-toast';


const Home = () => {
    const [theme] = useThemeHook();
    const [searchInput, setSearchInput] = useState('');
   

    const [data,setData]=useState([]);
    const getData=()=>{
      fetch("Products.json"
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(function(response){
            console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          setData(myJson)
        });
    }
    useEffect(()=>{
        getData()
    },[])
    console.log(data);

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={10} md={5} lg={6} xl={4} className="mb-3 mx-auto text-center">
                <h4 className={theme? 'text-light my-5': 'text-black my-5'}>Search products</h4>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className={theme? 'bg-black text-dark-primary': 'bg-light text-light-primary'}>
                            <BiSearch size="2rem" />
                        </InputGroup.Text>
                        <FormControl 
                            placeholder="Search Products"
                            value={searchInput}
                            onChange={(event)=> setSearchInput(event.target.value)}
                            className={theme? 'bg-light-black text-light': 'bg-light text-black'}
                        />
                    </InputGroup>
                </Col>
                <Toaster />
                <SearchFilter 
                    value={searchInput}
                    data={data}

                    renderResults={results =>(
                        <Row className="justify-content-center">
                            {results.map((item, i)=>(
                                <ProductCard data={item} key={i} />
                            ))}
                        </Row>
                    )}
                />
                
            </Row>
        </Container>
    );
};

export default Home;