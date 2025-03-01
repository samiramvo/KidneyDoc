import { connectToDB } from "@/lib/utilsconnection";
import { User } from "@/lib/models";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { emailuser } = await request.json();
    await connectToDB();

    const user = await User.findOne({ emailuser });
    if (!user) {
      return Response.json(
        { message: "Aucun compte associé à cet email" },
        { status: 404 }
      );
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000);
    
    user.resetPasswordCode = resetCode;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    await resend.emails.send({
      from: 'votre-domaine@resend.dev',
      to: emailuser,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <h1>Réinitialisation de mot de passe</h1>
        <p>Voici votre code de réinitialisation : <strong>${resetCode}</strong></p>
        <p>Ce code expirera dans 15 minutes.</p>
      `
    });

    return Response.json(
      { message: "Code de réinitialisation envoyé" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Erreur lors de l'envoi du code" },
      { status: 500 }
    );
  }
}