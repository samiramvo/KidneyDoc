
// import React from "react";
// import { Document, Page } from "@react-pdf/renderer";

// const PdfModal = ({ isOpen, onClose, note }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 transition-transform transform scale-100">
//         <h3 className="text-lg font-semibold mb-4 text-center">View Note</h3>
//         <Document>
//           <Page size="A4">
//             <div className="mb-4">
//               <h2 className="text-xl font-bold">Titre : {note.title}</h2>
//             </div>
//             <div className="mb-4">
//               <h2 className="text-lg font-medium">Type : {note.type}</h2>
//             </div>
//             <div className="mb-4">
//               <h2 className="text-base">Description : {note.description}</h2>
//             </div>
//           </Page>
//         </Document>
//         <button
//           onClick={onClose}
//           className="bg-gray-300 p-2 rounded mt-4 w-full hover:bg-gray-400 transition duration-200"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PdfModal;
import React from "react";
import { Document, Page } from "@react-pdf/renderer";
import Modal from "./modalform"; // Assurez-vous que le chemin est correct

const PdfModal = ({ isOpen, onClose, note }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="View Note">
      <div className="modal-content">
        <Document>
          <Page size="A4">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Titre : {note?.title}</h2>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Type : {note?.type}</h2>
            </div>
            <div className="mb-4">
              <h2 className="text-base">Description : {note?.description}</h2>
            </div>
          </Page>
        </Document>
        {/* <button
          onClick={onClose}
          className="bg-gray-300 p-2 rounded mt-4 w-full hover:bg-gray-400 transition duration-200"
        >
          Close
        </button> */}
      </div>
    </Modal>
  );
};

export default PdfModal;