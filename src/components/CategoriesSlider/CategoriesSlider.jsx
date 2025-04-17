import { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesSlider() {
    const [categories, setCategories] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    async function getCategories() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="container mx-auto px-4 my-8">
            <h2 className='text-2xl text-center mb-6 font-semibold text-gray-800'>
                Shop Popular Categories
            </h2>
            
            <Slider {...settings}>
                {categories.map((category) => (
                    <div key={category._id} className="px-2">
                        <Link 
                            to={`/category/${category._id}?name=${encodeURIComponent(category.name)}`}
                            className="block text-center hover:scale-105 transition-transform"
                        >
                            <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg">
                                <img 
                                    src={category.image} 
                                    alt={category.name}
                                    className="w-full h-32 object-contain mx-auto mb-3"
                                />
                                <h3 className="text-sm font-medium text-gray-700 truncate">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}