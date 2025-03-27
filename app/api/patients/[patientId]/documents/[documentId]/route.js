// import { fetchDocumentById } from "@/lib/data";

// export async function GET(req, { params }) {
//   const { documentId } = params;

//   try {
//     const document = await fetchDocumentById(documentId);

//     if (!document) {
//       return new Response(
//         JSON.stringify({ message: "Document not found." }),
//         { status: 404 }
//       );
//     }

//     // Récupération du blob
//     const blob = await fetch(document.url).then(res => res.blob());

//     return new Response(blob, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `inline; filename="${document.name}"`,
//         "Access-Control-Allow-Origin": "*",
//         "X-Frame-Options": "SAMEORIGIN",
//       },
//     });
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     return new Response(
//       JSON.stringify({ message: "Error generating PDF." }),
//       { status: 500 }
//     );
//   }
// }

import { fetchDocumentById } from "@/lib/data";

export async function GET(req, { params }) {
  const { documentId } = params;

  try {
    const document = await fetchDocumentById(documentId);
    if (!document) {
      return new Response(JSON.stringify({ message: "Document not found." }), { status: 404 });
    }

    console.log("Document URL:", document.url);

    const response = await fetch(document.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.statusText}`);
    }

    const blob = await response.blob();
    console.log("Blob type:", blob.type);

    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${document.name}"`,
        "Access-Control-Allow-Origin": "*",
        "X-Frame-Options": "ALLOWALL",
      },
    });
  } catch (error) {
    console.error("Error serving PDF:", error);
    return new Response(JSON.stringify({ message: "Error fetching PDF." }), { status: 500 });
  }
}
