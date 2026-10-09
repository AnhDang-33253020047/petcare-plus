import { useState } from "react"
import { usePet } from "../context/PetContext"
import { Link } from "react-router"

export default function PetProfile() {
  const [activeTab, setActiveTab] = useState<"health" | "insurance" | "vaccine">("health")
  const { currentUser, activePet, openLoginModal } = usePet()

  // Nếu chưa đăng nhập, hiển thị màn hình yêu cầu đăng nhập
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 md:py-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl shadow-inner border border-emerald-100">
            🐾
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Hồ sơ sức khỏe thú cưng</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Bạn chưa đăng nhập. Vui lòng đăng nhập hệ thống để xem hồ sơ bệnh án điện tử, sổ tiêm chủng và hợp đồng bảo hiểm.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={openLoginModal}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.99]"
            >
              Đăng nhập ngay
            </button>
            <Link
              to="/"
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-xl transition-colors text-center"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Dữ liệu hiển thị dựa trên thú cưng đang chọn
  const petData = activePet || (currentUser.pets && currentUser.pets.length > 0 ? currentUser.pets[0] : null)

  const isDog = petData?.species === "dog"
  const pet = {
    name: petData?.name || "Bí Đỏ",
    species: isDog ? "Chó" : "Mèo",
    breed: petData?.breed || (isDog ? "Poodle" : "Mèo Anh lông ngắn"),
    gender: petData?.genderFull || (petData?.gender?.includes("♀") ? "♀ Cái" : "♂ Đực"),
    age: petData?.age || petData?.desc || "2 tuổi",
    weight: petData?.weight || (isDog ? "5.5 kg" : "4.2 kg"),
    birthday: petData?.birthday || (isDog ? "15/03/2023" : "15/04/2024"),
    neutered: petData?.neutered || (petData?.desc?.includes("tháng") ? "Chưa triệt sản" : "Đã triệt sản"),
    petId: petData?.petId || "PET-NN-8921",
    microchip: petData?.microchip || "981098104829104",
    bcs: petData?.bcs || "5 / 9",
    mer: petData?.mer || (isDog ? "350 kcal" : "218 kcal"),
    k: petData?.k || (isDog ? "1.6" : "1.2"),
    kDesc: isDog
      ? "Chó nhà, năng động"
      : petData?.desc?.includes("tháng")
      ? "Mèo con đang lớn"
      : "Mèo nhà, đã triệt sản",
    clinicalNote:
      petData?.note ||
      (isDog
        ? "Thể trạng cân đối, răng sạch ít vôi. Khuyến nghị duy trì vận động thể chất hàng ngày và tẩy giun định kỳ."
        : "Cân nặng ổn định ở mức 4.2 kg. Khuyến nghị duy trì khẩu phần kết hợp thức ăn ướt (pate) để bổ sung lượng nước tự nhiên, phòng ngừa sỏi tiết niệu và kiểm soát khoáng chất thận."),
    vaccines: petData?.vaccines || [
      {
        title: isDog ? "Vaccine 7 bệnh cho chó (Nhắc lại hàng năm)" : "Vaccine 4 bệnh cho mèo (Mũi 3)",
        status: "Đã tiêm",
        date: "Đã tiêm theo phác đồ",
        clinic: "BV Thú y PetCare Q.2",
      },
      {
        title: "Vaccine dại (Rabies định kỳ)",
        status: "Đã tiêm",
        date: "Đã tiêm theo phác đồ",
        clinic: "BV Thú y PetCare Q.2",
      },
      {
        title: "Tẩy giun & Nhỏ gáy phòng ve rận định kỳ",
        status: "Sắp đến hạn",
        date: "Khuyến nghị: Tháng 11/2026",
        clinic: "Mạng lưới đối tác PetCare+",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* KHỐI 1: DIGITAL ID CARD (HỒ SƠ ĐỊNH DANH) */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-3xl flex items-center justify-center border border-emerald-100 shadow-inner">
                {pet.species === "Mèo" ? "🐱" : "🐶"}
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="text-2xl font-black text-gray-900">{pet.name}</h1>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                    Đã định danh
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">PetCare+ E-Health Record • Chủ nuôi: {currentUser.label}</p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Mã định danh PetID</span>
              <span className="text-sm font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 inline-block mt-1">
                {pet.petId}
              </span>
            </div>
          </div>

          {/* Chi tiết thông số cơ bản */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="text-gray-500 text-xs block">Loài & Giống</span>
              <strong className="text-gray-800">{pet.species} • {pet.breed}</strong>
            </div>
            <div>
              <span className="text-gray-500 text-xs block">Giới tính & Tuổi</span>
              <strong className="text-gray-800">{pet.gender} • {pet.age}</strong>
            </div>
            <div>
              <span className="text-gray-500 text-xs block">Cân nặng</span>
              <strong className="text-emerald-600 font-bold">{pet.weight}</strong>
            </div>
            <div>
              <span className="text-gray-500 text-xs block">Tình trạng sinh sản</span>
              <strong className="text-gray-800">{pet.neutered}</strong>
            </div>
            <div>
              <span className="text-gray-500 text-xs block">Ngày sinh</span>
              <strong className="text-gray-800">{pet.birthday}</strong>
            </div>
            <div>
              <span className="text-gray-500 text-xs block">Mã Microchip</span>
              <strong className="text-gray-800 font-mono text-xs">{pet.microchip}</strong>
            </div>
          </div>
        </div>

        {/* THANH ĐIỀU HƯỚNG TABS */}
        <div className="flex border-b border-gray-200 mb-6 bg-white rounded-2xl p-1.5 shadow-sm">
          <button
            onClick={() => setActiveTab("health")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
              activeTab === "health"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:text-emerald-700 hover:bg-gray-50"
            }`}
          >
            Thể trạng sức khỏe
          </button>
          <button
            onClick={() => setActiveTab("insurance")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
              activeTab === "insurance"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:text-emerald-700 hover:bg-gray-50"
            }`}
          >
            Hợp đồng bảo hiểm
          </button>
          <button
            onClick={() => setActiveTab("vaccine")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
              activeTab === "vaccine"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:text-emerald-700 hover:bg-gray-50"
            }`}
          >
            Sổ tiêm chủng
          </button>
        </div>

        {/* TAB 1: THỂ TRẠNG SỨC KHỎE */}
        {activeTab === "health" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Chỉ số thể trạng & Calo */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>⚖️</span> Đánh giá thể trạng lâm sàng (WSAVA)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-medium block">Điểm thể trạng (BCS)</span>
                  <div className="text-xl font-black text-emerald-700 mt-1">{pet.bcs}</div>
                  <span className="text-xs text-emerald-600 font-semibold">Thể trạng đánh giá</span>
                </div>
                <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100">
                  <span className="text-xs text-orange-800 font-medium block">Năng lượng duy trì (MER)</span>
                  <div className="text-xl font-black text-orange-600 mt-1">{pet.mer}</div>
                  <span className="text-xs text-orange-500">Nhu cầu mỗi ngày</span>
                </div>
                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
                  <span className="text-xs text-blue-800 font-medium block">Hệ số vận động (k)</span>
                  <div className="text-xl font-black text-blue-700 mt-1">{pet.k}</div>
                  <span className="text-xs text-blue-500">{pet.kDesc}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Ghi chú lâm sàng</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {pet.clinicalNote}
                </p>
              </div>
            </div>

            {/* Điều hướng nhanh sang cẩm nang */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-lg">Cần tính định lượng khẩu phần chuẩn?</h4>
                <p className="text-emerald-100 text-xs mt-1">Tra cứu cẩm nang dinh dưỡng được tính toán theo hồ sơ của {pet.name}.</p>
              </div>
              <Link
                to="/cam-nang-dinh-duong"
                className="px-5 py-2.5 bg-white text-emerald-700 font-bold text-sm rounded-xl hover:bg-emerald-50 transition-colors whitespace-nowrap shadow-sm"
              >
                Mở cẩm nang →
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: HỢP ĐỒNG BẢO HIỂM */}
        {activeTab === "insurance" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Gói bảo hiểm đang kích hoạt</span>
                  <h3 className="text-xl font-black text-orange-500 mt-0.5">Gói Tiêu Chuẩn</h3>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Đang hiệu lực
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-xs text-gray-500 block">Hạn mức chi trả tối đa</span>
                  <strong className="text-lg font-black text-gray-800">20.000.000 đ/năm</strong>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-xs text-gray-500 block">Cơ chế bảo lãnh (Cashless)</span>
                  <strong className="text-lg font-black text-emerald-600">Bảo lãnh 80%</strong>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quyền lợi trọng tâm</h4>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Bảo hiểm chi phí cấp cứu, phẫu thuật do tai nạn đột xuất.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Điều trị các bệnh truyền nhiễm cấp tính (FPV, FIP, Cúm mèo, Parvo).</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Đặc quyền Wellness:</strong> Miễn phí 01 mũi tiêm phòng định kỳ hàng năm.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Đối tác cấp đơn: Fubon Insurance</span>
                <Link
                  to="/mua-bao-hiem"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Nâng cấp hoặc thay đổi gói →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SỔ TIÊM CHỦNG */}
        {activeTab === "vaccine" && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
              <div>
                <h3 className="text-lg font-black text-gray-900">Lịch sử phòng bệnh & tiêm chủng</h3>
                <p className="text-xs text-gray-500 mt-0.5">Được đồng bộ trực tiếp từ mạng lưới phòng khám đối tác</p>
              </div>
              <Link
                to="/dat-lich-hen"
                className="w-fit px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                + Đặt lịch tiêm phòng ngay
              </Link>
            </div>

            {/* Dòng thời gian mũi tiêm */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              {pet.vaccines.map((v, i) => (
                <div key={i} className="relative">
                  <div
                    className={`absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                      v.status === "Đã tiêm" ? "bg-emerald-500" : "bg-orange-400 animate-pulse"
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-800">{v.title}</h4>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          v.status === "Đã tiêm"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {v.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {v.date} • {v.clinic}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
