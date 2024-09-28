import nodemailer from "nodemailer";

let storedOtp; // Variable pour stocker l'OTP

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Génération d'un OTP aléatoire
    storedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Configurez votre transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // ou un autre service
      auth: {
        user: process.env.EMAIL_USER, // Votre adresse email
        pass: process.env.EMAIL_PASS, // Votre mot de passe d'application
      },
    });

    // Envoyer l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Votre OTP",
      text: `Votre OTP est : ${storedOtp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "OTP envoyé" });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
