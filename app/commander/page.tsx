"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/CartContext"
import { ChevronLeft, Shield, Package, Clock, Trash2, Plus, Minus, Truck, CheckCircle2, Sparkles, ShoppingBag } from "lucide-react"

export default function OrderPage() {
    const router = useRouter()
    const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

    const [formData, setFormData] = useState({
        fullName: "",
        city: "",
        postalCode: "",
        phone: "",
        email: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const deliveryFee = 7
    const finalTotal = totalPrice + deliveryFee

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Votre panier est vide</h1>
                    <p className="text-sm text-muted-foreground mb-6">Ajoutez des produits avant de commander.</p>
                    <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-emerald-600 to-green-600">
                        Retour à l'accueil
                    </Button>
                </div>
            </div>
        )
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Le nom complet est requis"
        }
        if (!formData.city.trim()) {
            newErrors.city = "La ville est requise"
        }
        if (!formData.postalCode.trim()) {
            newErrors.postalCode = "Le code postal est requis"
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Le numéro de téléphone est requis"
        } else if (!/^\d{8}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Numéro invalide (8 chiffres)"
        }
        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email invalide"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSubmitting(true)

            try {
                const response = await fetch("/api/send-order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        products: items,
                        customer: formData,
                        totalPrice: finalTotal,
                    }),
                })

                const result = await response.json()

                if (result.success) {
                    console.log("[v0] Email envoyé avec succès")
                } else {
                    console.error("[v0] Erreur lors de l'envoi de l'email:", result.message)
                }

                sessionStorage.setItem(
                    "orderData",
                    JSON.stringify({
                        products: items,
                        customer: formData,
                        totalPrice: finalTotal,
                    }),
                )

                clearCart()
                router.push("/confirmation")
            } catch (error) {
                console.error("[v0] Erreur lors de l'envoi de la commande:", error)
                sessionStorage.setItem(
                    "orderData",
                    JSON.stringify({
                        products: items,
                        customer: formData,
                        totalPrice: finalTotal,
                    }),
                )
                clearCart()
                router.push("/confirmation")
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-background to-green-50/20 dark:from-emerald-950/10 dark:via-background dark:to-green-950/5">
            <Header />

            <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-4 sm:mb-6 -ml-2 hover:bg-secondary/80 active:scale-95 transition-all"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Retour
                </Button>

                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-2 tracking-tight">
                            Finalisez votre commande
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Plus qu'une étape pour recevoir vos plantes bio
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8">
                        {/* Order Form */}
                        <div className="lg:col-span-3 space-y-4 sm:space-y-5">
                            {/* Cart Items */}
                            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-border/50 shadow-xl">
                                <div className="flex items-center justify-between mb-4 sm:mb-5 pb-4 border-b border-border/50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center">
                                            <Package className="h-4 w-4 text-white" />
                                        </div>
                                        <h2 className="text-base sm:text-lg font-bold text-foreground">Vos produits</h2>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                                        {items.reduce((sum, item) => sum + item.quantity, 0)} article{items.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 's' : ''}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex gap-3 bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-xl p-3 border border-border/30 transition-all hover:border-emerald-200 dark:hover:border-emerald-900/50">
                                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 flex-shrink-0 ring-2 ring-border/50">
                                                <Image
                                                    src={item.product.images.main}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-bold text-sm sm:text-base text-foreground mb-1 line-clamp-1">
                                                        {item.product.name}
                                                    </h3>
                                                    <div className="text-sm sm:text-base font-extrabold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                                        {item.product.price} TND
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-1.5 bg-background rounded-lg p-1 shadow-sm">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 flex items-center justify-center transition-all active:scale-95"
                                                        >
                                                            <Minus className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                                                        </button>
                                                        <span className="text-sm font-bold w-7 sm:w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 flex items-center justify-center transition-all active:scale-95"
                                                        >
                                                            <Plus className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all active:scale-95"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-border/50 shadow-xl">
                                <div className="flex items-center gap-2 mb-4 sm:mb-5 pb-4 border-b border-border/50">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center">
                                        <Truck className="h-4 w-4 text-white" />
                                    </div>
                                    <h2 className="text-base sm:text-lg font-bold text-foreground">Informations de livraison</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="fullName" className="text-foreground font-semibold mb-2 block text-sm flex items-center gap-1">
                                            Nom complet <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => handleChange("fullName", e.target.value)}
                                            className={`h-11 sm:h-12 text-sm sm:text-base transition-all ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-emerald-500"
                                                }`}
                                            placeholder="Ahmed Ben Ali"
                                        />
                                        {errors.fullName && (
                                            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                                <span className="w-1 h-1 rounded-full bg-red-500" />
                                                {errors.fullName}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city" className="text-foreground font-semibold mb-2 block text-sm flex items-center gap-1">
                                                Ville <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="city"
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => handleChange("city", e.target.value)}
                                                className={`h-11 sm:h-12 text-sm sm:text-base ${errors.city ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-emerald-500"}`}
                                                placeholder="Tunis"
                                            />
                                            {errors.city && <p className="text-xs text-red-500 mt-1.5">{errors.city}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="postalCode" className="text-foreground font-semibold mb-2 block text-sm flex items-center gap-1">
                                                Code postal <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="postalCode"
                                                type="text"
                                                value={formData.postalCode}
                                                onChange={(e) => handleChange("postalCode", e.target.value)}
                                                className={`h-11 sm:h-12 text-sm sm:text-base ${errors.postalCode ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-emerald-500"}`}
                                                placeholder="1000"
                                            />
                                            {errors.postalCode && <p className="text-xs text-red-500 mt-1.5">{errors.postalCode}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="phone" className="text-foreground font-semibold mb-2 block text-sm flex items-center gap-1">
                                            Téléphone <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleChange("phone", e.target.value)}
                                            className={`h-11 sm:h-12 text-sm sm:text-base ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-emerald-500"}`}
                                            placeholder="12 345 678"
                                        />
                                        {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="email" className="text-foreground font-semibold mb-2 block text-sm flex items-center gap-1">
                                            Email <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            className={`h-11 sm:h-12 text-sm sm:text-base ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-emerald-500"}`}
                                            placeholder="ahmed@example.com"
                                        />
                                        {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                                    </div>
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    size="lg"
                                    className="w-full mt-6 h-12 sm:h-14 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-xl font-bold active:scale-[0.98] transition-all disabled:opacity-70"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Envoi...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                            Confirmer - {finalTotal} TND
                                        </>
                                    )}
                                </Button>
                                <p className="text-xs text-center text-muted-foreground mt-3">
                                    <span className="text-red-500">*</span> Champs obligatoires
                                </p>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-emerald-50/80 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/20 rounded-2xl p-4 sm:p-5 border border-emerald-200/50 dark:border-emerald-800/30 shadow-xl lg:sticky lg:top-20">
                                <h2 className="text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-emerald-600" />
                                    Résumé
                                </h2>

                                <div className="space-y-2.5 mb-4 pb-4 border-b border-emerald-200/50 dark:border-emerald-800/30">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex justify-between text-sm">
                                            <span className="text-foreground font-medium">
                                                {item.product.name} × {item.quantity}
                                            </span>
                                            <span className="font-bold">{item.product.price * item.quantity} TND</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2.5 mb-4 pb-4 border-b border-emerald-200/50 dark:border-emerald-800/30">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Sous-total</span>
                                        <span className="font-bold">{totalPrice} TND</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <Truck className="h-3.5 w-3.5 text-emerald-600" />
                                            <span className="font-medium">Livraison</span>
                                        </div>
                                        <span className="font-bold">{deliveryFee} TND</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-baseline mb-5 pb-5 border-b border-emerald-200/50 dark:border-emerald-800/30">
                                    <span className="text-base sm:text-lg font-extrabold">Total</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                            {finalTotal}
                                        </span>
                                        <span className="text-sm font-bold text-emerald-600">TND</span>
                                    </div>
                                </div>

                                <div className="space-y-2.5 bg-white/60 dark:bg-black/20 rounded-xl p-3 sm:p-4">
                                    {[
                                        { icon: Shield, title: "Paiement sécurisé", desc: "À la livraison" },
                                        { icon: Clock, title: "Livraison rapide", desc: "Sous 2-3 jours" },
                                        { icon: Package, title: "Plantes fraîches", desc: "100% bio" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">{item.title}</p>
                                                <p className="text-[10px] sm:text-xs text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="border-t border-border py-6 sm:py-8 mt-8 sm:mt-12 bg-secondary/10">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xs sm:text-sm text-muted-foreground">© 2025 Planti. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    )
}