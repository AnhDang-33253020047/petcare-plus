import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router"
import logoImg from "../assets/logo.png"
import catImg from "../assets/PetCare_cat_orange_solid_curved_tail_237x415.png"
import dogImg from "../assets/PetCare_dog_green_right.png"
import { em, emDark, or, orDark } from "../data"
import { usePet } from "../context/PetContext"

// Cấu hình Menu
const NAV_ITEMS = [
  { label: "Mua bảo hiểm", path: "/mua-bao-hiem" },
  { label: "Đặt lịch hẹn", path: "/dat-lich-hen" },
  { label: "Cẩm nang dinh dưỡng", path: "/cam-nang-dinh-duong" },
  { label: "Cẩm nang chăm sóc", path: "/cam-nang-cham-soc" },
]

// Đồng nhất Data với MuaBaoHiem.tsx
const DEMO_ACCOUNTS = [
  {
    id: 1,
    label: "Nam Nguyễn",
    pets: [
      {
        id: "pet-1",
        name: "Bí Đỏ",
        species: "cat",
        gender: "♂",
        desc: "5 tháng",
        petId: "PET-NN-8921"
      },
    ],
  },
  {
    id: 2,
    label: "Ngọc Linh",
    pets: [
      { id: "pet-2", name: "Sam", species: "dog", gender: "♂", desc: "3 tuổi", petId: "PET-NL-4519" },
      { id: "pet-3", name: "Sun", species: "cat", gender: "♀", desc: "2 tuổi", petId: "PET-NL-4520" },
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
        desc: "5 tuổi",
        petId: "PET-BN-3302"
      },
    ],
  },
]

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { activePet, setActivePet } = (usePet() as any) || {}

  const [currentUser, setCurrentUser] = useState<any>(null)
  const [petDropdown, setPetDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // State quản lý Modals
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  // State hỗ trợ luồng chọn thú cưng khi tài khoản có nhiều hơn 1 con
  const [pendingAccountToSelectPet, setPendingAccountToSelectPet] = useState<any>(null)

  useEffect(() => {
    const handleOpenLogin = () => {
      setShowLoginModal(true)
    }
    window.addEventListener("openLoginPopup", handleOpenLogin)

    return () => window.removeEventListener("openLoginPopup", handleOpenLogin)
  }, [])

  const activePath = location.pathname

  const renderPetIcon = (species: string) => {
    if (species === "cat") {
      return (
        <img
          src={catImg}
          alt="Cat"
          className="w-auto h-[58px] object-contain drop-shadow-sm"
        />
      )
    }
    return (
      <img
        src={dogImg}
        alt="Dog"
        className="w-auto h-[46px] object-contain drop-shadow-sm"
      />
    )
  }

  return (
    <>
      <header
        className="bg-white sticky top-0 z-50"
        style={{
          borderBottom: "1px solid #f3f4f6",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 py-0 flex items-center gap-4 md:gap-8">
          <Link
            to="/"
            className="flex items-center flex-shrink-0 transition-opacity hover:opacity-80 active:opacity-60"
            style={{ padding: 0, marginLeft: 8, cursor: "pointer" }}
          >
            <img
              src={logoImg}
              alt="PetCare+"
              style={{ width: 119, height: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map(({ label, path }) => {
              const isActive = activePath === path
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="relative px-4 py-2.5 whitespace-nowrap transition-colors"
                  style={{
                    fontSize: "17.6px",
                    color: isActive ? em : "#374151",
                    fontFamily: "var(--font-display)",
                    fontWeight: isActive ? 700 : 500,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#f9fafb"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.background =
                      "transparent"
                  }}
                >
                  {label}
                </button>
              )
            })}
          </nav>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {currentUser && (
              <>
                <div className="relative">
                  <button
                    onClick={() => setPetDropdown((v) => !v)}
                    className="flex items-center gap-3 px-3 py-1.5 rounded-xl transition-colors"
                    style={{
                      border: "1.5px solid #e5e7eb",
                      background: petDropdown ? "#f0fdf4" : "#fff",
                    }}
                  >
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                      {renderPetIcon(activePet?.species)}
                    </div>
                    <div className="text-left pr-2">
                      <div
                        className="text-[15px] font-bold text-gray-800 leading-none"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Thú cưng đang chọn
                      </div>
                    </div>
                  </button>

                  {petDropdown && (
                    <div
                      className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl overflow-hidden"
                      style={{
                        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                        border: "1px solid #f3f4f6",
                      }}
                    >
                      {currentUser.pets.map((pet: any) => (
                        <button
                          key={pet.id}
                          onClick={() => {
                            if(setActivePet) setActivePet(pet)
                            setPetDropdown(false)
                          }}
                          className="w-full flex items-center gap-4 px-5 py-3 text-left transition-colors"
                          style={{
                            background:
                              pet.id === activePet?.id
                                ? "#f0fdf4"
                                : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            if (pet.id !== activePet?.id)
                              (e.currentTarget as HTMLButtonElement).style.background =
                                "#f9fafb"
                          }}
                          onMouseLeave={(e) => {
                            ;(e.currentTarget as HTMLButtonElement).style.background =
                              pet.id === activePet?.id
                                ? "#f0fdf4"
                                : "transparent"
                          }}
                        >
                          <div className="w-[60px] flex items-center justify-center flex-shrink-0">
                            {renderPetIcon(pet.species)}
                          </div>
                          <div className="flex-1">
                            <div className="text-base font-bold text-gray-800 flex items-center gap-2 mb-1.5">
                              {pet.name}
                            </div>
                            <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                              <span
                                className="font-black text-gray-700 leading-none"
                                style={{ fontSize: "24px" }}
                              >
                                {pet.gender}
                              </span>
                              <span className="text-gray-300">•</span>
                              <span>{pet.desc}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                      <div
                        style={{ borderTop: "1px solid #f3f4f6" }}
                        className="px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <button
                          className="text-sm font-bold w-full text-left"
                          style={{ color: em }}
                        >
                          + Thêm thú cưng mới
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
                  style={{ border: "1.5px solid #e5e7eb" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "transparent")
                  }
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span
                    className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                    style={{ fontSize: 9, fontWeight: 800, background: or }}
                  >
                    2
                  </span>
                </button>
              </>
            )}

            {currentUser ? (
              <button
                onClick={() => setCurrentUser(null)}
                className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Đăng xuất"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-opacity hover:opacity-90 shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${or}, ${orDark})`,
                }}
                title="Đăng nhập"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            {currentUser ? (
              <button
                className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ border: "1.5px solid #e5e7eb" }}
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span
                  className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full text-white flex items-center justify-center"
                  style={{ fontSize: 7, fontWeight: 800, background: or }}
                >
                  2
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setShowLoginModal(true)
                }}
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${or}, ${orDark})`,
                }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors"
              style={{ border: "1.5px solid #e5e7eb" }}
            >
              <span
                className="block w-4 h-0.5 rounded-full bg-gray-700 transition-all"
                style={{
                  transform: mobileMenuOpen
                    ? "rotate(45deg) translate(2px, 3px)"
                    : "none",
                }}
              />
              <span
                className="block w-4 h-0.5 rounded-full bg-gray-700 transition-all"
                style={{ opacity: mobileMenuOpen ? 0 : 1 }}
              />
              <span
                className="block w-4 h-0.5 rounded-full bg-gray-700 transition-all"
                style={{
                  transform: mobileMenuOpen
                    ? "rotate(-45deg) translate(2px, -3px)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div
            className="md:hidden"
            style={{ borderTop: "1px solid #f3f4f6", background: "#fff" }}
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_ITEMS.map(({ label, path }) => (
                <button
                  key={path}
                  onClick={() => {
                    navigate(path)
                    setMobileMenuOpen(false)
                  }}
                  className="text-left px-4 py-3 rounded-xl text-base transition-colors"
                  style={{
                    color: activePath === path ? em : "#374151",
                    fontWeight: activePath === path ? 700 : 500,
                    background: activePath === path ? "#f0fdf4" : "transparent",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>
            <div
              className="px-4 pb-4 flex flex-col gap-4"
              style={{ borderTop: "1px solid #f3f4f6", paddingTop: 16 }}
            >
              {currentUser && (
                <>
                  <div
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ border: "1.5px solid #e5e7eb" }}
                  >
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                      {renderPetIcon(activePet?.species)}
                    </div>
                    <div>
                      <div
                        className="text-[15px] font-bold text-gray-800"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Thú cưng đang chọn
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentUser(null)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full py-3.5 rounded-xl text-base font-bold text-gray-700 bg-gray-100 flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Đăng xuất
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* POPUP ĐĂNG NHẬP HỆ THỐNG */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col">
            
            {pendingAccountToSelectPet ? (
              /* Màn hình 2: Chọn thú cưng (dành cho tài khoản có nhiều hơn 1 pet) */
              <>
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <button onClick={() => setPendingAccountToSelectPet(null)} className="text-gray-400 hover:text-emerald-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="text-[16px] font-bold text-gray-900">Chọn thú cưng</h3>
                  <div className="w-5"></div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Tài khoản <strong>{pendingAccountToSelectPet.label}</strong> đang quản lý nhiều hồ sơ. Vui lòng chọn thú cưng:
                  </p>
                  <div className="space-y-3">
                    {pendingAccountToSelectPet.pets.map((pet: any) => (
                      <button
                        key={pet.id}
                        onClick={() => {
                          setCurrentUser(pendingAccountToSelectPet)
                          if(setActivePet) setActivePet(pet)
                          setPendingAccountToSelectPet(null)
                          setShowLoginModal(false)
                          window.dispatchEvent(new Event("loginSuccessContinueAction"))
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left shadow-sm group"
                      >
                        {/* ĐÃ FIX ĐẦU CHÓ XANH Ở ĐÂY */}
                        <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                          <div className="scale-75 transform mt-1">
                            {renderPetIcon(pet.species)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-bold text-gray-800 group-hover:text-emerald-700 block">
                            {pet.name}
                          </span>
                          <span className="text-[12px] text-gray-500 block">
                            {pet.species === 'cat' ? 'Mèo' : 'Chó'} • {pet.gender} • {pet.desc}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Màn hình 1: Form Đăng nhập & Chọn tài khoản Demo */
              <>
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-[17px] font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Đăng nhập hệ thống
                  </h3>
                  <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <input type="email" placeholder="Email đăng nhập" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-gray-700" />
                    <input type="password" placeholder="Mật khẩu" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-gray-700" />
                    <div className="flex items-center justify-between text-[13px] pt-1">
                      <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                        Lưu lại đăng nhập
                      </label>
                      <span className="text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700">Quên mật khẩu?</span>
                    </div>
                    <button className="w-fit mx-auto block px-12 py-2.5 mt-2 text-white font-bold rounded-lg shadow-sm" style={{ background: "#f97316" }}>
                      Đăng nhập
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-gray-100"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hoặc trải nghiệm nhanh với</span>
                    <div className="flex-1 h-px bg-gray-100"></div>
                  </div>

                  <div className="space-y-3">
                    {DEMO_ACCOUNTS.map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => {
                          if (acc.pets.length === 1) {
                            setCurrentUser(acc)
                            if(setActivePet) setActivePet(acc.pets[0])
                            setShowLoginModal(false)
                            // Bắn sự kiện để các trang khác (như MuaBaoHiem) biết đăng nhập thành công và đi tiếp luồng
                            window.dispatchEvent(new Event("loginSuccessContinueAction"))
                          } else {
                            // Mở màn hình chọn Pet nếu có >= 2 con
                            setPendingAccountToSelectPet(acc)
                          }
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group shadow-sm"
                      >
                        <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs bg-white shrink-0 group-hover:border-emerald-500 group-hover:text-emerald-600">
                          {acc.label.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700">
                          Tài khoản: {acc.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-4 bg-white border-t border-gray-100 text-center text-[13px]">
                  <span className="text-gray-500">Bạn chưa có tài khoản? </span>
                  <span 
                    onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}
                    className="text-emerald-600 font-bold cursor-pointer hover:text-emerald-700"
                  >Đăng ký ngay</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* POPUP ĐĂNG KÝ TÀI KHOẢN */}
      {showRegisterModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden relative shadow-2xl">
            {/* Header Popup */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-gray-50">
              <h3
                className="text-lg font-bold text-gray-800 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Tạo tài khoản PetCare+
              </h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form Đăng ký */}
            <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setShowRegisterModal(false)
                  alert(
                    "Tạo tài khoản thành công! Tính năng đang trong giai đoạn thử nghiệm. Vui lòng sử dụng tài khoản Demo để đăng nhập.",
                  )
                }}
              >
                {/* 1. Thông tin chủ nuôi */}
                <div className="mb-7">
                  <h4 className="text-xs font-bold text-orange-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                      1
                    </span>
                    Thông tin chủ nuôi
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email (dùng để đăng nhập)"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                    />
                    <input
                      type="tel"
                      placeholder="Số điện thoại"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                    />
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* 2. Thông tin thú cưng */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-emerald-600 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      2
                    </span>
                    Hồ sơ thú cưng
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Tên thú cưng"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                    />
                    <div className="flex gap-3">
                      <select
                        required
                        className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 bg-white text-gray-500 text-sm transition-all"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Chọn Loài
                        </option>
                        <option value="dog">Chó</option>
                        <option value="cat">Mèo</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Giống (vd: Poodle)"
                        required
                        className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                      />
                    </div>

                    <div className="pt-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Mã định danh (Microchip / PetID) *"
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm bg-emerald-50/30"
                        />
                        <svg
                          className="w-5 h-5 text-emerald-500 absolute right-4 top-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1.5 ml-1 flex items-start gap-1">
                        <span className="text-red-500">*</span>
                        Trường dữ liệu bắt buộc để đồng bộ hồ sơ y tế phòng khám
                        và xét duyệt bảo lãnh viện phí.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="w-fit mx-auto px-10 py-3.5 rounded-xl text-white font-bold text-base transition-transform active:scale-[0.98] shadow-md mt-4"
                    style={{
                      background: "linear-gradient(135deg, #059669, #047857)",
                    }}
                  >
                    Tạo tài khoản
                  </button>
                </div>
              </form>
            </div>

            {/* Chuyển hướng ngược lại Đăng nhập */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-600">
              <span>Đã có tài khoản?&nbsp;</span>
              <button
                onClick={() => {
                  setShowRegisterModal(false)
                  setShowLoginModal(true)
                }}
                className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
