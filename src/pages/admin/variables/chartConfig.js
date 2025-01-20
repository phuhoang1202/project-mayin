import { transformChartData } from './chartUtils'

export const getChartConfig = (data) => {
  const currentMonthData = data.revenueOfMonth && data.revenueOfMonth.length > 0 ? data.revenueOfMonth : []
  const lastMonthData = data.revenueOfMonthAgo && data.revenueOfMonthAgo.length > 0 ? data.revenueOfMonthAgo : []

  if (!Array.isArray(currentMonthData) || !Array.isArray(lastMonthData)) {
    return {
      lineChartOptionsTotalSpent: {},
      lineChartDataTotalSpent: [],
    }
  }

  // Biến đổi dữ liệu để vẽ biểu đồ
  const { categories: currentCategories, seriesData: currentSeriesData } = transformChartData(currentMonthData)
  const { categories: lastCategories, seriesData: lastSeriesData } = transformChartData(lastMonthData)
  // const categories = currentCategories?.length > 0 ? currentCategories : lastCategories

  return {
    lineChartOptionsTotalSpent: {
      xaxis: {
        categories: currentCategories,
      },
      yaxis: {
        labels: {
          formatter: (value) => {
            return value.toFixed(2)
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        enabled: true,
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          const currentValue = series[0][dataPointIndex] || 0
          const lastValue = series[1][dataPointIndex] || 0

          // Tạo nội dung tooltip
          return `
           <div class="flex flex-col gap-2 items-start justify-start p-4 bg-white shadow-lg rounded text-sm text-left">
            <div>
              <strong>Current Month:</strong> ${currentValue}
            </div>
            <div>
              <strong>Last Month:</strong> ${lastValue}
            </div>
          </div>
          `
        },
      },
    },
    lineChartDataTotalSpent: [
      {
        name: 'Current Month',
        data: currentSeriesData,
      },
      {
        name: 'Last Month',
        data: lastSeriesData,
      },
    ],
  }
}
