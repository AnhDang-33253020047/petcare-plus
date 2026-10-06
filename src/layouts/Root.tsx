import { Outlet } from 'react-router'
import Header from '../components/Header'
import { PetProvider } from '../context/PetContext'

export default function Root() {
  return (
    <PetProvider>
      <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-body)' }}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </PetProvider>
  )
}
