import { useState } from "react"
import { em, emDark, or, orDark } from "../data"
import Footer from "../components/Footer"

// IMPORT VIDEO TỪ THƯ MỤC ASSETS
import heroVideo from "../assets/istockphoto-1474186586-640_adpp_is.mp4"

// DỮ LIỆU MẪU CHO REVIEWS
const REVIEWS = [
  {
    id: 1,
    name: "Minh Anh",
    avatar:
      "https://petservicehcm.com/wp-content/uploads/2023/03/1-1-scaled.jpg?auto=format&fit=crop&w=100&q=80",
    stars: 5,
    text: "Từ ngày mua bảo hiểm với PetCare+, mình nhàn hẳn vụ viện phí. Chó Bông của mình bị viêm ruột khám ở Tropicpet, mở app lên quét mã là xong, không phải ứng trước một đồng nào. Rất ưng ý!",
  },
  {
    id: 2,
    name: "Hoàng Nam",
    avatar:
      "https://pethouse.com.vn/wp-content/uploads/2024/03/meo-bobb.webp?auto=format&fit=crop&w=100&q=80",
    stars: 5,
    text: "Gói bảo hiểm toàn diện chi trả cực kỳ tốt. Chức năng cá nhân hóa dinh dưỡng cũng giúp Cà Rốt nhà mình giảm cân thành công. Vote 5 sao cho đội ngũ hệ thống.",
  },
  {
    id: 3,
    name: "Thu Trà",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    stars: 4,
    text: "Phòng khám 2Vet hỗ trợ cashless rất mượt. Lúc đầu mình còn bỡ ngỡ vụ hồ sơ nhưng bác sĩ hướng dẫn tận tình. Chỉ mong sắp tới mở rộng thêm nhiều phòng khám ở ngoại thành hơn.",
  },
  {
    id: 4,
    name: "Tuấn Kiệt",
    avatar:
      "https://admin.vov.gov.vn/UploadFolder/KhoTin/Images/UploadFolder/VOVVN/Images/sites/default/files/styles/large/public/2024-01/mad-paws-21394322.jpg?auto=format&fit=crop&w=100&q=80",
    stars: 5,
    text: "Max nhà mình khá nghịch nên thỉnh thoảng hay trầy xước phải đi thú y. Mua gói tiêu chuẩn thấy quá hời so với chi phí khám chữa bệnh thực tế. Ứng dụng mượt, duyệt nhanh.",
  },
]

// Để Animation mượt mà, ta nhân đôi mảng dữ liệu để nối đuôi nhau liên tục
const DUPLICATED_REVIEWS = [...REVIEWS, ...REVIEWS]

// Component tạo Ngôi sao
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <style>
        {`
          @keyframes scrollH {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-250px * 4 - 24px * 4)); }
          }
          
          @media (min-width: 768px) {
            @keyframes scrollH {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-500px * 4 - 24px * 4)); }
            }
          }

          .animate-scrollH {
            display: flex;
            width: max-content;
            animation: scrollH 40s linear infinite;
          }

          .animate-scrollH:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* ─── HERO & INSURTECH ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #f0fdf4 0%, #ffffff 55%, #fff7ed 100%)",
          marginTop: -1,
        }}
      >
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${em}, transparent)` }}
        />
        <div
          className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full opacity-15 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${or}, transparent)` }}
        />

        <div className="max-w-[1360px] mx-auto px-4 md:px-8 pt-10 pb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Cột trái */}
            <div className="text-center md:text-left mx-auto md:mx-0 max-w-xl">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{
                  background: "rgba(249,115,22,0.1)",
                  color: "#ea580c",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              >
                INSURTECH TIÊN PHONG TẠI VIỆT NAM
              </div>

              <h1
                className="text-[38px] md:text-[54px] leading-[1.08] mb-4"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-0.03em",
                }}
              >
                Chăm sóc <span style={{ color: em }}>trọn đời</span>
                <br />
                <span style={{ color: or }}>Nhẹ gánh</span>{" "}
                <span style={{ color: "#111827" }}>viện phí</span>
              </h1>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                Nền tảng bảo hiểm thú cưng công nghệ đầu tiên tại Việt Nam. Đồng
                bộ hồ sơ y tế, đề xuất dinh dưỡng cá nhân hóa và đặc quyền bảo
                lãnh viện phí — thanh toán thẳng với phòng khám, không cần ứng
                trước.
              </p>

              <div className="flex justify-center md:justify-start">
                <a
                  href="/mua-bao-hiem"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold transition-transform hover:-translate-y-1 flex justify-center items-center text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${em}, ${emDark})`,
                    boxShadow: "0 6px 20px rgba(5,150,105,0.25)",
                  }}
                >
                  Mua bảo hiểm ngay
                </a>
              </div>

              <div
                className="flex items-center justify-center md:justify-start gap-6 md:gap-10 mt-8 pt-6"
                style={{ borderTop: "1px solid #e5e7eb" }}
              >
                {[
                  { value: "3.000+", label: "Thú cưng được bảo vệ" },
                  { value: "120+", label: "Phòng khám đối tác" },
                  { value: "100%", label: "Được bảo lãnh viện phí" },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-2xl font-black"
                      style={{ fontFamily: "var(--font-display)", color: em }}
                    >
                      {s.value}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột phải: Video */}
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-100 rounded-3xl transform rotate-3 scale-105" />
              <div className="relative bg-white p-3 md:p-4 rounded-3xl shadow-xl border border-gray-100">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[350px] md:h-[450px] object-cover rounded-2xl bg-gray-100"
                >
                  <source src={heroVideo} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ thẻ video.
                </video>
              </div>
            </div>
          </div>

          {/* DÀN NGANG 3 BƯỚC QUY TRÌNH LUỒNG PETID */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                n: "01",
                t: "Quét mã PetID",
                d: "Xác thực thông tin và tra cứu hạn mức bảo hiểm tức thì ngay tại phòng khám đối tác",
              },
              {
                n: "02",
                t: "Khám & điều trị",
                d: "Ngay tại mạng lưới phòng khám đối tác nhanh chóng và dễ dàng hơn bao giờ hết",
              },
              {
                n: "03",
                t: "Bảo lãnh tự động",
                d: "Hệ thống đối soát thông minh và thanh toán thẳng viện phí — không cần ứng tiền trước",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black"
                  style={{
                    background: "rgba(5,150,105,0.1)",
                    color: emDark,
                  }}
                >
                  {s.n}
                </div>
                <div>
                  <div
                    className="text-gray-900 font-bold text-base mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.t}
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed">
                    {s.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS (REVIEWS) ──────────────────────────────────────── */}
      <section className="py-8 md:py-12 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 mb-6 md:mb-8">
          <div className="text-center md:text-left">
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mb-3"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Hàng ngàn chủ nuôi đã chọn{" "}
              <span className="text-emerald-600 whitespace-nowrap">
                PetCare+
              </span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto md:mx-0">
              Lắng nghe những trải nghiệm thực tế từ cộng đồng yêu thú cưng khi
              sử dụng dịch vụ bảo lãnh viện phí của chúng tôi.
            </p>
          </div>
        </div>

        <div className="w-full relative px-4 md:px-8">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="animate-scrollH gap-5 md:gap-6">
            {DUPLICATED_REVIEWS.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-[250px] md:w-[500px] bg-gray-50 border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderRadius: "0.75rem" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base md:text-lg line-clamp-1">
                      {review.name}
                    </h3>
                    <StarRating rating={review.stars} />
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base italic">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
