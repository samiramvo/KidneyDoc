'use client';

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { DateTime } from 'luxon';

export default function UserProfile({ user, userAppointments }) {
  const [showModal, setShowModal] = React.useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-5">Profile</h1>
      <div className="mb-5">
        <h2>{user.name}</h2>
        <p>Email: {user.emailuser}</p>
        <p>Phone: {user.phoneuser}</p>
        <p>Username: {user.username}</p>
      </div>
      <div className="mt-5">
        <h2>Upcoming Appointments</h2>
        {userAppointments.length > 0 ? (
          <ul className="list-none p-0">
            {userAppointments.map((appointment) => {
  try {
    // Créer un objet DateTime à partir de l'objet Date
    const date = DateTime.fromJSDate(new Date(appointment.start), { zone: 'Europe/Paris' });
    console.log('Original Date:', appointment.start);
    console.log('Converted Date:', date.toString());

    const formattedDate = date.isValid ? date.toFormat('dd/MM/yyyy, HH:mm:ss') : 'Invalid DateTime';

    return (
      <li key={appointment.id} className="mb-2">
        {appointment.title} - {formattedDate}
      </li>
    );
  } catch (error) {
    console.error('Error processing appointment:', appointment, error);
    return (
      <li key={appointment.id} className="mb-2">
        {appointment.title} - Error processing date
      </li>
    );
  }
})}
          </ul>
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>

      {/* Example of a modal for user actions */}
      <Transition.Root show={showModal} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        User Action
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          This is an example of a modal for user actions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}