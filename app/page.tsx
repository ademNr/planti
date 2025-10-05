import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { Badge } from "@/components/ui/badge"
import { Leaf, Package, Sparkles, ArrowRight, CheckCircle2, ShoppingBag, Star, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-background to-green-500/5" />

        <div className="absolute top-1/4 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-emerald-400/20 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-green-400/20 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 md:space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-emerald-700">500+ clients satisfaits</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight tracking-tight px-2">
                Cultivez Votre Propre
                <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Jardin Aromatique
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                Recevez vos plantes en conserve avec tout le nécessaire. Ouvrez, plantez, et profitez de vos herbes fraîches en quelques semaines.
              </p>
            </div>

            {/* CTA Buttons - Mobile Stacked */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4">
              <Link
                href="#produits"
                className="group inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white hover:bg-emerald-700 transition-all hover:scale-105 hover:shadow-2xl shadow-xl"
              >
                <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Commander maintenant
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#comment-ca-marche"
                className="inline-flex items-center justify-center rounded-xl border-2 border-border bg-background/80 backdrop-blur-sm px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-foreground hover:bg-secondary transition-all"
              >
                Comment ça marche ?
              </a>
            </div>

            {/* Trust Indicators - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 px-4">
              {[
                { icon: CheckCircle2, text: "Livraison 8 TND" },
                { icon: Shield, text: "100% Bio" },
                { icon: Clock, text: "Livraison 2-3 jours" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Mobile Grid */}
      <section id="produits" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm border-emerald-500/30">
              <Leaf className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
              Nos Plantes en Conserve
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
              Choisissez Votre Plante
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-4">
              Chaque conserve contient graines biologiques, substrat naturel, et guide détaillé pour une culture réussie.
            </p>
          </div>

          {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up transform transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Mobile Stacked */}
      <section id="comment-ca-marche" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
              Simple comme 1, 2, 3
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
              De la commande à la récolte, tout est pensé pour vous faciliter la vie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
            {[
              { num: 1, title: "Recevez", desc: "Commandez en ligne et recevez votre conserve en 2-3 jours partout en Tunisie" },
              { num: 2, title: "Plantez", desc: "Suivez notre guide illustré étape par étape pour planter vos graines correctement" },
              { num: 3, title: "Récoltez", desc: "Profitez de vos herbes fraîches et biologiques dans vos plats quotidiens" }
            ].map((step) => (
              <div key={step.num} className="relative text-center group">
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Mobile Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
            {[
              { icon: Leaf, title: "100% Naturel & Bio", desc: "Graines biologiques certifiées et substrat naturel sans produits chimiques" },
              { icon: Package, title: "Livraison Express", desc: "Seulement 8 TND pour une livraison rapide partout en Tunisie sous 2-3 jours" },
              { icon: Sparkles, title: "Guide Détaillé", desc: "Instructions illustrées pour réussir votre culture, même sans expérience" }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed px-2">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 p-8 sm:p-10 md:p-16 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
                Commencez Votre Jardin Aujourd'hui
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-emerald-50 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                Rejoignez des centaines de Tunisiens qui cultivent leurs propres herbes aromatiques à la maison
              </p>
              <Link
                href="#produits"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold text-emerald-700 hover:bg-emerald-50 transition-all hover:scale-105 shadow-xl"
              >
                Voir nos plantes
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-10 md:py-12 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-lg sm:text-xl">
              <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Planti</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Cultivez naturel, mangez frais
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              © 2025 Planti. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}