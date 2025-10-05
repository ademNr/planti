"use client"

import Link from "next/link"
import { Leaf, Menu, X, ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/CartContext"
import { CartDropdown } from "@/components/cart-dropdown"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const { totalItems } = useCart()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (cartDropdownOpen && !target.closest('[data-cart-container]')) {
                setCartDropdownOpen(false)
            }
        }

        if (cartDropdownOpen) {
            document.addEventListener('click', handleClickOutside)
        }
        return () => document.removeEventListener('click', handleClickOutside)
    }, [cartDropdownOpen])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
                <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
                    {/* Logo - Enhanced */}
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 sm:gap-2 group relative z-10"
                        onClick={() => {
                            setMobileMenuOpen(false)
                            setCartDropdownOpen(false)
                        }}
                    >
                        <div className="relative">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent leading-none">
                                Planti
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-muted-foreground font-medium leading-none mt-0.5">
                                100% Bio
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Enhanced */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                        <Link
                            href="/"
                            className="px-3 lg:px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-emerald-600 transition-all duration-200 relative group rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                        >
                            Accueil
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-green-600 group-hover:w-4/5 transition-all duration-300 rounded-full" />
                        </Link>
                        <Link
                            href="/#produits"
                            className="px-3 lg:px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-emerald-600 transition-all duration-200 relative group rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                        >
                            Produits
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-green-600 group-hover:w-4/5 transition-all duration-300 rounded-full" />
                        </Link>
                        <Link
                            href="/#comment-ca-marche"
                            className="px-3 lg:px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-emerald-600 transition-all duration-200 relative group rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                        >
                            Comment ça marche
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-green-600 group-hover:w-4/5 transition-all duration-300 rounded-full" />
                        </Link>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Cart Icon - Enhanced */}
                        <div className="relative" data-cart-container>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCartDropdownOpen(!cartDropdownOpen)
                                    setMobileMenuOpen(false)
                                }}
                                className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-300 active:scale-95 ${cartDropdownOpen
                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                                    : 'hover:bg-secondary text-foreground'
                                    }`}
                                aria-label="Panier"
                            >
                                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${cartDropdownOpen ? 'scale-110' : ''
                                    }`} />
                                {isMounted && totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-emerald-600 to-green-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-in zoom-in duration-200">
                                        {totalItems > 9 ? '9+' : totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Cart Dropdown */}
                            {cartDropdownOpen && (
                                <CartDropdown onClose={() => setCartDropdownOpen(false)} />
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={`md:hidden p-2 sm:p-2.5 rounded-xl transition-all duration-300 active:scale-95 ${mobileMenuOpen
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                                : 'hover:bg-secondary text-foreground'
                                }`}
                            onClick={() => {
                                setMobileMenuOpen(!mobileMenuOpen)
                                setCartDropdownOpen(false)
                            }}
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-5 h-5">
                                <Menu className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'
                                    }`} />
                                <X className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'
                                    }`} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu - Enhanced Slide Panel */}
            <div className={`fixed top-14 left-0 right-0 bottom-0 z-40 md:hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <div className="bg-background/98 backdrop-blur-xl border-b border-border/40 shadow-2xl h-auto max-h-[calc(100vh-3.5rem)] overflow-y-auto">
                    <nav className="container mx-auto px-4 py-6 space-y-2">
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 text-base font-semibold text-foreground hover:text-emerald-600 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 active:scale-[0.98] group"
                        >
                            <div className="w-1 h-6 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            <span>Accueil</span>
                        </Link>
                        <Link
                            href="/#produits"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 text-base font-semibold text-foreground hover:text-emerald-600 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 active:scale-[0.98] group"
                        >
                            <div className="w-1 h-6 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            <span>Nos Produits</span>
                        </Link>
                        <Link
                            href="/#comment-ca-marche"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 text-base font-semibold text-foreground hover:text-emerald-600 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 active:scale-[0.98] group"
                        >
                            <div className="w-1 h-6 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            <span>Comment ça marche</span>
                        </Link>
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className="container mx-auto px-4 pb-6 pt-4 border-t border-border/40">
                        <div className="text-center text-sm text-muted-foreground">
                            🌿 Cultivez votre passion
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}