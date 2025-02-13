import React from 'react'

const ParkSolidIcon = ({ filled, className, strokeColor, ...rest }) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <g clipPath='url(#clip0_154_15363)'>
        <mask
          id='mask0_154_15363'
          style={{ maskType: 'luminance' }}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='16'
          height='16'
        >
          <path
            d='M8.00017 14.6668C8.8758 14.6679 9.74303 14.496 10.552 14.1609C11.361 13.8258 12.0958 13.3341 12.7142 12.7142C13.3341 12.0958 13.8258 11.361 14.1609 10.552C14.496 9.74303 14.6679 8.8758 14.6668 8.00017C14.6679 7.12453 14.496 6.25731 14.1609 5.44833C13.8258 4.63935 13.3341 3.90456 12.7142 3.28617C12.0958 2.66622 11.361 2.17457 10.552 1.83947C9.74303 1.50437 8.8758 1.33242 8.00017 1.3335C7.12453 1.33242 6.25731 1.50437 5.44833 1.83947C4.63935 2.17457 3.90456 2.66622 3.28617 3.28617C2.66622 3.90456 2.17457 4.63935 1.83947 5.44833C1.50437 6.25731 1.33242 7.12453 1.3335 8.00017C1.33242 8.8758 1.50437 9.74303 1.83947 10.552C2.17457 11.361 2.66622 12.0958 3.28617 12.7142C3.90456 13.3341 4.63935 13.8258 5.44833 14.1609C6.25731 14.496 7.12453 14.6679 8.00017 14.6668Z'
            fill='white'
            stroke='white'
            strokeLinejoin='round'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.00033 12.3337C8.22134 12.3337 8.4333 12.2459 8.58958 12.0896C8.74586 11.9333 8.83366 11.7213 8.83366 11.5003C8.83366 11.2793 8.74586 11.0673 8.58958 10.9111C8.4333 10.7548 8.22134 10.667 8.00033 10.667C7.77931 10.667 7.56735 10.7548 7.41107 10.9111C7.25479 11.0673 7.16699 11.2793 7.16699 11.5003C7.16699 11.7213 7.25479 11.9333 7.41107 12.0896C7.56735 12.2459 7.77931 12.3337 8.00033 12.3337Z'
            fill='black'
          />
          <path d='M8 4V9.33333' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
        </mask>
        <g mask='url(#mask0_154_15363)'>
          <path d='M0 0H16V16H0V0Z' fill='#F14646' />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_154_15363'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ParkSolidIcon
