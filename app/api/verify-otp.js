let storedOtp; // Stockez l'OTP ici pour la vérification

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { otp } = req.body;

    // Vérifiez l'OTP
    if (otp === storedOtp) {
      storedOtp = null; // Réinitialisez l'OTP après vérification
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "OTP incorrect" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
