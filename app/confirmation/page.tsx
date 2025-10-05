"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, Truck, Home, ShoppingBag } from "lucide-react"

interface OrderProduct {
    product: {
        id: string
        name: string
        price: number
        description: string
        images: {
            main: string
        }
    }
    quantity: number
}

interface OrderData {
    products: OrderProduct[]
    customer: {
        fullName: string
        city: string
        postalCode: string
        phone: string
        email: string
    }
    totalPrice: number
}

export default function ConfirmationPage() {
    const router = useRouter()
    const [orderData, setOrderData] = useState<OrderData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const data = sessionStorage.getItem("orderData")
        if (data) {
            setOrderData(JSON.parse(data))
        }
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Chargement...</p>
                </div>
            </div>
        )
    }

    if (!orderData) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h1 className="text-xl font-bold text-foreground mb-2">Aucune commande trouvée</h1>
                    <p className="text-sm text-muted-foreground mb-6">Veuillez passer une commande d'abord.</p>
                    <Button onClick={() => router.push("/")}>Retour à l'accueil</Button>
                </div>
            </div>
        )
    }

    const { products, customer, totalPrice } = orderData
    const deliveryFee = 7
    const productsTotal = totalPrice - deliveryFee

    const handleNavigateHome = () => {
        sessionStorage.removeItem("orderData")
        router.push("/")
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Success Header */}
                    <div className="text-center mb-8 sm:mb-10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                            Commande confirmée
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Merci pour votre commande. Nous vous contacterons bientôt.
                        </p>
                    </div>

                    {/* Order Details */}
                    <div className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border shadow-sm mb-5">
                        <h2 className="text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Package className="h-5 w-5 text-emerald-600" />
                            Détails de la commande
                        </h2>

                        {/* Products */}
                        <div className="space-y-3 mb-5 pb-5 border-b border-border">
                            {products.map((item, index) => (
                                <div key={index} className="flex gap-3">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                        <Image
                                            src={item.product.images.main}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Quantité: {item.quantity}
                                        </p>
                                        <p className="text-sm font-bold text-emerald-600">
                                            {item.product.price * item.quantity} TND
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Customer Info */}
                        <div className="mb-5 pb-5 border-b border-border">
                            <h3 className="font-semibold text-sm text-foreground mb-3">
                                Informations de livraison
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Nom</span>
                                    <span className="font-medium text-foreground">{customer.fullName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Téléphone</span>
                                    <span className="font-medium text-foreground">{customer.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Ville</span>
                                    <span className="font-medium text-foreground">{customer.city}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Email</span>
                                    <span className="font-medium text-foreground truncate ml-2">{customer.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Sous-total</span>
                                <span className="font-medium">{productsTotal} TND</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Livraison</span>
                                <span className="font-medium">{deliveryFee} TND</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-border">
                                <span className="font-bold text-foreground">Total</span>
                                <span className="font-bold text-emerald-600 text-base">{totalPrice} TND</span>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-emerald-200 dark:border-emerald-900/30 mb-5">
                        <h3 className="font-bold text-foreground mb-3 text-sm sm:text-base">
                            Prochaines étapes
                        </h3>
                        <ul className="space-y-2 text-sm text-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>Nous avons bien reçu votre commande</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>Vous recevrez un appel de confirmation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>Paiement à la livraison ({totalPrice} TND)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>Livraison sous 2-3 jours ouvrables</span>
                            </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            onClick={handleNavigateHome}
                            className="w-full h-12 sm:h-13 bg-emerald-600 hover:bg-emerald-700"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Retour à l'accueil
                        </Button>
                        <Button
                            onClick={handleNavigateHome}
                            variant="outline"
                            className="w-full h-12 sm:h-13"
                        >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Commander d'autres plantes
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-border py-8 mt-12 bg-secondary/5">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xs text-muted-foreground">
                        © 2025 Planti. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    )
}