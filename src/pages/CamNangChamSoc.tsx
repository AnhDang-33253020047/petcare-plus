import React, { useState, useEffect } from "react"

const FEED_ITEMS = [
  {
    id: 1,
    type: "post",
    title: "Kết hợp thịt sấy khô (freeze-dried) và thức ăn ướt cho mèo kén ăn",
    excerpt:
      "Bí quyết mix các loại thịt sấy khô cùng pate dạng gói giúp kích thích vị giác, đảm bảo boss nạp đủ nước và protein mỗi ngày.",
    category: "Dinh dưỡng",
    image:
      "https://kingspet.vn/wp-content/uploads/2023/03/Product-Listing-Hero-Cat-Food.webp?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 2,
    type: "post",
    title: "Phòng ngừa và hỗ trợ điều trị bệnh tiết niệu ở mèo",
    excerpt:
      "Tìm hiểu nguyên nhân gây sỏi thận, bí tiểu và cách bổ sung các loại gel dinh dưỡng hỗ trợ tiết niệu (urinary) vào chế độ ăn hàng ngày.",
    category: "Bệnh lý",
    image:
      "https://happypaws.vn/wp-content/uploads/benh-viem-phe-quan-o-meo3-1.jpg?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 3,
    type: "post",
    title: "Hiểu đúng về bảo hiểm thú y và hạn mức chi trả",
    excerpt:
      "Làm sao để tận dụng tối đa quyền lợi bảo lãnh viện phí cashless khi đưa boss đi khám? Những điểm loại trừ nào cần lưu ý?",
    category: "Kiến thức",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 4,
    type: "post",
    title: "Bao lâu thì nên chải răng cho thú cưng một lần?",
    excerpt:
      "Chăm sóc răng miệng không chỉ giúp giảm mùi hôi mà còn ngăn ngừa các bệnh lý về nướu. Hướng dẫn các bước chải răng cơ bản tại nhà.",
    category: "Chăm sóc",
    image:
      "https://www.carecredit.com/sites/cc/image/cat_teeth_cleaning.jpg?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 5,
    type: "post",
    title: "Lịch tiêm phòng vaccine cơ bản cho cún con mới đón về",
    excerpt:
      "Tổng hợp các mũi tiêm bắt buộc (5 bệnh, 7 bệnh, dại) và các mốc thời gian quan trọng sen cần ghi nhớ để bảo vệ cún cưng khỏi bệnh truyền nhiễm.",
    category: "Y tế cơ bản",
    image:
      "https://bramaleaanimalhospital.ca/wp-content/uploads/2025/02/puppy-vaccine-veterinarian-labrador.webp?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 6,
    type: "post",
    title: "Mẹo giữ vệ sinh nhà cửa khi nuôi thú cưng trong căn hộ",
    excerpt:
      "Từ việc chọn loại cát vệ sinh ít bụi đến cách xử lý lông rụng trên sofa, giúp không gian sống luôn sạch sẽ thơm tho.",
    category: "Đời sống",
    image:
      "https://housevnstorage.blob.core.windows.net/media/nuoi-thu-cung-trong-can-ho-0009.png?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 7,
    type: "post",
    title: "Cách huấn luyện chó con đi vệ sinh đúng chỗ",
    excerpt:
      "Hướng dẫn các bước thiết lập thói quen và sử dụng khay vệ sinh hoặc tã lót hiệu quả cho cún cưng trong những tháng đầu tiên.",
    category: "Huấn luyện",
    image:
      "https://happypaws.vn/wp-content/uploads/Day-cho-di-ve-sinh-dung-cho.png?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 8,
    type: "post",
    title: "Tại sao mèo thích cắn tay chủ và cách xử lý an toàn",
    excerpt:
      "Hội chứng cắn yêu (love bites) hay hành vi hung hăng do stress? Giải mã tâm lý loài mèo và cách dạy boss chơi đùa không dùng móng vuốt.",
    category: "Tâm lý học",
    image:
      "https://articles.hepper.com/wp-content/uploads/2022/12/cat-bites-the-womans-hand_Luis-Echeverri-Urrea_Shutterstock.jpg?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 9,
    type: "post",
    title: "10 loại thực phẩm tuyệt đối không cho chó ăn",
    excerpt:
      "Nho khô, chocolate, hành tỏi... là những thực phẩm quen thuộc trong bếp nhưng lại có thể gây ngộ độc cấp tính cho chó nhà bạn.",
    category: "Dinh dưỡng",
    image:
      "https://thebreedexpert.com/wp-content/uploads/2026/06/safer-treat-alternatives-for-frenchies-1024x576.webp?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 10,
    type: "post",
    title: "Bệnh búi lông ở mèo: Dấu hiệu và cách phòng ngừa",
    excerpt:
      "Mèo nôn ra những cục lông dài là hiện tượng sinh lý hay bệnh lý? Cách bổ sung cỏ mèo và gel tiêu búi lông đúng chuẩn.",
    category: "Bệnh lý",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HlCOeNfmH2RR75g5IdEo3_OHofIvYWun-ZdblF-HjO7P0n3C_77ot_g&s=10?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 11,
    type: "post",
    title: "Thời gian vận động lý tưởng mỗi ngày cho từng giống chó",
    excerpt:
      "Chó Corgi cần vận động bao lâu? Poodle có cần chạy bộ không? Khám phá lịch trình tập thể dục phù hợp để cún luôn khỏe mạnh.",
    category: "Chăm sóc",
    image:
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 12,
    type: "post",
    title: "Mẹo kích thích mèo uống nhiều nước phòng bệnh suy thận",
    excerpt:
      "Mèo vốn lười uống nước. Đặt đài phun nước, thêm đá viên hay sử dụng súp thưởng là những cách hiệu quả giúp boss cấp ẩm đầy đủ.",
    category: "Chăm sóc",
    image:
      "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt36e4c847afa89ebf/64023a8b27ccd11087ac69df/article-how-get-cat-drink-more-water-open-graph@1x.jpg?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
]

export default function CamNangChamSoc() {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCount, setVisibleCount] = useState(3)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const filteredItems = FEED_ITEMS.filter((item) => {
    const textToSearch = `${item.title} ${item.excerpt}`.toLowerCase()
    return textToSearch.includes(searchTerm.toLowerCase())
  })

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3)
  }

  return (
    <section className="bg-gray-50 min-h-[calc(100vh-64px)] py-10 md:py-16 relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="text-left flex-1 max-w-3xl">
            {/* Đã gỡ dấu ngoặc kép và đổi chữ "Chó mèo" thành màu xanh lá */}
            <h1
              className="text-4xl lg:text-5xl font-black mb-4 leading-tight text-gray-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-emerald-600">Chó mèo</span> là{" "}
              <span className="text-orange-500">bạn</span> của con người!
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Tổng hợp những kiến thức, mẹo vặt và hướng dẫn giúp bạn tự tin
              nuôi dưỡng những người bạn bốn chân luôn khỏe mạnh.
            </p>
          </div>

          <div className="relative w-full lg:w-80 flex-shrink-0">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setVisibleCount(3)
              }}
              className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-gray-200 outline-none text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, visibleCount).map((item) => (
            <article
              key={item.id}
              className="relative bg-white rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1 cursor-pointer flex flex-col w-full border border-gray-100 shadow-sm hover:shadow-md"
            >
              <div
                className={`w-full mb-5 overflow-hidden rounded-xl ${item.aspect}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="px-2 pb-2 flex-1 flex flex-col">
                <div>
                  <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                    {item.category}
                  </span>
                </div>

                <h2
                  className="text-xl font-black mb-3 leading-snug text-gray-900"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
                  {item.excerpt}
                </p>

                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <span className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
                    Đọc tiếp →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Không tìm thấy bài viết nào phù hợp với từ khóa "{searchTerm}".
          </div>
        )}

        {visibleCount < filteredItems.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-10 py-3.5 rounded-full font-bold transition-all duration-300 flex items-center justify-center text-emerald-700 border-2 border-emerald-600 bg-white hover:bg-emerald-50"
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-full text-white transition-all duration-300 transform hover:-translate-y-1 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #f97316, #ea580c)",
          boxShadow: "0 8px 25px rgba(234, 88, 12, 0.4)",
        }}
        title="Lên đầu trang"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </section>
  )
}
