import React from 'react'
 import {RiSendPlane2Line, RiMedalLine } from '@remixicon/react'
import { useApp } from './AppContext'

const Footer = ()=>{
    const context = useApp();
    const colorPalette = context.colorPalette;

    return <div className='flex flex-row flex-wrap justify-between pl-4 pr-4 pb-4 pt-4' style={{background:colorPalette.background.secondary}}>
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold'>AQUA</h1>
                <p className='max-w-sm'>Elevating the everyday through a curated collections of 
                   mermaidcore essentials and oceanic treasures.</p>
                <div className='flex flex-row mt-4 gap-3' style={{color:colorPalette.text.header}}>
                    < RiMedalLine  />
                    <h1>RETWEET</h1>
                    <h1>@</h1>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold'>COMPANY</h1>
                <p className='text-gray-400 text-[14px]'>ABOUT</p>
                <p className='text-gray-400 text-[14px]'>CONTACT</p>
                <p className='text-gray-400 text-[14px]'>SOCIALS</p>
                <p className='text-gray-400 text-[14px]'>CAREERS</p>

            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold'>SUPPORT</h1>
                <p className='text-gray-400 text-[14px]'>SHIPPING INFO</p>
                <p className='text-gray-400 text-[14px]'>FAQ</p>
                <p className='text-gray-400 text-[14px]'>RETURNS</p>
                <p className='text-gray-400 text-[14px]'>ORDER TRACKING</p>

            </div>
            <div className='flex flex-col gap-2 max-w-sm'>
                <h1 className='font-bold'>SUBSCRIBE</h1>
                <p className='text-gray-400'>Join our mailing list for exclusive siren drops and oceanic inspiration</p>
                <div className='flex flex-row'>
                    <input className='border-2 border-gray-300 w-[230px] p-2' type="text" placeholder='Email Address'/>
                    <div className='p-2 hover:cursor-pointer' style={{background:colorPalette.text.header,color:'white'}}>
                        < RiSendPlane2Line  />
                    </div>
                </div>

            </div>
        </div>
  
}
export default Footer