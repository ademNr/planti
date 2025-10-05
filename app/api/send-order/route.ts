import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { products, customer, totalPrice } = body

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Generate products HTML
    const productsHTML = products.map((item: any) => `
            <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                <strong>${item.product.name}</strong> × ${item.quantity}<br/>
                Prix unitaire: ${item.product.price} TND<br/>
                Sous-total: ${item.product.price * item.quantity} TND
            </div>
        `).join('')

    // Email HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2d5016; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #2d5016; }
            .value { margin-left: 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .product { background: #f8f9fa; padding: 10px; margin: 10px 0; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nouvelle Commande Planti</h1>
            </div>
            <div class="content">
              <div class="section">
                <h2>Informations Client</h2>
                <p><span class="label">Nom complet:</span><span class="value">${customer.fullName}</span></p>
                <p><span class="label">Ville:</span><span class="value">${customer.city}</span></p>
                <p><span class="label">Code postal:</span><span class="value">${customer.postalCode}</span></p>
                <p><span class="label">Téléphone:</span><span class="value">${customer.phone}</span></p>
                <p><span class="label">Email:</span><span class="value">${customer.email}</span></p>
              </div>
              <div class="section">
                <h2>Détails de la Commande</h2>
                <div class="products">
                  ${productsHTML}
                </div>
                <p><span class="label">Nombre total d'articles:</span><span class="value">${products.reduce((sum: number, item: any) => sum + item.quantity, 0)}</span></p>
                <p><span class="label">Prix total des produits:</span><span class="value">${totalPrice - 7} TND</span></p>
                <p><span class="label">Livraison:</span><span class="value">7 TND</span></p>
                <p><span class="label">Prix total:</span><span class="value">${totalPrice} TND</span></p>
              </div>
            </div>
            <div class="footer">
              <p>Cet email a été généré automatiquement par le système de commande Planti.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email to both addresses
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "ademnr2@gmail.com, ameddeb48@gmail.com, contactseifnajeh@gmail.com",
      subject: `Nouvelle commande Planti - ${products.length} produit(s)`,
      html: htmlContent,
    })

    return NextResponse.json({ success: true, message: "Email envoyé avec succès" })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de l'email" }, { status: 500 })
  }
}