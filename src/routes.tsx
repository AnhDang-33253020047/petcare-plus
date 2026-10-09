import PetProfile from "./pages/PetProfile"
import { createBrowserRouter } from "react-router"
import Root from "./layouts/Root"
import ShopLayout from "./layouts/ShopLayout"
import Home from "./pages/Home"
// Đã sửa lại đường dẫn import theo đúng tên file mới của bạn
import CamNangDinhDuong from "./pages/CamNangDinhDuong"
import MuaBaoHiem from "./pages/MuaBaoHiem"
import CamNangChamSoc from "./pages/CamNangChamSoc"
import DatLichHen from "./pages/DatLichHen"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [{ index: true, Component: Home }],
  },
  {
    path: "/cam-nang-dinh-duong",
    Component: ShopLayout,
    children: [{ index: true, Component: CamNangDinhDuong }], // Cập nhật tên Component
  },
  {
    path: "/mua-bao-hiem",
    Component: ShopLayout,
    children: [{ index: true, Component: MuaBaoHiem }],
  },
  {
    path: "/cam-nang-cham-soc",
    Component: ShopLayout,
    children: [{ index: true, Component: CamNangChamSoc }],
  },
  {
    path: "/dat-lich-hen",
    Component: ShopLayout,
    children: [{ index: true, Component: DatLichHen }],
  },
])
