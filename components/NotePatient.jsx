import React from "react";
import { NoteAdd } from "iconsax-react";
const NotePatientComponent = () => {
  return (
    <div className="bg-background rounded-lg shadow-md p-6 mb-4 h-[300px]">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4">Notes</h3>
        <div className="flex gap-2 ">
          <NoteAdd size={24} className="text-violettitle" />
          <p className="text-violettitle text-md">Add Note</p>
        </div>
      </div>
      <div className=" flex justify-center items-center text-md mt-10">
        No notes added
      </div>
    </div>
  );
};

export default NotePatientComponent;
