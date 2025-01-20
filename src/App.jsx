// App.js
import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import AdminLayout from '@pages/admin/layouts/admin'
import Login from './pages/user/login/Login.jsx'
import SignUp from './pages/user/signUp/SignUp.jsx'
import Layout from './pages/layout/Layout.jsx'
import NotFoundPage from './pages/404/NotFoundPage.jsx'
import { Button, Result } from 'antd'
import Loading from '@components/loadingCommon/Loading.jsx'
import { getToken, getUserInfor, remoteUserInfor, removeToken, setUserInfor } from '@utils/auth.js'
import { callApiAuthen } from '@apis/index.jsx'
import HomePage from '@pages/user/homePage/HomePage.jsx'
import DetailUser from '@pages/user/detailUser/DetailUser.jsx'
import ChangeInformation from '@pages/user/detailUser/personalInformation/ChangeInformation.jsx'
import AdditionalInformation from '@pages/user/detailUser/personalInformation/AdditionalInformation.jsx'
import DetailProduct from '@pages/user/product/index.jsx'
import OrderConfirmation from '@pages/user/orderConfirmation/OrderConfirmation.jsx'
import OrderHistory from '@pages/user/orderHistory/OrderHistory.jsx'
import AboutUs from '@pages/user/customerCenter/AboutUs.jsx'
import Service from '@pages/user/customerCenter/Service.jsx'
import Logout from '@pages/user/logout/Logout.jsx'
import NewsPage from '@pages/user/news/NewsPage.jsx'
import CategoryComponent from '@pages/user/categoryMain/CategoryComponent.jsx'
import SearchProduct from '@pages/user/product/featureProduct/SearchProduct.jsx'
import NavigateMenu from '@components/allMenu/navigateMenu/NavigateMenu.jsx'
import CancelMembership from '@pages/user/detailUser/personalInformation/CancelMembership.jsx'
import lifeShort from './LifeShort.js'
import CategoryProduct from '@components/categoryProduct/CategoryProduct.jsx'
import TermsOfUse from '@pages/user/policy/TermsOfUse.jsx'
import PaymentMethod from '@pages/user/policy/PaymentMethod.jsx'
import ShippingPolicy from '@pages/user/policy/ShippingPolicy.jsx'
import WarrantyPolicy from '@pages/user/policy/WarrantyPolicy.jsx'
import WarrantyPolicy3M from '@pages/user/policy/WarrantyPolicy3M.jsx'
import ReturnPolicy from '@pages/user/policy/ReturnPolicy.jsx'
import PrivacyPolicy from '@pages/user/policy/PrivacyPolicy.jsx'
import CustomerConsulting from '@pages/user/customerMenu/CustomerConsulting.jsx'
import FaqPage from '@pages/user/customerMenu/FaqPage.jsx'
import Support11 from '@pages/user/customerMenu/Support11.jsx'
import ServiceReflection from '@pages/user/customerMenu/ServiceReflection.jsx'
import CustomerSupportMenu from '@components/allMenu/navigateMenu/CustomerSupportMenu.jsx'
import Introduce from '@pages/user/introduce/Introduce.jsx'
import Contact from '@pages/user/contact/Contact.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const token = getToken('token') || ''
  useEffect(() => {
    lifeShort()
    if (token) {
      const decodedToken = jwtDecode(token)
      try {
        const userRoles = decodedToken.authorities || []
        setIsAuthenticated(true)
        setUserRole(userRoles[0])

        // Get current user
        callApiAuthen(`/api/v1/user/current`, 'get', null)
          .then((res) => {
            setUserInfor(JSON.stringify(res.data))
          })
          .catch((error) => {
            if (error.response.status === 401) {
              removeToken('token')
              remoteUserInfor('userInfo')
              navigate('/login')
            }
          })
      } catch (error) {
        setIsAuthenticated(false)
        setUserRole('')
      }
    } else {
      setIsAuthenticated(false)
      setUserRole('')
    }
    setLoading(false)
  }, [token])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='product/:id' element={<DetailProduct />} />
          <Route path='search-product' element={<SearchProduct />} />
          <Route path='category' element={<CategoryComponent />} />
          <Route path='category-product' element={<CategoryProduct />} />
          {/* <Route path='shopping-cart' element={<ShoppingCart />}>
            <Route index element={<CartProduct />} />
            <Route path='favorites' element={<FavoriteProducts />} />
          </Route> */}

          <Route path='order-confimation' element={<OrderConfirmation />} />
          <Route path='account' element={<DetailUser />}>
            <Route index path='change-information' element={<ChangeInformation />}></Route>
            <Route path='additional-info' element={<AdditionalInformation />}></Route>
            <Route path='cancel-membership' element={<CancelMembership />}></Route>
          </Route>

          <Route path='order-history' element={<OrderHistory />} />

          <Route path='about-us' element={<AboutUs />} />
          <Route path='service' element={<Service />} />
          <Route path='logout' element={<Logout />} />

          <Route path='chinh-sach' element={<NavigateMenu />}>
            <Route path='dieu-khoan-su-dung' element={<TermsOfUse />} />
            <Route path='phuong-thuc-thanh-toan' element={<PaymentMethod />} />
            <Route path='chinh-sach-van-chuyen' element={<ShippingPolicy />} />
            <Route path='chinh-sach-bao-hanh' element={<WarrantyPolicy />} />
            <Route path='chinh-sach-bao-hanh-3M' element={<WarrantyPolicy3M />} />
            <Route path='chinh-sach-doi-tra' element={<ReturnPolicy />} />
            <Route path='chinh-sach-bao-mat' element={<PrivacyPolicy />} />
          </Route>

          <Route path='ho-tro-khach-hang' element={<CustomerSupportMenu />}>
            <Route path='tu-van-khach-hang' element={<CustomerConsulting />} />
            <Route path='cau-hoi-thuong-gap' element={<FaqPage />} />
            <Route path='ho-tro-1-1' element={<Support11 />} />
            <Route path='phan-anh-dich-vu' element={<ServiceReflection />} />
          </Route>

          <Route path='news-page' element={<NewsPage />} />
          <Route path='introduce' element={<Introduce />} />
          <Route path='contact' element={<Contact />} />
        </Route>
        <Route
          path='/admin/*'
          element={
            isAuthenticated && userRole === 'role_admin' ? (
              <>
                <AdminLayout />
              </>
            ) : (
              <Result
                status='403'
                title={<div className='text-black'>403</div>}
                subTitle={<div className='text-black'>Sorry, you are not authorized to access this page.</div>}
                extra={
                  <Button type='primary' onClick={() => navigate('/login')} className='bg-admin-btn-primary'>
                    Login now
                  </Button>
                }
              />
            )
          }
        ></Route>
        <Route path='/login' element={<Login />} />
        {/* <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPass />} /> */}

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
