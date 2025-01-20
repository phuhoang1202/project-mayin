// import Card from "components/card";
import Card from '../card'

const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra='flex lg:flex-row flex-col lg:items-center gap-1 rounded-[20px] h-[100px] w-full p-1'>
      <div className='ml-4 flex w-auto flex-row items-start'>
        <div className='rounded-full w-[30px] h-[30px]'>
          <span className='flex items-center text-brand-500 w-full h-full object-cover'>{icon}</span>
        </div>
      </div>

      <div className='ml-4 flex w-auto flex-col justify-start'>
        <p className='font-medium text-min text-[#8C8C8C]'>{title}</p>
        <h4 className='lg:text-xl text-small font-bold text-navy-700'>{subtitle}</h4>
      </div>
    </Card>
  )
}

export default Widget
