import React, { useContext, useState } from 'react'
import Style from './RecentProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ClimbingBoxLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


export default function RecentProducts() {

  let {addProductToCart} = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [currentProductID, setCurrentProductID] = useState(0)

  async function addProduct(productId)
  {
    setCurrentProductID(productId)
    setLoading(true);
    let response = await addProductToCart(productId);
    if(response.data.status === 'success')
    {
      setLoading(false);
      toast.success(response.data.message, {
        duration: 1000,
      });
    }
    else
    {
      setLoading(false);
      toast.error(response.data.message, {
        duration: 1000,
      });
    }
  }


  function getRecentProducts()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
 let {data , isError , error , isLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecentProducts,
    select:(data)=>data.data.data,
  });
  if(isLoading)
  {
    return <div className="py-8 w-full flex justify-center">
      <ClimbingBoxLoader color='green'/>
    </div>
  }
  if(isError)
  {
    return <div className="py-8 w-full flex justify-center">
      <h3>{error}</h3>
    </div>
  }
    
  return ( <>
    <div className="row">
      {data.map((product)=> <div key={product.id} className="md:w-1/6 p-2 flex justify-center items-center sm:w-1/3">
          <div className="product py-4">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img className='w-full' src={product.imageCover} alt={product.title}/>
              <span className="block font-light text-green-600">{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
              <div className='flex justify-between'>
                <span>{product.price} Egp</span>
                <span>{product.ratingsAverage}<i className='mb-1 fas fa-star text-yellow-300'></i></span>
              </div>
            </Link>
            <button onClick={() => addProduct(product.id)} className="btn">
              {currentProductID === product.id && loading? <i className='fas fa-spinner fa-spin'></i> :'Add to Cart'}
            </button>
          </div>
        </div>
      )}
    </div>
    </> )
}
