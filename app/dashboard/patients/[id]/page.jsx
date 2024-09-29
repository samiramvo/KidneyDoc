import { fetchPatient } from "@/lib/data";
import SinglePatientComponent from "@/components/singlePatientcomponent";
const SinglePatientPage = async ({ params }) => {
  const { id } = params;
  const patient = await fetchPatient(id);

  const Patientjson = JSON.parse(JSON.stringify(patient));

  return <SinglePatientComponent patient={Patientjson} />;
};

export default SinglePatientPage;
