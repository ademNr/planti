"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/lib/products'

interface CartItem {
    product: Product
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('planti-cart')
        if (savedCart) {
            setItems(JSON.parse(savedCart))
        }
    }, [])

    // Save cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('planti-cart', JSON.stringify(items))
    }, [items])

    const addToCart = (product: Product, quantity: number = 1) => {
        setItems(current => {
            const existingItem = current.find(item => item.product.id === product.id)

            if (existingItem) {
                return current.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }

            return [...current, { product, quantity }]
        })
    }

    const removeFromCart = (productId: string) => {
        setItems(current => current.filter(item => item.product.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }

        setItems(current =>
            current.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}