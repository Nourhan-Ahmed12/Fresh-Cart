import React from 'react'
import Style from './Products.module.css'
import { useQuery } from '@tanstack/react-query'
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';

export default function Products() {
  
  let {data , isError , error , isLoading } = useProducts();
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
      {data?.data.data.map((product)=> <div key={product.id} className="md:w-1/6 p-2 flex justify-center items-center sm:w-1/3">
          <div className="product py-4">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img className='w-full' src={product.imageCover} alt={product.title}/>
              <span className="block font-light text-green-600">{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
              <div className='flex justify-between'>
                <span>{product.price} Egp</span>
                <span>{product.ratingsAverage}<i className='mb-1 fas fa-star text-yellow-300'></i></span>
              </div>
              <button className="btn">Add to Cart</button>
            </Link>
          </div>
        </div>
      )}
    </div>
    </> )
}

   
