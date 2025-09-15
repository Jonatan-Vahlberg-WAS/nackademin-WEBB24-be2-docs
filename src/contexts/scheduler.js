import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useSupabase } from "../utils/sb";

const SchedulerContext = createContext({
  appointments: [],
  bookings: [],
  schedulerId: "",
  createBooking: (newBooking, onSuccess = () => {}, onError = () => {}) => {},
  deleteBooking: (bookingId) => {},
});

export const SchedulerProvider = ({ children, schedulerId, dates = [] }) => {
  const [appointments, setAppointments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const intervalRef = useRef(null);
  const supabase = useSupabase();

  useEffect(() => {
    if (supabase && schedulerId) {
      getAppointmentsForScheduler(schedulerId);
      getBookingsForScheduler(schedulerId);
    }
    intervalRef.current = setInterval(() => {
      getBookingsForScheduler(schedulerId);
    }, 10000);
    return () => clearInterval(intervalRef.current);


  }, [schedulerId, supabase]);

  async function getAppointmentsForScheduler(schedulerId) {
    try {
        let query = supabase.from("appointments").select("*").eq("scheduler_id", schedulerId);
        if (dates.length > 0) {
            query = query.in("date", dates);
        }
      const { data, error } = await query;
      if (error) {
        console.error("Error fetching appointments:", error);
        return null;
      }

      setAppointments(data || []);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function getBookingsForScheduler(schedulerId) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("scheduler_id", schedulerId);

      if (error) {
        console.error("Error fetching bookings:", error);
        return null;
      }

      setBookings(data || []);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function createBooking(
    booking,
    onSuccess = () => {},
    onError = () => {}
  ) {
    try {
      const { data, error } = await supabase.from("bookings").insert(booking);

      if (error) {
        console.error("Error creating booking:", error);
        return null;
      }

      // Refresh bookings after creating a new one
      await getBookingsForScheduler(schedulerId);
      onSuccess(data);
      return data;
    } catch (error) {
      console.error(error);
      onError(error);
      return null;
    }
  }

  async function deleteBooking(bookingId) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);
      if (error) {
        console.error("Error deleting booking:", error);
        return null;
      }
      await getBookingsForScheduler(schedulerId);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return (
    <SchedulerContext.Provider
      value={{ appointments, bookings, schedulerId, createBooking, deleteBooking }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};

export const useScheduler = () => {
  return useContext(SchedulerContext);
};
