import React,{useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import{useDispatch,useSelector} from 'react-redux'
import{Button, Table} from 'react-bootstrap'
import {listOrders} from '../actions/orderAction'
import Loader from '../component/Loader'
import Message from '../component/Message'
import {LinkContainer} from 'react-router-bootstrap'

function OrderListScreen() {

    const dispatch = useDispatch()
    const history = useNavigate()
    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const orderList = useSelector(state=>state.orderList)
    const{loading,orders,error} = orderList

    useEffect(()=>{
        if (userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }
        else{
            history('/login')
        }
    },[dispatch,history,userInfo])

  return (
    <div>
        <h2>Orders</h2>
        {loading ? (<Loader/>)
        :error ? (<Message variant='danger'>{error}</Message>)
        :
        (
            <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Total Price</th>
                    <th>Pay</th>
                    <th>Durum</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.TotalPrice}</td>
                    <td>{order.paidAt ? (<i className='fas f-check' style={{color:'green'}}></i>):
                    (<i className='fas f-check' style={{color:'red'}}></i>)
                    }</td>
                    <td>{order.isDelivered ? (<i className='fas f-check' style={{color:'green'}}></i>):
                    (<i className='fas f-check' style={{color:'red'}}></i>)
                    }</td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}><Button><i className='fas fa-edit'></i></Button></LinkContainer>
                    </td>

                </tr>
                ))}
            </tbody>

            </Table>
        )
        }
    </div>
  )
}

export default OrderListScreen