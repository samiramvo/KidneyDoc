import "@/styles/globalelements.css"
import "@/styles/globals.css"
const AddPatientPage = () => {
    return (
        <div>
            <div>
                <h1 className="font-bold text-[#2B3674] text-[26px] mb-8">New Patient</h1>
            </div>
            <div className="containeraddpatient ">
                <div>
                    <h1 className="font-medium text-[#2B3674] text-[17px] mt-4 mb-8">Basic Information</h1>
                </div>
                <form className="formaddpatient">
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="name_patient">Last Name</label>
                            <input type="text" placeholder="Nom patient" name="name_patient" id="name_patient" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="prenom_patient">First Name</label>
                            <input type="text" placeholder="Prenom patient" name="prenom_patient" id="prenom_patient" required />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" required>
                                <option value="male">Homme</option>
                                <option value="female">Femme</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="birth">Date of birth</label>
                            <input type="date" name="birth" id="birth" required />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="agepatient">Age</label>
                            <input type="number" placeholder="Age patient" name="agepatient" id="agepatient" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="addresspatient">Address</label>
                            <input type="text" placeholder="Adress patient" name="addresspatient" id="addresspatient" required />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="phone_patient">Phone Number</label>
                            <input type="tel" placeholder="Phone number patient" name="phone_patient" id="phone_patient" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="doctor">Doctor Assigned</label>
                            <select name="doctor" id="doctor" required>
                                <option value="prof">Dr VIGAN</option>
                                <option value="prof1">Dr Samira</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>

    );
};

export default AddPatientPage;
