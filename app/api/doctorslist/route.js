import { connectToDB } from "@/lib/utilsconnection";
import { Patient } from "@/lib/models";

export async function GET() {
  await connectToDB();

  try {
    const doctors = await Patient.distinct("doctor"); 
    return new Response(JSON.stringify({ doctors }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response(JSON.stringify({ message: "Error fetching doctors." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}