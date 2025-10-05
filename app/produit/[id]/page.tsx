"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/products"
import { useCart } from "@/contexts/CartContext"
import { ChevronLeft, ChevronRight, Check, Package, Clock, Shield, Sparkles, Plus, Minus, ShoppingCart, CheckCircle2, Truck, Leaf } from "lucide-react"

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const product = getProductById(params.id as string)
    const { addToCart, clearCart } = useCart()
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)

    if (!product) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Produit non trouvé</h1>
                    <Button onClick={() => router.push("/")}>Retour à l'accueil</Button>
                </div>
            </div>
        )
    }

    const deliveryFee = 7
    const totalPrice = (product.price * quantity) + deliveryFee
    const currentStep = product.usageGuide.steps[currentStepIndex]

    const allImages = Array.from(
        new Set([product.images.main, ...product.images.growth])
    )

    const nextStep = () => {
        setCurrentStepIndex((prev) => (prev < product.usageGuide.steps.length - 1 ? prev + 1 : prev))
    }

    const prevStep = () => {
        setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    const handleBuyNow = () => {
        clearCart()
        addToCart(product, quantity)
        router.push("/commander")
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
                {/* Back Button - Mobile Optimized */}
                <Button
                    variant="ghost"
                    onClick={() => router.push("/")}
                    className="mb-4 sm:mb-6 hover:bg-secondary/80 -ml-2 text-sm sm:text-base active:scale-95 transition-transform"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Retour
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 lg:mb-16">
                    {/* Image Gallery - Mobile First */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-50/50 to-green-50/30 dark:from-emerald-950/20 dark:to-green-950/10 shadow-xl border border-border/50">
                            <Image
                                src={allImages[selectedImageIndex] || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20">
                                🌿 100% Bio
                            </div>
                        </div>

                        {/* Thumbnail Grid - Touch Optimized */}
                        <div className="grid grid-cols-4 gap-2 sm:gap-3">
                            {allImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={cn(
                                        "relative aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-secondary transition-all duration-300 active:scale-95",
                                        selectedImageIndex === index
                                            ? "ring-2 ring-emerald-600 ring-offset-2 ring-offset-background shadow-lg scale-105"
                                            : "opacity-60 hover:opacity-100 hover:scale-105",
                                    )}
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`Vue ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="100px"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info - Mobile Optimized */}
                    <div className="flex flex-col space-y-5 sm:space-y-6">
                        {/* Title & Description */}
                        <div className="space-y-3 sm:space-y-4">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                                {product.name}
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector - Enhanced Mobile */}
                        <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-border/50">
                            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-3">
                                Quantité
                            </label>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2 sm:gap-3 bg-background rounded-xl p-1.5 shadow-inner">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={quantity <= 1}
                                        aria-label="Diminuer la quantité"
                                    >
                                        <Minus className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                                    </button>
                                    <span className="text-xl sm:text-2xl font-extrabold w-10 sm:w-12 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 flex items-center justify-center transition-all duration-200 active:scale-95"
                                        aria-label="Augmenter la quantité"
                                    >
                                        <Plus className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                        {product.price * quantity} TND
                                    </div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">
                                        {product.price} TND / unité
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Breakdown - Cleaner Design */}
                        <div className="bg-gradient-to-br from-emerald-50/80 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/20 rounded-2xl p-4 sm:p-5 border border-emerald-200/50 dark:border-emerald-800/30 shadow-lg">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm sm:text-base">
                                    <span className="text-muted-foreground font-medium">Produits</span>
                                    <span className="font-bold text-foreground">{product.price * quantity} TND</span>
                                </div>
                                <div className="flex items-center justify-between text-sm sm:text-base">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-emerald-600" />
                                        <span className="text-muted-foreground font-medium">Livraison</span>
                                    </div>
                                    <span className="font-bold text-foreground">{deliveryFee} TND</span>
                                </div>
                                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 dark:via-emerald-800 to-transparent" />
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-base sm:text-lg font-bold text-foreground">Total</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                            {totalPrice}
                                        </span>
                                        <span className="text-sm sm:text-base font-bold text-emerald-600">TND</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons - Mobile Optimized */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full h-12 sm:h-14 text-sm sm:text-base border-2 font-bold hover:bg-secondary/80 active:scale-[0.98] transition-all duration-200"
                                    onClick={handleAddToCart}
                                >
                                    {addedToCart ? (
                                        <>
                                            <CheckCircle2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                                            Ajouté !
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                            Ajouter
                                        </>
                                    )}
                                </Button>
                                <Button
                                    size="lg"
                                    className="w-full h-12 sm:h-14 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-xl hover:shadow-2xl font-bold active:scale-[0.98] transition-all duration-200"
                                    onClick={handleBuyNow}
                                >
                                    <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    Commander
                                </Button>
                            </div>

                            {/* Feature Badges - Mobile Grid */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-card border border-border/50 rounded-xl p-2.5 sm:p-3 text-center transition-all duration-200 hover:border-emerald-400/50 hover:shadow-md">
                                    <Package className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 mx-auto mb-1" />
                                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">
                                        Livraison rapide
                                    </p>
                                </div>
                                <div className="bg-card border border-border/50 rounded-xl p-2.5 sm:p-3 text-center transition-all duration-200 hover:border-emerald-400/50 hover:shadow-md">
                                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 mx-auto mb-1" />
                                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">
                                        100% naturel
                                    </p>
                                </div>
                                <div className="bg-card border border-border/50 rounded-xl p-2.5 sm:p-3 text-center transition-all duration-200 hover:border-emerald-400/50 hover:shadow-md">
                                    <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 mx-auto mb-1" />
                                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">
                                        Bio certifié
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Indicators - Compact */}
                        <div className="bg-secondary/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 flex-shrink-0" />
                                <span className="text-muted-foreground">Paiement à la livraison</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 flex-shrink-0" />
                                <span className="text-muted-foreground">Livraison 2-3 jours ouvrables</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 flex-shrink-0" />
                                <span className="text-muted-foreground">Graines biologiques certifiées</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Usage Guide - Mobile First Design */}
                <div className="bg-gradient-to-br from-emerald-50/50 via-background to-green-50/30 dark:from-emerald-950/20 dark:via-background dark:to-green-950/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-border/50 shadow-xl">
                    <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                        <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-foreground mb-2 sm:mb-4 tracking-tight">
                            {product.usageGuide.title}
                        </h2>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
                            Suivez ces étapes pour cultiver votre {product.name.toLowerCase()}
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {/* Step Progress - Mobile Optimized */}
                        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 lg:mb-12 overflow-x-auto pb-2 px-4">
                            {product.usageGuide.steps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentStepIndex(index)}
                                    className={cn(
                                        "h-1.5 sm:h-2 rounded-full transition-all duration-300 flex-shrink-0",
                                        index === currentStepIndex
                                            ? "w-10 sm:w-12 bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg"
                                            : index < currentStepIndex
                                                ? "w-6 sm:w-8 bg-emerald-400"
                                                : "w-2.5 sm:w-3 bg-border hover:bg-emerald-300",
                                    )}
                                    aria-label={`Étape ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Step Card - Enhanced Mobile */}
                        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl">
                            <div className="text-center space-y-4 sm:space-y-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 text-white font-extrabold text-xl sm:text-2xl lg:text-3xl shadow-xl ring-4 ring-emerald-100 dark:ring-emerald-900/30">
                                    {currentStep.step}
                                </div>
                                <h3 className="text-lg sm:text-xl lg:text-3xl font-extrabold text-foreground tracking-tight">
                                    {currentStep.title}
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                                    {currentStep.description}
                                </p>

                                {/* Navigation Buttons - Mobile Optimized */}
                                <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6 max-w-md mx-auto">
                                    <Button
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={currentStepIndex === 0}
                                        className="flex-1 h-11 sm:h-12 text-sm sm:text-base font-semibold border-2 disabled:opacity-40 active:scale-95 transition-transform"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" />
                                        Précédent
                                    </Button>
                                    <Button
                                        onClick={nextStep}
                                        disabled={currentStepIndex === product.usageGuide.steps.length - 1}
                                        className="flex-1 h-11 sm:h-12 text-sm sm:text-base font-semibold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:opacity-40 active:scale-95 transition-transform"
                                    >
                                        Suivant
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>

                                {/* Step Counter */}
                                <p className="text-xs sm:text-sm text-muted-foreground font-medium pt-2">
                                    Étape {currentStepIndex + 1} sur {product.usageGuide.steps.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer - Compact */}
            <footer className="border-t border-border py-8 sm:py-12 mt-12 sm:mt-20 bg-secondary/10">
                <div className="container mx-auto px-4 text-center space-y-2">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                        © 2025 Planti. Tous droits réservés.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Cultivez naturel
                    </p>
                </div>
            </footer>
        </div>
    )
}
