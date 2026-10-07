import { createContext, useContext, useState } from 'react'
import { PETS } from '../data'

type Pet = typeof PETS[number]

interface PetContextValue {
  activePet: Pet
  setActivePet: (pet: Pet) => void
}

const PetContext = createContext<PetContextValue>({
  activePet: PETS[0],
  setActivePet: () => {},
})

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [activePet, setActivePet] = useState(null)
  return (
    <PetContext.Provider value={{ activePet, setActivePet }}>
      {children}
    </PetContext.Provider>
  )
}

export const usePet = () => useContext(PetContext)
