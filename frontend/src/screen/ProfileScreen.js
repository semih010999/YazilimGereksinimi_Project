import { Button,Col,Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Loader from '../component/Loader';
import Message from '../component/Message';
import {LinkContainer} from 'react-router-bootstrap'

function ProfileScreen() {

    const orderListMy = useSelector(state=>state.orderListMy)
    const {orders,error:errorOrders,loading:loadingOrders} = orderListMy


  return (
    <div>
        <Row>
            <Col md={8}>
                <h2>My Orders</h2>
                {loadingOrders ? (<Loader/>):
                errorOrders ? (<Message variant='danger'>{errorOrders}</Message>):
                (
                    <Table striped responsive className='table-sm'> 
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total Price</th>
                                <th>Payment</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <th>{order._id}</th>
                                    <th>{order.createAt}</th>
                                    <th>{order.TotalPrice}</th>
                                    <th>{order._isPaid ? order.paidAt : (<i className='fa fa-times' style={{color : 'blue'}}></i>)}</th>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button>Details</Button>
                                        
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
                }

            </Col>
        </Row>
    </div>
  )
}

export default ProfileScreen