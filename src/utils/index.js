export const formatPrice = (p, NOD = false) => {
  if (!p) return '0'
  p = Math.round(p)
  p = p.toString()
  let n = 0
  let tmp = ''
  let rs = p[0]
  for (let i = p.length - 1; i > 0; i--) {
    n++
    tmp += p[i]
    if (n % 3 === 0) {
      tmp += ','
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i]
  }
  if (NOD == true) return rs
  return rs + ' ' + '₩'
}

export const formatNumber = (p, NOD = false) => {
  if (!p) return '0'
  p = Math.round(p)
  p = p.toString()
  let n = 0
  let tmp = ''
  let rs = p[0]
  for (let i = p.length - 1; i > 0; i--) {
    n++
    tmp += p[i]
    if (n % 3 === 0) {
      tmp += '.'
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i]
  }
  if (NOD == true) return rs
  return rs
}

export const formatPriceMultilingual = (amount, currency) => {
  const validCurrencies = ['VND', 'CNH', 'JPY', 'USD', 'KRW']

  // Đảm bảo currency hợp lệ, nếu không mặc định là 'USD'
  if (!validCurrencies.includes(currency)) {
    currency = 'USD'
  }

  // Bản đồ locale cho từng loại tiền tệ
  const localeMap = {
    VND: 'vi-VN',
    CNH: 'zh-CN',
    JPY: 'ja-JP',
    USD: 'en-US',
    KRW: 'ko-KR',
  }

  const locale = localeMap[currency] || 'en-US'

  // Nếu không phải USD, làm tròn lên; nếu là USD, giữ nguyên giá trị
  const roundedAmount = currency === 'USD' ? amount : Math.ceil(amount)

  // Định dạng số lượng theo locale
  let formattedAmount = new Intl.NumberFormat(locale).format(roundedAmount)

  // Nếu là VND, thay đổi dấu '.' thành dấu ','
  // if (currency === 'VND') {
  //   formattedAmount = formattedAmount.replace(/\./g, ',')
  // }

  // Trả về chuỗi định dạng kèm đơn vị tiền tệ
  return `${formattedAmount} ${currency}`
}

export const getQueryParams = (name) => {
  return new URLSearchParams(window ? window.location.search : {}).get(name)
}

export const getPathByIndex = (index) => {
  const path = window.location.pathname
  const parts = path.split('/')

  if (index >= 0 && index < parts.length) {
    return parts[index]
  }
  return null
}

export const getColor = (type) => {
  switch (type) {
    case 'sale':
      return 'magenta'
    case 'ship':
      return 'volcano'
    case 'event':
      return 'green'
    case 'bonus':
      return 'lime'
    case 'recommend':
      return 'blue'
    case 'new_product':
      return 'purple'
    case 'best':
      return 'gold'
    case 'earn_points':
      return 'cyan'
    default:
      return ''
  }
}

export const formatOrderDate = (dateString) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}`
}

export const formatOrderDateExpected = (dateString) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day} `
}

export const getColorStatusOrder = (type) => {
  switch (type) {
    case 'PENDING':
      return { color: '#3B3B3B', bgColor: '#E3EBFF' }
    case 'CONFIRM_PAYMENT':
      return { color: '#6E89E7', bgColor: '#E3EBFF' }
    case 'PREPARING_DELIVERY':
      return { color: '#6B53FF', bgColor: '#E5E3FF' }
    case 'IN_DELIVERY':
      return { color: '#3B3B3B', bgColor: '#D8F0D9' }
    case 'REQUEST_CANCEL':
      return { color: '#3B3B3B', bgColor: '#F5D2D2' }
    case 'CANCELLED':
      return { color: '#F14646', bgColor: '#F5D2D2' }
    case 'COMPLETED':
      return { color: '#2DC033', bgColor: '#D8F0D9' }
    case 'PAID':
      return { color: '#007B7D', bgColor: 'cyan' }
    default:
      return { color: '#000000', bgColor: '#FFFFFF' } // Mặc định: Màu chữ đen, nền trắng
  }
}

export const getColorStatusOrderText = (type) => {
  switch (type) {
    case 'PENDING':
      return { color: '#3B3B3B', bgColor: '#E3EBFF' }
    case 'CONFIRM PAYMENT':
      return { color: '#6E89E7', bgColor: '#E3EBFF' }
    case 'PREPARING DELIVERY':
      return { color: '#6B53FF', bgColor: '#E5E3FF' }
    case 'IN DELIVERY':
      return { color: '#3B3B3B', bgColor: '#D8F0D9' }
    case 'REQUEST CANCEL':
      return { color: '#3B3B3B', bgColor: '#F5D2D2' }
    case 'CANCELLED':
      return { color: '#F14646', bgColor: '#F5D2D2' }
    case 'REQUEST RETURN/REFUND':
      return { color: '#2DC033', bgColor: '#D8F0D9' }
    case 'RETURN/REFUND':
      return { color: '#007B7D', bgColor: 'cyan' }
    default:
      return { color: '#000000', bgColor: '#FFFFFF' } // Mặc định: Màu chữ đen, nền trắng
  }
}

const StatusEnum = {
  PENDING: { id: 0, value: 'pending' },
  CONFIRM_PAYMENT: { id: 1, value: 'confirm payment' },
  PREPARING_DELIVERY: { id: 2, value: 'preparing delivery' },
  IN_DELIVERY: { id: 3, value: 'in delivery' },
  REQUEST_CANCEL: { id: 4, value: 'request cancel' },
  CANCELLED: { id: 5, value: 'cancelled' },
  COMPLETED: { id: 6, value: 'request Return/Refund' },
  PAID: { id: 7, value: 'Returned/Refunded' },
}

// Hàm trả về trạng thái dựa trên ID
export const getStatusById = (id) => {
  switch (id) {
    case '0':
      return StatusEnum.PENDING.value
    case '1':
      return StatusEnum.CONFIRM_PAYMENT.value
    case '2':
      return StatusEnum.PREPARING_DELIVERY.value
    case '3':
      return StatusEnum.IN_DELIVERY.value
    case '4':
      return StatusEnum.REQUEST_CANCEL.value
    case '5':
      return StatusEnum.CANCELLED.value
    case '6':
      return StatusEnum.SUCCESS.value
    case '7':
      return StatusEnum.PAID.value
    default:
      return 'Unknown status'
  }
}

export const getStatusByName = (name) => {
  switch (name) {
    case 'PENDING':
      return StatusEnum.PENDING.value
    case 'CONFIRM_PAYMENT':
      return StatusEnum.CONFIRM_PAYMENT.value
    case 'PREPARING_DELIVERY':
      return StatusEnum.PREPARING_DELIVERY.value
    case 'IN_DELIVERY':
      return StatusEnum.IN_DELIVERY.value
    case 'REQUEST_CANCEL':
      return StatusEnum.REQUEST_CANCEL.value
    case 'CANCELLED':
      return StatusEnum.CANCELLED.value
    case 'COMPLETED':
      return StatusEnum.COMPLETED.value
    case 'PAID':
      return StatusEnum.PAID.value
    default:
      return 'Unknown status'
  }
}

const translations = {
  en: {
    COLOR: 'Color',
    SIZE: 'Size',
    MATERIAL: 'Material',
    WEIGHT: 'Weight',
    CUSTOM_ATTRIBUTE: 'Custom Attribute',
  },
  vi: {
    COLOR: 'Màu sắc',
    SIZE: 'Kích thước',
    MATERIAL: 'Kích cỡ',
    Material: 'Chất liệu',
    WEIGHT: 'Cân nặng',
    CUSTOM_ATTRIBUTE: 'Tùy chỉnh',
  },
  ko: {
    COLOR: '색상',
    SIZE: '크기',
    MATERIAL: '재료',
    WEIGHT: '무게',
    CUSTOM_ATTRIBUTE: '사용자 정의 속성',
  },
  'zh-CN': {
    COLOR: '颜色',
    SIZE: '尺寸',
    MATERIAL: '材料',
    WEIGHT: '重量',
    CUSTOM_ATTRIBUTE: '自定义属性',
  },
  ja: {
    COLOR: '色',
    SIZE: 'サイズ',
    MATERIAL: '素材',
    WEIGHT: '重さ',
    CUSTOM_ATTRIBUTE: 'カスタム属性',
  },
}

export const multilingualProperties = (name, language) => {
  const translation = translations[language] || translations.ko
  return translation[name] || name
}

export const getColorTypeBoard = (type) => {
  switch (type) {
    case 'notification':
      return 'cyan'
    case 'event':
      return 'blue'
    default:
      return ''
  }
}

export const getColorStatusBoard = (type) => {
  switch (type) {
    case 'draft':
      return 'purple'
    case 'published':
      return 'orange'
    case 'archived':
      return 'green'
    default:
      return ''
  }
}

export const converntChannel = (type) => {
  switch (type) {
    case 'tyc':
      return 'tyc'
    case 'g_party':
      return 'Lingo'
    case 'kcs':
      return 'kcs'
    case 'tyc_consignment':
      return 'tyc consignment'
    default:
      return ''
  }
}

export const paymentMethod = (type) => {
  switch (type) {
    case 'banking':
      return 'cyan'
    case 'wallet':
      return 'blue'
    default:
      return ''
  }
}

export const convertType = (type) => {
  switch (type) {
    case 'COLOR':
      return 'Color'
    case 'SIZE':
      return 'Size'
    case 'MATERIAL':
      return 'Material'
    case 'WEIGHT':
      return 'Weight'
    case 'CUSTOM_ATTRIBUTE':
      return 'Custom Attribute'
  }
}

export const booleanText = (type) => {
  switch (type) {
    case 'true':
      return 'blue'
    case 'false':
      return 'volcano'
    default:
      return ''
  }
}
