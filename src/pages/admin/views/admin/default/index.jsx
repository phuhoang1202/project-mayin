import WeeklyRevenue from '@pages/admin/views/admin/default/components/WeeklyRevenue'
import TotalSpent from '@pages/admin/views/admin/default/components/TotalSpent'
import { IoMdHome } from 'react-icons/io'
import { IoDocuments } from 'react-icons/io5'
import { MdBarChart, MdDashboard } from 'react-icons/md'
import Widget from '@pages/admin/components/widget/Widget'
import { useEffect, useState } from 'react'
import { getPromotion } from '@services/admin/promotion'
import IconDashboard1 from '@assets/icons/admin/IconDashboard1.svg'
import IconDashboard2 from '@assets/icons/admin/IconDashboard2.svg'
import IconDashboard3 from '@assets/icons/admin/IconDashboard3.svg'
import IconDashboard4 from '@assets/icons/admin/IconDashboard4.svg'
import IconDashboard5 from '@assets/icons/admin/IconDashboard5.svg'
import IconDashboard6 from '@assets/icons/admin/IconDashboard6.svg'
import { revenueStatistical, revenueStatisticalCategory, statistical } from '@services/admin/dashboard'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [totalPromotion, setTotalPromotion] = useState('')
  const [dataTotalStatistical, setDataTotalStatistical] = useState([])
  const [dataStatistical, setDataStatistical] = useState([])
  const [dataStatisticalCategory, setDataStatisticalCategory] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const navigate = useNavigate()

  const fetchPromotionData = async () => {
    try {
      const response = await getPromotion()
      const { data } = response

      setTotalPromotion(data.length)
    } catch (error) {
      console.error('Error fetching promotion data:', error)
    }
  }

  const fetchTotalStatistical = async () => {
    try {
      const response = await statistical()
      setDataTotalStatistical(response.data)
    } catch (error) {
      console.error('Error fetching statistical data:', error)
    }
  }

  const fetchStatistical = async (month) => {
    try {
      const currentDate = month ? new Date(month) : new Date()
      const lastMonthDate = new Date(currentDate)
      lastMonthDate.setMonth(currentDate.getMonth() - 1)

      const bodyPayload = {
        fromDate: lastMonthDate.toISOString(),
        toDate: currentDate.toISOString(),
      }

      const response = await revenueStatistical(bodyPayload)
      setDataStatistical(response.data)
    } catch (error) {
      console.error('Error fetching statistical data:', error)
    }
  }

  const fetchStatisticalCategory = async () => {
    try {
      const response = await revenueStatisticalCategory()
      setDataStatisticalCategory(response.data)
    } catch (error) {
      console.error('Error fetching promotion data:', error)
    }
  }

  useEffect(() => {
    fetchPromotionData()
    fetchTotalStatistical()
    fetchStatistical()
    fetchStatisticalCategory()
  }, [])

  return (
    <div>
      {/* Card widget */}

      <div className='flex lg:flex-row flex-col items-center lg:gap-4 w-full'>
        <Link to={'/admin/manager-transaction'} className='flex items-center gap-4 w-full'>
          <Widget
            icon={<img src={IconDashboard1} />}
            title={'이번달 누적 매출액'}
            subtitle={dataTotalStatistical.revenueOfMonth}
          />

          <Widget
            icon={<img src={IconDashboard2} />}
            title={'오늘자 판매 매출액'}
            subtitle={dataTotalStatistical.revenueOfDay}
          />
          <Widget
            icon={<img src={IconDashboard3} />}
            title={'오늘자 판매 건수'}
            subtitle={dataTotalStatistical.countOrder}
          />
        </Link>

        <Link to={'/admin/manager-member'} className='flex items-center gap-4 w-full'>
          <Widget icon={<img src={IconDashboard4} />} title={'총 회원수'} subtitle={dataTotalStatistical.countMember} />
          <Widget
            icon={<img src={IconDashboard5} />}
            title={'오늘 가입자수'}
            subtitle={dataTotalStatistical.countMemberRegisterInDay}
          />
          <Widget
            icon={<img src={IconDashboard6} />}
            title={'탈퇴 회원자수'}
            subtitle={dataTotalStatistical?.countMemberLeaveInDay}
          />
        </Link>
      </div>

      {/* Charts */}
      <div>
        <TotalSpent data={dataStatistical} />
      </div>

      {/* <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
        <TotalSpent data={dataStatistical} />
        <WeeklyRevenue />
      </div> */}
    </div>
  )
}

export default Dashboard
