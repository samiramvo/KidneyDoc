import { fetchPatient } from "@/lib/data";
import SinglePatientComponent from "@/components/singlePatientcomponent";
import DocumentUploadComponent from "@/components/DocumentUpload";
import NotePatientComponent from "@/components/NotePatient";

const SinglePatientPage = async ({ params }) => {
  const { id } = params;
  const patient = await fetchPatient(id);

  const Patientjson = JSON.parse(JSON.stringify(patient));
  const patients = [Patientjson];
  return (
    <>
      <div className="w-full mt-3  ">
        <SinglePatientComponent patient={Patientjson} />
      </div>

      <div className="flex w-full gap-4 mt-8 ">
        <div className="w-[50%] ">
          <DocumentUploadComponent patients={patients} />
        </div>
        <div className="w-[50%]  ">
          <NotePatientComponent />
        </div>
      </div>
    </>
  );
};

export default SinglePatientPage;
