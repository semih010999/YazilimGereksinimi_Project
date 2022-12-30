import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addToCart,removeFromCart } from '../actions/cartAction';
import Message from '../component/Message';

function CartScreen() {
    
    const{id}=useParams();
    const dispatch = useDispatch()
    const history = useNavigate()
    const useQty = useLocation()
    const qty = useQty.search ? Number (useQty.search.split('=')[1]):1
    const cart = useSelector(state=>state.cart)
    const{cartItems} = cart

    const removeFromCartHandler = (id)=>{
        dispatch(removeFromCart(id))
    }

    useEffect(()=>
    {
        if(id)
        {
            dispatch(addToCart(id,qty))
        }
    },
    [dispatch,id,qty]
    
    )

    const checkoutHandler = ()=>{
        history('/shipping')
    }

  return (
      <div>
        
        <Row>
            <Col md={8}>
                <h1 className='product-title'>Cart</h1>
                {cartItems.length === 0 ?(
                    <Message variant='info'>
                        Cart is empty
                    </Message>

                ):
                (
                    <ListGroup variant='flush'>
                        {cartItems.map(item=>(
                            <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} width='80' alt={item.image}/>
                                </Col>
                                <Col md={2}>
                                    
                                    <Link to='/'>{item.name}</Link>
                                    
                                </Col>
                                <Col md={2}>
                                    <p>{item.price}</p>
                                </Col>
                                <Col md={3}>
                                   <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                                       {

                                           [...Array(item.countInStock).keys()].map((x)=>
                                              <option key={x+1} value={x+1}>{x+1}</option>

                                           )

                                       }

                                   </Form.Control>
                                </Col>
                                
                                <Col md={1}>
                                    <Button onClick={()=>removeFromCartHandler(item.product)} type='button' variant='light'><i className='fa fa-trash'></i></Button>
                                </Col>

                            </Row>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>
                )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <h2 >Total Price</h2>
                        $({cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)})
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <Button onClick={checkoutHandler} type='button' className='btn-block' disabled={cartItems.length===0}>
                                Complete Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>



    </div>
  )
}

export default CartScreen