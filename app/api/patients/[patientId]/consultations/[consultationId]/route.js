import { fetchConsultation } from "@/lib/data";
import { createPDF } from "@/lib/pdfGenerator";

export async function GET(req, { params }) {
  const { patientId, consultationId } = params;

  try {
    const consultation = await fetchConsultation(consultationId);

    if (!consultation) {
      return new Response(
        JSON.stringify({ message: "Consultation not found." }),
        { status: 404 }
      );
    }

    const pdfBuffer = await createPDF(consultation);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du PDF :", error);
    return new Response(
      JSON.stringify({ message: "Erreur lors de la génération du PDF." }),
      { status: 500 }
    );
  }
}
