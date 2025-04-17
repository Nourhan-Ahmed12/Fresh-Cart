import React, { useEffect, useState } from 'react';
import Style from './CategoriesSlider.module.css';
import Slider from "react-slick";
import axios from 'axios';

export default function CategoriesSlider() {

    var settings = {
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 8,
      slidesToScroll: 1,
      autoplay: true,
    };

    const [categories, setCategories] = useState([])
    function getCategories(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
      setCategories(data.data);
      })
      .catch((error)=>{

      })
    }

    useEffect(()=>{
      getCategories();
    } ,[]);
  return ( <>
  <div>
    <h2 className='text-gray-800 text-2xl text-center mb-3 font-light'>Shop Popular Categories</h2>
    <Slider {...settings}>
      {categories?.map((category)=>
      <div>
        <img className='h-50 w-50 block' src={category.image} alt={category?.name}/>
        <h3>{category.name}</h3>
      </div>
      )}
    </Slider>
  </div>
  </> )
}
