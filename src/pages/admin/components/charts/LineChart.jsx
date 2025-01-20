import Chart from 'react-apexcharts'

const LineChart = (props) => {
  const { series, options } = props

  return <Chart options={options} type='line' width='100%' height='400' series={series} />
}

export default LineChart
