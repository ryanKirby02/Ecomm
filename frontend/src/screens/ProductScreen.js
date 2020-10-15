import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productAction'
import { Message } from '../components/Message.js'
import { Loader } from '../components/Loader.js'



const ProductScreen = ({ history, match }) => {
        const [qty, setQty] = useState(1)
    
        const dispatch = useDispatch()
        const productDetails = useSelector(state => state.productDetails)
        const { loading, error, product } = productDetails
        
        useEffect(() => {
        dispatch(listProductDetails(match.params.id)) 
    }, [match, dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid='true' />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush' fluid='true'>
                        <ListGroupItem>
                           <h3>{product.name}</h3> 
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3} fluid='true'>
                    <Card fluid='true'>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Currently Out of Stock'}
                                    </Col>  
                                </Row>
                            </ListGroupItem>
                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col>
                                                <Form.Control
                                                 as='select'
                                                 value={qty}
                                                 onChange={(e) => setQty(e.target.value)}
                                                 >
                                                 {[...Array(product.countInStock).keys()].map(x => (
                                                     <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                 ))}</Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>
                                            ${product.price}
                                        </strong>
                                    </Col>  
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button 
                                className='btn-block' 
                                type='button'
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                                 >Add To Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
           )}
        </>
    )
}
export default ProductScreen
