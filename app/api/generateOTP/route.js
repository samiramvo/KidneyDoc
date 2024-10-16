// app/api/generateOTP/route.js
import crypto from "crypto";
import twilio from "twilio";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

export async function POST(req) {
  const body = await req.json();

  // Generate a six-digit number using the crypto module
  const otp = crypto.randomInt(100000, 999999);

  // Hash the OTP
  const hashedOtp = await bcrypt.hash(otp.toString(), 10);

  // Initialize the Twilio client
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    // Send the OTP via SMS
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // your Twilio number
      to: body.phone, // your user's phone number
    });

    // Store the hashed OTP in the database along with the phone number and expiry time
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();
    const otps = mongoClient.db().collection("otps");
    await otps.insertOne({
      phone: body.phone,
      otp: hashedOtp,
      expiry: Date.now() + 10 * 60 * 1000, // OTP expires after 10 minutes
    });
    await mongoClient.close();

    // Respond with a success status
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Could not send OTP" }), {
      status: 500,
    });
  }
}
