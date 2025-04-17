import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getCategories() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="container py-8 mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Shop by Categories</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                    <Link 
                        key={category._id}
                        to={`/category/${category._id}?name=${encodeURIComponent(category.name)}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow text-center"
                    >
                        <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                            <h3 className="font-medium text-gray-800">{category.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}