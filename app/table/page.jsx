"use client"
import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalPatient = () => {
    const notify = () => toast.success('Patient is successfully registered!', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
    });

    return (
        <div>
            <button onClick={notify}>Notify!</button>

        </div>
    );
}
export default ModalPatient;