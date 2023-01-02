import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Filters from "../components/Filters";

type FilterProviderProps = {
    children: ReactNode
}

type FilterContextProps = {
    filterOpen: () => void
    filterClose: () => void
    filterCategory: string[]
    addCategory: (category: string) => void
    removeCategory: (category: string) => void
}

const FilterContext = createContext({} as FilterContextProps)

export function useCFilter() {
    return useContext(FilterContext)
}

export function FilterProvider({children}: FilterProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [filterCategory, setFilterCategory] = useState<string[]>([])

    const filterOpen = () => setIsOpen(true)
    const filterClose = () => setIsOpen(false)

    function addCategory(category: string) {
        setFilterCategory(cat => {
            return [...cat, category]
        })
    }

    function removeCategory(category: string) {
        setFilterCategory(cat => {
            return filterCategory.filter(c => c !== category)
        })
    }

    return (
    <FilterContext.Provider value={{filterOpen, filterClose, filterCategory, addCategory, removeCategory}}>
        <Filters isOpen={isOpen} />
        {children}
    </FilterContext.Provider>)
}