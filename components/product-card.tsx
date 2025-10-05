"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { Sparkles, ArrowRight, ShoppingCart, Check } from "lucide-react"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const [showAddedFeedback, setShowAddedFeedback] = useState(false)
    const { addToCart } = useCart()

    const handleMouseEnter = () => {
        setIsHovering(true)
        let index = 0
        const interval = setInterval(() => {
            index = (index + 1) % product.images.growth.length
            setCurrentImageIndex(index)
        }, 600)
            ; (window as any)[`interval-${product.id}`] = interval
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        setCurrentImageIndex(0)
        const interval = (window as any)[`interval-${product.id}`]
        if (interval) {
            clearInterval(interval)
        }
    }

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
        setShowAddedFeedback(true)

        setTimeout(() => {
            setShowAddedFeedback(false)
        }, 2000)
    }

    return (
        <Link href={`/produit/${product.id}`} className="block h-full group">
            <Card
                className="overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgba(16,185,129,0.15)] hover:-translate-y-1 md:hover:-translate-y-2 cursor-pointer h-full flex flex-col border border-border/40 hover:border-emerald-400/60 bg-card relative active:scale-[0.98]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Image Container - Mobile Optimized */}
                <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-50/80 via-white to-green-50/50 dark:from-emerald-950/30 dark:via-background dark:to-green-950/20">
                    <Image
                        src={isHovering ? product.images.growth[currentImageIndex] : product.images.main}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.15] group-hover:rotate-1"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={false}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Quick Add Button - Mobile Optimized */}
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform md:translate-y-4 md:group-hover:translate-y-0 z-10">
                        <button
                            onClick={handleQuickAdd}
                            className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${showAddedFeedback
                                ? "bg-green-500 scale-110"
                                : "bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:scale-95 md:hover:scale-110"
                                } text-white`}
                            aria-label={showAddedFeedback ? "Ajouté au panier" : "Ajouter au panier"}
                        >
                            <div className="absolute inset-0 rounded-full bg-white/20" />
                            {showAddedFeedback ? (
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                            ) : (
                                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                            )}
                        </button>

                        {showAddedFeedback && (
                            <div className="absolute -top-12 sm:-top-14 right-0 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-2xl whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                                ✓ Ajouté
                            </div>
                        )}
                    </div>

                    {/* Popular Badge - Mobile Responsive */}
                    {product.id === "basilic-fin-vert" && (
                        <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[10px] sm:text-xs font-bold shadow-xl border-0 px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm">
                            <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                            <span className="hidden min-[380px]:inline">Populaire</span>
                            <span className="min-[380px]:hidden">Top</span>
                        </Badge>
                    )}

                    {/* Bio Badge - Mobile Responsive */}
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                        🌿 100% Bio
                    </div>
                </div>

                {/* Content - Mobile First Design */}
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-emerald-50/30 dark:to-emerald-950/10">
                    {/* Product Name - Mobile Optimized */}
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-1.5 sm:mb-2 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2 sm:line-clamp-1 tracking-tight leading-snug">
                        {product.name}
                    </h3>

                    {/* Description - Better Mobile Readability */}
                    <p className="text-xs sm:text-sm text-muted-foreground/90 mb-3 sm:mb-4 md:mb-5 line-clamp-2 leading-relaxed flex-grow">
                        {product.description}
                    </p>

                    {/* Pricing Section - Mobile Layout */}
                    <div className="space-y-2 sm:space-y-3 mt-auto">
                        <div className="flex items-end justify-between gap-2">
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    {product.price}
                                </span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-emerald-600/80">
                                    TND
                                </span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] sm:text-xs text-muted-foreground/70 font-medium">
                                    + 7 TND
                                </span>
                                <span className="text-[9px] sm:text-[10px] text-muted-foreground/60">
                                    livraison
                                </span>
                            </div>
                        </div>

                        {/* CTA Button - Touch Friendly */}
                        <div className="pt-2 sm:pt-3 border-t border-emerald-100 dark:border-emerald-900/30">
                            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300 min-h-[32px] sm:min-h-[36px]">
                                <span className="group-hover:tracking-wide transition-all duration-300">
                                    Voir les détails
                                </span>
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-300 flex-shrink-0">
                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform duration-300 group-hover:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover Border Glow Effect - Subtle on Mobile */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_0_1px_rgba(16,185,129,0.3)] md:shadow-[inset_0_0_0_2px_rgba(16,185,129,0.3)]" />

                {/* Corner Accent - Hidden on Small Screens */}
                <div className="hidden md:block absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
        </Link>
    )
}