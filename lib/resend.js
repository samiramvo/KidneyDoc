"use server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email, username, password, admin) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px; overflow: hidden;">
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
          <img src="https://example.com/logo.png" alt="KidneyDoc" style="max-width: 150px;"/>
        </div>
        <div style="padding: 20px;">
          <h2 style="font-size: 24px; color: #333;">Bienvenue sur KidneyDoc, ${username}!</h2>
          <p>Nous sommes ravis de vous accueillir sur notre plateforme. Voici vos informations de connexion :</p>
          <p><strong>Nom d'utilisateur :</strong> ${username}</p>
           <p><strong>Email :</strong> ${email}</p>
          <p><strong>Mot de passe :</strong> ${password}</p>
         <p><strong>Administrateur :</strong> ${
           admin === true ? "Oui" : "Non"
         }</p>
          <p>Vous pouvez maintenant accéder à votre compte et profiter de tous les services que nous offrons.</p>
          <p>Merci de nous avoir rejoint !</p>
          <p style="text-align: center; margin-top: 30px;">
           <a href="http://localhost:3000/" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Se connecter</a>
         </p>
        </div>
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #888;">
          <p>&copy; 2024 KidneyDoc. Tous droits réservés.</p>
        
        </div>
      </div>
    </div>
  `;

  // const message = {
  //   to: [email],
  //   from: "KidneyDOC <onboarding@resend.dev>",
  //   subject: "Bienvenue sur notre plateforme KidneyDoc",
  //   html: htmlContent,
  // };

  // try {
  //   await resend.emails.send(message);
  //   return { success: true };
  // } catch (error) {
  //   console.error("Erreur lors de l'envoi de l'email :", error);
  //   return { success: false, error: "Erreur lors de l'envoi de l'email." };
  // }

  try {
    const message = {
      to: email,
      from: "onboarding@resend.dev", // Utilisez cette adresse pour les tests
      subject: "Bienvenue sur notre plateforme KidneyDoc",
      html: htmlContent,
    };

    const response = await resend.emails.send(message);
    
    if (response.error) {
      console.error("Erreur Resend:", response.error);
      return { 
        success: false, 
        error: "Erreur lors de l'envoi de l'email" 
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return { 
      success: false, 
      error: error.message || "Erreur lors de l'envoi de l'email" 
    };
  }
};
