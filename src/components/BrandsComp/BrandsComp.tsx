import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function BrandsComp({ brand }) {
  return (
    <>
      {brand ? (
        <Link 
          to={`/brand/${brand.name}`} 
          className='col-span-6 md:col-span-4 lg:col-span-3 shadow-lg border-[1.5px] border-[--main-color] rounded-md overflow-hidden hover:scale-105 transition-transform'
        >
          <img 
            src={brand.image} 
            className='w-full object-cover h-[121px]' 
            alt={brand.name} 
          />
          <div className='flex justify-center items-center p-4'>
            <h2 className='font-bold text-xl text-[--main-color]'>{brand.name}</h2>
          </div>
        </Link>
      ) : (
        <Loading />
      )}
    </>
  );
}