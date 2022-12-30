import React, { useEffect} from 'react'
import { Button, Card, Col, ListGroup, ListGroupItem, Row,Image } from 'react-bootstrap'
import CheckoutSteps from '../component/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Message from '../component/Message';
import { Link } from 'react-router-dom'
import { ORDER_CREATE_RESET } from '../constans/orderConstans'
import { createOrder } from '../actions/orderAction'

function PlaceOrderScreen() {

    const cart = useSelector(state=>state.cart)
    cart.ItemsPrice = cart.cartItems.reduce((acc,item)=>acc + item.price*item.qty,0).toFixed(2)
    cart.shippingPrice =(cart.ItemsPrice> 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.20) * cart.ItemsPrice).toFixed(2)

    cart.TotalPrice = (Number(cart.ItemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    const orderCreate = useSelector(state=>state.orderCreate)
    const {order,error,success} = orderCreate

    
    const dispatch = useDispatch()
    const history = useNavigate() 

    if(!cart.paymentMethod)
    {
        history('/payment')
    }

    useEffect(()=>{
        if(success){
            history(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})
        }
    },[dispatch,history,success,order])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems:cart.orderItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            ItemsPrice:cart.ItemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            TotalPrice:cart.TotalPrice,
        }))
    }

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h4>Order Info</h4>
                </ListGroup.Item>
                <ListGroup.Item>    
                    <p>
                        <strong>Address :  </strong>
                        {cart.shippingAddress.address}

                    </p>
                </ListGroup.Item>
                <ListGroup.Item>    
                    <p>
                        <strong>City :  </strong>
                        {cart.shippingAddress.city}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>    
                    <p>
                        <strong>Postal Code :  </strong>
                        {cart.shippingAddress.postalcode}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>    
                    <p>
                        <strong>Country :  </strong>
                        {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
            </ListGroup>

            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h4>Payment Info</h4>
                </ListGroup.Item>
                <ListGroup.Item>    
                    <p>
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>
            </ListGroup>    

            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h4>Products</h4>
                </ListGroup.Item>
                <ListGroup.Item>    
                        {cart.cartItems.length ===0 ? <Message variant='warning'>Cart is Empty</Message>:
                        (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item,index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                            <Image src={item.iamge} alt={item.image} fluid rounded/>
                                            </Col>
                                            <Col md={7}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                            {item.qty} x $  {item.price}  = $ { (item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                        }
                    
                </ListGroup.Item>
            </ListGroup> 
                
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Complete Shopping</h2>
                        </ListGroup.Item>
                        <ListGroupItem>
                            <Row>
                                <Col>Product:</Col>
                                <Col>${cart.ItemsPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Cargo:</Col>
                                <Col>${cart.shoppingPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>VAT:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>${cart.TotalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button onClick={placeOrder}  type='button' disabled={cart.cartItems===0} variant='primary'>Complete Order</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen