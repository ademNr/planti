export interface Product {
    id: string
    name: string
    price: number
    images: {
        main: string
        growth: string[]
    }
    description: string
    usageGuide: {
        title: string
        steps: {
            step: number
            title: string
            description: string
            image: string
        }[]
    }
}

export const products: Product[] = [
    {
        id: "basilic",
        name: "Basilic",
        price: 19,
        images: {
            main: "/basilic3.png",
            growth: ["/basilic0.png", "/basilic1.png", "/basilic2.png", "/basilic3.png"],
        },
        description:
            "Le basilic est parfaite pour vos plats méditerranéens. Facile à cultiver et délicieux.",
        usageGuide: {
            title: "Comment cultiver votre Basilic Fin Vert",
            steps: [
                {
                    step: 1,
                    title: "Ouvrir la conserve",
                    description: "Retirez délicatement le couvercle de la conserve en utilisant l'ouverture facile.",
                    image: "/opening-can-of-basil.jpg",
                },
                {
                    step: 2,
                    title: "Arroser légèrement",
                    description: "Ajoutez 50ml d'eau à température ambiante sur la terre.",
                    image: "/watering-basil-seeds-in-can.jpg",
                },
                {
                    step: 3,
                    title: "Placer au soleil",
                    description: "Positionnez votre conserve près d'une fenêtre ensoleillée.",
                    image: "/basil-can-near-sunny-window.jpg",
                },
                {
                    step: 4,
                    title: "Entretenir quotidiennement",
                    description: "Arrosez légèrement chaque jour et récoltez après 3-4 semaines.",
                    image: "/harvesting-fresh-basil-from-can.jpg",
                },
            ],
        },
    },
    {
        id: "oeillet-dinde",
        name: "Œillet d'Inde",
        price: 19,
        images: {
            main: "/inde3.png",
            growth: ["/inde0.png", "/inde1.png", "/inde2.png", "/inde3.png"],
        },
        description:
            "L'œillet d'Inde apporte de la couleur à votre espace avec ses fleurs vibrantes. Idéal pour les débutants.",
        usageGuide: {
            title: "Comment cultiver votre Œillet d'Inde",
            steps: [
                {
                    step: 1,
                    title: "Ouvrir la conserve",
                    description: "Ouvrez soigneusement la conserve avec le système d'ouverture intégré.",
                    image: "/opening-marigold-can.jpg",
                },
                {
                    step: 2,
                    title: "Humidifier le substrat",
                    description: "Versez 60ml d'eau pour activer la germination.",
                    image: "/placeholder.svg?height=300&width=300",
                },
                {
                    step: 3,
                    title: "Exposition lumineuse",
                    description: "Placez dans un endroit lumineux mais sans soleil direct.",
                    image: "/placeholder.svg?height=300&width=300",
                },
                {
                    step: 4,
                    title: "Floraison",
                    description: "Admirez vos fleurs après 6-8 semaines de culture.",
                    image: "/placeholder.svg?height=300&width=300",
                },
            ],
        },
    },
    {
        id: "origan",
        name: "Origan",
        price: 19,
        images: {
            main: "/origan3.png",
            growth: ["/origan0.png", "/origan1.png", "/origan2.png", "/origan3.png"],
        },
        description:
            "L'origan est une herbe aromatique méditerranéenne essentielle. Parfait pour pizzas et plats italiens.",
        usageGuide: {
            title: "Comment cultiver votre Origan",
            steps: [
                {
                    step: 1,
                    title: "Ouvrir la conserve",
                    description: "Retirez le couvercle en suivant les instructions sur la boîte.",
                    image: "/placeholder.svg?height=300&width=300",
                },
                {
                    step: 2,
                    title: "Premier arrosage",
                    description: "Ajoutez 45ml d'eau pour démarrer la croissance.",
                    image: "/placeholder.svg?height=300&width=300",
                },
                {
                    step: 3,
                    title: "Emplacement idéal",
                    description: "L'origan aime le soleil, placez-le en pleine lumière.",
                    image: "/placeholder.svg?height=300&width=300",
                },
                {
                    step: 4,
                    title: "Récolte",
                    description: "Cueillez les feuilles après 4-5 semaines de croissance.",
                    image: "/placeholder.svg?height=300&width=300",
                },
            ],
        },
    },

]

export function getProductById(id: string): Product | undefined {
    return products.find((product) => product.id === id)
}
