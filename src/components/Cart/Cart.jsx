import React, { useEffect, useState, useContext } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Cart() { 
  let { getLoggedUserCart, updateCartCount, deleteProductItem } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState({
    update: false,
    delete: false,
    productId: null
  });

  async function getCartItems() {
    try {
      let response = await getLoggedUserCart();
      setCartDetails(response.data.data);
    } catch (error) {
      toast.error('Failed to load cart items');
    }
  }

  async function updateCartItemCount(productId, count) {
    if (count < 1) return; 
    
    setLoading({ update: true, delete: false, productId });
    try {
      let response = await updateCartCount(productId, count);
      setCartDetails(response.data.data);
      toast.success('Cart updated successfully');
    } catch (error) {
      toast.error('Failed to update cart');
    } finally {
      setLoading({ update: false, delete: false, productId: null });
    }
  }

  async function deleteCartItem(productId) {
    setLoading({ update: false, delete: true, productId });
    try {
      let response = await deleteProductItem(productId);
      setCartDetails(response.data.data);
      toast.success('Product removed from cart');
    } catch (error) {
      toast.error('Failed to remove product');
    } finally {
      setLoading({ update: false, delete: false, productId: null });
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <h2 className="text-2xl text-center font-bold text-green-600 my-4">Shopping Cart</h2>
      {cartDetails?.products.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold">Your cart is empty</h3>
          <p>Start shopping to add items to your cart</p>
        </div>
      ) : (
        <div className="container relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.products.map((product) => (
                <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateCartItemCount(product.product.id, product.count - 1)}
                        disabled={loading.update && loading.productId === product.product.id}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                        type="button"
                      >
                        {loading.update && loading.productId === product.product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                          </svg>
                        )}
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button 
                        onClick={() => updateCartItemCount(product.product.id, product.count + 1)}
                        disabled={loading.update && loading.productId === product.product.id}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                        type="button"
                      >
                        {loading.update && loading.productId === product.product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <span>{product.price} EGP</span>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      onClick={() => deleteCartItem(product.product.id)}
                      className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      {loading.delete && loading.productId === product.product.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : 'Remove'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-xl text-center font-bold text-green-600 my-2">
            Total Cart Price: <span className="text-black font-medium">{cartDetails?.totalCartPrice} EGP</span>
          </h3>
        </div>
      )}
    </>
  );
}