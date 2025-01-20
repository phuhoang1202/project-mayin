import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ContentPaymentMethod() {
  const { t } = useTranslation()
  const addressCompany = [
    {
      id: 1,
      office: 'Văn phòng tại Hà Nội',
      address: 'Số 84 Giáp Bát - Q. Hoàng Mai - TP. Hà Nội',
      phoneNumber: '0246.668.0246 - 0949 58 11 58',
      email: 'bigcoloradv@gmail.com',
    },
    {
      id: 2,
      office: 'Văn phòng tại Đà Nẵng',
      address: '172 Lý Thái Tông - Q. Thanh Khê - Tp Đà Nẵng',
      phoneNumber: '0966161373',
      email: 'bigcoloradv@gmail.com',
    },
    {
      id: 3,
      office: 'Văn phòng tại Sài Gòn',
      address: '78/7 Nguyễn Thị Tú.P Bình Hưng Hòa B,Quận Bình Tân',
      phoneNumber: '0286.286.6686 - 0935389988',
      email: 'bigcolorsaigon@gmail.com',
    },
  ]
  return (
    <div>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-largerPrdName font-bold uppercase'>Phương thức thanh toán</h2>
        {/* Chương 1 */}
        <div className='mt-2'>
          <h3 className='text-textPrd font-bold uppercase'>1. thanh toán qua ngân hàng</h3>
          {/* 1 */}
          <div className='mt-2 text-small'>
            <p className='text-small'>
              <strong>Bigcolor Việt Nam</strong> triển khai hình thức thanh toán qua ngân hàng dưới 2 dạng: Thanh toán
              qua ATM và Chuyển khoản tại ngân hàng. Hình thức này rất hữu ích đối với những khách hàng ở xa hoặc không
              thể thanh toán bằng tiền mặt. Đồng thời, thanh toán qua ngân hàng giảm thiểu những rủi ro có liên quan
              trong quá trình thanh toán.
            </p>
            <ol className='list-decimal pl-6 flex flex-col gap-2 mt-2 text-small'>
              <li>
                <strong>Thanh toán qua ATM:</strong> Quý khách hàng có thể thanh toán tại hệ thống ATM của Techcombank,
                ACB, Vietcombank,... hoặc tại các điểm chấp nhận thẻ theo thông tin tài khoản bên dưới.
              </li>
              <li>
                <strong>Chuyển khoản tại ngân hàng:</strong> Ngoài hình thức thanh toán qua ATM, Quý khách hàng có thể
                thanh toán trực tiếp tại phòng giao dịch của hệ thống ngân hàng Techcombank, ACB, Vietcombank,... bằng
                cách chuyển khoản theo thông tin tài khoản bên dưới.
              </li>
            </ol>

            <p className='text-small mt-2'>
              Sau khi nhận được thông báo giao dịch từ ngân hàng, <strong>Bigcolor Việt Nam</strong> sẽ cập nhật trạng
              thái đơn hàng của Quý khách hàng trên trang TMĐT hoặc thông báo qua email và nhân viên của chúng tôi sẽ
              tiến hành giao hàng trong thời gian sớm nhất.
            </p>

            <div className='mt-2 text-small'>
              <i className='font-bold'>Lưu ý:</i>
              <ul className='list-disc pl-6 flex flex-col gap-2 mt-2 text-small'>
                <li>
                  Quý khách hàng vui lòng giữ lại hóa đơn hoặc biên lai để đối chiếu khi cần thiết và phòng trường hợp
                  rủi ro trong quá trình thanh toán.
                </li>
                <li>
                  Những sai sót trong quá trình chuyển khoản hoặc chuyển khoản sai thông tin, quý khách phải làm việc
                  với ngân hàng để được xử lý ổn thỏa.
                </li>
              </ul>
            </div>
          </div>

          {/* 2 */}
          <div className='mt-2 text-small'>
            <h3 className='text-textPrd font-bold uppercase'>2. Thanh toán trực tiếp tại Công ty</h3>
            <p className='text-small mt-2'>
              Hình thức thanh toán trực tiếp tại Công ty được áp dụng đối với khách hàng mua/ nhận sản phẩm tại{' '}
              <strong>Bigcolor Việt Nam</strong>
            </p>
            <p className='text-small mt-2'>
              Với hình thức này, Quý khách hàng sẽ không phải chờ đợi và chủ động trong việc lựa chọn mua hàng.
            </p>

            <p className='text-small mt-2'>
              Quý khách hàng vui long thanh toán bằng tiền mặt hoặc thẻ tín dụng (tùy theo sự lựa chọn của Quý khách)
              tại các địa chỉ văn phòng của <strong>Bigcolor Việt Nam</strong>
            </p>

            <div className='mt-2'>
              <div className='mt-2 text-small leading-7'>
                <ul className='list-disc ml-5'>
                  {addressCompany.map((infor, index) => {
                    return (
                      <li key={index}>
                        <strong>{infor.office}:</strong>
                        <div className='flex flex-col ml-5'>
                          <div>
                            <span className='font-medium'>Địa chỉ: </span>
                            {infor.address}
                          </div>
                          <div>
                            <span className='font-medium'>SĐT: </span>
                            {infor.phoneNumber}
                          </div>
                          <div>
                            <span className='font-medium'>Email: </span>
                            {infor.email}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>

                <p>Thời gian làm việc: 8h00 – 17h00 từ Thứ 2 đến Thứ 7.</p>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>3. Thanh toán khi nhận hàng</h3>
            <div className='mt-2'>
              <p className='text-small'>
                Nhân viên giao hàng của <strong>Bigcolor Việt Nam</strong> sẽ tiến hành giao hàng và nhận thanh toán
                theo địa chỉ thỏa thuận với khách hàng.
              </p>

              <p className='text-small mt-2'>
                Quý khách hàng sẽ thanh toán cho nhân viên của chúng tôi sau khi hoàn tất kiểm tra hàng hóa và nhận hóa
                đơn thanh toán. Trong trường hợp Quý khách hàng không có mặt tại địa chỉ thỏa thuận, vui lòng ủy thác
                cho người khác để ký nhận và thanh toán.
              </p>

              <p className='text-small mt-2'>
                Hình thức thanh toán này đảm bảo tính an toàn, giúp khách hàng tiết kiệm thời gian và thật sự thuận tiện
                đối với Quý khách hàng có quỹ thời gian hạn chế.
              </p>

              <div className='mt-2 text-small'>
                <i className='font-bold'>Lưu ý: </i>
                <span>
                  Quý khách hàng có trách nhiệm thanh toán đầy đủ, toàn bộ giá trị đơn hàng cho nhân viên của chúng tôi,
                  ngay khi hoàn tất kiểm tra hàng hóa và nhận hóa đơn thanh toán.
                </span>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>4. Thanh toán trực tuyến</h3>
            <div className='mt-2'>
              <p className='text-small'>
                Sử dụng thẻ nội địa : ATM Connect 24 của Vietcombank, thẻ Đa năng của Đông Á, thẻ ATM Techcombank…
              </p>

              <p className='text-small mt-2'>Sử dụng thẻ tín dụng (Quốc tế) : Các loại thẻ Credit và Debit card.</p>

              <p className='text-small mt-2'>
                <strong>Khách hàng được ưu đãi thanh toán</strong>: Khi mua đơn hàng thứ 02 trở đi với hình thức: Ký Hợp
                đồng nguyên tắc cam kết thanh toán theo hạn mức mua hàng, hoặc với hình thức khác theo thỏa thuận và căn
                cứ vào giá trị mua hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
