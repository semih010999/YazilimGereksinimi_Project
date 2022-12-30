import React,{useEffect,useState} from 'react'
import { useNavigate,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button, FormLabel} from 'react-bootstrap'
import Message from '../component/Message'
import FormContainer from '../component/FormContainer'
import {PRODUCT_UPDATE_RESET} from '../constans/productConstans'
import {ListProductsDetails, updateProduct} from '../actions/productListAction'
import Loader from '../component/Loader'
import {Link} from 'react-router-dom'


function ProductEditScreen() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useNavigate()

    const[price,setPrice] = useState(0)
    const[countInStock,setCountInStock] = useState(0)
    const[description,setDescription] = useState('')

    const productDetails = useSelector(state=>state.productDetails)
    const{error,loading,product} = productDetails

    const productUpdate = useSelector(state=>state.productUpdate)
    const{error:errorUpdate,loading:loadingUpdate,success:successUpdate} = productUpdate

    useEffect(()=>{
        if(successUpdate){
        dispatch({type:PRODUCT_UPDATE_RESET})
        history('/admin/productlist')
        }
        else {
            if(!product.name || product._id !== Number(id)){
                dispatch(ListProductsDetails(id))
            }
            else{
                setPrice(product.price)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }
    },[dispatch,product,history,id,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({_id:id,price,countInStock,description}))
    }


    return (
        <div>
        <Link to='/admin/productlist'>Back</Link>
        <FormContainer>
            <h2>{product.name} Edit</h2>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='price'>
                        <FormLabel>Price</FormLabel>
                        <Form.Control
                        required
                        type='number'
                        placeholder='Price'
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                        <FormLabel>Stock</FormLabel>
                        <Form.Control
                        required
                        type='text'
                        placeholder='Stock'
                        value={countInStock}
                        onChange={(e)=>setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <FormLabel>Description</FormLabel>
                        <Form.Control
                        required
                        type='text'
                        placeholder='Description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    <Button type='submit' variant='warning'>Update</Button>
                </Form>
            )}
        </FormContainer>
    </div>
  )
}

export default ProductEditScreen