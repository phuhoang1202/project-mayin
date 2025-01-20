import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ContentTermsOfUse() {
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
        <h2 className='text-largerPrdName font-bold uppercase'>Điều khoản sử dụng</h2>
        {/* Chương 1 */}
        <div className='mt-2'>
          <h3 className='text-textPrd font-bold uppercase'>1. Giới thiệu</h3>
          {/* 1 */}
          <div className='mt-2'>
            <div className='mt-2 text-small leading-7'>
              <p>Chào mừng quý khách hàng dến với BigColor Việt Nam</p>
              <p>Công ty chúng tôi có địa chỉ trụ sở tại:</p>
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

              <p>
                Quy định này được lập ra với mục đích nêu rõ các điều khoản, quyền lợi, nghĩa vụ và trách nhiệm của
                người sử dụng khi sử dụng dịch vụ liên quan đến Internet được cung cấp tại trang{' '}
                <strong className='text-blue-500'>www.bigcolorvietnam.com.</strong>
              </p>
            </div>
          </div>

          {/* 2 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>2. Hướng dẫn sử dụng website</h3>
            <div className='mt-2 text-small'>
              <ol className='list-decimal pl-6 flex flex-col gap-2 mt-2 text-small'>
                <li>
                  Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha
                  mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch
                  mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.
                </li>
                <li>
                  Chúng tôi không chịu bất kỳ trách nhiệm nào, dù trực tiếp hay gián tiếp, đối với những thiệt hại hoặc
                  mất mát gây ra do quý khách không tuân thủ quy định.
                </li>
                <li>
                  Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục đích thương mại hoặc nhân danh bất kỳ đối
                  tác thứ ba nào nếu không được chúng tôi cho phép bằng văn bản. Nếu vi phạm quý khách cần chịu hoàn
                  toàn trách nhiệm trước pháp luật
                </li>
              </ol>
            </div>
          </div>

          {/* 3 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>3. Đặt hàng và xác nhận đơn hàng</h3>
            <div className='mt-2'>
              <p className='text-small'>
                Khách hàng của <strong className='text-blue-500'>www.bigcolorvietnam.com</strong> có thể đăng ký mua
                hàng tại <strong className='text-blue-500'>www.bigcolorvietnam.com</strong> theo cách dưới dây
              </p>
              <ol className='list-decimal pl-6 flex flex-col gap-2 mt-2 text-small font-medium'>
                <li>Chọn mua sản phẩm</li>
                <li>Nhập họ tên, địa chỉ, số điện thoại, địa chỉ Email (hay số điện thoại di động).</li>
                <li>
                  Kiểm tra nội dung quy định, giới hạn về việc hủy đơn đặt hàng, nội dung liên quan đến các chi phí như
                  chi phí giao hàng, lắp đặt…
                </li>
                <li>Kiểm tra đăng ký mua hàng</li>
                <li>Lựa chọn phương thức thanh toán và vận chuyển.</li>
                <li>
                  Sau khi quý khách hàng hoàn thành các thao tác đặt hàng, admin sẽ liên hệ với quý khách để tiến hành
                  vận chueyern
                </li>
              </ol>
            </div>
          </div>

          {/* 4 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>4. Phương thức thanh toán</h3>
            <div className='mt-2 text-small'>
              <p className='text-small'>
                Sản phẩm mua tại <strong className='text-blue-500'>www.bigcolorvietnam.com</strong> có thể được thanh
                toán theo các hình thức sau:
              </p>
              <ol className='pl-6 flex flex-col gap-2 mt-2 text-small'>
                <li>
                  <p className='font-medium'>
                    Cách 1: Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán):
                  </p>
                  <div className='mt-1'>
                    <ul className='list-disc pl-6 flex flex-col gap-1 leading-6'>
                      <li>Bước 1: Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin</li>
                      <li>Bước 2: Người mua đến địa chỉ bán hàng </li>
                      <li>Bước 3: Người mua thanh toán và nhận hàng.</li>
                    </ul>
                  </div>
                </li>

                <li>
                  <p className='font-medium'>Cách 2: Thanh toán sau (COD – giao hàng và thu tiền tận nơi):</p>
                  <div className='mt-1'>
                    <ul className='list-disc pl-6 flex flex-col gap-1 leading-6'>
                      <li>Bước 1: Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin;</li>
                      <li>Bước 2: Người mua xác thực đơn hàng (điện thoại, tin nhắn, email);</li>
                      <li>Bước 3: Người bán xác nhận thông tin Người mua;</li>
                      <li>Bước 4: Người bán chuyển hàng;</li>
                      <li>Bước 5: Người mua nhận hàng và thanh toán.</li>
                    </ul>
                  </div>
                </li>

                <li>
                  <p className='font-medium'>Cách 3: Thanh toán online qua thẻ tín dụng, chuyển khoản:</p>
                  <div className='mt-1'>
                    <ul className='list-disc pl-6 flex flex-col gap-1 leading-6'>
                      <li>Bước 1: Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin;</li>
                      <li>Bước 2: Người mua xác thực đơn hàng (điện thoại, tin nhắn, email);</li>
                      <li>Bước 3: Người bán xác nhận thông tin Người mua;</li>
                      <li>Bước 4: Ngưởi mua thanh toán;</li>
                      <li>Bước 5: Người bán chuyển hàng;</li>
                      <li>Bước 6: Người mua nhận hàng;</li>
                    </ul>
                  </div>
                </li>
              </ol>

              <p className='text-small font-medium mt-2'>
                <span className='font-semibold'>Lưu ý:</span>
                <strong className='text-blue-500'> www.bigcolorvietnam.com</strong> sẽ không thu thêm bất cứ khoản phí
                nào liên quan đến phương thức thanh toán của người sử dụng (trừ thoả thuận khác).
              </p>
            </div>
          </div>

          {/* 5 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>5. Thảo thuận về hủy đơn đặt hàng</h3>
            <div className='mt-2 text-small'>
              <p className='text-small'>
                Trong mọi trường hợp, khách hàng đều có quyền chấm dứt giao dịch nếu đã thực hiện các biện pháp sau đây:
              </p>
              <ol className='list-decimal pl-6 flex flex-col gap-2 mt-2 text-small'>
                <li>
                  Thông báo cho <strong className='text-blue-500'>www.bigcolorvietnam.com</strong> về việc hủy giao dịch
                  qua đường dây nóng.
                </li>
                <li>
                  Trả lại hàng hoá đã nhận nhưng chưa sử dụng hoặc hưởng bất kỳ lợi ích nào từ hàng hóa đó (theo quy
                  định của chính sách đổi trả hàng tại{' '}
                  <strong className='text-blue-500'>www.bigcolorvietnam.com/chinh-sach/chinh-sach-doi-tra</strong>
                </li>
              </ol>
            </div>
          </div>

          {/* 6 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>
              6. Giải quyết hậu quả do lỗi nhập sai thông tin tại <strong>BigColor Việt Nam</strong>
            </h3>
            <div className='mt-2 text-small'>
              <p className='text-small'>
                Khách hàng có trách nhiệm cung cấp thông tin đầy đủ và chính xác khi tham gia giao dịch tại{' '}
                <strong>Bigcolor Việt Nam</strong>. Trong trường hợp khách hàng nhập sai thông tin và gửi vào trang{' '}
                <strong>BigColor Việt Nam</strong>, <strong>Bigcolor Việt Nam</strong> có quyền từ chối thực hiện giao
                dịch.
              </p>

              <p className='text-small mt-2'>
                Ngoài ra, trong mọi trường hợp, khách hàng đều có quyền đơn phương chấm dứt giao dịch nếu đã thực hiện
                các biện pháp sau đây:
              </p>

              <ol className='list-decimal pl-6 flex flex-col gap-2 mt-2 text-small'>
                <li>Trả lại hàng hoá đã nhận nhưng chưa sử dụng hoặc hưởng bất kỳ lợi ích nào từ hàng hóa đó.</li>
                <li>Hàng còn nguyên tem, không bị dơ bẩn, hư hỏng, trầy xước, biến dạng, hư hại,...</li>
                <li>Đăng ký đổi hàng trong vòng 3 ngày kể từ ngày nhận hàng.</li>
              </ol>

              <p className='text-small mt-2'>
                Trong trường hợp sai thông tin phát sinh từ phía <strong>BigColor Việt Nam</strong> mà{' '}
                <strong>BigColor Việt Nam</strong> có thể chứng minh đó là lỗi của hệ thống hoặc từ bên thứ ba (sai giá
                sản phẩm, sai xuất xứ, …), <strong>BigColor Việt Nam</strong> sẽ đền bù cho khách hàng một mã giảm giá
                (hoặc thoả thuận khác) cho các lần mua sắm tiếp theo với mệnh giá tùy từng trường hợp cụ thể và có quyền
                không thực hiện giao dịch bị lỗi.
              </p>
            </div>
          </div>

          {/* 7 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>7. Thương hiệu và bản quyền</h3>
            <div className='mt-2'>
              <p className='text-small mt-2'>
                Các thương hiệu, logo và nhãn hiệu dịch vụ (gọi chung là "Nhãn hiệu") cũng như nội dung (bao gồm nhưng
                không giới hạn bởi thông tin, truyền thông, phần mềm, hình ảnh, video và âm thanh) (gọi chung là "Nội
                dung") có trên hoặc có sẵn trên Website thuộc về <strong>BigColor Việt Nam</strong>, các nhà cung cấp
                nội dung và bên cấp phép. Quý khách nên cho rằng tất cả các nhãn hiệu và nội dung trên Website được bảo
                vệ bởi luật bản quyền và quyền sở hữu trí tuệ hiện hành trừ khi có ghi chú khác.
              </p>

              <p className='text-small mt-2'>
                Quý khách không được sao chép, sửa đổi, chuyển nhượng, phân phối, tái xuất bản, tải về, gửi hoặc truyền
                tải Nhãn hiệu và Nội dung dưới mọi hình thức hoặc bằng bất kỳ phương tiện nào bao gồm nhưng không giới
                hạn bởi điện tử, sao chép cơ học hoặc ghi âm mà không có sự cho phép trước bằng văn bản của chúng tôi.
                Quý khách đồng ý rằng các Nhãn hiệu và Nội dung có trên hoặc có sẵn trên Website sẽ không được sử dụng
                cho mục đích thương mại hoặc phân phối thương mại. Sử dụng trái phép các nhãn hiệu hoặc nội dung có thể
                vi phạm luật bản quyền, luật thương hiệu, luật bảo mật và công khai, và các đạo luật dân sự và hình sự.
                Tất cả các quyền của chúng tôi được bảo lưu.
              </p>
            </div>
          </div>

          {/* 8 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>8. Quyền pháp lý</h3>
            <div className='mt-2'>
              <p className='text-small mt-2'>
                Các điều kiện, điều khoản và nội dung của trang web này được điều chỉnh bởi luật pháp Việt Nam và Tòa án
                có thẩm quyền tại Việt Nam sẽ giải quyết bất kỳ tranh chấp nào phát sinh từ việc sử dụng trái phép trang
                web này.
              </p>
            </div>
          </div>

          {/* 9 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>9. Quy định về bảo mật</h3>
            <div className='mt-2'>
              <p className='text-small mt-2'>
                Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng các biện pháp tốt nhất bảo vệ thông
                tin và việc thanh toán của quý khách. Thông tin của quý khách trong quá trình thanh toán sẽ được mã hóa
                để đảm bảo an toàn. Sau khi quý khách hoàn thành quá trình đặt hàng, quý khách sẽ thoát khỏi chế độ an
                toàn.
              </p>

              <p className='text-small mt-2'>
                Quý khách không được sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can thiệp vào hệ
                thống hay làm thay đổi cấu trúc dữ liệu. Trang web cũng nghiêm cấm việc phát tán, truyền bá hay cổ vũ
                cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống. Cá nhân hay tổ
                chức vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết.
              </p>

              <p className='text-small mt-2'>
                Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ quan pháp luật yêu cầu.
              </p>
            </div>
          </div>

          {/* 10 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>
              10. Đảm bảo an toàn giao dịch tại <strong>BigColor Việt Nam</strong>
            </h3>
            <div className='mt-2'>
              <p className='text-small mt-2'>
                Chúng tôi sử dụng các dịch vụ để bảo vệ thông tin về nội dung mà người bán đăng sản phẩm trên{' '}
                <strong>BigColor Việt Nam</strong>. Để đảm bảo các giao dịch được tiến hành thành công, hạn chế tối đa
                rủi ro có thể phát sinh.
              </p>
            </div>
          </div>

          {/* 11 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>11. Giải quyết tranh chấp</h3>
            <div className='mt-2'>
              <p className='text-small mt-2'>
                Bất kỳ tranh cãi, khiếu nại hoặc tranh chấp phát sinh từ hoặc liên quan đến giao dịch tại{' '}
                <strong>BigColor Việt Nam</strong> hoặc các Quy định và Điều kiện này đều sẽ được giải quyết bằng hình
                thức thương lượng, hòa giải, trọng tài và/hoặc Tòa án theo Luật bảo vệ Người tiêu dùng Chương 4 về Giải
                quyết tranh chấp giữa người tiêu dùng và tổ chức, cá nhân kinh doanh hàng hóa, dịch vụ.
              </p>
            </div>
          </div>

          {/* 12 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>12. Luật pháp và thẩm quyền tại Lãnh thổ Việt Nam</h3>
            <div className='mt-2'>
              <p className='text-small mt-2'>
                Tất cả các Điều Khoản và Điều Kiện này và Hợp Đồng (và tất cả nghĩa vụ phát sinh ngoài hợp đồng hoặc có
                liên quan) sẽ bị chi phối và được hiểu theo luật pháp của Việt Nam. Nếu có tranh chấp phát sinh bởi các
                Quy định Sử dụng này, quý khách hàng có quyền gửi khiếu nại/khiếu kiện lên Tòa án có thẩm quyền tại Việt
                Nam để giải quyết.
              </p>
            </div>
          </div>

          {/* 13 */}
          <div className='mt-2'>
            <h3 className='text-textPrd font-bold uppercase'>13. Không đảm bảo</h3>
            <div className='mt-2'>
              <p className='text-small mt-2'>
                Tất cả nội dung trên trang web được cung cấp cho quý khách "như" và "có sẵn" không có bất kỳ đảm bảo nào
                dù là rõ ràng hay ngụ ý, bao gồm nhưng không giới hạn bởi, ngụ ý đảm bảo khả năng bán được và phù hợp
                cho một mục đích cụ thể, tiêu đề, không vi phạm, an ninh hay chính xác. Chúng tôi đặc biệt từ chối bất
                kỳ trách nhiệm đối với bất kỳ lỗi hoặc thiếu sót trong Nội dung. thegioimayin.com hay bất kỳ bên nào
                khác liên quan đến việc tạo ra, sản xuất hoặc cung cấp Website không chịu trách nhiệm về bất kỳ thiệt
                hại hoặc trừng phạt trực tiếp, gián tiếp, ngẫu nhiên phát sinh từ việc truy cập, sử dụng, hoặc không có
                khả năng truy cập, sử dụng Website của quý khách.
              </p>

              <p className='text-small mt-2'>
                Bất kỳ nội dung tải về, tải lên hoặc thu được thông qua việc sử dụng Website được thực hiện theo quyết
                định và rủi ro của riêng quý khách. Trách nhiệm đánh giá tính chính xác, đầy đủ và hữu ích của tất cả
                các ý kiến, tư vấn, dịch vụ, hàng hóa và các thông tin khác được cung cấp thông qua Website hoặc trên
                Internet nói chung là hoàn toàn thuộc về quý khách.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
