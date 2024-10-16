import { connectToDB } from "@/lib/utilsconnection";
import { Consultation } from "@/lib/models";
import PDFDocument from "pdfkit";

export async function GET(req, res) {
  const { consultationId } = req.params;
  try {
    await connectToDB();

    const consultation = await Consultation.findById(consultationId).lean();
    if (!consultation) {
      return res.status(404).json({ error: "Consultation not found" });
    }

    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(pdfData),
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename=consultation_${consultationId}.pdf`,
        })
        .end(pdfData);
    });

    // Ajouter le contenu du PDF
    doc.fontSize(20).text("Consultation Details", { align: "center" });
    doc.moveDown();
    doc
      .fontSize(12)
      .text(
        `Reason for Hospitalization: ${consultation.reasonForHospitalization}`
      );
    doc.text(
      `Personal Medical History: ${consultation.medicalHistory.personal.join(
        ", "
      )}`
    );
    doc.text(
      `Surgical History: ${consultation.medicalHistory.surgical.join(", ")}`
    );
    doc.text(
      `Family History: Father - ${consultation.medicalHistory.family.father}, Mother - ${consultation.medicalHistory.family.mother}, Siblings - ${consultation.medicalHistory.family.siblings}, Children - ${consultation.medicalHistory.family.children}`
    );
    doc.moveDown();
    doc.text(
      `Social Survey: Alcohol - ${consultation.socialSurvey.alcohol}, Tobacco - ${consultation.socialSurvey.tobacco}, Traditional Phytotherapy - ${consultation.socialSurvey.traditionalPhytotherapy}, Spice - ${consultation.socialSurvey.spice}, Administrative Coverage - ${consultation.socialSurvey.administrativeCoverage}`
    );
    doc.moveDown();
    doc.text(
      `Clinical Examination: Temperature - ${consultation.clinicalExamination.temperature}, Blood Pressure - ${consultation.clinicalExamination.bloodPressure}, Pulse - ${consultation.clinicalExamination.pulse}, Respiratory Rate - ${consultation.clinicalExamination.respiratoryRate}, Observations - ${consultation.clinicalExamination.observations}`
    );
    doc.moveDown();
    doc.text(`Treatment: ${consultation.treatment}`);
    doc.text(`Evolution: ${consultation.evolution}`);
    doc.text(`Conclusion: ${consultation.conclusion}`);
    doc.text(
      `Created At: ${new Date(consultation.createdAt).toLocaleDateString()}`
    );

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}
