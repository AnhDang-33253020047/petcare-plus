import React, { useState, useRef, useEffect } from "react"
import { usePet } from "../context/PetContext"
import { CLINICS } from "../data"

const SERVICES = [
  { id: "kham-so-bo", label: "Khám sơ bộ duyệt bảo hiểm", icon: "📋" },
  { id: "kham-tong-quat", label: "Khám tổng quát", icon: "🩺" },
  { id: "kham-chuyen-khoa", label: "Khám chuyên khoa", icon: "🔬" },
  { id: "tiem-phong", label: "Tiêm phòng", icon: "💉" },
  { id: "cap-cuu", label: "Cấp cứu 24/7", icon: "🚑" },
]

const HOURS = Array.from({ length: 13 }, (_, i) =>
  String(i + 9).padStart(2, "0"),
)
const MINUTES = ["00", "30"]

export default function DatLichHen() {
  const { activePet } = (usePet() as any) || {}

  // Chỉ lấy 3 bệnh viện đối tác chính thức trong mạng lưới bảo lãnh
  const partnerClinics = CLINICS.filter(
    (c) => c.isInsurance || ["petcare", "2vet", "tropicpet"].includes(c.id)
  ).slice(0, 3)

  const [selectedClinic, setSelectedClinic] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedHour, setSelectedHour] = useState<string>("")
  const [selectedMinute, setSelectedMinute] = useState<string>("")
  const [note, setNote] = useState<string>("")

  const [isHourOpen, setIsHourOpen] = useState(false)
  const [isMinuteOpen, setIsMinuteOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)

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
    if (service === "kham-so-bo") {
      setSelectedService("kham-so-bo")
    }
  }, [])

  const isEmergency = selectedService === "cap-cuu"
  const activeClinic = partnerClinics.find((c) => c.id === selectedClinic)

  const handleConfirm = () => {
    if (!activePet) {
      window.dispatchEvent(new Event("openLoginPopup"))
      return
    }
    if (!selectedClinic) {
      alert("Vui lòng chọn cơ sở thú y đối tác!")
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
    return SERVICES.find((s) => s.id === id)?.label || ""
  }

  return (
    <section className="py-10 md:py-16 bg-[#f8fafc] min-h-screen relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* TIÊU ĐỀ TRANG */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1
            className="text-[26px] sm:text-3xl md:text-5xl font-black mb-4 text-gray-900 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Đặt lịch hẹn{" "}
            <span className="text-emerald-600 whitespace-nowrap">
              nhanh chóng
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 px-2 leading-relaxed">
            Kết nối mạng lưới y tế thú y hàng đầu. Hỗ trợ đặt lịch khám ưu tiên và bảo lãnh viện phí trực tiếp qua mã PetID.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* CỘT TRÁI: FORM ĐẶT LỊCH */}
          <div className="flex-1 w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            
            {/* BƯỚC 1: HỒ SƠ THÚ CƯNG */}
            <div className="mb-8">
              <h3
                className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Hồ sơ thú cưng
              </h3>
              
              {activePet ? (
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 shadow-sm transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-2xl shadow-sm shrink-0">
                    {activePet.species === "cat" ? "🐱" : "🐶"}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-base">{activePet.name}</div>
                    <div className="text-xs text-emerald-700 font-medium mt-0.5">
                      {activePet.species === "cat" ? "Mèo" : "Chó"}
                      {activePet.genderFull || activePet.gender ? ` • ${activePet.genderFull || activePet.gender}` : ""}
                      {activePet.age || activePet.desc ? ` • ${activePet.age || activePet.desc}` : ""}
                      {activePet.breed ? ` • Giống: ${activePet.breed}` : ""}
                    </div>
                  </div>
                  <button
                    onClick={() => window.dispatchEvent(new Event("openLoginPopup"))}
                    className="ml-auto text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-2xs hover:bg-emerald-50 transition-colors"
                  >
                    Đổi hồ sơ
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
                  <div className="text-sm text-gray-500 text-center sm:text-left">
                    Bạn chưa chọn hồ sơ thú cưng nào để đặt lịch.
                  </div>
                  <button
                    onClick={() => window.dispatchEvent(new Event("openLoginPopup"))}
                    className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-xl shadow-sm transition-colors whitespace-nowrap"
                  >
                    Đăng nhập / Chọn hồ sơ
                  </button>
                </div>
              )}
            </div>

            {/* BƯỚC 2: CHỌN CƠ SỞ THÚ Y (3 ĐỐI TÁC BẢO LÃNH) */}
            <div className="mb-8">
              <h3
                className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Chọn cơ sở thú y đối tác ({partnerClinics.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partnerClinics.map((clinic) => {
                  const isSelected = selectedClinic === clinic.id
                  return (
                    <div
                      key={clinic.id}
                      onClick={() => setSelectedClinic(clinic.id)}
                      className={`cursor-pointer rounded-2xl p-4 border-2 transition-all relative flex flex-col justify-between gap-3 text-left ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-500/20"
                          : "border-gray-100 hover:border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          🛡️ Mạng lưới bảo hiểm
                        </span>
                        <span className="text-xs font-black text-emerald-600">
                          Bảo lãnh 100%
                        </span>
                      </div>

                      <div className="flex items-start gap-3 my-1">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                          <img
                            src={clinic.logo}
                            alt={clinic.name}
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                            }}
                            className="max-h-full max-w-full object-contain"
                          />
                          <span className="text-xl select-none">🏥</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-gray-900 truncate">
                            {clinic.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 line-clamp-1 flex items-center gap-1">
                            <span>📍</span>
                            <span>{clinic.address}</span>
                          </div>
                          {clinic.specialty && (
                            <div className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                              {clinic.specialty}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-emerald-100 text-[11px] font-medium text-emerald-700 flex items-center justify-between">
                        <span>✓ Bảo lãnh viện phí qua PetID</span>
                        {isSelected && (
                          <span className="font-bold flex items-center gap-1 text-emerald-700">
                            ✓ Đã chọn
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* BƯỚC 3: CHỌN DỊCH VỤ */}
            <div className="mb-8">
              <h3
                className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Chọn dịch vụ
              </h3>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 leading-relaxed mb-4 shadow-2xs">
                <span className="text-lg leading-none shrink-0">🛡️</span>
                <div>
                  <strong>Bảo lãnh viện phí trực tiếp:</strong> Chi phí khám và điều trị đủ điều kiện theo quy tắc bảo hiểm sẽ được hệ thống đối trừ trực tiếp vào hạn mức bảo lãnh của <strong>{activePet?.name || "thú cưng"}</strong>.
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {SERVICES.map((service) => (
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
                    className={`cursor-pointer rounded-xl p-3 md:p-3.5 border-2 transition-all flex items-center justify-center gap-3 w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] flex-grow-0 ${
                      selectedService === service.id
                        ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
                        : "border-gray-100 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{service.icon}</span>
                    <span className="font-bold text-sm text-center">
                      {service.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BƯỚC 4: THỜI GIAN DỰ KIẾN */}
            <div className="mb-8">
              <h3
                className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                  4
                </span>
                Thời gian dự kiến
              </h3>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Chọn ngày hẹn
                  </label>
                  <input
                    type="date"
                    title="Ngày/Tháng/Năm"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border-2 focus:ring-0 outline-none transition-colors cursor-pointer accent-orange-500 font-medium ${
                      selectedDate
                        ? "border-orange-500 text-orange-600 bg-orange-50"
                        : "border-gray-100 text-gray-700 focus:border-orange-500 bg-white"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
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
                        className={`w-full px-3 py-2.5 rounded-xl border-2 flex justify-between items-center transition-colors select-none ${
                          isEmergency
                            ? "border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : isHourOpen
                              ? "border-orange-500 text-gray-900 bg-white cursor-pointer"
                              : "border-gray-100 hover:border-orange-200 text-gray-700 bg-white cursor-pointer"
                        }`}
                      >
                        <span
                          className={
                            selectedHour ? "font-bold" : "text-gray-500"
                          }
                        >
                          {selectedHour || "Giờ"}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isHourOpen
                              ? "rotate-180 text-orange-500"
                              : isEmergency
                                ? "text-gray-300"
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
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-xl max-h-56 overflow-y-auto z-50 py-2 custom-scrollbar">
                          {HOURS.map((hour) => (
                            <div
                              key={hour}
                              onClick={() => {
                                setSelectedHour(hour)
                                setIsHourOpen(false)
                              }}
                              className={`px-3 py-2 cursor-pointer text-sm font-medium transition-colors ${
                                selectedHour === hour
                                  ? "bg-orange-500 text-white"
                                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                              }`}
                            >
                              {hour}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="text-base font-black text-gray-400">:</span>

                    <div className="relative flex-1" ref={minuteRef}>
                      <div
                        onClick={() =>
                          !isEmergency && setIsMinuteOpen(!isMinuteOpen)
                        }
                        className={`w-full px-3 py-2.5 rounded-xl border-2 flex justify-between items-center transition-colors select-none ${
                          isEmergency
                            ? "border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : isMinuteOpen
                              ? "border-orange-500 text-gray-900 bg-white cursor-pointer"
                              : "border-gray-100 hover:border-orange-200 text-gray-700 bg-white cursor-pointer"
                        }`}
                      >
                        <span
                          className={
                            selectedMinute ? "font-bold" : "text-gray-500"
                          }
                        >
                          {selectedMinute || "Phút"}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isMinuteOpen
                              ? "rotate-180 text-orange-500"
                              : isEmergency
                                ? "text-gray-300"
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
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden z-50 py-2">
                          {MINUTES.map((min) => (
                            <div
                              key={min}
                              onClick={() => {
                                setSelectedMinute(min)
                                setIsMinuteOpen(false)
                              }}
                              className={`px-3 py-2 cursor-pointer text-sm font-medium transition-colors ${
                                selectedMinute === min
                                  ? "bg-orange-500 text-white"
                                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
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

            {/* BƯỚC 5: GHI CHÚ THÊM */}
            <div className="mb-6">
              <h3
                className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                  5
                </span>
                Ghi chú thêm (Tùy chọn)
              </h3>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Triệu chứng của thú cưng, tiền sử dùng thuốc, yêu cầu bác sĩ cụ thể..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 focus:ring-0 outline-none text-gray-700 transition-colors resize-none text-sm"
              ></textarea>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleConfirm}
                className="w-fit mx-auto px-10 py-3.5 rounded-xl font-bold text-lg text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Xác nhận đặt lịch khám
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: BANNER BẢO HIỂM & ĐẶC QUYỀN */}
          <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
              <img
                src="https://www.kinganimalhospital.com/wp-content/uploads/2024/02/114-web-or-mls-King-Animal-Hospital-114.jpg"
                alt="Veterinary Care"
                className="w-full h-[260px] md:h-[300px] object-cover"
              />

              <div className="absolute bottom-4 left-4 w-fit pr-6 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
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
                    <p className="text-xs font-bold text-gray-500 mb-0.5">
                      Đã kích hoạt
                    </p>
                    <p className="text-base font-black text-gray-900 leading-none whitespace-nowrap">
                      Bảo lãnh viện phí trực tiếp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3
                className="text-lg font-black text-gray-900 mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Đặc quyền khi tham gia bảo hiểm với PetCare+
              </h3>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4"
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
                    <h4 className="font-bold text-gray-900 text-sm">
                      Ưu tiên khám ngay
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Hệ thống đồng bộ dữ liệu giúp bạn không cần bốc số hay chờ đợi tại phòng khám.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4"
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
                    <h4 className="font-bold text-gray-900 text-sm">
                      Mở khóa đặc quyền Wellness
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Tiêm phòng hằng năm, triệt sản... hoàn toàn miễn phí khi mua thành công gói bảo hiểm.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4"
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
                    <h4 className="font-bold text-gray-900 text-sm">
                      Số hóa qua PetID
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Toàn bộ kết quả xét nghiệm, đơn thuốc được lưu trữ ngay trên tài khoản của bạn.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4"
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
                    <h4 className="font-bold text-gray-900 text-sm">
                      Tự động đối trừ viện phí
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Chi phí khám chữa bệnh sẽ được đối trừ trực tiếp vào hạn mức bảo hiểm hiện có.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* POPUP XÁC NHẬN ĐẶT LỊCH THÀNH CÔNG */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-emerald-100 text-emerald-600">
                <span className="text-3xl">🎉</span>
              </div>

              <h3
                className="text-2xl font-black text-gray-900 mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Đặt lịch hẹn thành công!
              </h3>
              <p className="text-gray-500 text-xs mb-5">
                Mã lịch hẹn:{" "}
                <span className="font-mono font-bold text-gray-800">
                  BK-{Date.now().toString().slice(-6)}
                </span>
              </p>

              <div className="w-full bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100 text-left space-y-3">
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                    Thú cưng & Cơ sở khám
                  </p>
                  <p className="font-bold text-gray-900 text-sm">
                    {activePet?.name} ({activePet?.species === "cat" ? "Mèo" : "Chó"})
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    {activeClinic?.name}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {activeClinic?.address}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200/70 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                      Thời gian
                    </p>
                    <p className="font-bold text-gray-900 text-xs">
                      {isEmergency
                        ? "Ngay lập tức (Cấp cứu)"
                        : `${selectedHour}:${selectedMinute} - ${selectedDate.split("-").reverse().join("/")}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                      Dịch vụ
                    </p>
                    <p className="font-bold text-emerald-600 text-xs">
                      {getServiceName(selectedService)}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/70">
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                    Chính sách chi phí & Hướng dẫn
                  </p>
                  <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                    ✓ Chi phí khám được bảo lãnh viện phí đối trừ tự động. Khi đến nơi, bạn chỉ cần xuất trình mã PetID trên hệ thống để lễ tân hoàn tất thủ tục tiếp nhận.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  setSelectedClinic("")
                  setSelectedService("")
                  setSelectedDate("")
                  setSelectedHour("")
                  setSelectedMinute("")
                  setNote("")
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-transform active:scale-[0.98] shadow-md"
                style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                }}
              >
                Hoàn tất / Đặt lịch mới
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
