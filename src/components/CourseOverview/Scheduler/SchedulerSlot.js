import Card from "../../_library/Card/TWCard";
import Button from "../../_library/Button/TWButton";
import { cn } from "../../../utils/cn";
import { formatTime, formatDuration } from "./helpers";
import { useMemo } from "react";
import { useScheduler } from "../../../contexts/scheduler";

export default function SchedulerSlot({
  slot,
  handleSlotSelect,
  userEmail,
  onDeleteBooking,
}) {
  const {bookings} = useScheduler();
  
  const getBookingForSlot = (slotId) => {
    return bookings.find(
      (booking) => booking.appointment_id == slotId
    );
  };

  const booking = getBookingForSlot(slot.id);

  const isBooked = useMemo(() => {
    return !!booking;
  }, [booking]);

  const userHasBooked = useMemo(() => {
    return booking && booking.email === userEmail;
  }, [booking, userEmail]);

  const userHasBookedAny = useMemo(() => {
    return userHasBooked || bookings.some(
      (booking) => booking.email === userEmail
    );
  }, [userHasBooked, bookings, userEmail]);

  const timeClasses = cn("font-semibold text-sm min-w-[3rem]", {
    "text-red-600": isBooked,
    "text-green-600": !isBooked,
  });

  const durationClasses = cn("px-1.5 py-0.5 rounded text-xs", {
    "bg-red-100 text-red-800": isBooked,
    "bg-green-100 text-green-800": !isBooked,
  });

  const buttonClasses = cn("ml-2 px-3 py-1 text-xs text-white border-none", {
    "bg-red-500 hover:bg-red-600": isBooked,
    "bg-green-600 hover:bg-green-700": !isBooked,
  });



  const handleButtonClick = () => {
    if (isBooked && userHasBooked && onDeleteBooking) {
      // If it's booked and user wants to cancel
      onDeleteBooking(booking.id);
    } else if (!isBooked) {
      // If it's available and user wants to book
      handleSlotSelect(slot);
    }
  };

  const isButtonVisible = () => {
    if(userHasBooked) {
      return true;
    }
    return !isBooked && !userHasBookedAny;
  };

  const isButtonDisabled = () => {
    if(userHasBooked) {
      return false;
    }
    else if(isBooked) {
      return true;
    }
    return false;
  };

  const getButtonText = () => {
    if(userHasBooked) {
      return "Avboka";
    }
    else if(isBooked) {
      return "Bokad";
    }
    return "Boka";
  };

  return (
    <Card size="xs" className="hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={timeClasses}>{formatTime(slot.time)}</span>
          <span className={durationClasses}>{formatDuration(slot.length)}</span>
          <div className="flex-1 min-w-0">
            {isBooked && booking ? (
              <div>
                <span className="font-medium text-gray-900 text-sm truncate block">
                  {booking.name}
                </span>
              </div>
            ) : (
              <span className="text-xs text-gray-500">
                {isBooked ? "Bokad" : "Ledig"}
              </span>
            )}
          </div>
        </div>

        {isButtonVisible() && (
          <Button
            size="xs"
            variant={userHasBooked ? "danger" : "success"}
            onClick={handleButtonClick}
            className={buttonClasses}
            disabled={isButtonDisabled()}
          >
            {getButtonText()}
          </Button>
        )}
      </div>
    </Card>
  );
}
