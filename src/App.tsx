import PetProfile from "./pages/PetProfile"
import { RouterProvider } from 'react-router'
import { router } from './routes'

export default function App() {
  return <RouterProvider router={router} />
}
<Route path="/ho-so-thu-cung" element={<PetProfile />} />
