export const em = "#059669"
export const emDark = "#047857"
export const or = "#f97316"
export const orDark = "#ea580c"

export interface PetItem {
  id: string
  name: string
  species: "cat" | "dog"
  gender: string
  genderFull?: string
  desc: string
  age?: string
  breed?: string
  birthday?: string
  weight?: string
  neutered?: string
  petId: string
  microchip?: string
  bcs?: string
  mer?: string
  k?: string
  note?: string
  vaccines?: {
    title: string
    status: string
    date: string
    clinic: string
  }[]
}

export interface DemoAccount {
  id: number
  label: string
  pets: PetItem[]
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 1,
    label: "Nam Nguyễn",
    pets: [
      {
        id: "pet-1",
        name: "Bí Đỏ",
        species: "cat",
        gender: "♂",
        genderFull: "♂ Đực",
        desc: "2 tuổi",
        age: "2 tuổi",
        breed: "Mèo Anh lông ngắn",
        birthday: "15/04/2024",
        weight: "4.2 kg",
        neutered: "Đã triệt sản",
        petId: "PET-NN-8921",
        microchip: "981098104829104",
        bcs: "5 / 9",
        mer: "218 kcal",
        k: "1.2",
        note: "Cân nặng ổn định ở mức 4.2 kg. Khuyến nghị duy trì khẩu phần kết hợp thức ăn ướt (pate) để bổ sung lượng nước tự nhiên, phòng ngừa sỏi tiết niệu và kiểm soát khoáng chất thận.",
        vaccines: [
          {
            title: "Vaccine 4 bệnh cho mèo (Mũi 3)",
            status: "Đã tiêm",
            date: "10/01/2026",
            clinic: "BV Thú y PetCare Q.2",
          },
          {
            title: "Vaccine dại (Rabies)",
            status: "Đã tiêm",
            date: "25/02/2026",
            clinic: "BV Thú y PetCare Q.2",
          },
          {
            title: "Tẩy giun & Nhỏ gáy phòng ve rận định kỳ",
            status: "Sắp đến hạn",
            date: "Khuyến nghị: Tháng 11/2026",
            clinic: "Mạng lưới đối tác PetCare+",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Ngọc Linh",
    pets: [
      {
        id: "pet-2",
        name: "Sam",
        species: "dog",
        gender: "♂",
        genderFull: "♂ Đực",
        desc: "3 tuổi",
        age: "3 tuổi",
        breed: "Poodle",
        birthday: "15/03/2023",
        weight: "5.5 kg",
        neutered: "Đã triệt sản",
        petId: "PET-NL-4519",
        microchip: "981098104519001",
        bcs: "5 / 9",
        mer: "350 kcal",
        k: "1.6",
        note: "Chó Poodle 3 tuổi thể trạng lý tưởng, răng sạch ít vôi. Khuyến nghị duy trì vận động thể chất hàng ngày và tẩy giun định kỳ.",
        vaccines: [
          {
            title: "Vaccine 7 bệnh cho chó (Nhắc lại hàng năm)",
            status: "Đã tiêm",
            date: "10/03/2026",
            clinic: "BV Thú y PetCare Q.2",
          },
          {
            title: "Vaccine dại (Rabies định kỳ)",
            status: "Đã tiêm",
            date: "15/03/2026",
            clinic: "BV Thú y PetCare Q.2",
          },
          {
            title: "Tẩy giun & Nhỏ gáy phòng ve rận định kỳ",
            status: "Sắp đến hạn",
            date: "Khuyến nghị: Tháng 11/2026",
            clinic: "Mạng lưới đối tác PetCare+",
          },
        ],
      },
      {
        id: "pet-3",
        name: "Sun",
        species: "cat",
        gender: "♀",
        genderFull: "♀ Cái",
        desc: "2 tuổi",
        age: "2 tuổi",
        breed: "Mèo Ba Tư",
        birthday: "20/07/2024",
        weight: "3.8 kg",
        neutered: "Đã triệt sản",
        petId: "PET-NL-4520",
        microchip: "981098104520002",
        bcs: "5 / 9",
        mer: "210 kcal",
        k: "1.2",
        note: "Mèo Ba Tư 2 tuổi cân nặng ổn định ở mức 3.8 kg. Khuyến nghị duy trì khẩu phần pate ướt kết hợp hạt ngừa sỏi tiết niệu và chải lông định kỳ.",
        vaccines: [
          {
            title: "Vaccine 4 bệnh cho mèo (Nhắc lại hàng năm)",
            status: "Đã tiêm",
            date: "20/07/2026",
            clinic: "BV Thú y PetCare Q.2",
          },
          {
            title: "Vaccine dại (Rabies định kỳ)",
            status: "Đã tiêm",
            date: "20/07/2026",
            clinic: "BV Thú y PetCare Q.2",
          },
          {
            title: "Tẩy giun định kỳ",
            status: "Sắp đến hạn",
            date: "Khuyến nghị: Tháng 11/2026",
            clinic: "Mạng lưới đối tác PetCare+",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Trần Bảo Ngọc",
    pets: [
      {
        id: "pet-4",
        name: "Bông",
        species: "dog",
        gender: "♂",
        genderFull: "♂ Đực",
        desc: "5 tuổi",
        age: "5 tuổi",
        breed: "Corgi",
        birthday: "12/04/2021",
        weight: "12.0 kg",
        neutered: "Đã triệt sản",
        petId: "PET-BN-3302",
        microchip: "981098103302003",
        bcs: "6 / 9",
        mer: "620 kcal",
        k: "1.3",
        note: "Chó Corgi 5 tuổi thể trạng hơi tròn trịa. Cần kiểm soát cân nặng để hạn chế áp lực lên khớp và cột sống lưng. Đi dạo nhẹ 30 phút mỗi ngày.",
        vaccines: [
          {
            title: "Vaccine 7 bệnh cho chó (Nhắc lại hàng năm)",
            status: "Đã tiêm",
            date: "12/04/2026",
            clinic: "Phòng khám 2Vet",
          },
          {
            title: "Vaccine dại (Rabies)",
            status: "Đã tiêm",
            date: "12/04/2026",
            clinic: "Phòng khám 2Vet",
          },
          {
            title: "Khám khớp & Tẩy giun định kỳ",
            status: "Sắp đến hạn",
            date: "Khuyến nghị: Tháng 11/2026",
            clinic: "Mạng lưới đối tác PetCare+",
          },
        ],
      },
    ],
  },
]

export interface ClinicItem {
  id: string
  name: string
  address: string
  district?: string
  city?: string
  logo: string
  isInsurance: boolean
  badgeText: string
  slotPrice?: string
  specialty?: string
  phone?: string
  note?: string
}

export const CLINICS: ClinicItem[] = [
  // Mạng lưới đối tác bảo hiểm PetCare+
  {
    id: "petcare",
    name: "Bệnh viện Thú y PetCare",
    address: "124A Xuân Thủy, Phường An Khánh, TP. Thủ Đức, TP.HCM",
    district: "TP. Thủ Đức",
    city: "TP.HCM",
    logo: "https://petcare.vn/wp-content/themes/Petcare/banners/petcarevn_logo.webp",
    isInsurance: true,
    badgeText: "Mạng lưới bảo hiểm",
    slotPrice: "Bảo lãnh 100%",
    specialty: "Bệnh viện thú y đa khoa • Cấp cứu 24/7 & Ngoại khoa",
    phone: "028 3744 2505",
    note: "Bảo lãnh viện phí trực tiếp qua PetID. Miễn phí khám định kỳ trong hạn mức bảo hiểm.",
  },
  {
    id: "2vet",
    name: "Hệ thống Thú y 2Vet",
    address: "128 Chu Văn An, Phường 26, Quận Bình Thạnh, TP.HCM",
    district: "Bình Thạnh",
    city: "TP.HCM",
    logo: "https://2vet.vn/wp-content/uploads/2024/06/logo.png",
    isInsurance: true,
    badgeText: "Mạng lưới bảo hiểm",
    slotPrice: "Bảo lãnh 100%",
    specialty: "Chẩn đoán hình ảnh • Xét nghiệm sinh hóa & Phẫu thuật",
    phone: "0986 998 126",
    note: "Đối tác liên kết bảo hiểm chiến lược. Hỗ trợ đối soát và thanh toán bảo hiểm tức thì.",
  },
  {
    id: "tropicpet",
    name: "Bệnh viện Thú y Tropicpet",
    address: "88 Nguyễn Thị Định, Trung Hòa, Quận Cầu Giấy, Hà Nội",
    district: "Cầu Giấy",
    city: "Hà Nội",
    logo: "https://tropicpet.vn/wp-content/uploads/2023/07/cropped-favicon-1.png",
    isInsurance: true,
    badgeText: "Mạng lưới bảo hiểm",
    slotPrice: "Bảo lãnh 100%",
    specialty: "Nội trú chuyên biệt • Khám & điều trị toàn diện",
    phone: "0862 888 115",
    note: "Cơ sở bảo lãnh viện phí khu vực miền Bắc. Đặt lịch ưu tiên không chờ đợi.",
  },

  // Đối tác phòng khám bán slot đặt khám (Không tham gia bảo hiểm)
  {
    id: "thithi",
    name: "Phòng khám Thú y Thi Thi",
    address: "62A Phan Văn Hân, Phường 17, Quận Bình Thạnh, TP.HCM",
    district: "Bình Thạnh",
    city: "TP.HCM",
    logo: "https://thithipet.com/wp-content/uploads/2021/04/logo-thithi-pet-1.png",
    isInsurance: false,
    badgeText: "Bán slot khám (Không bảo hiểm)",
    slotPrice: "100.000₫ / slot",
    specialty: "Khám dịch vụ đa khoa • Da liễu, Siêu âm & Tiêm chủng lẻ",
    phone: "0978 899 004",
    note: "Đối tác bán slot đặt khám ưu tiên. KHÔNG tham gia bảo lãnh viện phí PetCare+, khách hàng tự chi trả chi phí y tế tại quầy phòng khám.",
  },
  {
    id: "samyang",
    name: "Samyang Animal Clinic",
    address: "116 Nguyễn Thị Thập, KĐT Him Lam, Quận 7, TP.HCM",
    district: "Quận 7",
    city: "TP.HCM",
    logo: "https://samyanganimalclinic.com/wp-content/uploads/2023/05/logo-samyang.png",
    isInsurance: false,
    badgeText: "Bán slot khám (Không bảo hiểm)",
    slotPrice: "120.000₫ / slot",
    specialty: "Chuyên khoa da liễu & Phẫu thuật thú nhỏ chuẩn Hàn Quốc",
    phone: "028 6275 8899",
    note: "Phòng khám bán slot hẹn chuyên gia. Không áp dụng chính sách bảo lãnh bảo hiểm PetCare+, thanh toán trực tiếp tại phòng khám.",
  },
  {
    id: "procare",
    name: "Phòng khám Thú y Procare",
    address: "144 Nguyễn Thái Bình, Phường 12, Quận Tân Bình, TP.HCM",
    district: "Tân Bình",
    city: "TP.HCM",
    logo: "https://thuyprocare.com/wp-content/uploads/2020/09/logo-procare.png",
    isInsurance: false,
    badgeText: "Bán slot khám (Không bảo hiểm)",
    slotPrice: "80.000₫ / slot",
    specialty: "Nội khoa thú nhỏ • Nha khoa & Chẩn đoán hình ảnh kỹ thuật số",
    phone: "028 3948 1111",
    note: "Bán slot giữ chỗ khám nhanh giờ cao điểm. Không trừ viện phí vào hợp đồng bảo hiểm PetCare+.",
  },
  {
    id: "pethealth",
    name: "Bệnh viện Thú y PetHealth",
    address: "240 Âu Cơ, Phường Quảng An, Quận Tây Hồ, Hà Nội",
    district: "Tây Hồ",
    city: "Hà Nội",
    logo: "https://pethealth.vn/wp-content/uploads/2020/06/logo-pethealth.png",
    isInsurance: false,
    badgeText: "Bán slot khám (Không bảo hiểm)",
    slotPrice: "100.000₫ / slot",
    specialty: "Đa khoa khám chữa bệnh • Cấp cứu lưu động & Phẫu thuật nội soi",
    phone: "024 2242 8882",
    note: "Đối tác bán slot đặt lịch khám trước tại Hà Nội. Không tham gia mạng lưới bảo lãnh PetCare+, viện phí thanh toán tại quầy.",
  },
]

export const PETS = [
  { id: 1, name: "Mochi", type: "Mèo cái • 3 tuổi 2 tháng" },
  { id: 2, name: "Bông", type: "Chó đực • 5 tuổi 1 tháng" },
]

export const NAV_ITEMS: { label: string; path: string }[] = [
  { label: "Mua bảo hiểm", path: "/mua-bao-hiem" },
  { label: "Đặt lịch hẹn", path: "/dat-lich-hen" },
  { label: "Cẩm nang dinh dưỡng", path: "/cam-nang-dinh-duong" },
  { label: "Cẩm nang chăm sóc", path: "/cam-nang-cham-soc" },
]

export const CATEGORIES = [
  {
    icon: "🛡️",
    title: "Mua bảo hiểm\ntrực tuyến",
    desc: "Bảo hiểm toàn diện, cashless tại phòng khám — không cần đặt cọc viện phí.",
    accent: "emerald",
    stat: "Từ 199.000₫/tháng",
  },
  {
    icon: "💉",
    title: "Đặt lịch tiêm\nphòng & Spa",
    desc: "Nhắc lịch tự động, đặt hẹn online tại hơn 50 phòng khám đối tác.",
    accent: "orange",
    stat: "50+ phòng khám",
  },
  {
    icon: "🥗",
    title: "Dinh dưỡng\ncá nhân hóa",
    desc: "Công thức ăn phù hợp với giống, tuổi và tình trạng sức khỏe của boss.",
    accent: "emerald",
    stat: "200+ sản phẩm",
  },
]

export const PRODUCTS = [
  {
    name: "Hạt cho mèo trưởng thành hỗ trợ tiết niệu vị gà 1.5kg",
    brand: "Reflex",
    price: "250.000₫",
    badge: "Mèo triệt sản",
    badgeStyle: { background: "#dcfce7", color: "#059669" },
    rating: "4.8",
    reviews: 312,
    image:
      "https://fexafkqzpbzjcupvbfhe.supabase.co/storage/v1/object/public/product-images/products/456e915f-07c2-4f00-afa2-00c5a0905caf/7c530026-7cb6-47ed-84b9-5eff2bf6be15/h-t-cho-m-o-tr-ng-th-nh-reflex-urinary-h-tr-ti-t-n.jpg",
  },
  {
    name: "Pate hỗn hợp cá cho mèo trưởng thành 12 gói x 85g",
    brand: "Purina Felix",
    price: "22.000₫",
    badge: "Thức ăn ướt cao cấp",
    badgeStyle: { background: "#dbeafe", color: "#1d4ed8" },
    rating: "4.9",
    reviews: 81,
    image:
      "https://cdnpublic.budgetpetproducts.com.au/products_pictures/2023/08/22/5a825394-a6f7-4602-9693-2282ff23b15d.jpg",
  },
  {
    name: "Hạt cho chó trưởng thành cỡ vừa 1.5kg",
    brand: "Royal Canin",
    price: "400.000₫",
    badge: "Chó lớn giống to",
    badgeStyle: { background: "#fff7ed", color: "#ea580c" },
    rating: "4.7",
    reviews: 389,
    image:
      "https://www.petmart.vn/wp-content/uploads/2021/06/thuc-an-cho-cho-truong-thanh-royal-canin-medium-adult2.jpg",
  },
  {
    name: "Hạt cho chó poodle trưởng thành 1.5kg",
    brand: "Royal Canin",
    price: "450.000₫",
    badge: "Không ngũ cốc",
    badgeStyle: { background: "#fef3c7", color: "#d97706" },
    rating: "4.8",
    reviews: 203,
    image:
      "https://www.petmart.vn/wp-content/uploads/2021/06/thuc-an-cho-cho-poodle-truong-thanh-royal-canin-poodle-adult2-768x768.jpg",
  },
  {
    name: "Pate lon cho mèo mẹ và mèo con 195g",
    brand: "Royal Canin",
    price: "90.000₫",
    badge: "Hỗ trợ tiết niệu",
    badgeStyle: { background: "#dcfce7", color: "#059669" },
    rating: "4.8",
    reviews: 116,
    image: "https://cdn.petsathome.com/public/images/products/900_7145134.jpg",
  },
  {
    name: "Hạt cho chó trưởng thành vị cá hồi & gạo 3kg",
    brand: "Ganador",
    price: "190.000₫",
    badge: "Bổ sung dinh dưỡng",
    badgeStyle: { background: "#dbeafe", color: "#1d4ed8" },
    rating: "4.6",
    reviews: 148,
    image:
      "https://aquariumcare.vn/upload/sanpham/hat-ganador-adult-cho-cho-truong-thanh-vi-ca-hoi-gao-20kg-618.jpg",
  },
  {
    name: "Pate lon cho chó trưởng thành vị thịt bò và rau 370g",
    brand: "Purina Pro Plan",
    price: "90.000₫",
    badge: "Sấy đông khô",
    badgeStyle: { background: "#fff7ed", color: "#ea580c" },
    rating: "4.7",
    reviews: 104,
    image:
      "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photosV2/96018c19-de48-493c-bc69-ed45ab99b61f-retina-large.jpg",
  },
  {
    name: "Hạt cho mèo trưởng thành hỗ trợ hệ tiêu hóa vị thịt cừu 1.5kg",
    brand: "Farmina",
    price: "690.000₫",
    badge: "Pate ướt mèo",
    badgeStyle: { background: "#fef3c7", color: "#d97706" },
    rating: "4.5",
    reviews: 92,
    image:
      "https://landofpaws.com/cdn/shop/files/digestioncat.jpg?v=1713552495&width=1400",
  },
]

export const CLINIC_PINS = [
  {
    top: "22%",
    left: "28%",
    name: "Bệnh viện Thú y TP.HCM",
    district: "Quận 1",
    delay: "0s",
  },
  {
    top: "48%",
    left: "58%",
    name: "PetClinic Thảo Điền",
    district: "Quận 2",
    delay: "0.4s",
  },
  {
    top: "68%",
    left: "22%",
    name: "Phòng khám Bình Thạnh",
    district: "Bình Thạnh",
    delay: "0.8s",
  },
  {
    top: "30%",
    left: "72%",
    name: "VetCare Quận 7",
    district: "Quận 7",
    delay: "0.2s",
  },
  {
    top: "58%",
    left: "42%",
    name: "AnimalHouse Tân Bình",
    district: "Tân Bình",
    delay: "0.6s",
  },
]

export const PARTNERS = [
  "Bệnh viện TY TP.HCM",
  "PetSmart Clinic",
  "VetCare Network",
  "AnimalHouse",
  "PawClinic",
]
