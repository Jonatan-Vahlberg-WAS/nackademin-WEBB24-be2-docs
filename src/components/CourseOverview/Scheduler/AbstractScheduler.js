import React, { useState, useEffect, useRef, useMemo } from "react";
import Card from "../../_library/Card/TWCard";
import SchedulerDay from "./SchedulerDay";
import SchedulerForm from "./SchedulerForm";
import { useScheduler } from "../../../contexts/scheduler";

export default function AbstractScheduler({
  nameLabel = "Namn", // Can be changed for example for groups
  title = "Appointment Scheduler",
  children,
}) {
  const [userEmail, setUserEmail] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });
  const isInitialLoad = useRef(true);
  const { schedulerId, appointments, bookings, createBooking, deleteBooking: deleteBookingFn } = useScheduler();

  const USER_BOOKING_KEY = `scheduler_user_has_booked_${schedulerId}`;

  useEffect(() => {
    const initialUserEmail = localStorage.getItem(USER_BOOKING_KEY);
    setUserEmail(initialUserEmail);
    isInitialLoad.current = false;
  }, []);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSlot) return;

    const newBooking = {
      appointment_id: selectedSlot.id,
      scheduler_id: schedulerId,
      ...formData,
    };

    createBooking(newBooking, () => {
      localStorage.setItem(USER_BOOKING_KEY, formData.email);
      setUserEmail(formData.email);
      setFormData({
        name: "",
        email: "",
        notes: "",
      });
      setSelectedSlot(null);
    }, (error) => {
      console.error("Error creating booking:", error);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteBooking = (id) => {
    deleteBookingFn(id);
  };

  // Group all appointment slots by date and sort chronologically (memoized to prevent recalculation)
  const groupedAllSlots = useMemo(() => {
    return [...appointments]
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      })
      .reduce((groups, slot) => {
        const date = slot.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(slot);
        return groups;
      }, {});
  }, [appointments]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {title}
        </h1>
      </div>
      {children}
      <SchedulerForm
        selectedSlot={selectedSlot}
        formData={formData}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        setSelectedSlot={setSelectedSlot}
        nameLabel={nameLabel}
      />

      {/* All Appointment Slots */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Bokningar
        </h2>

        {Object.keys(groupedAllSlots).length === 0 ? (
          <Card size="xs">
            <p className="text-gray-500 text-center py-4 text-sm">
              No appointment slots available
            </p>
          </Card>
        ) : (
          Object.entries(groupedAllSlots).map(([date, daySlots]) => (
            <SchedulerDay
              key={date}
              date={date}
              daySlots={daySlots}
              handleSlotSelect={handleSlotSelect}
              userEmail={userEmail}
              deleteBooking={deleteBooking}
            />
          ))
        )}
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && (
        <Card className="mt-8 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Debug Info</h3>
          <p className="text-xs text-gray-500">
            Available slots: {appointments.length} | Booked
            appointments: {bookings.length} | Storage key: {USER_BOOKING_KEY}
          </p>
        </Card>
      )}
    </div>
  );
}
