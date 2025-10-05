"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, Package } from "lucide-react"

interface CartDropdownProps {
    onClose: () => void
}

export function CartDropdown({ onClose }: CartDropdownProps) {
    const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()

    if (items.length === 0) {
        return (
            <div className="fixed inset-x-4 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 w-auto sm:w-[380px] bg-card/98 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-300">
                <div className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Votre panier est vide</h3>
                    <p className="text-sm text-muted-foreground mb-6">Découvrez nos plantes aromatiques bio</p>
                    <Button
                        asChild
                        onClick={onClose}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        <Link href="/#produits" className="flex items-center justify-center gap-2">
                            Voir les produits
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    const deliveryCost = 7
    const finalTotal = totalPrice + deliveryCost

    return (
        <div className="fixed inset-x-4 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 w-auto sm:w-[400px] bg-card/98 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-300 max-h-[calc(100vh-5rem)] sm:max-h-[600px] flex flex-col">
            <div className="p-4 sm:p-5 border-b border-border/50 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Panier</h3>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                            {totalItems} {totalItems === 1 ? 'article' : 'articles'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="p-3 sm:p-4 space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.product.id}
                            className="group bg-secondary/30 hover:bg-secondary/50 rounded-xl p-3 transition-all duration-300 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-900/50"
                        >
                            <div className="flex gap-3">
                                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 flex-shrink-0 ring-2 ring-border/50 group-hover:ring-emerald-400/50 transition-all duration-300">
                                    <Image
                                        src={item.product.images.main}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        sizes="80px"
                                    />
                                </div>

                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-semibold text-sm text-foreground line-clamp-1 mb-1">
                                            {item.product.name}
                                        </h4>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-base sm:text-lg font-bold text-emerald-600">
                                                {item.product.price}
                                            </span>
                                            <span className="text-xs font-semibold text-emerald-600">TND</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1.5 sm:gap-2 bg-background rounded-lg p-1 shadow-sm">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 flex items-center justify-center transition-all duration-200 active:scale-95 group/btn"
                                                aria-label="Diminuer la quantité"
                                            >
                                                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700 dark:text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                            <span className="text-sm sm:text-base font-bold text-foreground w-6 sm:w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 flex items-center justify-center transition-all duration-200 active:scale-95 group/btn"
                                                aria-label="Augmenter la quantité"
                                            >
                                                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700 dark:text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 active:scale-95"
                                            aria-label="Supprimer du panier"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-border/50 bg-background/50 backdrop-blur-sm p-4 sm:p-5 space-y-3 sm:space-y-4 flex-shrink-0">
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Sous-total</span>
                        <span className="font-semibold text-foreground">{totalPrice} TND</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">Livraison</span>
                        </div>
                        <span className="font-semibold text-foreground">{deliveryCost} TND</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-foreground">Total</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                {finalTotal}
                            </span>
                            <span className="text-sm font-bold text-emerald-600">TND</span>
                        </div>
                    </div>
                </div>

                <Button
                    asChild
                    className="w-full h-11 sm:h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg hover:shadow-xl font-bold active:scale-[0.98] transition-all duration-200"
                    onClick={onClose}
                >
                    <Link href="/commander" className="flex items-center justify-center gap-2">
                        Commander maintenant
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>

                <button
                    onClick={onClose}
                    className="w-full text-sm text-muted-foreground hover:text-emerald-600 transition-colors duration-200 py-2"
                >
                    Continuer mes achats
                </button>
            </div>
        </div>
    )
}