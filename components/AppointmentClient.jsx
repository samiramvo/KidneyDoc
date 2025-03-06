// "use client";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import { Fragment, useEffect, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { toast } from "react-toastify";
// import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
// import { addAppointment, deleteAppointment } from "@/lib/actions";

// const AppointmentClient = ({ initialEvents }) => {
//   const [allEvents, setAllEvents] = useState(initialEvents);
//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [idToDelete, setIdToDelete] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     allDay: false,
//     id: 0,
//   });

//   const [events] = useState([
//     { title: "Consultation médicale", id: "1" },
//     { title: "Séance de dialyse", id: "2" },
//     { title: "Réunion du staff médical", id: "3" },
//     { title: "Suivi post-greffe", id: "4" },
//     { title: "Évaluation des patients", id: "5" },
//     { title: "Formation interne", id: "6" },
//     { title: "Visite d'inspection", id: "7" },
//     { title: "Mise à jour du dossier patient", id: "8" },
//     { title: "Planification des soins", id: "9" },
//     { title: "Analyse des résultats biologiques", id: "10" },
//   ]);

//   useEffect(() => {
//     let draggableEl = document.getElementById("draggable-el");
//     if (draggableEl) {
//       new Draggable(draggableEl, {
//         itemSelector: ".fc-event",
//         eventData: function (eventEl) {
//           let title = eventEl.getAttribute("title");
//           let id = eventEl.getAttribute("data-id");
//           return { title, id };
//         },
//       });
//     }
//   }, []);

//   function handleDateClick(arg) {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (arg.date < today) {
//       toast.error("Vous ne pouvez pas sélectionner une date passée.");
//       return;
//     }

//     setNewEvent({
//       ...newEvent,
//       start: arg.date,
//       allDay: arg.allDay,
//       id: new Date().getTime(),
//     });
//     setShowModal(true);
//   }

//   async function handleEventDrop(info) {
//     const event = {
//       title: info.draggedEl.getAttribute("title"),
//       start: info.date,
//       allDay: info.allDay,
//       id: new Date().getTime(),
//     };

//     try {
//       const newAppointmentId = await addAppointment(event);
//       setAllEvents([...allEvents, { ...event, id: newAppointmentId }]);
//       toast.success("Event added successfully!");
//     } catch (err) {
//       console.error("Failed to add event:", err);
//       toast.error("Failed to add event!");
//     }
//   }

//   async function handleDelete() {
//     try {
//       await deleteAppointment(idToDelete);
//       setAllEvents(allEvents.filter(event => event.id !== idToDelete));
//       setShowDeleteModal(false);
//       setIdToDelete(null);
//       toast.success("Event marked as deleted!");
//     } catch (err) {
//       console.error("Failed to delete event:", err);
//       toast.error("Failed to delete event!");
//     }
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const newAppointmentId = await addAppointment(newEvent);
//       setAllEvents([...allEvents, { ...newEvent, id: newAppointmentId }]);
//       setShowModal(false);
//       setNewEvent({
//         title: "",
//         start: "",
//         allDay: false,
//         id: 0,
//       });
//     } catch (err) {
//       console.error("Failed to add appointment:", err);
//       toast.error("Failed to add appointment!");
//     }
//   }

//   const handleChange = (e) => {
//     setNewEvent({
//       ...newEvent,
//       title: e.target.value,
//     });
//   };

//   function handleCloseModal() {
//     setShowModal(false);
//     setNewEvent({
//       title: "",
//       start: "",
//       allDay: false,
//       id: 0,
//     });
//     setShowDeleteModal(false);
//     setIdToDelete(null);
//   }

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <div className="ml-[7%]">
//           <h1 className="font-bold text-textSecondary text-[26px] mb-8 dark:text-white">
//             Calendar
//           </h1>
//         </div>
//       </div>
//       <div className="flex min-h-screen font-jakarta flex-col items-center justify-between p-4 text-textPrimary ">
//         <div className="grid grid-cols-10 ml-[5%]">
//           <div className="col-span-8 shadow-lg dark:shadow-lg ">
//             <FullCalendar
//               plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
//               headerToolbar={{
//                 left: "prev,next today",
//                 center: "title",
//                 right: "resourceTimelineWeek, dayGridMonth, timeGridWeek",
//               }}
//               events={allEvents}
//               nowIndicator={true}
//               editable={true}
//               droppable={true}
//               selectable={true}
//               selectMirror={true}
//               dateClick={handleDateClick}
//               eventReceive={handleEventDrop}
//               eventClick={(info) => {
//                 setShowDeleteModal(true);
//                 setIdToDelete(info.event.id);
//               }}
//             />
//           </div>
//           <div
//             id="draggable-el"
//             className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-withegris overflow-y-scroll scrollbar-hide"
//           >
//             <h1 className="font-bold text-lg text-center">Drag Event</h1>
//             {events.map((event) => (
//               <div
//                 className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
//                 title={event.title}
//                 data-id={event.id}
//                 key={event.id}
//               >
//                 {event.title}
//               </div>
//             ))}
//           </div>
//         </div>

//         <Transition.Root show={showDeleteModal} as={Fragment}>
//           <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//             </Transition.Child>

//             <div className="fixed inset-0 z-10 overflow-y-auto">
//               <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                   enterTo="opacity-100 translate-y-0 sm:scale-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                   leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 >
//                   <Dialog.Panel
//                     className="relative transform overflow-hidden rounded-lg
//                     bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
//                   >
//                     <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                       <div className="sm:flex sm:items-start">
//                         <div
//                           className="mx-auto flex h-12 w-12 flex-shrink-0 items-center
//                        justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
//                         >
//                           <ExclamationTriangleIcon
//                             className="h-6 w-6 text-red-600"
//                             aria-hidden="true"
//                           />
//                         </div>
//                         <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                           <Dialog.Title
//                             as="h3"
//                             className="text-base font-semibold leading-6 text-gray-900"
//                           >
//                             Delete Appointment
//                           </Dialog.Title>
//                           <div className="mt-2">
//                             <p className="text-sm text-gray-500">
//                               Are you sure you want to delete this event?
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                       <button
//                         type="button"
//                         className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm
//                       font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                         onClick={handleDelete}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         type="button"
//                         className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900
//                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                         onClick={handleCloseModal}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </Dialog.Panel>
//                 </Transition.Child>
//               </div>
//             </div>
//           </Dialog>
//         </Transition.Root>

//         <Transition.Root show={showModal} as={Fragment}>
//           <Dialog as="div" className="relative z-10" onClose={setShowModal}>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//             </Transition.Child>

//             <div className="fixed inset-0 z-10 overflow-y-auto">
//               <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                   enterTo="opacity-100 translate-y-0 sm:scale-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                   leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 >
//                   <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                     <div>
//                       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
//                         <CheckIcon
//                           className="h-6 w-6 text-green-600"
//                           aria-hidden="true"
//                         />
//                       </div>
//                       <div className="mt-3 text-center sm:mt-5">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-base font-semibold leading-6 text-gray-900"
//                         >
//                           Add Appointment
//                         </Dialog.Title>
//                         <div className="mt-2">
//                           <p className="text-sm text-gray-500">
//                             Please fill out the form below to schedule your
//                             appointment.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                     <form onSubmit={handleSubmit}>
//                       <div className="mt-4 flex flex-col gap-4">
//                         <input
//                           type="text"
//                           placeholder="Enter Title"
//                           value={newEvent.title}
//                           onChange={handleChange}
//                           className="border-2 rounded-md p-2 w-full"
//                           required
//                         />
//                         <button
//                           type="submit"
//                           className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-violetdesc px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 sm:col-start-1 sm:mt-0 sm:text-sm"
//                         >
//                           Add Event
//                         </button>
//                         <button
//                           type="button"
//                           className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm"
//                           onClick={handleCloseModal}
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </form>
//                   </Dialog.Panel>
//                 </Transition.Child>
//               </div>
//             </div>
//           </Dialog>
//         </Transition.Root>
//       </div>
//     </>
//   );
// };

// export default AppointmentClient;

"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { addAppointment, deleteAppointment } from "@/lib/actions";

const AppointmentClient = ({ initialEvents, userId }) => {
  const [allEvents, setAllEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    allDay: false,
    id: 0,
    notificationTime: "",
    userId: userId,
  });

  const [events] = useState([
    { title: "Consultation médicale", id: "1" },
    { title: "Séance de dialyse", id: "2" },
    { title: "Réunion du staff médical", id: "3" },
    { title: "Suivi post-greffe", id: "4" },
    { title: "Évaluation des patients", id: "5" },
    { title: "Formation interne", id: "6" },
    { title: "Visite d'inspection", id: "7" },
    { title: "Mise à jour du dossier patient", id: "8" },
    { title: "Planification des soins", id: "9" },
    { title: "Analyse des résultats biologiques", id: "10" },
  ]);

  const [alarmSound] = useState(new Audio("/audio.mp3"));
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data-id");
          return { title, id };
        },
      });
    }
  }, []);

  function handleDateClick(arg) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (arg.date < today) {
      toast.error("Vous ne pouvez pas sélectionner une date passée.");
      return;
    }

    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
      userId: userId,
    });
    setShowModal(true);
  }

  function scheduleNotification(event) {
    const notificationDate = new Date(event.notificationTime);
    const timeUntilEvent = notificationDate.getTime() - new Date().getTime();

    if (timeUntilEvent > 0) {
      setTimeout(() => {
        showNotification(event);
        playAlarm();
      }, timeUntilEvent);
    }
  }

  function playAlarm() {
    alarmSound.play();
    setIsAlarmPlaying(true);
    toast(
      <div>
        <p>L&apos;alarme sonne pour l&apos;événement!</p>
        <button
          onClick={stopAlarm}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Arrêter l&apos;alarme
        </button>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  }

  function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    setIsAlarmPlaying(false);
    toast.dismiss();
  }

  function showNotification(event) {
    if (Notification.permission === "granted") {
      new Notification("Reminder: " + event.title, {
        body: `Your event "${event.title}" is starting now!`,
        icon: "/alarm-icon.png",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Reminder: " + event.title, {
            body: `Your event "${event.title}" is starting now!`,
            icon: "/alarm-icon.png",
          });
        }
      });
    }
  }

  async function handleEventDrop(info) {
    try {
      const eventData = {
        title: info.event.title,
        start: info.event.start,
        allDay: info.event.allDay,
        userId: userId
      };
      
      const newAppointmentId = await addAppointment(eventData);
      info.event.setProp("id", newAppointmentId);
      toast.success("Event added successfully!");
    } catch (err) {
      console.error("Failed to add event:", err);
      toast.error("Failed to add event!");
    }
  }

  async function handleDelete() {
    try {
      await deleteAppointment(idToDelete);
      setAllEvents(allEvents.filter(event => event.id !== idToDelete));
      setShowDeleteModal(false);
      setIdToDelete(null);
      toast.success("Event marked as deleted!");
    } catch (err) {
      console.error("Failed to delete event:", err);
      toast.error("Failed to delete event!");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const eventData = {
        ...newEvent,
        userId: userId
      };
      
      const newAppointmentId = await addAppointment(eventData);
      const eventWithId = { ...newEvent, id: newAppointmentId };
      setAllEvents([...allEvents, eventWithId]);
      
      if (eventWithId.notificationTime) {
        scheduleNotification(eventWithId);
      }
      
      setShowModal(false);
      setNewEvent({
        title: "",
        start: "",
        allDay: false,
        id: 0,
        notificationTime: "",
        userId: userId,
      });
    } catch (err) {
      console.error("Failed to add appointment:", err);
      toast.error("Failed to add appointment!");
    }
  }

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  };

  const handleNotificationTimeChange = (e) => {
    setNewEvent({
      ...newEvent,
      notificationTime: e.target.value,
    });
  };

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
      notificationTime: "",
      userId: userId,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="ml-[7%]">
          <h1 className="font-bold text-textSecondary text-[26px] mb-8 dark:text-white">
            Calendar
          </h1>
        </div>
      </div>
      <div className="flex min-h-screen font-jakarta flex-col items-center justify-between p-4 text-textPrimary ">
        <div className="grid grid-cols-10 ml-[5%]">
          <div className="col-span-8 shadow-lg dark:shadow-lg ">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "resourceTimelineWeek, dayGridMonth, timeGridWeek",
              }}
              events={allEvents}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              eventDrop={handleEventDrop}
              eventReceive={(info) => {
                handleEventDrop({
                  event: {
                    title: info.draggedEl.getAttribute("title"),
                    start: info.date,
                    allDay: info.allDay
                  }
                });
              }}
              eventClick={(info) => {
                setShowDeleteModal(true);
                setIdToDelete(info.event.id);
              }}
            />
          </div>
          <div
            id="draggable-el"
            className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-withegris overflow-y-scroll scrollbar-hide"
          >
            <h1 className="font-bold text-lg text-center">Drag Event</h1>
            {events.map((event) => (
              <div
                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                title={event.title}
                data-id={event.id}
                key={event.id}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>

        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
            <Transition.Child
              as={Fragment}
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
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel
                    className="relative transform overflow-hidden rounded-lg
                    bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div
                          className="mx-auto flex h-12 w-12 flex-shrink-0 items-center
                       justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                        >
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Delete Appointment
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this event?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900
                     shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
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
                  as={Fragment}
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
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add Appointment
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Please fill out the form below to schedule your
                            appointment.
                          </p>
                        </div>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mt-4 flex flex-col gap-4">
                        <input
                          type="text"
                          placeholder="Enter Title"
                          value={newEvent.title}
                          onChange={handleChange}
                          className="border-2 rounded-md p-2 w-full"
                          required
                        />
                        <input
                          type="datetime-local"
                          value={newEvent.notificationTime}
                          onChange={handleNotificationTimeChange}
                          className="border-2 rounded-md p-2 w-full"
                          required
                        />
                        <button
                          type="submit"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-violetdesc px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 sm:col-start-1 sm:mt-0 sm:text-sm"
                        >
                          Add Event
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
};

export default AppointmentClient;