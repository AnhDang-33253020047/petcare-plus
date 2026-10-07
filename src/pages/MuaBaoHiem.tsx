import logoFubon from "../imports/images.jfif"
import { useState, useEffect } from "react"
import { usePet } from "../context/PetContext"
import { or, orDark } from "../data"

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1774888466475-d5049a2a4955?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://catevolution.com.au/cdn/shop/articles/how_can_i_tell_if_my_cat_is_happy.png?v=1775649203",
]

// Cập nhật Dữ liệu tài khoản: Ngọc Linh có 2 thú cưng
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
    id: "user_2a",
    ownerName: "Ngọc Linh",
    petName: "Milu",
    species: "dog",
    breed: "Cún Corgi",
    avatar: "N",
    petId: "PET-NL-4519",
  },
  {
    id: "user_2b",
    ownerName: "Ngọc Linh",
    petName: "Mimi",
    species: "cat",
    breed: "Mèo Anh lông dài",
    avatar: "N",
    petId: "PET-NL-4520",
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
        petId: "PET
