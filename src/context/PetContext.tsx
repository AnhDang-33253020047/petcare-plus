import { createContext, useContext, useState, useEffect } from 'react'
import { PetItem, DemoAccount, DEMO_ACCOUNTS } from '../data'

interface PetContextValue {
  currentUser: DemoAccount | null
  setCurrentUser: (user: DemoAccount | null) => void
  activePet: PetItem | null
  setActivePet: (pet: PetItem | null) => void
  login: (user: DemoAccount, pet?: PetItem) => void
  logout: () => void
  isLoginModalOpen: boolean
  setIsLoginModalOpen: (open: boolean) => void
  openLoginModal: () => void
  closeLoginModal: () => void
  demoAccounts: DemoAccount[]
}

const PetContext = createContext<PetContextValue>({
  currentUser: null,
  setCurrentUser: () => {},
  activePet: null,
  setActivePet: () => {},
  login: () => {},
  logout: () => {},
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
  openLoginModal: () => {},
  closeLoginModal: () => {},
  demoAccounts: DEMO_ACCOUNTS,
})

const USER_STORAGE_KEY = 'petcare_current_user'
const PET_STORAGE_KEY = 'petcare_active_pet'

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<DemoAccount | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY)
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  const [activePet, setActivePetState] = useState<PetItem | null>(() => {
    try {
      const savedPet = localStorage.getItem(PET_STORAGE_KEY)
      return savedPet ? JSON.parse(savedPet) : null
    } catch {
      return null
    }
  })

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const setCurrentUser = (user: DemoAccount | null) => {
    setCurrentUserState(user)
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  }

  const setActivePet = (pet: PetItem | null) => {
    setActivePetState(pet)
    if (pet) {
      localStorage.setItem(PET_STORAGE_KEY, JSON.stringify(pet))
    } else {
      localStorage.removeItem(PET_STORAGE_KEY)
    }
  }

  const login = (user: DemoAccount, pet?: PetItem) => {
    const selectedPet = pet || (user.pets && user.pets.length > 0 ? user.pets[0] : null)
    setCurrentUser(user)
    setActivePet(selectedPet)
    setIsLoginModalOpen(false)
    window.dispatchEvent(new Event('loginSuccessContinueAction'))
  }

  const logout = () => {
    setCurrentUser(null)
    setActivePet(null)
    localStorage.removeItem(USER_STORAGE_KEY)
    localStorage.removeItem(PET_STORAGE_KEY)
    window.dispatchEvent(new Event('userLogout'))
  }

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  useEffect(() => {
    const handleOpenLogin = () => setIsLoginModalOpen(true)
    const handleTriggerLogout = () => logout()

    window.addEventListener('openLoginPopup', handleOpenLogin)
    window.addEventListener('triggerLogout', handleTriggerLogout)

    return () => {
      window.removeEventListener('openLoginPopup', handleOpenLogin)
      window.removeEventListener('triggerLogout', handleTriggerLogout)
    }
  }, [])

  return (
    <PetContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activePet,
        setActivePet,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        demoAccounts: DEMO_ACCOUNTS,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}

export const usePet = () => useContext(PetContext)
