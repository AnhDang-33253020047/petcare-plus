import logoImg from "../assets/logo.png"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 py-10 md:py-12"
          style={{ borderBottom: "1px solid #f1f5f9" }}
        >
          {/* Brand col */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              {/* Scale logo to, rõ ràng hơn */}
              <img
                src={logoImg}
                alt="PetCare+"
                className="h-24 md:h-28 w-auto object-contain"
              />
            </div>
            {/* Thu gọn đoạn text để cân đối không gian */}
            <p className="text-sm text-gray-600 leading-relaxed pr-4 md:pr-16 max-w-xl">
              Nền tảng bảo hiểm thú cưng công nghệ (Insurtech) tiên phong tại
              Việt Nam. Mang đến giải pháp chăm sóc sức khỏe toàn diện và đặc
              quyền bảo lãnh viện phí trực tiếp, giúp hành trình nuôi dưỡng boss
              luôn an tâm.
            </p>
          </div>

          {/* Công ty */}
          <div className="col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">
              Công ty
            </h4>
            <ul className="space-y-2.5">
              {[
                "Về PetCare+",
                "Quyền lợi bảo hiểm",
                "Phòng khám đối tác",
                "Câu hỏi thường gặp",
                "Tuyển dụng",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 transition-colors"
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "#059669")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">
              Hỗ trợ
            </h4>
            <ul className="space-y-2.5">
              {[
                "Hướng dẫn bồi thường",
                "Chính sách bảo mật",
                "Điều khoản sử dụng",
                "Liên hệ hỗ trợ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 transition-colors"
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "#059669")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal bottom */}
        <div className="py-6">
          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: "#f8fafc",
              border: "1px solid #f1f5f9",
            }}
          >
            <p className="text-[11px] text-gray-600 leading-relaxed mb-1.5">
              <span className="font-semibold text-gray-900">
                Lưu ý pháp lý:
              </span>{" "}
              PetCare+ (Công ty TNHH PetCare Plus Việt Nam) cung cấp dịch vụ
              thương mại điện tử theo Giấy phép ĐKKD số 0316789012 do Sở KH&ĐT
              TP.HCM cấp ngày 12/03/2022. Dịch vụ bảo hiểm thú cưng được cung
              cấp bởi đối tác bảo hiểm được cấp phép bởi Bộ Tài chính theo Giấy
              phép số BH-2023-4521. Sản phẩm bảo hiểm được phân phối tuân theo
              Luật Kinh doanh Bảo hiểm số 08/2022/QH15.
            </p>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-900">
                Bộ Công Thương:
              </span>{" "}
              Website đã đăng ký với Cục Thương mại điện tử và Kinh tế số
              (IDEA). Thông tin sản phẩm và dịch vụ chỉ mang tính chất tham khảo
              — vui lòng tham vấn bác sĩ thú y trước khi thay đổi chế độ dinh
              dưỡng cho thú cưng.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs text-gray-500">
              © 2026 PetCare Plus Việt Nam. Bảo lưu mọi quyền.
            </span>
            <div className="flex items-center gap-5">
              {["Facebook", "Zalo", "TikTok", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs font-medium text-gray-500 transition-colors"
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "#059669")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "")
                  }
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
