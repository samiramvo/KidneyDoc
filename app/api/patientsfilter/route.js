import { connectToDB } from "@/lib/utilsconnection";
import { Patient } from "@/lib/models";

export async function GET(request) {
  const url = new URL(request.url);
  const doctor = url.searchParams.get("doctor");
  const sort = url.searchParams.get("sort");

  await connectToDB();

  try {
    let query = {};
    if (doctor) {
      query.doctor = doctor;
    }

    let patients = await Patient.find(query).lean() || [];

    // Sort patients
    if (sort) {
      if (sort === "nameAsc") {
        patients.sort((a, b) => a.name_patient.localeCompare(b.name_patient));
      } else if (sort === "nameDesc") {
        patients.sort((a, b) => b.name_patient.localeCompare(a.name_patient));
      } else if (sort === "dateAsc") {
        patients.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sort === "dateDesc") {
        patients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }

    return new Response(JSON.stringify({ patients }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return new Response(JSON.stringify({ message: "Error fetching patients." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}