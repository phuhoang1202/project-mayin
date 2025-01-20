import React from 'react'
import IconBell from '@assets/images/IconBell.svg'

export default function NewsPage() {
  return (
    <div className='mx-auto max-w-7xl mt-24'>
      <div className='bg-[#F8F8F8] p-4'>
        <div className='flex flex-col gap-1 justify-center items-center border-b pb-4'>
          <img src={IconBell} alt='icon' className='h-11 w-11' />
          <p className='font-medium text-[#AFAEAE] text-small'>공지사항</p>
          <h1 className='font-bold text-largerPrdName'>TYC마켓 이용방법 및 유의사항</h1>

          <div className='mt-4 flex flex-col gap-1 items-center font-medium text-small'>
            <div>TYC마켓의 전산 개발이 거의 막바지에 이르렀습니다.</div>
            <div>현재 미미한 오류를 수정중에 있고 금주 내로 마무리 될 것으로 예상됩니다.</div>
            <div>이 수정사항들이 마무리 되는데로 다양한 상품들을 올릴 예정입니다.</div>
          </div>

          <div className='mt-4 flex flex-col gap-1 items-center font-medium text-small'>
            <div>1. 모든 회원들의 회원가입을 진행해주세요.</div>
            <div>* 한국회원은 통관부호 입력 필수</div>
          </div>

          <div className='mt-4 flex flex-col gap-1 items-center font-medium text-small'>
            <div>2. 현재 상품구매는 가능하지만 국내배송만 가능합니다.</div>
            <div>* 명품 카테고리 상품은 해외배송 가능</div>
          </div>

          <div className='mt-4 flex flex-col gap-1 items-center font-medium text-small'>
            <div>3. 글로벌 pg 계약 후에 신용카드 및 각종 pay 결제가 가능하나 현재는 계좌</div>
            <div>이체 및 포인트 결제만 가능합니다.</div>
          </div>
        </div>
        <div className='flex flex-col items-center gap-2 mt-8'>
          <div className='flex items-center justify-center text-[#F14646] font-medium text-small'>
            최대한 빠른 시간내에 해외 결제 및 배송이 가능하도록 조치하겠습니다.
          </div>
          <div className='font-medium text-small mt-4'>감사합니다</div>
        </div>
      </div>
    </div>
  )
}
