import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    let {id , category} = useParams();
    let { addProductToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [currentProductID, setCurrentProductID] = useState(0);

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    async function addProduct(productId) {
      setCurrentProductID(productId);
      setLoading(true);
      let response = await addProductToCart(productId);
      if(response.data.status === 'success') {
        setLoading(false);
        toast.success(response.data.message, {
          duration: 1000,
        });
      } else {
        setLoading(false);
        toast.error(response.data.message, {
          duration: 1000,
        });
      }
    }

    function getProductDetails(id) {
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({data})=>{
          setProductDetails(data.data);
      })
      .catch(()=>{});
    }

    function getRelatedProducts(category) {
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data})=>{
          let allProducts = data.data;
          let related = allProducts.filter((product)=> product.category.name == category);
          setRelatedProducts(related); 
      })
      .catch(()=>{});
    }

    useEffect(() => {
      getProductDetails(id);
      getRelatedProducts(category);
    }, [id, category]);
      
  return ( <>
    <div className="row">
        <div className="w-2/4 lg:w-1/4 p-2">
          <Slider {...settings}>
            {productDetails?.images.map((src, index) => 
              <img key={index} className='w-full' src={src} alt={productDetails?.title}/>
            )}
          </Slider>
        </div>
        <div className='w-2/4 lg:w-3/4'>
          <h1 className='text-lg font-normal text-gray-950'>{productDetails?.title}</h1>
          <p className='text-gray-600 font-light mt-4'>{productDetails?.description}</p>
          <div className='flex my-4 justify-between'>
            <span>{productDetails?.price} Egp</span>
            <span>{productDetails?.ratingsAverage}<i className='mb-1 fas fa-star text-yellow-300'></i></span>
          </div>
          <button 
            onClick={() => addProduct(productDetails?.id)} 
            className="btn"
            disabled={loading && currentProductID === productDetails?.id}
          >
            {loading && currentProductID === productDetails?.id ? 
              <i className='fas fa-spinner fa-spin'></i> : 'Add to Cart'}
          </button>
        </div>
    </div>
    <div className="row">
      {relatedProducts.map((product)=>  
      <div key={product.id} className='w-1/2 lg:w-1/4'>
        <div className="product py-4 m-2">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img className='w-full' src={product.imageCover} alt={product.title}/>
              <span className="block font-light text-green-600">{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
              <div className='flex justify-between'>
                <span>{product.price} Egp</span>
                <span>{product.ratingsAverage}<i className='mb-1 fas fa-star text-yellow-300'></i></span>
              </div>
            </Link>
            <button 
              onClick={() => addProduct(product.id)} 
              className="btn"
              disabled={loading && currentProductID === product.id}
            >
              {loading && currentProductID === product.id ? 
                <i className='fas fa-spinner fa-spin'></i> : 'Add to Cart'}
            </button>
          </div>
        </div>
      )}
    </div>
  </> )
}