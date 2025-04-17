import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  let {setUserLogin} = useContext(UserContext);

  let navigate = useNavigate();
  let yupObject = Yup.object().shape({
    email: Yup.string().email('email is invalid').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with uppercase then lowwercase').required('password is required'),
  })

  const [apiError,setApiError] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  function handleLogin(formValues)
  { 
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
    .then((apiResponse) => {
      localStorage.setItem('userToken', apiResponse.data.token);
      setUserLogin(apiResponse.data.token)
      navigate('/');
      setIsLoading(false);
      console.log(apiResponse);
    })
    .catch((apiResponse) => { 
      setIsLoading(false);
      setApiError(apiResponse?.response?.data?.message);
      // console.log(apiResponse?.response?.data?.message);
    })
    console.log(formValues);
  } 

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema: yupObject,
    onSubmit:handleLogin
  });

  return ( <>
  
  <div className='px-5 py-10 max-w-xl mx-auto'>
    <div className='pt-5'>
      {apiError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div> : null}
      <h2 className='text-3xl font-bold text-green-600 mb-6'>Login Now</h2>
      
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
            <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address</label>
        </div>
        {formik.errors.email && formik.touched.email ?
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>:null}
        <div className="relative z-0 w-full mb-5 group">
            <input id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
        </div>
        {formik.errors.password && formik.touched.password ?
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div>:null}
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Login'} </button>
          <p className="text-center text-sm mt-2">Don't have an account? <span className="text-green-600 hover:text-green-800"><Link to={'/register'}>Register Now</Link></span></p>
      </form>
    </div>
  </div>
    
  </> )
}
