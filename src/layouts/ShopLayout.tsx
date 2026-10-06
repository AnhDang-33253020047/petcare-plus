import { Outlet } from 'react-router'
import Header from '../components/Header'
import { PetProvider } from '../context/PetContext'

export default function ShopLayout() {
  return (
    <PetProvider>
      <div className="bg-white" style={{ fontFamily: 'var(--font-body)', minHeight: '100vh', overflowY: 'auto' }}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </PetProvider>
  )
}
