import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LogoFortune from '@assets/images/panter/fortuneLogo.jpg'
import LogoJHF from '@assets/images/panter/jhfLogo.jpg'
import LogoYuehongLaser from '@assets/images/panter/yuehongLaser.avif'

export default function Partner() {
  const partner = [
    {
      id: 1,
      image: LogoFortune,
    },
    {
      id: 2,
      image: LogoJHF,
    },
    {
      id: 3,
      image: LogoYuehongLaser,
    },
    {
      id: 4,
      image: LogoFortune,
    },
    {
      id: 5,
      image: LogoJHF,
    },
    {
      id: 6,
      image: LogoYuehongLaser,
    },
    {
      id: 7,
      image: LogoFortune,
    },
    {
      id: 8,
      image: LogoJHF,
    },
    {
      id: 9,
      image: LogoYuehongLaser,
    },
  ]

  const settings1 = {
    // dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: false,
    cssEase: 'linear',
  }

  const settings2 = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
  }
  return (
    <div className='container wow fadeInUp lg:max-w-7xl mx-auto lg:px-0 px-4 w-full mt-4' data-wow-delay='.1s'>
      <div>
        <h2 className='font-bold lg:text-bigPrdName text-largerPrdName text-[#3B3B3B] text-center capitalize'>
          Đối tác của chúng tôi
        </h2>
        <div className='flex justify-center'>
          <span className='inline-block h-[2px] w-32 bg-[#F14646] mb-6 ' />
        </div>

        <div className='flex justify-center mt-4'>
          <span className='inline-block h-[2px] w-40 bg-primary' />
        </div>
        <div className='slider-container'>
          <Slider {...settings1}>
            {partner.map((product, index) => {
              return (
                <div key={index}>
                  <div className='h-18 w-28'>
                    <img src={product.image} alt='image' className='h-full w-full object-cover' />
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>

      {/* <div>
        <h2 className='relative pb-5 text-center text-2xl uppercase font-semibold text-dark dark:text-white sm:text-[36px]'>
          Chứng nhận
        </h2>
        <div className='flex justify-center mb-10'>
          <span className='inline-block h-[2px] w-40 bg-primary' />
        </div>
        <div className='slider-container mt-7'>
          <Slider {...settings2}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>
      </div> */}
    </div>
  )
}
