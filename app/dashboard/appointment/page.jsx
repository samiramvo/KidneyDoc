"use client";
import "@/styles/globals.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function Appointment() {
  const [events] = useState([
    { title: "event 1", id: "1" },
    { title: "event 2", id: "2" },
    { title: "event 3", id: "3" },
    { title: "event 4", id: "4" },
    { title: "event 5", id: "5" },
  ]);
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    allDay: false,
    id: 0,
    notificationTime: "", // Ajout pour l'heure de la notification
  });
  const [alarmSound] = useState(new Audio("/audio.mp3")); // Fichier sonore pour l'alarme
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false); // Contrôler l'état de l'alarme

  useEffect(() => {
    let savedEvents = JSON.parse(localStorage.getItem("events"));
    if (savedEvents) {
      setAllEvents(savedEvents);
    }
  }, []);

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        },
      });
    }
  }, []);

  useEffect(() => {
    // Enregistrer les événements dans localStorage
    localStorage.setItem("events", JSON.stringify(allEvents));

    // Vérifier la notification pour chaque événement
    allEvents.forEach((event) => {
      if (event.notificationTime) {
        scheduleNotification(event);
      }
    });
  }, [allEvents]);

  // Fonction pour gérer la planification d'une notification
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

  // Fonction pour jouer l'alarme
  function playAlarm() {
    alarmSound.play();
    setIsAlarmPlaying(true);
    toast(
      <div>
        <p>L'alarme sonne pour l'événement!</p>
        <button
          onClick={stopAlarm}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Arrêter l'alarme
        </button>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  }

  // Fonction pour couper l'alarme
  function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    setIsAlarmPlaying(false);
    toast.dismiss();
  }

  // Fonction pour montrer la notification
  function showNotification(event) {
    if (Notification.permission === "granted") {
      new Notification("Reminder: " + event.title, {
        body: `Your event "${event.title}" is starting now!`,
        icon: "/alarm-icon.png", // Icône de notification
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

  function handleDateClick(arg) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure à 00:00:00

    // Vérifier si la date cliquée est dans le passé
    if (arg.date < today) {
      toast.error("Vous ne pouvez pas sélectionner une date passée.");
      return; // Sortir de la fonction si la date est passée
    }

    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  }

  function addEvent(data) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
      notificationTime: "",
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
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

  function handleSubmit(e) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
      notificationTime: "",
    });
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
      <div className="flex min-h-screen font-jakarta flex-col items-center justify-between p-4 text-[#2B3674]">
        <div className="grid grid-cols-10 ml-[5%]">
          <div className="col-span-8 shadow-lg dark:shadow-lg">
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
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>
          <div
            id="draggable-el"
            className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-[#EEEFF2]"
          >
            <h1 className="font-bold text-lg text-center">Drag Event</h1>
            {events.map((event) => (
              <div
                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                title={event.title}
                key={event.id}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>

        {/* Modal pour supprimer */}
        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setShowDeleteModal}
          >
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

        {/* Modal pour créer ou éditer un événement */}
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
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 sm:col-start-1 sm:mt-0 sm:text-sm"
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
        {/* {isAlarmPlaying && (
          <button
            onClick={stopAlarm}
            className="fixed bottom-5 right-5 bg-red-500 text-white p-4 rounded-full"
          >
            Stop Alarm
          </button>
        )} */}
      </div>
    </>
  );
}
