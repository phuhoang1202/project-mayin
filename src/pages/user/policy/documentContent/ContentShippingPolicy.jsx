import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ContentShippingPolicy() {
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
        <h2 className='text-largerPrdName font-bold uppercase'>Chính sách vận chuyển</h2>
        <div className='mt-2'>
          <p className='text-small mt-2'>
            <strong>Bigcolor Việt Nam</strong> Khách hàng mua sắm tại <strong>Bigcolor Việt Nam</strong> có thể xem và
            nhận hàng trực tiếp tại cửa hàng của <strong>Bigcolor Việt Nam</strong>.
          </p>

          <p className='text-small mt-2'>
            Trường hợp khách hàng mua hàng trực tuyến hoặc có nhu cầu vận chuyển đến tận nơi theo yêu cầu, thì công ty
            chúng tôi có cung cấp dịch vụ vận chuyển cho khách hàng.
          </p>

          <p className='text-small mt-2'>
            Thông thường <strong>Bigcolor Việt Nam</strong> sẽ vận chuyển cho khách hàng trong khoảng 24h làm việc kể từ
            khi nhận được đơn hàng. Tuy nhiên, cũng có trường hợp việc giao hàng kéo dài hơn nhưng chỉ xảy ra trong
            những tình huống bất khả kháng như sau:
          </p>

          <ol className='list-decimal pl-6 flex flex-col gap-2 mt-2 text-small'>
            <li>
              Nhân viên <strong>Bigcolor Việt Nam</strong> liên lạc với khách hàng qua điện thoại không được nên không
              thể giao hàng.
            </li>
            <li>Địa chỉ giao hàng bạn cung cấp không chính xác hoặc khó tìm.</li>
            <li>
              Số lượng đơn hàng của <strong>Bigcolor Việt Nam</strong> tăng đột biến khiến việc xử lý đơn hàng bị chậm.
            </li>
            <li>
              Đối tác cung cấp hàng cho <strong>Bigcolor Việt Nam</strong> chậm hơn dự kiến khiến việc giao hàng bị chậm
              lại hoặc đối tác vận chuyển giao hàng bị chậm
            </li>
          </ol>

          <p className='text-small mt-2'>
            Về phí vận chuyển, <strong>Bigcolor Việt Nam</strong> miễn phí cho tất cả đơn hàng trong nội thành thành phố
            Hồ Chí Minh, Hà Nội và Đà Nẵng. Đối với khách tỉnh nếu có nhu cầu mua sản phẩm của{' '}
            <strong>Bigcolor Việt Nam</strong> thì <strong>Bigcolor Việt Nam</strong> sẽ thông qua dịch vụ giao nhận của
            các công ty vận chuyển và phí sẽ được tính theo phí của các đơn vị cung cấp dịch vụ vận chuyển đó, công ty
            sẽ báo phí cụ thể trước khi chuyển hàng cho khách.
          </p>
        </div>

        {/* 1 */}
        <div className='mt-2'>
          <h3 className='text-textPrd font-bold uppercase'>1. Chi phí giao hàng</h3>

          <div className='mt-2 text-small'>
            <ol className='list-disc pl-6 flex flex-col gap-2 mt-2 text-small'>
              <li>Khu vực nội thành TP.HCM, Hà Nội, Đà Nẵng : miễn phí giao nhận.</li>
              <li>Bán kính 20-30km : Hỗ trợ 30% phí giao hàng.</li>
              <li>Bán kính 50km : Khách hàng thanh toán.</li>
            </ol>

            <div className='mt-2 text-small'>
              <i className='font-bold'>Lưu ý: </i>
              Chi phí vận chuyển thực tế tùy có thể khác, tuỳ vào giá trị đơn hàng và thời gian giao hàng. Vui lòng{' '}
              <a href='#' className='text-blue-600'>
                liên hệ
              </a>{' '}
              trực tiếp <strong>Bigcolor Việt Nam</strong> để nhận báo giá chi phí chính xác nhất.
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className='mt-2'>
          <h3 className='text-textPrd font-bold uppercase'>2. Thời hạn giao hàng</h3>

          <div className='mt-2 text-small'>
            <ol className='list-disc pl-6 flex flex-col gap-2 mt-2 text-small'>
              <li>Khu vực nội thành TP.HCM, Hà Nội, Đà Nẵng: từ 2h đến 04 giờ kể từ khi xác nhận giao hàng.</li>
              <li>
                Khu vực ngoại thành: Giờ hành chính.
                <ul className='list-disc ml-5 leading-7 mt-1'>
                  <li>Bán kính 10km : Từ 2h đến 03 giờ kể từ khi xác nhận giao hàng.</li>
                  <li>Bán kính 20-30km : Từ 3h đến 05 giờ kể từ khi xác nhận giao hàng.</li>
                  <li>Bán kính 50km : Từ 5h đến 08 giờ kể từ khi xác nhận giao hàng.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        {/* 3 */}
        <div className='mt-2'>
          <h3 className='text-textPrd font-bold uppercase'>3. Dịch vụ chuyển phát nhanh đối với khu vực tỉnh</h3>

          <p className='text-small mt-2'>
            Đối với những khách hàng trong khu vực tỉnh thành khác, <strong>Bigcolor Việt Nam</strong> sẽ giao hàng bằng
            hình thức chuyển phát nhanh thông qua các đơn vị cung cấp dịch vụ chuyển phát nhanh. Hình thức này không
            những đảm bảo hàng hóa đến đúng địa chỉ, thời gian mà còn thể hiện tính chuyên nghiệp trong quá trình vận
            chuyển hàng hóa
          </p>

          <p className='text-small mt-2'>
            <strong>Bigcolor Việt Nam</strong> sử dụng phương tiện vận chuyển tùy theo từng loại sản phẩm, khoảng cách
            địa lý bao gồm xe máy, ô tô, tàu hỏa hoặc máy bay. Ngoài ra, chúng tôi cũng hỗ trợ gửi hàng theo yêu cầu của
            Quý khách hàng.
          </p>

          <p className='text-small mt-2'>
            Quý khách có thể lựa chọn phương tiện vận chuyển cho số lượng sản phẩm đặt mua, chúng tôi luôn sẵn sàng đáp
            ứng Quý khách.
          </p>

          <p className='text-small mt-2'>
            Thời gian giao hàng: trong vòng 01-03 ngày tùy phạm vi và địa điểm Quý khách hàng thỏa thuận. Quý khách hàng
            sẽ nhận được sản phẩm đã đặt mua trong thời gian tối đa là 03 ngày.
          </p>

          <p className='text-small mt-2'>
            Mức phí giao hàng khác nhau phụ thuộc vào khoảng cách và khối lượng sản phẩm mà khách hàng đặt mua hoặc theo
            mức phí của các đơn vị cung cấp dịch vụ. Quý khách hàng có thể hoàn toàn yên tâm vì chúng tôi sẽ thông báo
            về khoản phí này trước khi khách hàng thanh toán đơn hàng. Ngoài ra, đối với một số hàng hóa có bảo hiểm vận
            chuyển, phí bảo hiểm sẽ được tính vào phí vận chuyển. Hàng hóa được bảo hiểm sẽ là một cam kết chắc chắn
            nhằm tránh những rủi ro trong quá trình vận chuyển để hàng hóa đến tay khách hàng một cách an toàn nhất.
          </p>

          <p className='text-small mt-2'>
            Khi giao hàng chúng tôi sẽ gửi lại qua email biên bản giao hàng ghi rõ hàng hoá, số lượng, qui cách chủng
            loại xác nhận với người mua, tên, số điện thoại đơn vị giao nhận hàng để Quý khách hàng tiện liên hệ nhận
            hàng trong trường hợp hàng đến chậm.
          </p>
        </div>
      </div>
    </div>
  )
}
