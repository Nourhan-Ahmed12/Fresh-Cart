import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';

export default function CategoryProducts() {
    const [products, setProducts] = useState(null);
    const [category, setCategory] = useState(null);
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { addProductToCart } = useContext(CartContext);
    const [loading, setLoading] = useState({
        addToCart: false,
        productId: null
    });

    async function getCategoryProducts() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
            setProducts(data.data);
            if (!category) {
                const categoryName = searchParams.get('name');
                if (categoryName) {
                    setCategory({
                        _id: id,
                        name: categoryName,
                        image: data.data[0]?.category?.image || ''
                    });
                }
            }
        } catch (error) {
            toast.error('Failed to load category products');
            setProducts([]);
        }
    }

    async function addToCart(productId) {
        setLoading({ addToCart: true, productId });
        try {
            const response = await addProductToCart(productId);
            toast.success('Product added to cart!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading({ addToCart: false, productId: null });
        }
    }

    useEffect(() => {
        getCategoryProducts();
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Helmet>
                <title>{category?.name || 'Category'} Products</title>
            </Helmet>

            {products === null ? (
                <Loading />
            ) : (
                <div className="container mx-auto px-4">
                    {/* Category Header */}
                    {category && (
                        <div className="flex flex-col md:flex-row items-center mb-8 bg-white p-6 rounded-lg shadow-md">
                            {category.image && (
                                <img 
                                    src={category.image} 
                                    alt={category.name}
                                    className="w-24 h-24 object-contain mb-4 md:mb-0 md:mr-6"
                                />
                            )}
                            <div className="text-center md:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    {category.name}
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    {products.length} {products.length === 1 ? 'product' : 'products'} available
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    {products.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-700">
                                No products found in this category
                            </h2>
                            <Link 
                                to="/categories" 
                                className="mt-4 inline-block text-green-600 hover:text-green-800 font-medium"
                            >
                                Browse all categories
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div 
                                    key={product._id} 
                                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                                >
                                    <Link to={`/productdetails/${product._id}/${product.category.name}`}>
                                        <img 
                                            src={product.imageCover} 
                                            alt={product.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                                                {product.title}
                                            </h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-green-600 font-bold">
                                                    {product.price} EGP
                                                </span>
                                                <span className="flex items-center">
                                                    {product.ratingsAverage}
                                                    <i className="fas fa-star text-yellow-400 ml-1"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="px-4 pb-4">
                                        <button
                                            onClick={() => addToCart(product._id)}
                                            disabled={loading.addToCart && loading.productId === product._id}
                                            className={`w-full py-2 rounded-lg font-medium transition-colors ${
                                                loading.addToCart && loading.productId === product._id
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                            }`}
                                        >
                                            {loading.addToCart && loading.productId === product._id ? (
                                                <i className="fas fa-spinner fa-spin"></i>
                                            ) : (
                                                'Add to Cart'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}