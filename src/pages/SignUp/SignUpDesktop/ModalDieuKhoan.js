import React from "react";
import { Modal } from "antd";

export default function ModalDieuKhoan({ isShowDieuKhoan, handleCloseModal }) {
  return (
    <Modal
      style={{ top: 20 }}
      title="Quy Định Học Tập"
      className="rounded-xl  w-4/5 felx flex-col items-center h-5/6   "
      // onOk={handleOk}
      visible={isShowDieuKhoan}
      onCancel={() => {
        handleCloseModal();
      }}
      footer={
        <button
          onClick={() => {
            handleCloseModal();
          }}
          className=" cursor-pointer card_theme p-3 font-medium text-base text-blue-theme border-none shadow-design_code"
        >
          Đồng ý
        </button>
      }
    >
      <div className="space-y-2 p-3 text-color-content">
        <p className="text-xl font-medium text-center text-gray-900">
          ĐIỀU KHOẢN QUY ĐỊNH HỌC TẬP
        </p>
        <p className="text-lg">
          Dưới đây là những điều khoản được áp dụng cho học viên của CyberLearn.
          Xin hãy đọc kỹ toàn bộ thỏa thuận trước khi tham gia. Một khi bạn đã
          đăng ký tham gia trên CyberLearn chúng tôi sẽ hiểu rằng bạn đã đọc và
          đồng ý toàn bộ điều khoản được đưa ra trong bản thỏa thuận này.
        </p>

        <ul className="list-disc">
          <p className="font-medium  text-gray-900 mt-1.5 mb-1">
            Điều 1: Quy định học tập
          </p>
          <li>Xem video trực tuyến.</li>
          <li> Làm bài tập trực tuyến.</li>
          <li> Mentor và giảng viên hỗ trợ học tập qua nhóm học tập</li>
          <li> Mentor và Giảng viên sẽ chấm bài tập nếu có.</li>
          <li>
            {" "}
            Cần phải hoàn thành bài tập mới được xem video tiếp theo (Không nhảy
            bài).
            <br />
            Để đảm bảo học tốt các nội dung tiếp theo trong từng phần của khoá
            học bạn cần phải làm các bạn tập trắc nghiệm. Đây là bài tập bắt
            buộc, khi đạt 50% số lượng câu hỏi bạn sẽ Đạt và sẽ hiển thị đáp án
            và bạn sẽ được học các nội dung tiếp theo
          </li>
          <li>
            {" "}
            Chỉ hỗ trợ đăng nhập qua facebook. Hỗ trợ duy nhất một tài khoản học
            một nơi. Bạn cần bảo mật tài khoản facebook của bạn. Chúng tôi không
            hỗ trợ chuyển khoá học sang tài khoản khác.
          </li>
          <li> KHÔNG hỗ trợ tải video.</li>
          <li> KHÔNG hỗ trợ tải slide bài giảng.</li>
          <li>
            {" "}
            Mỗi lộ trình (combo) học đều có quy định thời hạn học tập, bạn cần hoàn tất khóa học trong thời hạn đó, nếu bạn muốn gia hạn khóa học thì xem tại Điều 6. Hết thời hạn học tập, tất cả tài nguyên và các hỗ trợ học tập của bạn sẽ không được truy xuất
          </li>
          <li> Không sao chép và bán khoá học hoặc nhường cho người khác.</li>
          <li>
            KHÔNG HOÀN TRẢ bất kì khoản phí nào đã thanh toán cho trung tâm với
            bất kì lý do nào sau khi đã làm Form đăng kí !
          </li>
          <li> Không hoàn phí khi đã đăng ký.</li>
          <li> Không hỗ trợ gia hạn từng khoá riêng lẻ trong lộ trình.</li>
          <p className="font-medium  text-gray-900 mt-1.5 mb-1">
            Điều 2: Thông tin tài khoản cá nhân
          </p>
          <li>
            Khi đăng ký tài khoản tại CyberLearn.vn, học viên phải cung cấp đầy
            đủ và chính xác thông tin về Tên, Email, Số điện thoại, số CMND. Đây
            là những thông tin bắt buộc liên quan tới việc hỗ trợ học viên trong
            quá trình sử dụng dịch vụ tại CyberLearn. Khi có những rủi ro, mất
            mát sau này, chúng tôi chỉ tiếp nhận những trường hợp điền đúng và
            đầy đủ những thông tin trên. Những trường hợp điền thiếu thông tin
            hoặc thông tin sai sự thật sẽ không được giải quyết. Những thông tin
            này sẽ được dùng làm căn cứ để hỗ trợ giải quyết.
          </li>
          <p className="font-medium  text-gray-900 mt-1.5 mb-1">
            Điều 3: Việc bảo mật thông tin
          </p>
          <p>
            <li>
              {" "}
              Bạn có trách nhiệm tự mình bảo quản Tài Khoản, nếu Tài Khoản bị lộ
              ra ngoài dưới bất kỳ hình thức nào,{" "}
            </li>
            CyberLearn sẽ không chịu trách nhiệm về mọi tổn thất phát sinh. Bạn
            không được download video, không được chia sẻ video, tài liệu, mã
            nguồn, tài nguyên mà CyberLearn cung cấp cho bạn lên Internet với
            bất kỳ hình thức nào. Nếu vi phạm, tài khoản của bạn sẽ bị dừng hoạt
            động và phải chịu trách nhiệm trước pháp luật về hành vi xâm phạm sở
            hữu trí tuệ.
            <li>
              {" "}
              CyberLearn có thể gửi thông báo tình hình học tập, chương trình
              khuyến mãi (nếu có), thông báo khóa học mới sắp ra mắt để học viên
              quan tâm có thể đăng ký ngay để được ưu đãi.
            </li>
          </p>
          <p className="font-medium  text-gray-900 mt-1.5 mb-1">
            Điều 4: Ghi danh khóa học
          </p>
          <p>
            <li>
              {" "}
              Trong vòng 3 tháng kể từ ngày đặt cọc hoặc đóng học phí, bạn cần
              thanh toán đủ và kích hoạt khóa học.
            </li>
            <li>
              <b>LƯU Ý QUAN TRỌNG:</b> Tổng thời gian kể từ lúc ghi danh khóa học (đóng học phí lần đầu tiên) đến khi hoàn tất toàn bộ lộ trình khóa học KHÔNG vượt quá TỔNG thời hạn lộ trình (từng combo) bạn đăng ký cộng thêm:
              <br />
              + 3 tháng nếu đăng ký 1 lộ trình ( 1 combo) <br />
              + 5 tháng nếu đăng ký 2 lộ trình ( 2 combo)<br />
              + 6 tháng nếu đăng ký 3 lộ trình ( 3 combo)<br />
              + 7 tháng nếu đăng ký 4 lộ trình ( 4 combo )<br />
              + 8 tháng nếu đăng ký 5 lộ trình ( 5 combo)

            </li>
            <li>
              {" "}
              Khi đăng ký học theo hình thức trả góp thì bạn cần tuân thủ quy định trả góp sau: <br />
              + Đóng 50% học phí - kích hoạt khóa học 1 tháng. <br />
              + Trong 1 tháng sau khi kích hoạt phải hoàn tất 50% học phí còn lại để kích hoạt trọn vẹn khóa học. <br />
              + Nếu trễ hạn 1 tháng, không hoàn tất 50% học phí còn lại sẽ xem như đăng ký mới và sẽ  REMOVE khỏi nhóm hỗ trợ học tập.

            </li>
            <li>
              KHÔNG HOÀN TRẢ bất kì khoản phí nào đã thanh toán cho trung tâm với bất kì lý do nào sau khi đã làm Form đăng kí !

            </li>
          </p>
          <p className="font-medium  text-gray-900 mt-1.5 mb-1">
            Điều 5: V/V Tạm dừng tài khoản khóa học
          </p>
          <p>
            <li>
              Nếu trong quá trình học hệ thống CyberLearn phát hiện ra các hành
              vi tải video chúng tôi sẽ dừng tài khoản học tập và không báo
              trước, chúng tôi sẽ xem xét và xử lý tùy theo mức độ vi phạm
            </li>
          </p>
          <p className="font-medium  text-gray-900 mt-1.5 mb-1">
            Điều 6: V/V Gia hạn khóa học
          </p>
          <p>
            <li>
              Tùy vào tình hình học tập và chương trình đào tạo tại mỗi thời điểm, trung tâm sẽ quyết định đồng ý hay không đồng ý gia hạn khóa học, và khi gia hạn học viên sẽ đóng phí gia hạn theo quy định của trung tâm từng thời kỳ.
            </li>
            <li>
              {" "}
              Trong vòng 1 năm chỉ được gia hạn(có phí) tối đa 1 lần và mỗi lần không quá thời gian truy xuất của lộ trình từng combo đăng ký. Sau thời gian gia hạn học viên muốn học tiếp phải đăng ký mới.
            </li>
            <li>
              Gia hạn 1 tháng sẽ đóng phí 30% học phí. Gia hạn toàn lộ trình đóng 65% phí.
            </li>
          </p>
        </ul>
      </div>
    </Modal>
  );
}
