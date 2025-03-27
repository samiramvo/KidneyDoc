import { fetchNoteById } from "@/lib/data";
import { createPDF } from "@/lib/pdfNotes";

export async function GET(req, { params }) {
  const { noteId } = params;

  try {
    const note = await fetchNoteById(noteId);

    if (!note) {
      return new Response(
        JSON.stringify({ message: "Note introuvable." }),
        { status: 404 }
      );
    }

    const pdfBuffer = await createPDF(note); 

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Access-Control-Allow-Origin": "*",
        "X-Frame-Options": "SAMEORIGIN",
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
