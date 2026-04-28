import React from 'react'
import { NavLink } from 'react-router-dom'  
import { useApp } from './AppContext'

const Navbar = () => {
    const context = useApp();
    const colorPalette = context.colorPalette;
    
    const activeLinkStyle = ({ isActive }) => {
        return {
            color: isActive ? colorPalette.brand.primary : 'black',
            borderBottom: isActive ? `2px solid ${colorPalette.brand.primary}` : 'none',  // ← Use borderBottom
          
            textDecoration: 'none'
        }
    }
    
    return(
        <div className='flex flex-row gap-4'>
            <NavLink style={activeLinkStyle} to='/'>Home</NavLink>  {/* ← Change to NavLink */}
            <NavLink style={activeLinkStyle} to='/product'>Product</NavLink>
            <NavLink style={activeLinkStyle} to='/about'>About</NavLink>
        </div>
    )
}

export default Navbar