export const transformChartData = (data) => {
  if (!Array.isArray(data)) {
    return { categories: [], seriesData: [] }
  }

  // Lấy danh sách các categories (ngày tháng)
  const categories = data.map((item) => {
    const date = new Date(item.days)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}/${month}`
  })

  // Lấy danh sách dữ liệu revenue
  const seriesData = data.map((item) => item.revenue)

  return { categories, seriesData }
}
