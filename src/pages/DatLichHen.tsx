import React, { useState, useRef, useEffect } from "react"
import { usePet } from "../context/PetContext"
import { CLINICS } from "../data"

const SERVICES_ROW_1 = [
  { id: "kham-so-bo", label: "Khám sơ bộ duyệt bảo hiểm", icon: "📋" },
  { id: "kham-tong-quat", label: "Khám tổng quát", icon: "🩺" },
  { id: "kham-chuyen-khoa", label: "Khám chuyên khoa", icon: "🔬" },
]

const SERVICES_ROW_2 = [
  { id: "tiem-phong", label: "Tiêm phòng", icon: "💉" },
  { id: "cap-cuu", label: "Cấp cứu 24/7", icon: "🚑" },
]

const ALL_SERVICES = [...SERVICES_ROW_1, ...SERVICES_ROW_2]

const HOURS = Array.from({ length: 13 }, (_, i) =>
  String(i + 9).padStart(2, "0"),
)
const MINUTES = ["00", "30"]

export default function DatLichHen() {
  const { activePet } = usePet() as any || {}

  // Danh sách TẤT CẢ phòng khám (Bao gồm có bảo hiểm và không bảo hiểm)
  const partnerClinics = [
    // --- CÓ BÁN BẢO HIỂM ---
    {
      id: "petcare",
      name: "Bệnh viện Thú y PetCare",
      address: "124A Xuân Thủy, phường An Khánh, TP.HCM",
      logo: CLINICS.find((c) => c.id === "petcare")?.logo || "",
      hasInsurance: true,
    },
    {
      id: "2vet",
      name: "Hệ thống Thú y 2Vet",
      address: "128 Chu Văn An, phường Bình Thạnh, TP. HCM",
      logo: CLINICS.find((c) => c.id === "2vet")?.logo || "",
      hasInsurance: true,
    },
    {
      id: "tropicpet",
      name: "Phòng khám Tropicpet",
      address: "88 Nguyễn Thị Định, Cầu Giấy, Hà Nội",
      logo: CLINICS.find((c) => c.id === "tropicpet")?.logo || "",
      hasInsurance: true,
    },
    // --- KHÔNG BÁN BẢO HIỂM ---
    {
      id: "saigonpet",
      name: "Phòng khám Saigon Pet",
      address: "33 Đường 41, Thảo Điền, TP. Thủ Đức",
      logo: "https://saigonpet.com/wp-content/uploads/2024/07/logo.png",
      hasInsurance: false,
    },
    {
      id: "procare",
      name: "Phòng khám Thú y ProCare",
      address: "125 Lê Văn Sỹ, Phường 13, Quận Phú Nhuận",
      logo: "https://thuyprocare.com/upload/images/logo%20procare%20CHU%E1%BA%A8N%20M%C3%80U%20webfooter.png",
      hasInsurance: false,
    },
    {
      id: "animaldoctor",
      name: "The Animal Doctors International",
      address: "1 Trần Ngọc Diện, Thảo Điền, TP. Thủ Đức",
      logo: "https://www.theanimaldoctors.org/wp-content/uploads/2023/02/logo-main.svg",
      hasInsurance: false,
    },
  ]

  const [selectedClinic, setSelectedClinic] = useState<string>("petcare")
  const [selectedService, setSelectedService] = useState<string>("kham-so-bo")

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedHour, setSelectedHour] = useState<string>("")
  const [selectedMinute, setSelectedMinute] = useState<string>("")
  const [note, setNote] = useState<string>("")

  const [isHourOpen, setIsHourOpen] = useState(false)
  const [isMinuteOpen, setIsMinuteOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)

  // Lấy thông tin phòng khám đang được chọn
  const activeClinic = partnerClinics.find((c) => c.id === selectedClinic)

  // Tự động bỏ chọn "Khám sơ bộ duyệt bảo hiểm" nếu đổi sang phòng khám không bán bảo hiểm
  useEffect(() => {
    if (
      activeClinic &&
      !activeClinic.hasInsurance &&
      selectedService === "kham-so-bo"
    ) {
      setSelectedService("kham-tong-quat")
    }
  }, [selectedClinic, activeClinic, selectedService])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (hourRef.current && !hourRef.current.contains(event.target as Node)) {
        setIsHourOpen(false)
      }
      if (
        minuteRef.current &&
        !minuteRef.current.contains(event.target as Node)
      ) {
        setIsMinuteOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const service = urlParams.get("service")
    if (service) {
      // Chỉ set service từ URL nếu phòng khám hiện tại có hỗ trợ (trường hợp kham-so-bo)
      if (
        service === "kham-so-bo" &&
        activeClinic &&
        !activeClinic.hasInsurance
      ) {
        setSelectedService("kham-tong-quat")
      } else {
        setSelectedService(service)
      }
    }
  }, [activeClinic])

  const isEmergency = selectedService === "cap-cuu"

  const handleConfirm = () => {
    if (!activePet) {
      window.dispatchEvent(new Event("openLoginPopup"))
      return
    }
    if (!selectedClinic) {
      alert("Vui lòng chọn cơ sở thú y!")
      return
    }
    if (!selectedService) {
      alert("Vui lòng chọn dịch vụ!")
      return
    }
    if (!selectedDate) {
      alert("Vui lòng chọn ngày hẹn!")
      return
    }
    if (!isEmergency && (!selectedHour || !selectedMinute)) {
      alert("Vui lòng chọn đầy đủ giờ và phút hẹn!")
      return
    }

    setShowSuccessModal(true)
  }

  const getServiceName = (id: string) => {
    return ALL_SERVICES.find((s) => s.id === id)?.label || ""
  }

  return (
    <section className="py-10 md:py-16 bg-[#f8fafc] min-h-screen relative">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* TIÊU ĐỀ TRANG */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1
            className="text-[28px] sm:text-3xl md:text-5xl font-black mb-3 text-gray-900 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Đặt lịch hẹn{" "}
            <span className="text-emerald-600 whitespace-nowrap">
              nhanh chóng
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Trải nghiệm dịch vụ y tế thú cưng chuẩn quốc tế. Ưu tiên khám không
            chờ đợi và bảo lãnh viện phí trực tiếp cho khách hàng PetCare+.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* CỘT TRÁI: FORM ĐẶT LỊCH */}
          <div className="flex-1 w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            {/* 1. HỒ SƠ THÚ CƯNG */}
            <div className="mb-8">
              <h3
                className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                Hồ sơ thú cưng
              </h3>

              {activePet ? (
                <div className="flex items-center justify-between p-4 rounded-2xl border border-emerald-300 bg-emerald-50/20">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      {activePet.name}
                    </div>
                    <div className="text-xs text-emerald-600 font-medium mt-0.5">
                      {activePet.species === "cat" ? "Mèo" : "Chó"} •{" "}
                      {activePet.gender || "♂"} •{" "}
                      {activePet.desc || activePet.age || "3 tuổi"}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      window.dispatchEvent(new Event("openLoginPopup"))
                    }
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Đổi hồ sơ
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                  <div className="text-sm text-gray-500">
                    Bạn chưa chọn hồ sơ thú cưng nào để đặt lịch.
                  </div>
                  <button
                    onClick={() =>
                      window.dispatchEvent(new Event("openLoginPopup"))
                    }
                    className="px-5 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Đăng nhập / Chọn hồ sơ
                  </button>
                </div>
              )}
            </div>

            {/* 2. CHỌN CƠ SỞ THÚ Y */}
            <div className="mb-8">
              <h3
                className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                Chọn cơ sở thú y
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {partnerClinics.map((clinic) => {
                  const isSelected = selectedClinic === clinic.id
                  return (
                    <div
                      key={clinic.id}
                      onClick={() => setSelectedClinic(clinic.id)}
                      className={`cursor-pointer rounded-2xl p-3 border transition-all flex flex-col relative ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50/20 shadow-xs ring-1 ring-emerald-500/30"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {/* Badge phân loại đối tác */}
                      {clinic.hasInsurance ? (
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl flex items-center gap-1 shadow-sm">
                          <span>🛡️</span> Bảo lãnh viện phí
                        </div>
                      ) : (
                        <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl flex items-center gap-1 shadow-sm">
                          <span>🏥</span> Đối tác y tế
                        </div>
                      )}

                      <div className="flex flex-col items-center text-center mt-3 h-full justify-between">
                        {/* Logo */}
                        <div className="h-9 w-full flex items-center justify-center mb-2">
                          {clinic.logo ? (
                            <img
                              src={clinic.logo}
                              alt={clinic.name}
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                              }}
                              className="max-h-8 max-w-[110px] object-contain"
                            />
                          ) : (
                            <span className="text-2xl">🏥</span>
                          )}
                        </div>

                        {/* Tên & địa chỉ */}
                        <div>
                          <div className="font-bold text-[13px] text-gray-900 leading-tight mb-1">
                            {clinic.name}
                          </div>
                          <div className="text-[11px] text-gray-500 leading-tight mt-1">
                            {clinic.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 3. CHỌN DỊCH VỤ */}
            <div className="mb-6">
              <div className="mb-3">
                <h3
                  className="text-base font-bold text-gray-900 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  Chọn dịch vụ
                </h3>
                {activeClinic?.hasInsurance && (
                  <p className="text-xs text-gray-400 italic ml-7 mt-0.5">
                    *Khách hàng mua bảo hiểm được bảo lãnh tự động chi phí khám
                    chữa bệnh.
                  </p>
                )}
              </div>

              {/* Hàng 1 */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 mb-2.5">
                {SERVICES_ROW_1.map((service) => {
                  // Ẩn dịch vụ khám sơ bộ nếu PK không có bảo hiểm
                  if (
                    service.id === "kham-so-bo" &&
                    activeClinic &&
                    !activeClinic.hasInsurance
                  ) {
                    return null
                  }

                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`cursor-pointer rounded-xl py-2.5 px-4 border transition-all flex items-center justify-center gap-2 sm:min-w-[170px] ${
                        selectedService === service.id
                          ? "border-emerald-500 bg-emerald-50/25 text-emerald-800 font-bold shadow-2xs"
                          : "border-gray-200/80 text-gray-700 hover:bg-gray-50/70 font-medium"
                      }`}
                    >
                      <span className="text-base">{service.icon}</span>
                      <span className="text-xs text-center leading-tight">
                        {service.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Hàng 2 */}
              <div className="flex flex-col sm:flex-row justify-center gap-2.5">
                {SERVICES_ROW_2.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service.id)
                      if (service.id === "cap-cuu") {
                        setSelectedHour("")
                        setSelectedMinute("")
                        setIsHourOpen(false)
                        setIsMinuteOpen(false)
                      }
                    }}
                    className={`cursor-pointer rounded-xl py-2 px-4 border transition-all flex items-center justify-center gap-2 sm:min-w-[170px] ${
                      selectedService === service.id
                        ? "border-emerald-500 bg-emerald-50/25 text-emerald-800 font-bold shadow-2xs"
                        : "border-gray-200/80 text-gray-700 hover:bg-gray-50/70 font-medium"
                    }`}
                  >
                    <span className="text-base">{service.icon}</span>
                    <span className="text-xs text-center leading-tight">
                      {service.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. THỜI GIAN DỰ KIẾN */}
            <div className="mb-8">
              <h3
                className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  4
                </span>
                Thời gian dự kiến
              </h3>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Chọn ngày hẹn
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:outline-none text-sm text-gray-700 bg-white"
                  />
                </div>

                <div className="flex-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-1.5">
                    Chọn giờ hẹn
                    {isEmergency && (
                      <span className="text-xs font-normal text-gray-400 italic">
                        (Bỏ qua do cấp cứu)
                      </span>
                    )}
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1" ref={hourRef}>
                      <div
                        onClick={() =>
                          !isEmergency && setIsHourOpen(!isHourOpen)
                        }
                        className={`w-full px-3 py-2.5 rounded-xl border flex justify-between items-center transition-colors select-none text-sm ${
                          isEmergency
                            ? "border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : isHourOpen
                              ? "border-emerald-500 text-gray-900 bg-white cursor-pointer"
                              : "border-gray-200 text-gray-700 bg-white cursor-pointer"
                        }`}
                      >
                        <span>{selectedHour || "Giờ"}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isHourOpen
                              ? "rotate-180 text-emerald-600"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>

                      {isHourOpen && !isEmergency && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-lg rounded-xl max-h-48 overflow-y-auto z-50 py-1">
                          {HOURS.map((hour) => (
                            <div
                              key={hour}
                              onClick={() => {
                                setSelectedHour(hour)
                                setIsHourOpen(false)
                              }}
                              className={`px-3 py-1.5 cursor-pointer text-xs font-medium hover:bg-emerald-50 hover:text-emerald-600 ${
                                selectedHour === hour
                                  ? "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white"
                                  : "text-gray-700"
                              }`}
                            >
                              {hour}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="text-gray-400 font-bold">:</span>

                    <div className="relative flex-1" ref={minuteRef}>
                      <div
                        onClick={() =>
                          !isEmergency && setIsMinuteOpen(!isMinuteOpen)
                        }
                        className={`w-full px-3 py-2.5 rounded-xl border flex justify-between items-center transition-colors select-none text-sm ${
                          isEmergency
                            ? "border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : isMinuteOpen
                              ? "border-emerald-500 text-gray-900 bg-white cursor-pointer"
                              : "border-gray-200 text-gray-700 bg-white cursor-pointer"
                        }`}
                      >
                        <span>{selectedMinute || "Phút"}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isMinuteOpen
                              ? "rotate-180 text-emerald-600"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>

                      {isMinuteOpen && !isEmergency && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden z-50 py-1">
                          {MINUTES.map((min) => (
                            <div
                              key={min}
                              onClick={() => {
                                setSelectedMinute(min)
                                setIsMinuteOpen(false)
                              }}
                              className={`px-3 py-1.5 cursor-pointer text-xs font-medium hover:bg-emerald-50 hover:text-emerald-600 ${
                                selectedMinute === min
                                  ? "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white"
                                  : "text-gray-700"
                              }`}
                            >
                              {min}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. GHI CHÚ THÊM */}
            <div className="mb-6">
              <h3
                className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  5
                </span>
                Ghi chú thêm (Tùy chọn)
              </h3>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Triệu chứng của thú cưng, yêu cầu bác sĩ cụ thể..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:outline-none text-gray-700 resize-none text-xs"
              ></textarea>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleConfirm}
                className="w-fit mx-auto px-10 py-3 rounded-xl font-bold text-base text-white shadow-md transition-all hover:bg-emerald-700 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Xác nhận đặt lịch hẹn
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: BANNER THEO LOẠI ĐỐI TÁC */}
          <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
              <img
                src="https://www.kinganimalhospital.com/wp-content/uploads/2024/02/114-web-or-mls-King-Animal-Hospital-114.jpg"
                alt="Veterinary Care"
                className="w-full h-[240px] md:h-[270px] object-cover"
              />

              {activeClinic?.hasInsurance ? (
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-md border border-gray-100 flex items-center gap-3 pr-5">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium leading-none mb-1">
                      Cơ sở chấp nhận
                    </p>
                    <p className="text-sm font-bold text-emerald-700 leading-none whitespace-nowrap">
                      Bảo lãnh viện phí
                    </p>
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-md border border-gray-100 flex items-center gap-3 pr-5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                    <span className="text-lg">🏥</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium leading-none mb-1">
                      Đối tác y tế
                    </p>
                    <p className="text-sm font-bold text-blue-700 leading-none whitespace-nowrap">
                      Chất lượng cao
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Thông tin quyền lợi thay đổi theo loại đối tác */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3
                className="text-base font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {activeClinic?.hasInsurance
                  ? "Đặc quyền khi tham gia bảo hiểm với PetCare+"
                  : "Quyền lợi khi đặt lịch qua PetCare+"}
              </h3>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs">
                      Ưu tiên khám ngay
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Hệ thống đồng bộ dữ liệu giúp bạn không cần bốc số hay chờ
                      đợi tại phòng khám.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs">
                      Số hóa qua PetID
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Toàn bộ kết quả xét nghiệm, đơn thuốc được lưu trữ ngay
                      trên tài khoản của bạn.
                    </p>
                  </div>
                </li>

                {activeClinic?.hasInsurance && (
                  <>
                    <li className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-xs">
                          Mở khóa đặc quyền Wellness
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          Tiêm phòng hằng năm, triệt sản... hoàn toàn miễn phí
                          khi mua thành công gói bảo hiểm.
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-xs">
                          Tự động đối trừ viện phí
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          Chi phí khám chữa bệnh sẽ được đối trừ trực tiếp vào
                          hạn mức bảo hiểm hiện có.
                        </p>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP THÀNH CÔNG */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-emerald-100/50">
                <img
                  src="https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/3840px-Eo_circle_green_white_checkmark.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"
                  alt="Success"
                  className="w-8 h-8 object-contain"
                />
              </div>

              <h3
                className="text-xl font-black text-gray-900 mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Đặt lịch hẹn thành công!
              </h3>
              <p className="text-gray-500 text-xs mb-4">
                Mã lịch hẹn:{" "}
                <span className="font-mono font-bold text-gray-800">
                  BK-{Date.now().toString().slice(-6)}
                </span>
              </p>

              <div className="w-full bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-100 text-left space-y-2.5 text-xs">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                    Thú cưng & Cơ sở khám
                  </p>
                  <p className="font-bold text-gray-900">
                    {activePet?.name} (
                    {activePet?.species === "cat" ? "Mèo" : "Chó"})
                  </p>
                  <p className="text-emerald-700 font-semibold mt-0.5">
                    {activeClinic?.name}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {activeClinic?.address}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                      Thời gian
                    </p>
                    <p className="font-bold text-gray-900">
                      {isEmergency
                        ? "Cấp cứu ngay"
                        : `${selectedHour}:${selectedMinute} - ${selectedDate.split("-").reverse().join("/")}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                      Dịch vụ
                    </p>
                    <p className="font-bold text-emerald-600">
                      {getServiceName(selectedService)}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  {activeClinic?.hasInsurance ? (
                    <p className="text-emerald-700 leading-relaxed font-medium text-[11px]">
                      Chi phí đã được bảo lãnh viện phí đối trừ tự động. Khi đến
                      nơi, cần xuất trình mã PetID trên hệ thống để được tiếp
                      nhận khám ngay.
                    </p>
                  ) : (
                    <p className="text-blue-700 leading-relaxed font-medium text-[11px]">
                      Lịch hẹn đã được xác nhận. Vui lòng thanh toán chi phí
                      trực tiếp tại phòng khám.
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  setSelectedDate("")
                  setSelectedHour("")
                  setSelectedMinute("")
                  setNote("")
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="w-full py-3 rounded-xl text-white font-bold text-sm bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
