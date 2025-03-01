import { connectToDB } from "@/lib/utilsconnection";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { emailuser, code, newPassword } = await request.json();
    await connectToDB();

    const user = await User.findOne({
      emailuser,
      resetPasswordCode: code,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json(
        { message: "Code invalide ou expiré" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    user.passworduser = hashedPassword;
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return Response.json(
      { message: "Mot de passe mis à jour avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Erreur lors de la réinitialisation du mot de passe" },
      { status: 500 }
    );
  }
}