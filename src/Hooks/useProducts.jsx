import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProducts() {
    function getRecentProducts()
        {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        }
        let responseObject = useQuery({
            queryKey: ['recentProducts'],
            queryFn: getRecentProducts,
            staleTime: 80000,
        });
  return responseObject;
}
