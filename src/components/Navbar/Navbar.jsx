import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Style from './Navbar.module.css';

export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);

  function logOut() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/login');
  }

  return (
    <nav className='bg-gray-100 lg:fixed top-0 left-0 right-0 py-2 px-10 text-center items-center z-10'>
      <div className="container justify-between mx-auto flex flex-col lg:flex-row items-center">
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex items-center'>
            <i className="fa-solid fa-cart-shopping text-green-600 text-2xl"></i>
            <h1 className='font-bold text-2xl'>FreshCart</h1>
          </div>
          <ul className='flex flex-col lg:flex-row'>
            {userLogin !== null && (
              <>
                <li className='py-2'>
                  <NavLink 
                    to='/' 
                    className={({ isActive }) => 
                      `mx-2 text-lg font-light ${isActive ? 'text-green-600 font-medium' : 'text-slate-900'}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className='py-2'>
                  <NavLink 
                    to='brands' 
                    className={({ isActive }) => 
                      `mx-2 text-lg font-light ${isActive ? 'text-green-600 font-medium' : 'text-slate-900'}`
                    }
                  >
                    Brands
                  </NavLink>
                </li>
                <li className='py-2'>
                  <NavLink 
                    to='categories' 
                    className={({ isActive }) => 
                      `mx-2 text-lg font-light ${isActive ? 'text-green-600 font-medium' : 'text-slate-900'}`
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li className='py-2'>
                  <NavLink 
                    to='products' 
                    className={({ isActive }) => 
                      `mx-2 text-lg font-light ${isActive ? 'text-green-600 font-medium' : 'text-slate-900'}`
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li className='py-2'>
                  <NavLink 
                    to='cart' 
                    className={({ isActive }) => 
                      `mx-2 text-lg font-light ${isActive ? 'text-green-600 font-medium' : 'text-slate-900'}`
                    }
                  >
                    Cart
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        
        <div className='flex flex-col lg:flex-row items-center'>
          <ul className='flex flex-col lg:flex-row'>
            {userLogin === null ? (
              <>
                <li className='py-2'>
                  <NavLink 
                    to='login' 
                    className={({ isActive }) => 
                      `mx-2 text-lg font-light ${isActive ? 'text-green-600 font-medium' : 'text-slate-900'}`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li className='py-2'>
                  <NavLink 
                    to='register' 
                    className={({ isActive }) => 
                      `mx-2 text-lg font-light ${isActive ? 'text-green-600 font-medium' : 'text-slate-900'}`
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li className='py-2'>
                <span 
                  onClick={logOut} 
                  className='mx-2 text-lg text-slate-900 font-light cursor-pointer hover:text-green-600'
                >
                  Logout
                </span>
              </li>
            )}
            <li className='flex items-center py-2 text-lg cursor-pointer'> 
              <i className='fab mx-2 fa-facebook hover:text-green-600'></i>
              <i className='fab mx-2 fa-twitter hover:text-green-600'></i>
              <i className='fab mx-2 fa-instagram hover:text-green-600'></i>
              <i className='fab mx-2 fa-youtube hover:text-green-600'></i>
              <i className='fab mx-2 fa-tiktok hover:text-green-600'></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}