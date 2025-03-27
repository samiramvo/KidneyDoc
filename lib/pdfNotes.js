import { jsPDF } from "jspdf";

export const createPDF = (note) => {
    return new Promise((resolve) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Note: ${note.title}`, 105, 20, { align: "center" });

  doc.setFontSize(14);
  doc.text(`Type: ${note.type}`, 20, 40);

  doc.setFontSize(12);
  doc.text(`Description: ${note.description}`, 20, 50, { maxWidth: 170 });
  const pdfBuffer = doc.output("arraybuffer");
  resolve(pdfBuffer);
});
    
};
