import React, { useEffect} from 'react'
import {Col, ListGroup, Row,Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Message from '../component/Message';
import { Link } from 'react-router-dom'
import {getOrderDetails } from '../actions/orderAction'
import { useParams } from 'react-router-dom'
import Loader from '../component/Loader'
import { ORDER_DELIVER_RESET } from '../constans/orderConstans';

function OrderScreen() {

  const {id} = useParams()
  const dispatch = useDispatch()
  const history = useNavigate()

  const orderDetails = useSelector(state=>state.orderDetails)
  const {order,error,loading} = orderDetails

  const userLogin = useSelector(state=>state.userLogin)
  const{userInfo} = userLogin

  const orderDeliver = useSelector(state=>state.orderDeliver)
  const{loading:loadingDeliver,success:successDeliver} = orderDeliver

  if (!loading && !error)
  {
    order.ItemsPrice = order.orderItems.reduce((acc,item)=>acc+item.price*item.qty, 0).toFixed(2)
  }

  const deliverHandler = () =>
  {
    dispatch(deliverHandler(order))
  }

  useEffect(()=>{
    if(!userInfo){
      history('/login')
    }
    if(!order || order._id !== Number(id) || successDeliver){
      dispatch({type:ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(id))
    }
  },[dispatch,order,id,successDeliver,history,userInfo])


  return loading? (<Loader/>) : error?(<Message variant='danger'>{error}</Message>):(
    <div>
      <Message variant='success'>Your order has been received</Message>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Personal Info</h3>
              <p><strong>Name Surname :  </strong>{order.user.name}</p>
              <p><strong>Email :  </strong>{order.user.email}</p>
              <h3>Address Info</h3>
              <p><strong>Address :  </strong>{order.shippingAddress.address}{order.shippingAddress.city}{order.shippingAddress.postalCode}{order.shippingAddress.country}</p>
              <p><strong> :  </strong>{order.user.email}</p>
            </ListGroup.Item>
            <ListGroup.Item>    
                        {order.orderItems.length ===0 ? <Message variant='warning'>Order is Empty</Message>:
                        (
                            <ListGroup variant='flush'>
                                {order.cartItems.map((item,index)=>(
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
                {loadingDeliver && <Loader/>}
                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}>
                        Complete Order
                    </Button>
                  </ListGroup.Item>
                )}
        </Col>
      </Row>
    </div>
  )
}

export default OrderScreen