import logoFubon from "../imports/images.jfif"
import { useState, useEffect } from "react"
import { usePet } from "../context/PetContext"
import { or, orDark } from "../data"

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1774888466475-d5049a2a4955?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://catevolution.com.au/cdn/shop/articles/how_can_i_tell_if_my_cat_is_happy.png?v=1775649203",
]

// Cập nhật Dữ liệu tài khoản Demo khớp với thiết kế Figma của bạn
const DEMO_ACCOUNTS = [
  {
    id: "user_1",
    ownerName: "Nam Nguyễn",
    petName: "Leo",
    species: "cat",
    breed: "Mèo Anh lông ngắn",
    avatar: "N",
    petId: "PET-NN-8921",
  },
  {
    id: "user_2",
    ownerName: "Ngọc Linh",
    petName: "Milu",
    species: "dog",
    breed: "Cún Corgi",
    avatar: "N",
    petId: "PET-NL-4519",
  },
  {
    id: "user_3",
    ownerName: "Trần Bảo Ngọc",
    petName: "Luna",
    species: "cat",
    breed: "Mèo Xiêm",
    avatar: "T",
    petId: "PET-BN-3302",
  },
]

const INSURANCE_PLANS = [
  {
    id: "basic",
    name: "Cơ bản",
    price: "99.000",
    yearlyPrice: "1.188.000",
    color: "text-orange-500",
    summary: "Bảo vệ tài chính trước các tai nạn đột xuất.",
    details: {
      maxLimit: "10.000.000 đ/năm",
      copay: "Khách hàng trả 30% - Bảo lãnh trực tiếp 70%",
      coverage: [
        "CHỈ bảo hiểm TAI NẠN (Ngã lầu, gãy xương, nuốt dị vật, xe đụng, ngộ độc, áp xe do cắn nhau).",
        "Chi phí cấp cứu và khám ngoại trú do tai nạn.",
      ],
      exclusions: [
        "KHÔNG bảo hiểm Bệnh truyền nhiễm/nội khoa.",
        "Thẩm mỹ & Làm đẹp (Cắt móng, cắt tai, nhuộm lông, spa...).",
        "Bệnh mãn tính, ung thư, bệnh di truyền.",
      ],
    },
  },
  {
    id: "standard",
    name: "Tiêu chuẩn",
    price: "249.000",
    yearlyPrice: "2.988.000",
    color: "text-orange-500",
    summary: "Bảo vệ toàn diện trước tai nạn và bệnh truyền nhiễm.",
    details: {
      maxLimit: "20.000.000 đ/năm",
      copay: "Khách hàng trả 20% - Bảo lãnh trực tiếp 80%",
      coverage: [
        "Bảo hiểm TAI NẠN (Tất cả quyền lợi gói Cơ bản).",
        "Bệnh truyền nhiễm cấp tính (FPV, FIP, Cúm mèo, Parvo, Care).",
        "Nhiễm trùng hệ tiêu hóa & tiết niệu (Tắc nghẽn niệu đạo).",
        "Chi phí khám & điều trị nội/ngoại trú, xét nghiệm y khoa.",
        "TẶNG QUYỀN LỢI WELLNESS: Miễn phí 01 mũi tiêm phòng/năm.",
      ],
      exclusions: [
        "Thẩm mỹ & Làm đẹp (Cắt móng, cắt tai, nhuộm lông, spa...).",
        "Bệnh nan y (Ung thư) & Bệnh mãn tính (Suy thận, Tiểu đường).",
        "Bệnh di truyền theo giống.",
      ],
    },
  },
  {
    id: "premium",
    name: "Toàn diện",
    price: "499.000",
    yearlyPrice: "5.988.000",
    color: "text-orange-500",
    summary: "Bảo vệ đa tầng (Nan y, mãn tính) & Chăm sóc chủ động.",
    details: {
      maxLimit: "40.000.000 đ/năm",
      copay: "Khách hàng trả 10% - Bảo lãnh trực tiếp 90%",
      coverage: [
        "TOÀN DIỆN PHẠM VI (Gồm Tai nạn + Bệnh truyền nhiễm).",
        "Bảo hiểm bệnh Ung thư, Bệnh mãn tính (Suy thận, tiểu đường).",
        "Bảo hiểm Bệnh di truyền (nếu tham gia từ khi thú cưng còn nhỏ).",
        "TẶNG QUYỀN LỢI WELLNESS: Trợ giá cố định 2.000.000đ/năm chi trả cho Tiêm phòng định kỳ, Triệt sản hoặc Cạo vôi răng.",
      ],
      exclusions: [
        "Thẩm mỹ & Làm đẹp (Cắt móng, cắt tai, nhuộm lông, spa...).",
        "Bệnh đã có sẵn trước khi hợp đồng có hiệu lực.",
      ],
    },
  },
]

export default function MuaBaoHiem() {
  const [activeProvider, setActiveProvider] = useState<string>("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Quản lý Modal & Luồng người dùng
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<any>(null)
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<any>(null)
  
  // Trạng thái đăng nhập và tài khoản
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "card">("qr")

  const { activePet, setActivePet } = (usePet() as any) || {}

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const isInsuranceActive = ["fubon", "phuhung", "opes"].includes(activeProvider)
  const isClinicActive = ["petcare", "tropicpet", "2vet"].includes(activeProvider)

  const handleRegisterClick = (plan: any) => {
    setSelectedPaymentPlan(plan)
    if (!currentUser) {
      setShowLoginModal(true)
    } else {
      setShowPaymentModal(true)
    }
  }

  const handleSelectDemoAccount = (account: typeof DEMO_ACCOUNTS[0]) => {
    setCurrentUser(account)
    if (setActivePet) {
      setActivePet({
        name: account.petName,
        species: account.species,
      })
    }
    setShowLoginModal(false)
    setShowPaymentModal(true)
  }

  const handleConfirmPayment = () => {
    setShowPaymentModal(false)
    setShowSuccessModal(true)
  }

  const currentPetDisplay = currentUser
    ? {
        name: currentUser.petName,
        speciesText: currentUser.species === "cat" ? "Mèo" : "Chó",
        owner: currentUser.ownerName,
        petId: currentUser.petId,
      }
    : activePet
    ? {
        name: activePet.name,
        speciesText: activePet.species === "cat" ? "Mèo" : "Chó",
        owner: "Khách hàng",
        petId: "PET-DEMO-001",
      }
    : {
        name: "Bí Đỏ",
        speciesText: "Mèo",
        owner: "Lan Anh",
        petId: "PET-BD-8921",
      }

  const renderPricingCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6 mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
      {INSURANCE_PLANS.map((plan) => (
        <div
          key={plan.id}
          className={`border ${
            plan.id === "standard" ? "border-orange-500" : "border-emerald-500"
          } rounded-2xl p-6 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-lg transition-shadow relative`}
        >
          {plan.id === "standard" && (
            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap tracking-wide">
              KHUYÊN DÙNG
            </span>
          )}
          <h3 className={`text-2xl font-black ${plan.color} mb-2`}>
            {plan.name}
          </h3>
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-gray-500 text-sm">Chỉ</span>
            <span className="text-2xl font-bold text-gray-900">
              {plan.price} đ
            </span>
            <span className="text-gray-500 text-sm">/tháng</span>
          </div>
          <p className="text-gray-500 text-xs mb-8">Thanh toán linh hoạt</p>

          <div className="mt-auto w-full flex flex-col items-center gap-3">
            <button
              onClick={() => setSelectedPlanDetails(plan)}
              className="w-fit px-8 py-2.5 text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
            >
              Xem chi tiết quyền lợi
            </button>
            <button
              onClick={() => handleRegisterClick(plan)}
              className="w-fit px-8 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-md hover:shadow-lg transform active:scale-95"
            >
              Đăng ký khám duyệt hồ sơ
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="py-10 md:py-16 bg-gray-50 min-h-screen relative">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Khối Hero Banner */}
        <div className="bg-white rounded-3xl p-5 md:p-6 mb-16 shadow-sm border border-gray-100 flex flex-col-reverse md:flex-row items-stretch gap-8 md:gap-10">
          <div className="flex-1 flex flex-col justify-center">
            <h1
              className="text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-[1.2]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              An tâm chăm sóc <br />
              <span className="text-emerald-600">Bảo vệ trọn vẹn</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Quên đi nỗi lo tài chính với hệ thống bảo lãnh viện phí tự động
              qua <strong className="text-gray-900">PetID</strong>. Chỉ tập
              trung vào việc yêu thương thú cưng của bạn.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <span className="font-bold text-sm text-orange-600">
                • Khám sơ bộ miễn phí
              </span>
              <span className="font-bold text-sm text-orange-600">
                • Quét PetID bảo lãnh ngay
              </span>
              <span className="font-bold text-sm text-orange-600">
                • Không cần ứng tiền trước
              </span>
              <span className="font-bold text-sm text-orange-600">
                • Chấp nhận mọi giống loài
              </span>
            </div>
          </div>

          <div className="flex-1 w-full flex">
            <div className="relative w-full h-[320px] md:h-full md:min-h-[380px] rounded-2xl overflow-hidden shadow-md">
              {HERO_IMAGES.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Thú cưng khỏe mạnh"
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CỤM ĐỐI TÁC BẢO HIỂM */}
        <div className="text-left mb-6">
          <h2
            className="text-2xl md:text-3xl font-black text-gray-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Đối tác bảo hiểm
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-12 md:gap-24 mb-8 mt-6">
          <img
            src={logoFubon}
            alt="Bảo hiểm Fubon"
            onClick={() => setActiveProvider("fubon")}
            className={`h-10 md:h-14 object-contain mix-blend-multiply transition-all duration-300 cursor-pointer ${
              activeProvider === "fubon"
                ? "grayscale-0 opacity-100 scale-105"
                : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
            }`}
          />
          <img
            src="https://beta.pacvn.vn/favicon.ico"
            alt="Bảo hiểm Phú Hưng"
            onClick={() => setActiveProvider("phuhung")}
            className={`h-16 md:h-20 object-contain mix-blend-multiply transition-all duration-300 cursor-pointer ${
              activeProvider === "phuhung"
                ? "grayscale-0 opacity-100 scale-105"
                : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
            }`}
          />
          <img
            src="https://opes.com.vn/_next/image?url=%2Fimages%2Flogo-color.png&w=384&q=75"
            alt="Bảo hiểm OPES"
            onClick={() => setActiveProvider("opes")}
            className={`h-12 md:h-16 object-contain mix-blend-multiply transition-all duration-300 cursor-pointer ${
              activeProvider === "opes"
                ? "grayscale-0 opacity-100 scale-105"
                : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
            }`}
          />
        </div>

        {isInsuranceActive && renderPricingCards()}

        {/* CỤM PHÒNG KHÁM & BỆNH VIỆN THÚ Y */}
        <div className="text-left mb-6 border-t border-gray-200 pt-10">
          <h2
            className="text-2xl md:text-3xl font-black text-gray-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Đối tác phòng khám & bệnh viện thú y
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-12 md:gap-24 mb-8 mt-6">
          <img
            src="https://petcare.vn/wp-content/themes/Petcare/banners/petcarevn_logo.webp"
            alt="PetCare"
            onClick={() => setActiveProvider("petcare")}
            className={`h-16 md:h-20 w-auto object-contain mix-blend-multiply transition-all duration-300 cursor-pointer ${
              activeProvider === "petcare"
                ? "grayscale-0 opacity-100 scale-105"
                : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
            }`}
          />

          <img
            src="https://2vet.vn/wp-content/uploads/2024/06/logo.png"
            alt="2Vet"
            onClick={() => setActiveProvider("2vet")}
            className={`h-16 md:h-20 w-auto object-contain mix-blend-multiply transition-all duration-300 cursor-pointer ${
              activeProvider === "2vet"
                ? "grayscale-0 opacity-100 scale-105"
                : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
            }`}
          />

          <img
            src="https://tropicpet.vn/wp-content/uploads/2023/07/cropped-favicon-1.png"
            alt="Tropicpet"
            onClick={() => setActiveProvider("tropicpet")}
            className={`h-16 md:h-20 w-auto object-contain mix-blend-multiply transition-all duration-300 cursor-pointer ${
              activeProvider === "tropicpet"
                ? "grayscale-0 opacity-100 scale-105"
                : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
            }`}
          />
        </div>

        {isClinicActive && renderPricingCards()}
      </div>

      {/* 1. MODAL ĐĂNG NHẬP HỆ THỐNG CHUẨN THEO THIẾT KẾ MỚI */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col">
            {/* Header Form */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-[17px] font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Đăng nhập hệ thống
              </h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body Form */}
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <input
                  type="email"
                  placeholder="Email đăng nhập"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm text-gray-700"
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm text-gray-700"
                />
                <div className="flex items-center justify-between text-[13px] pt-1">
                  <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    Lưu lại đăng nhập
                  </label>
                  <span className="text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700">
                    Quên mật khẩu?
                  </span>
                </div>
                
                <button 
                  className="w-full py-2.5 mt-2 text-white font-bold rounded-lg transition-colors shadow-sm"
                  style={{ background: "#f97316" }}
                >
                  Đăng nhập
                </button>
              </div>

              {/* Vạch chia */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-100"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Hoặc trải nghiệm nhanh với
                </span>
                <div className="flex-1 h-px bg-gray-100"></div>
              </div>

              {/* Danh sách nút Demo 1-chạm */}
              <div className="space-y-3">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleSelectDemoAccount(acc)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs bg-white shrink-0 group-hover:border-emerald-500 group-hover:text-emerald-600">
                      {acc.avatar}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700">
                      Tài khoản Demo: {acc.ownerName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Form */}
            <div className="px-6 py-4 bg-white border-t border-gray-100 text-center text-[13px]">
              <span className="text-gray-500">Bạn chưa có tài khoản? </span>
              <span className="text-emerald-600 font-bold cursor-pointer hover:text-emerald-700">Đăng ký ngay</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL CHI TIẾT QUYỀN LỢI */}
      {selectedPlanDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-emerald-50 px-6 py-5 border-b border-emerald-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Gói{" "}
                  <span className="text-orange-500">
                    {selectedPlanDetails.name}
                  </span>
                </h3>
                <p className="text-sm text-emerald-700 mt-1">
                  {selectedPlanDetails.summary}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlanDetails(null)}
                className="w-8 h-8 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Hạn mức tối đa</div>
                  <div className="font-bold text-emerald-600">{selectedPlanDetails.details.maxLimit}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Tỷ lệ chi trả</div>
                  <div className="font-bold text-gray-900 text-sm leading-tight">{selectedPlanDetails.details.copay}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Danh mục được bảo hiểm
                </h4>
                <ul className="space-y-2">
                  {selectedPlanDetails.details.coverage.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.replace(
                            "TẶNG QUYỀN LỢI WELLNESS:",
                            "<strong class='text-orange-600'>TẶNG QUYỀN LỢI WELLNESS:</strong>",
                          ),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-gray-100">
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                  <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Quy trình kích hoạt & Bảo lãnh PetID
                  </h4>
                  <ul className="space-y-3 text-sm text-orange-900">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 font-bold">•</span>
                      <span>
                        <strong>Khám sơ bộ miễn phí:</strong> Thú cưng cần hoàn tất khám tổng quát tại phòng khám đối tác để đảm bảo khỏe mạnh trước khi hệ thống duyệt cấp đơn.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 font-bold">•</span>
                      <span>
                        <strong>Bảo lãnh Cashless:</strong> Khi khám bệnh, chỉ cần xuất trình mã PetID hoặc quét Microchip. Nếu bệnh nằm trong danh mục, đối tác bảo hiểm sẽ thanh toán trực tiếp cho phòng khám, bạn không cần ứng trước chi phí.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Các điểm loại trừ chính:</h4>
                <ul className="space-y-1.5 pb-2">
                  {selectedPlanDetails.details.exclusions.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="text-gray-400 mt-0.5">-</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL THANH TOÁN */}
      {showPaymentModal && selectedPaymentPlan && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm animate-in fade-in duration-200"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3
                className="text-lg font-bold text-gray-800 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Thanh toán & Khám sơ bộ
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-700 p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="bg-emerald-50 rounded-xl p-4 mb-5 border border-emerald-100">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Chủ nuôi:</span>
                  <span className="font-bold text-gray-800">{currentPetDisplay.owner}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Hồ sơ thú cưng:</span>
                  <span className="font-bold text-gray-800">
                    {currentPetDisplay.name} ({currentPetDisplay.speciesText})
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Gói bảo hiểm:</span>
                  <span className="font-bold text-emerald-600">{selectedPaymentPlan.name}</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-emerald-200">
                  <span className="text-gray-800 font-bold">Tổng thanh toán (12 tháng):</span>
                  <span className="font-black text-orange-500 text-lg">{selectedPaymentPlan.yearlyPrice} đ</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Phương thức thanh toán
              </h4>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === "qr" ? "border-emerald-500 bg-emerald-50/30" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "qr"}
                    onChange={() => setPaymentMethod("qr")}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    Chuyển khoản mã QR (VNPay/Momo)
                  </span>
                </label>
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === "card" ? "border-emerald-500 bg-emerald-50/30" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-medium text-gray-600 text-sm flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Thẻ ATM / Visa / Mastercard
                  </span>
                </label>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleConfirmPayment}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-base transition-transform active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${or}, ${orDark})`,
                  }}
                >
                  <span>Thanh toán ngay</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL THANH TOÁN THÀNH CÔNG (SUCCESS SCREEN) */}
      {showSuccessModal && selectedPaymentPlan && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative text-center p-6 sm:p-8 border border-gray-100">
            {/* Huy hiệu thành công */}
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl shadow-inner animate-bounce">
              ✓
            </div>

            <h3
              className="text-2xl font-black text-gray-900 mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Đăng ký thành công!
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Hợp đồng bảo hiểm bảo lãnh y tế cho bé{" "}
              <strong className="text-gray-900">{currentPetDisplay.name}</strong> đã được khởi tạo thành công trên hệ thống PetCare+.
            </p>

            {/* Thẻ định danh PetID vừa cấp */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-left space-y-2.5">
              <div className="flex justify-between items-center text-xs text-gray-500 pb-2 border-b border-gray-200">
                <span>MÃ BẢO HIỂM ĐỊNH DANH (PetID):</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {currentPetDisplay.petId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gói bảo hiểm:</span>
                <strong className="text-gray-900">{selectedPaymentPlan.name}</strong>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quyền lợi ban đầu:</span>
                <span className="text-emerald-600 font-bold">Khám sơ bộ miễn phí</span>
              </div>
            </div>

            {/* Lời nhắc bước tiếp theo */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-6 text-left flex gap-3 items-start">
              <span className="text-lg leading-none mt-0.5">💡</span>
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Bước kế tiếp:</strong> Vui lòng đặt lịch khám sơ bộ tại phòng khám thú y đối tác để hoàn tất kích hoạt quyền lợi bảo lãnh viện phí Cashless.
              </p>
            </div>

            {/* Các nút hành động */}
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  window.location.href = "/dat-lich-hen"
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
              >
                Đặt lịch khám sơ bộ ngay →
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
