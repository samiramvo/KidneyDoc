"use client"
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalResponse = () => {
    const notify = () => toast.success('Patient is successfully registered!', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
    });

    return (
        <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer
                position="top-right"
                autoClose={5000} />

        </div>
    );
}
export default ModalResponse;