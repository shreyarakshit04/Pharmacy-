import { React } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { useCart } from 'react-use-cart';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from "@reach/router";
import { toast } from 'react-hot-toast';
import {BsFillStarFill} from "react-icons/bs";
import './ProductCard.css';

const ProductCard = (props) => {
    let { image, price, title, id, category, rating } = props.data;
    const [theme] = useThemeHook();
    const { addItem } = useCart();





    const addToCart = () => {

        addItem(props.data);
        toast.success(" added to cart successfully", {
            duration: 3000,
            position: 'top-center',

        });

    }
    return (
        <>

            <Card id="productCard"
                style={{ width: '18rem', height: 'auto',borderColor:"orange",background:"transparent" }}
                className={`${theme? 'bg-light-black text-light' : 'bg-light text-black'} text-center p-0 overflow-hidden shadow mx-auto mb-4`}
            >
                 <Link to={`/product-details/${id}`}>
                    <div style={{
                        background: 'transparent', height: '15rem', overflow: 'hidden', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', marginBottom: 'inherit'
                    }}>
                        <div style={{ width: '9rem' }}>
                            <Card.Img variant="top" src={image} className="img-fluid" />
                        </div>
                    </div>
                </Link>
                <Card.Body>
                    <Card.Title style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        <h6>{title}</h6>
                    </Card.Title>
                    <Card.Title>
                    <Badge pill bg="secondary">{category}</Badge>
               
                    </Card.Title>
                    <Card.Title>
                       <h6> MRP <span>Rs.</span> <span className="h6">{price}</span></h6>
                    </Card.Title>
                    <Card.Title>
                        
                        <span className="h6">{rating}</span>
                        <BsFillStarFill size="0.8rem" style={{color:"gold", marginLeft:"8px"}}/>
                    </Card.Title>
                    <Button id="addToCartButton" 
                        onClick={() => addToCart()}
                        className={ "d-flex align-item-center m-auto border-0"}
                       style={{backgroundColor:"orange"}}
                    >
                        <BsCartPlus size="1.8rem" style={{marginRight:"10px"}}/>
                        Add to cart
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
};

export default ProductCard;