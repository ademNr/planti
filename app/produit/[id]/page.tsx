"use client"

import { cn } from "@/lib/utils"
import { useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/products"
import { useCart } from "@/contexts/CartContext"
import { ChevronLeft, ChevronRight, Check, Package, Shield, Sparkles, Plus, Minus, ShoppingCart, CheckCircle2, Truck, Leaf, Languages, Download, ChevronDown, BookOpen } from "lucide-react"
import { useEffect } from "react" // Make sure to import useEffect
export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const product = getProductById(params.id as string)
    const { addToCart, clearCart } = useCart()
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)
    const [guideLanguage, setGuideLanguage] = useState<'FR' | 'AR'>('FR')
    const guideRef = useRef<HTMLDivElement>(null)
    const [showScrollButton, setShowScrollButton] = useState(true) // Start as true instead of false
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

    // Map product IDs to their guide image filenames
    const getGuideImagePath = (productId: string, language: 'FR' | 'AR') => {
        const guideMap: Record<string, string> = {
            'basilic': 'basilic',
            'oeillet-dinde': 'inde',
            'origan': 'origan'
        }

        const plantName = guideMap[productId]
        if (!plantName) return null

        const lang = language.toLowerCase()
        return `/guide${plantName}_${lang}.png`
    }

    const guideImagePath = getGuideImagePath(params.id as string, guideLanguage)

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

    const scrollToGuide = () => {
        guideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }


    useEffect(() => {
        const handleScroll = () => {
            // Check if guide section is in view
            if (guideRef.current) {
                const guideRect = guideRef.current.getBoundingClientRect()
                const isGuideInView = guideRect.top < window.innerHeight && guideRect.bottom > 0

                // Hide button only if guide is in view, otherwise show it
                setShowScrollButton(!isGuideInView)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        // Initial check - show button on page load
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
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

                {/* Floating Scroll to Guide Button - Sticky & Minimal */}
                {/* Floating Scroll to Guide Button - Sticky & Minimal */}
                {/* Floating Scroll to Guide Button - Appears on scroll down */}
                {/* Floating Scroll to Guide Button - Ultra Compact & Animated */}
                <button
                    onClick={scrollToGuide}
                    className={cn(
                        "fixed bottom-4 right-4 z-50 group transition-all duration-700 ease-out",
                        showScrollButton
                            ? "opacity-100 translate-y-0 scale-100 rotate-0"
                            : "opacity-0 translate-y-8 scale-50 rotate-45 pointer-events-none"
                    )}
                    aria-label="Voir le guide de plantation"
                >
                    {/* Animated gradient glow - multiple layers */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 opacity-40 blur-xl animate-pulse scale-150" />
                    <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />

                    {/* Main button container */}
                    <div className="relative">
                        {/* Compact main button with morphing effect */}
                        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-125 hover:rounded-xl active:scale-90 border-2 border-white/40 backdrop-blur-2xl group-hover:shadow-emerald-500/60 group-hover:border-white/60 overflow-hidden">

                            {/* Rotating gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/50 via-transparent to-green-400/50 animate-spin" style={{ animationDuration: '3s' }} />

                            {/* Shine sweep effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            {/* Pulsing inner glow */}
                            <div className="absolute inset-2 rounded-full bg-white/10 animate-pulse" style={{ animationDuration: '2s' }} />

                            {/* Icon with bounce animation */}
                            <div className="relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 animate-pulse" style={{ animationDuration: '3s' }}>
                                <BookOpen className="w-5 h-5 text-white drop-shadow-2xl" strokeWidth={2.5} />
                            </div>

                            {/* Orbiting particles */}
                            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping opacity-60" />
                            <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse opacity-80" style={{ animationDelay: '0.5s' }} />
                            <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-green-200 rounded-full animate-ping opacity-70" style={{ animationDelay: '1s' }} />
                        </div>

                        {/* Mobile Label - Sleek slide-in animation */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 sm:hidden animate-pulse" style={{ animationDuration: '3s' }}>
                            <div className="relative px-2.5 py-1.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-[10px] font-bold rounded-lg shadow-2xl backdrop-blur-xl border border-white/20 whitespace-nowrap transition-all duration-300 hover:scale-105">
                                <span className="flex items-center gap-1">
                                    <span className="text-xs animate-bounce" style={{ animationDuration: '1.5s' }}>📖</span>
                                    <span className="tracking-wide">GUIDE</span>
                                </span>
                                {/* Glowing arrow */}
                                <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-0 h-0 border-t-[5px] border-b-[5px] border-l-[5px] border-transparent border-l-gray-900" />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/30 to-green-500/30 blur-md animate-pulse -z-10" />
                            </div>
                        </div>

                        {/* Desktop Tooltip - Smooth float */}
                        <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 pointer-events-none">
                            <div className="relative px-3 py-1.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-[10px] font-bold rounded-lg shadow-2xl backdrop-blur-xl border border-white/20 whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                    <BookOpen className="w-3 h-3 animate-pulse" />
                                    <span className="tracking-wide">GUIDE</span>
                                </div>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-gray-900" />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/40 to-green-500/40 blur-lg -z-10 animate-pulse" />
                            </div>
                        </div>

                        {/* Animated chevron with glow trail */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDuration: '2s' }}>
                            <div className="relative">
                                <ChevronDown className="w-3 h-3 text-emerald-500 drop-shadow-lg" strokeWidth={3.5} />
                                <ChevronDown className="absolute inset-0 w-3 h-3 text-emerald-300 blur-sm animate-pulse" strokeWidth={3.5} />
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            {/* Usage Guide Section - With Image Support */}
            <div ref={guideRef} className="bg-gradient-to-br from-emerald-50/50 via-background to-green-50/30 dark:from-emerald-950/20 dark:via-background dark:to-green-950/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-border/50 shadow-xl scroll-mt-4">
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                    <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-foreground mb-2 sm:mb-4 tracking-tight">
                        {product.usageGuide.title}
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto mb-4 sm:mb-6">
                        Suivez ces étapes pour cultiver votre {product.name.toLowerCase()}
                    </p>

                    {/* Language Toggle - Clean Design */}
                    {guideImagePath && (
                        <div className="inline-flex items-center gap-2 bg-card border-2 border-border rounded-full p-1 shadow-lg">
                            <button
                                onClick={() => setGuideLanguage('FR')}
                                className={cn(
                                    "flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300",
                                    guideLanguage === 'FR'
                                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Français
                            </button>
                            <button
                                onClick={() => setGuideLanguage('AR')}
                                className={cn(
                                    "flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300",
                                    guideLanguage === 'AR'
                                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                العربية
                            </button>
                        </div>
                    )}
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Guide Image Display - Premium Design */}
                    {guideImagePath ? (
                        <div className="space-y-6 sm:space-y-8">
                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl border-2 border-emerald-200/50 dark:border-emerald-800/30">
                                {/* Image Container */}
                                <div className="relative w-full">
                                    <Image
                                        src={guideImagePath}
                                        alt={`Guide de plantation ${product.name} - ${guideLanguage}`}
                                        width={1200}
                                        height={1600}
                                        className="w-full h-auto"
                                        priority
                                    />
                                </div>

                                {/* Overlay gradient for better readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Download Guide CTA */}
                            <div className="text-center">
                                <a
                                    href={guideImagePath}
                                    download={`Guide-${product.name}-${guideLanguage}.png`}
                                    className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 text-sm sm:text-base"
                                >
                                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Télécharger le guide
                                </a>
                            </div>
                        </div>
                    ) : (
                        /* Fallback to step-by-step guide if no image */
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>



    );
}
