import BestProduct from '@components/bestProduct/BestProduct'
import ProductSuggest from '@components/product/ProductSuggest'
import CarouselCommon from '@components/carousel/CarouselCommon'
import { getUserInfor } from '@utils/auth'
import { useTranslation } from 'react-i18next'
import Banner1 from '@assets/images/carouselBanner/Banner1.png'
import Banner8 from '@assets/images/carouselBanner/Banner8.svg'
import Banner9 from '@assets/images/carouselBanner/Banner9.svg'
import Banner10 from '@assets/images/carouselBanner/Banner10.png'
import Features from '@components//features/Features'
import Categories from '@components/categories/Categories'
import Article from '@components/article/Article'
import Partner from '@components/partner/Partner'
import IconPhone from '@assets/icons/user/IconPhone.svg'

export default function HomePage() {
  const { t } = useTranslation()
  let getInfonUser = null

  try {
    const userInfo = getUserInfor()
    if (userInfo) {
      getInfonUser = JSON.parse(userInfo)
    } else {
      getInfonUser = {}
    }
  } catch (error) {
    console.error('Error parsing user information:', error)
    getInfonUser = {}
  }

  const items = [
    {
      image: Banner1,
      // title1: `${t('bannerTitle1')}`,
      // text: `${t('bannerText')}`,
    },
    {
      image: Banner8,
      //   title1: `${t('bannerTitle1')}`,
      //   text: `${t('bannerText')}`,
    },
    {
      image: Banner9,
      //   title1: `${t('bannerTitle1')}`,
      //   text: `${t('bannerText')}`,
    },
    {
      image: Banner10,
      // title1: `${t('bannerTitle2')}`,
      // text: `${t('bannerText2')}`,
    },
  ]

  return (
    <div className='lg:mt-24 mt-28'>
      <CarouselCommon items={items} />
      <Features />
      <Categories />
      <ProductSuggest />
      {/* <ProductNew /> */}
      <BestProduct />
      <Article />
      <Partner />
      {/* <Advertisement /> */}
    </div>
  )
}
