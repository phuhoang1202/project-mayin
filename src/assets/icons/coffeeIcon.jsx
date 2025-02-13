import React from 'react'

const CoffeeIcon = ({ className, ...rest }) => {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path
        d='M5.23203 11.4C5.23203 10.5599 5.23203 10.1399 5.39552 9.81901C5.53933 9.53677 5.7688 9.3073 6.05104 9.16349C6.37191 9 6.79195 9 7.63203 9H18.582C19.4221 9 19.8421 9 20.163 9.16349C20.4453 9.3073 20.6747 9.53677 20.8185 9.81901C20.982 10.1399 20.982 10.5599 20.982 11.4V22.2C20.982 23.8802 20.982 24.7202 20.655 25.362C20.3674 25.9265 19.9085 26.3854 19.344 26.673C18.7023 27 17.8622 27 16.182 27H10.032C8.35187 27 7.51179 27 6.87005 26.673C6.30557 26.3854 5.84663 25.9265 5.55901 25.362C5.23203 24.7202 5.23203 23.8802 5.23203 22.2V11.4Z'
        stroke='#333333'
        strokeWidth='1.68'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.982 14.25C21.732 14.125 23.1309 13.7234 23.982 15C24.732 16.125 24.7805 18.0664 24.357 19.125C23.607 21 21.607 21.25 20.982 21.75'
        stroke='#333333'
        strokeWidth='1.68'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.2222 6.00001C11.2222 6.00001 11.3266 5.73547 11.3773 5.55556C11.6984 4.41772 10.7461 3.58229 11.0671 2.44445C11.1179 2.26454 11.2222 2 11.2222 2'
        stroke='#333333'
        strokeWidth='1.68'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.2222 6.00001C15.2222 6.00001 15.3266 5.73547 15.3773 5.55556C15.6984 4.41772 14.7461 3.58229 15.0671 2.44445C15.1179 2.26454 15.2222 2 15.2222 2'
        stroke='#333333'
        strokeWidth='1.68'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default CoffeeIcon
