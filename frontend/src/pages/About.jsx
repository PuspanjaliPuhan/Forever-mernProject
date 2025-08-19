import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
       <div className='text-2xl text-center pt-8 border-t'>
         <Title text1={'ABOUT '} text2={'US'}/>
       </div>
       <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
             <p>Forever was born out of a passion for innovation and s desire to revolutionize the way people shop online.our journy began with simple idea to provide platform ehere customers can easily discover,explore,and purchase a wide range of production from the comfort of their homes.</p>
             <p>Since our inception we have worked firelessly to curate a diverse selection of high-quality products that cater to every tasteand preference .From fashion and beauty to electronics and home essentials,we offer an extensive collection sourced from trusted brand and suppliers.</p>
             <b className='text-gray-800'>Our Mission</b>
             <p>Our mission at Forever is to empower customers with choice convinience and confidence . We're dedicated to providing a sameless shopping experience that exceeds expectations,from browsing and ordering to delivery and beyond.</p>
          </div>
       </div>
       <div className='text-xl py-4'>
         <Title text1={'WHY '} text2={'CHOOSE US'}/>
       </div>

       <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py:20 flex flex-col gap-5'>
             <b>Quality Assurance:</b>
             <p className='text-gray-600'>We meticulosly selecet and vet each product to ensure it meets our stringent quality standards</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py:20 flex flex-col gap-5'>
             <b>Convinience:</b>
             <p className='text-gray-600'>With our user-Friendly interface and hassle-free ordering process ,shoping has never been easier</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py:20 flex flex-col gap-5'>
             <b>Exceptional Customer Sercice:</b>
             <p className='text-gray-600'> Our team dedicated proffessionals is here to assist you the way ensuring your satisfaction is our top priority</p>
          </div>
       </div>

       <NewsletterBox/>
    </div>
  )
}

export default About