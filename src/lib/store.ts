import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  title: string
  price: number
  imageUrl?: string | null
  quantity: number
  size?: string
}

interface CartStore {
  items: CartItem[]
  isCartOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string, size?: string) => void
  updateQuantity: (id: string, size: string | undefined, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          (i) => i.id === item.id && i.size === item.size
        )
        
        if (existingItemIndex > -1) {
          const newItems = [...state.items]
          newItems[existingItemIndex].quantity += item.quantity
          return { items: newItems }
        }
        
        return { items: [...state.items, item] }
      }),
      removeItem: (id, size) => set((state) => ({
        items: state.items.filter((i) => !(i.id === id && i.size === size))
      })),
      updateQuantity: (id, size, quantity) => set((state) => ({
        items: state.items.map((i) => 
          (i.id === id && i.size === size) ? { ...i, quantity } : i
        )
      })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false })
    }),
    {
      name: 'htj-cart-storage'
    }
  )
)
