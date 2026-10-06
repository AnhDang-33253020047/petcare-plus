export const em = "#059669"
export const emDark = "#047857"
export const or = "#f97316"
export const orDark = "#ea580c"

export const PETS = [
  { id: 1, name: "Mochi", type: "Mèo cái • 3 tuổi 2 tháng" },
  { id: 2, name: "Bông", type: "Chó đực • 5 tuổi 1 tháng" },
]

export const NAV_ITEMS: { label: string path: string }[] = [
  { label: "Mua bảo hiểm", path: "/mua-bao-hiem" },
  { label: "Đặt lịch hẹn", path: "/dat-lich-hen" },
  { label: "Cửa hàng dinh dưỡng", path: "/cua-hang-dinh-duong" },
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
