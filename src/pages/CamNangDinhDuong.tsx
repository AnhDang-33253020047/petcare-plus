import { useState } from "react"
import { PRODUCTS, em, or, orDark } from "../data"
import { usePet } from "../context/PetContext"

// Bổ sung dữ liệu thành phần dinh dưỡng chi tiết hơn cho các sản phẩm trang 1
const NUTRITION_PRODUCTS_PAGE_1 = PRODUCTS.map((p) => ({
  ...p,
  nutrition: [
    { label: "Đạm (Protein)", value: "32%" },
    { label: "Chất béo", value: "15%" },
    { label: "Chất xơ", value: "3.5%" },
    { label: "Omega-3 & Omega-6", value: "Dồi dào" },
    { label: "Canxi", value: "1.2%" },
    { label: "Photpho", value: "0.9%" },
    { label: "Taurine", value: "Bổ sung" },
  ],
  analysis:
    "Phù hợp để duy trì cơ bắp săn chắc và phát triển hệ xương khớp khỏe mạnh cho thú cưng đang trong giai đoạn trưởng thành.",
}))

// Cập nhật sản phẩm trang 2 với thành phần dinh dưỡng phong phú hơn
const EXTRA_PRODUCTS = [
  {
    name: "Bánh thưởng mềm cho chó vị thịt vịt 170g",
    brand: "Wellness CORE",
    image: "https://m.media-amazon.com/images/I/71oxJJIp-rL.jpg",
    nutrition: [
      { label: "Đạm (Protein)", value: "20%" },
      { label: "Chất béo", value: "10%" },
      { label: "Độ ẩm", value: "22%" },
      { label: "Calo", value: "Thấp" },
      { label: "Chất bảo quản", value: "0%" },
    ],
    analysis:
      "Món ăn vặt ít calo, độ ẩm cao giúp thú cưng dễ nhai, rất tốt cho việc huấn luyện mà không gây béo phì, phù hợp với chế độ kiểm soát cân nặng.",
  },
  {
    name: "Hạt cho mèo con 2.27kg",
    brand: "Nutrience",
    image: "https://m.media-amazon.com/images/I/61BpA-4N6fL.jpg",
    nutrition: [
      { label: "Đạm (Protein)", value: "40%" },
      { label: "Chất béo", value: "20%" },
      { label: "DHA/EPA", value: "Tối ưu" },
      { label: "Canxi", value: "1.5%" },
      { label: "Taurine", value: "0.2%" },
    ],
    analysis:
      "Cung cấp hàm lượng đạm động vật cao, giàu Canxi và DHA giúp phát triển trí não, thị lực và hệ tiêu hóa non nớt của mèo con.",
  },
  {
    name: "Pate lon cho chó vị thịt heo 400g",
    brand: "Monge",
    image: "https://images.demas.it/articoli/itemcode/63/00141463/00141463.jpg",
    nutrition: [
      { label: "Thịt heo tươi", value: "100%" },
      { label: "Đạm (Protein)", value: "8%" },
      { label: "Độ ẩm", value: "80%" },
      { label: "Vitamin A, E", value: "Bổ sung" },
      { label: "Gluten", value: "Không chứa" },
    ],
    analysis:
      "Nguồn đạm đơn duy nhất từ thịt heo, hoàn hảo cho những chú chó có tiền sử dị ứng với thịt gà hoặc bò, giúp tiêu hóa dễ dàng.",
  },
  {
    name: "Pate thịt bò cao cấp cho mèo triệt sản 85g",
    brand: "Monge",
    image: "https://images.demas.it/articoli/itemcode/70/00133770/00133770.jpg",
    nutrition: [
      { label: "Đạm (Protein)", value: "10%" },
      { label: "Chất béo", value: "Giảm 30%" },
      { label: "L-Carnitine", value: "Hỗ trợ" },
      { label: "Độ ẩm", value: "80%" },
      { label: "Khoáng chất", value: "Cân bằng" },
    ],
    analysis:
      "Thiết kế đặc biệt với lượng calo thấp và L-Carnitine giúp chuyển hóa mỡ, ngăn ngừa béo phì và sỏi thận sau khi triệt sản.",
  },
  {
    name: "Bánh thường làm sạch răng cho mèo 50g",
    brand: "Wellness CORE",
    image: "https://m.media-amazon.com/images/I/71ksAmONY6L.jpg",
    nutrition: [
      { label: "Đạm (Protein)", value: "28%" },
      { label: "Taurine", value: "Bổ sung" },
      { label: "Canxi", value: "Hỗ trợ" },
      { label: "Vitamin C", value: "Bổ sung" },
    ],
    analysis:
      "Kết cấu giòn xốp đặc biệt giúp chà xát mảng bám trên răng, kết hợp Vitamin C bảo vệ nướu và sức khỏe răng miệng toàn diện.",
  },
  {
    name: "Hạt tiêu búi lông và kiểm soát cân nặng cho mèo nhà vị gà & gà tây 1.7kg",
    brand: "IAMS",
    image:
      "https://i5.walmartimages.com/seo/Iams-Proactive-Health-Adult-Indoor-Weight-Control-Hairball-Control-Dry-Cat-Food-3-5-Lb-Bag_eeda6609-f779-4554-9e85-76012419a430.1eb87e753e8edd24e6391efacf316e31.jpeg",
    nutrition: [
      { label: "Đạm (Protein)", value: "30%" },
      { label: "Chất xơ tự nhiên", value: "8.5%" },
      { label: "Calo", value: "Kiểm soát" },
      { label: "L-Carnitine", value: "Có" },
      { label: "Omega-6", value: "Tăng cường" },
    ],
    analysis:
      "Giàu chất xơ giúp cuốn trôi lông trong dạ dày, kết hợp L-Carnitine duy trì vóc dáng thon gọn cho mèo ít vận động trong nhà.",
  },
  {
    name: "Hỗn hợp dầu cá chứa Omega-3 dành cho chó và mèo 251ml",
    brand: "Zesty Paws",
    image: "https://m.media-amazon.com/images/I/61oELRcWptL.jpg",
    nutrition: [
      { label: "Omega-3", value: "Chiết xuất tinh khiết" },
      { label: "EPA", value: "350mg" },
      { label: "DHA", value: "230mg" },
      { label: "Vitamin E", value: "Bổ sung" },
    ],
    analysis:
      "Hỗ trợ giảm viêm, giảm ngứa do dị ứng, mang lại bộ lông bóng mượt và bảo vệ hệ tim mạch, xương khớp khỏe mạnh.",
  },
  {
    name: "Bột sữa dê bổ sung vitamin và lợi khuẩn dành cho chó mèo 180g",
    brand: "fera pets",
    image: "https://m.media-amazon.com/images/I/71B6RG+AIOL.jpg",
    nutrition: [
      { label: "Lợi khuẩn (Probiotics)", value: "5 tỷ CFU" },
      { label: "Enzyme tiêu hóa", value: "Tích hợp" },
      { label: "Canxi", value: "Hấp thụ nhanh" },
      { label: "Vitamin D3", value: "Bổ sung" },
      { label: "Lactose", value: "Rất thấp" },
    ],
    analysis:
      "Sữa dê dễ tiêu hóa hơn sữa bò, kết hợp lợi khuẩn giúp phục hồi hệ vi sinh đường ruột cho thú cưng có hệ tiêu hóa yếu hoặc đang hồi phục.",
  },
]

export default function CamNangDinhDuong() {
  const { activePet } = usePet()
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // State để quản lý Pop-up chi tiết sản phẩm
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const displayProducts =
    currentPage === 1 ? NUTRITION_PRODUCTS_PAGE_1 : EXTRA_PRODUCTS

  return (
    <section className="py-10 md:py-16 bg-slate-50 min-h-screen relative">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        {/* HEADER ĐÃ ĐƯỢC CHỈNH LẠI CONTAINER VÀ LOGIC SUBTEXT */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <h1
            className="text-[26px] sm:text-3xl md:text-5xl font-black mb-4 text-gray-900 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Cẩm nang dinh dưỡng từ{" "}
            <span className="text-emerald-600">hồ sơ y tế</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 px-4 mb-6 max-w-3xl mx-auto leading-relaxed">
            Là thư viện tra cứu độc lập, PetCare+ phân tích hồ sơ bệnh án để đề
            xuất các tiêu chuẩn dinh dưỡng chuẩn y khoa. Qua đó, bạn có thể dễ
            dàng đối chiếu thành phần và tự tin chọn mua thực phẩm tốt hơn cho
            thú cưng.
          </p>
        </div>

        {/* TIÊU ĐỀ LƯỚI SẢN PHẨM */}
        <div className="mb-8 md:mb-10 flex items-end justify-between border-t border-gray-200 pt-10">
          <h2
            className="text-2xl md:text-3xl font-black text-gray-900"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            Gợi ý cho thú cưng của bạn
          </h2>
        </div>

        {/* LƯỚI SẢN PHẨM */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {displayProducts.map((p, i) => {
            const isHov = hoveredProduct === i
            return (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden transition-all duration-200 flex flex-col h-full cursor-pointer"
                style={{
                  boxShadow: isHov
                    ? "0 16px 40px rgba(5,150,105,0.13)"
                    : "0 2px 12px rgba(0,0,0,0.04)",
                  border: `1px solid ${
                    isHov ? "rgba(5,150,105,0.18)" : "rgba(0,0,0,0.04)"
                  }`,
                  transform: isHov ? "translateY(-4px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => setSelectedProduct(p)}
              >
                <div
                  className="relative overflow-hidden bg-gray-100"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{
                      transform: isHov ? "scale(1.06)" : "scale(1)",
                      mixBlendMode: "multiply",
                    }}
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="text-sm text-orange-500 font-bold mb-1.5 tracking-wide">
                    {p.brand}
                  </div>
                  <h3
                    className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-3 leading-snug line-clamp-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </h3>

                  {/* Hiển thị tóm tắt 2 thành phần chính ngoài thẻ lưới */}
                  <div className="mt-auto space-y-2 border-t border-gray-100 pt-3">
                    {p.nutrition.slice(0, 2).map((nutri: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-500">{nutri.label}</span>
                        <span className="font-semibold text-gray-800">
                          {nutri.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* PHÂN TRANG */}
        <div
          className="flex justify-center items-center gap-2 mt-10"
          style={{ paddingBottom: 72 }}
        >
          {[1, 2].map((n) => {
            const isActive = n === currentPage
            return (
              <button
                key={n}
                onClick={() => {
                  setCurrentPage(n)
                  window.scrollTo({ top: 300, behavior: "smooth" })
                }}
                className="w-10 h-10 rounded-xl text-sm font-bold transition-all hover:bg-white"
                style={{
                  background: isActive ? "#059669" : "transparent",
                  color: isActive ? "#fff" : "#6b7280",
                  border: isActive ? "none" : "1.5px solid #d1d5db",
                  fontFamily: "var(--font-display)",
                  boxShadow: isActive
                    ? "0 4px 14px rgba(5,150,105,0.3)"
                    : "none",
                }}
              >
                {n}
              </button>
            )
          })}
        </div>
      </div>

      {/* POP-UP (MODAL) HIỂN THỊ CHI TIẾT DINH DƯỠNG (ĐÃ TỐI ƯU GIAO DIỆN MOBILE) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] md:max-h-[90vh] shadow-2xl relative flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Nút Đóng luôn ghim cố định ở góc trên bên phải */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-white/90 hover:bg-gray-100 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 transition-colors z-30 shadow-md border border-gray-100"
              aria-label="Đóng cửa sổ"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Khung nội dung cho phép cuộn mượt mà */}
            <div className="flex flex-col md:flex-row w-full overflow-y-auto">
              {/* Cột Trái: Ảnh sản phẩm (thu nhỏ gọn gàng trên mobile) */}
              <div className="w-full md:w-5/12 bg-gray-50/80 flex items-center justify-center p-4 md:p-8 shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-auto h-36 sm:h-44 md:h-auto md:w-full object-contain max-h-[170px] md:max-h-[360px]"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>

              {/* Cột Phải: Phân tích thành phần */}
              <div className="w-full md:w-7/12 p-5 md:p-8 flex flex-col">
                <div className="text-xs md:text-sm font-bold text-orange-500 tracking-wide mb-1 md:mb-2">
                  {selectedProduct.brand}
                </div>
                <h2
                  className="text-lg md:text-2xl font-black text-gray-900 mb-4 md:mb-6 leading-tight pr-6 md:pr-0"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {selectedProduct.name}
                </h2>

                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 md:p-5 mb-4 md:mb-6">
                  <h4 className="font-bold text-emerald-800 mb-1.5 md:mb-2 flex items-center gap-2 text-sm md:text-base">
                    <svg
                      className="w-5 h-5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Phân tích y khoa
                  </h4>
                  <p className="text-emerald-700 text-xs md:text-sm leading-relaxed">
                    {selectedProduct.analysis}
                  </p>
                </div>

                <h4 className="font-bold text-gray-900 mb-3 text-sm md:text-base">
                  Thành phần dinh dưỡng cốt lõi:
                </h4>
                <div className="space-y-2.5 flex-grow">
                  {selectedProduct.nutrition.map((nutri: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-1.5 md:py-2 border-b border-gray-100 last:border-0 text-sm"
                    >
                      <span className="text-gray-600">{nutri.label}</span>
                      <span className="font-black text-gray-900">
                        {nutri.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
