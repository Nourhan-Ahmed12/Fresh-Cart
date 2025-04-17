import React from 'react'
import notFound from '../../assets/images/404-error.jpg'
export default function Error404() {
  return (
    <>
      <img src={notFound} className='mx-auto' width={500} alt="notFound" />
    </>
  )
}
