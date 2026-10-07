import React, { useState, useEffect } from "react"
import { ARTICLES_DATA, ArticleDetail } from "../articlesData"

export default function CamNangChamSoc() {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCount, setVisibleCount] = useState(3)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetail | null>(null)

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

  const filteredItems = ARTICLES_DATA.filter((item) => {
    const textToSearch = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase()
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
            <h1
              className="text-4xl lg:text-5xl font-black mb-4 leading-tight text-gray-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-emerald-600">Chó mèo</span> là{" "}
              <span className="text-orange-500">bạn</span> của con người!
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Tổng hợp những kiến thức, mẹo vặt và hướng dẫn y khoa giúp bạn tự tin
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

        {/* LƯỚI BÀI VIẾT: BẤM VÀO CARD ĐỂ MỞ BÀI ĐỌC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, visibleCount).map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="group relative bg-white rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col w-full border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100"
            >
              <div className="w-full mb-4 overflow-hidden rounded-xl aspect-[4/3] bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="px-1 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {item.readTime}
                  </span>
                </div>

                <h2
                  className="text-xl font-black mb-2.5 leading-snug text-gray-900 group-hover:text-emerald-700 transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
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
              className="px-10 py-3.5 rounded-full font-bold transition-all duration-300 flex items-center justify-center text-emerald-700 border-2 border-emerald-600 bg-white hover:bg-emerald-50 shadow-sm hover:shadow"
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>

      {/* POPUP CHI TIẾT BÀI VIẾT (FULL ARTICLE READER) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl relative flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Nút Đóng X cố định */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-gray-100 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 transition-colors z-30 shadow-md border border-gray-100"
              aria-label="Đóng bài viết"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Nội dung bài viết cuộn dọc */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              {/* Header bài viết */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase rounded-full">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    • {selectedArticle.readTime} • {selectedArticle.date}
                  </span>
                </div>
                <h1
                  className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {selectedArticle.title}
                </h1>
                <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 pb-4 border-b border-gray-100">
                  <span>Chuyên gia: <strong className="text-gray-800">{selectedArticle.author}</strong></span>
                </div>
              </div>

              {/* Hình ảnh đại diện */}
              <div className="w-full h-56 sm:h-80 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lời mở đầu */}
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed italic bg-slate-50 p-4 rounded-xl border-l-4 border-emerald-500">
                "{selectedArticle.content.intro}"
              </p>

              {/* Các đoạn nội dung chi tiết */}
              <div className="space-y-6 text-gray-800 leading-relaxed">
                {selectedArticle.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h2
                      className="text-lg sm:text-xl font-black text-gray-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {sec.heading}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {sec.body}
                    </p>
                    {sec.points && (
                      <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700">
                        {sec.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Lời khuyên bác sĩ thú y (Vet Tip) */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h3 className="font-bold text-amber-900 mb-1.5 flex items-center gap-2 text-sm sm:text-base">
                  <svg className="w-5 h-5 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Lời khuyên từ Bác sĩ thú y
                </h3>
                <p className="text-amber-800 text-xs sm:text-sm leading-relaxed">
                  {selectedArticle.content.vetTip}
                </p>
              </div>

              {/* Banner kêu gọi hành động bảo hiểm */}
              <div className="bg-emerald-600 text-white rounded-2xl p-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Bảo vệ sức khỏe boss cùng PetCare+</h4>
                  <p className="text-emerald-100 text-xs sm:text-sm">Bảo lãnh viện phí trực tiếp tại hơn 120+ phòng khám đối tác.</p>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 bg-white text-emerald-700 font-bold text-sm rounded-xl hover:bg-emerald-50 transition-colors shrink-0 shadow-sm"
                >
                  Tìm hiểu gói bảo hiểm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nút cuộn lên đầu trang */}
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
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </section>
  )
}
