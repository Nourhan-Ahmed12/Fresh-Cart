import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BrandsComp from '../BrandsComp/BrandsComp';
import Loading from '../Loading/Loading';

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getBrands() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
            setBrands(data.data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Brands</h1>
            <div className="grid grid-cols-12 gap-4">
                {brands.map((brand) => (
                    <BrandsComp key={brand._id} brand={brand} />
                ))}
            </div>
        </div>
    );
}