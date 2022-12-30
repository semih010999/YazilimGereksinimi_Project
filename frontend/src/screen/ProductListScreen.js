import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../my.css";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, ListProducts} from "../actions/productListAction";
import { Button, Col, Row, Table } from "react-bootstrap";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { Link } from "react-router-dom";

function ProductListScreen() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const productList = useSelector(state=>state.productList)
    const { loading,error,products} = productList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector(state=>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete

    const productCreate = useSelector(state=>state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct} = productCreate

    useEffect(()=>{

        if(!userInfo){
            history('/login')
        }
        if(successCreate){
            history(`/admin/product/${createProduct._id}/edit`)
        }
        else{
            dispatch(ListProducts())
        }
    },[dispatch,history,userInfo,successDelete,successCreate,createdProduct])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure you want to delete ?'))
        {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () =>{
        dispatch(createProduct())
    }

  return (
    <div>
        <Row>
            <Col md={10}>
                <h2>Products</h2>
            </Col>
            <Col md={2}>
                <Button onClick={createProductHandler}><i className='fas fa-plus'>Add Product</i></Button>
            </Col>
        </Row>
        {loadingDelete && (<Loader/>)}
        {errorDelete && (<Message variant='danger'>{errorDelete}</Message>)}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (<Loader/>): error ? (<Message variant='danger'>{error}</Message>):
        (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>(
                            <tr ky={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Link to={`/admin/product/${product._id}/edit`}><Button><i className='fas fa-edit'></i></Button></Link>
                                    <Button onClick={() => deleteHandler(product._id)}><i className='fas fa-trash'></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )}

    </div>
  )
}

export default ProductListScreen