import axios from "axios";
import { createContext } from "react";
 
export let CartContext = createContext();

export default function CartContextProvider(props)
{
    let headers = {
        token : localStorage.getItem('userToken'),
    }
    async function getLoggedUserCart()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: headers,
        })
        .then((response)=> response )
        .catch((error)=> error )
    }

    async function addProductToCart(productId)
    {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            productId: productId,
        } ,{
            headers: headers,
        }).then((response)=> response)
        .catch((error)=> error)
    }

    async function updateCartCount(productId , count)
    {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count: count,
        } ,{
            headers: headers,
        }).then((response)=> response)
        .catch((error)=> error)
    }
    async function deleteProductItem(productId)
    {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            headers: headers,
        }).then((response)=> response)
        .catch((error)=> error)
    }
    return ( <CartContext.Provider value={ { getLoggedUserCart , addProductToCart , updateCartCount , deleteProductItem } }>
        {props.children}
    </CartContext.Provider>
    )
}