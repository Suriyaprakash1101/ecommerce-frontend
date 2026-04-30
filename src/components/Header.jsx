import React from 'react'
import Navbar from './Navbar'
import { useApp } from './AppContext'
import { RiUserLine } from '@remixicon/react'
import { Link, Links } from 'react-router-dom'
import SignUp from './SignUp'
import {RiSearchLine} from '@remixicon/react'

const Header = () => {
    const context = useApp();
    const color = context.colorPalette;
    const isLoggedIn = context.isLoggedIn;
    
    

    return (
        <div className='flex flex-row justify-between items-center mt-5 px-4'>
           
            <div className='flex flex-row gap-8 ml-3 items-center'>
                <p className='font-bold text-xl' style={{ color: color.brand.primary }}>
                    AQUA
                </p>
                <Navbar />
            </div>
            
           
            <div className='flex flex-row gap-4 items-center'>
                <div className='flex flex-row gap-2 border-2 border-gray-200 pl-2 pt-1.5 pb-1.5 rounded-md focus:outline-none focus:border-brand-primary outline-0'>
                    <label htmlFor="searchOption" className='text-gray-400'>< RiSearchLine  /></label>
                <input 
                    id='searchOption'
                    className='outline-0'
                    style={{ 
                        borderColor: color.accent,
                        width: '200px'
                    }}
                    type="text" 
                    placeholder='Search treasures...' 
                />
                </div>
                
                
                {!isLoggedIn ? (
                    <div className='flex flex-row gap-2'>
                        <Link 
                            className='px-3 py-1 rounded-md hover:opacity-80 transition'
                            style={{ color: color.text.secondary }}
                            to='/login'
                        >
                            Login
                        </Link>
                        <Link 
                            className='px-3 py-1 rounded-md transition hover:opacity-90'
                            style={{ 
                                color: 'white', 
                                backgroundColor: color.brand.primary 
                            }}

                            to='/signup'
                           
                        >
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <div className='flex items-center gap-2'>
                        <RiUserLine 
                            style={{ color: color.brand.primary }}
                            className='cursor-pointer hover:opacity-80'
                            size={24}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header