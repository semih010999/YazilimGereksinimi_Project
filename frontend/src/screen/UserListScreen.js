import React,{useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import{useDispatch,useSelector} from 'react-redux'
import{Button, Table} from 'react-bootstrap'
import {deleteUser, listUsers} from '../actions/userAction'
import Loader from '../component/Loader'
import Message from '../component/Message'

function UserListScreen() {

  const dispatch = useDispatch()
  const history = useNavigate()

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const userList = useSelector(state=>state.userList)
  const {loading,users,error} = userList

  const userDelete = useSelector(state=>state.userDelete)
  const {success:successDelete} = userDelete

  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
      dispatch(listUsers())
    }
    else{
      history('/login')
    }

  },[dispatch,history,userInfo,successDelete])

  const deleteHandler = (id) =>{
    if(window.confirm('Are you sure you want to delete ?')){
      dispatch(deleteUser(id))
    }
  }
  
  return (
    <div>
      <h2>Users</h2>
      {loading ? (<Loader/>)
      :error ? (<Message variant='danger'>{error}</Message>)
      :
      (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? (<i className='fas f-check' style={{color:'green'}}></i>):
              (<i className='fas f-check' style={{color:'red'}}></i>)
              }</td>
              <td>
                <Button onClick={()=>deleteHandler(user._id)}><i className='fas fa-trash'></i></Button>
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

export default UserListScreen