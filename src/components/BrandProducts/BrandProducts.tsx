import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function BrandProducts() {
    const [products, setProducts] = useState(null);
    const [brand, setBrand] = useState(null);
    const { brandName } = useParams();
    const { addProductToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    async function getBrandProducts() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
            const brandProducts = data.data.filter(product => product.brand?.name === brandName);
            
            setProducts(brandProducts);
            
            if (brandProducts.length > 0) {
                setBrand(brandProducts[0].brand);
            }
        } catch (error) {
            toast.error('Failed to load brand products');
            setProducts([]);
        }
    }

    async function addToCart(productId) {
        setCurrentProductId(productId);
        setLoading(true);
        try {
            const response = await addProductToCart(productId);
            toast.success('Product added to cart');
        } catch (error) {
            toast.error('Failed to add product');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBrandProducts();
        window.scrollTo(0, 0);
    }, [brandName]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Helmet>
                <title>{`${brandName} Products`}</title>
            </Helmet>

            {products === null ? (
                <Loading />
            ) : (
                <div className="container mx-auto px-4">
                    {/* Brand Header */}
                    {brand && (
                        <div className="flex flex-col md:flex-row items-center mb-8 bg-white p-6 rounded-lg shadow">
                            <img 
                                src={brand.image} 
                                alt={brand.name}
                                className="w-24 h-24 object-contain mb-4 md:mb-0 md:mr-6"
                            />
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{brand.name}</h1>
                                <p className="text-gray-600 mt-2">
                                    {products.length} {products.length === 1 ? 'product' : 'products'} available
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    {products.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-700">No products found for this brand</h2>
                            <Link 
                                to="/brands" 
                                className="mt-4 inline-block text-green-600 hover:text-green-800"
                            >
                                Back to brands
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div 
                                    key={product._id} 
                                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <Link to={`/productdetails/${product._id}/${product.category.name}`}>
                                        <img 
                                            src={product.imageCover} 
                                            alt={product.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-2 text-gray-800">
                                                {product.title.split(' ').slice(0, 3).join(' ')}
                                            </h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-green-600 font-bold">{product.price} EGP</span>
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
                                            disabled={loading && currentProductId === product._id}
                                            className={`w-full py-2 rounded-lg font-medium ${
                                                loading && currentProductId === product._id
                                                    ? 'bg-gray-300'
                                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                            }`}
                                        >
                                            {loading && currentProductId === product._id ? (
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