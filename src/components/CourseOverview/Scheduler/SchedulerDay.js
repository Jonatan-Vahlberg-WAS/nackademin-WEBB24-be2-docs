import SchedulerSlot from "./SchedulerSlot";
import { formatDate } from "./helpers";

export default function SchedulerDay({
  date,
  daySlots,
  handleSlotSelect,
  userEmail = "",
  deleteBooking,
}) {

  // Sort slots chronologically within the day (create new array to avoid mutation)
  const sortedSlots = [...daySlots].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium text-gray-600 border-b border-gray-200 pb-1 mb-2">
        {formatDate(date)}
      </h3>

      <div className="space-y-1">
        {sortedSlots.map((slot) => (
          <SchedulerSlot
            key={slot.id}
            slot={slot}
            handleSlotSelect={handleSlotSelect}
            onDeleteBooking={deleteBooking}
            userEmail={userEmail}
          />
        ))}
      </div>
    </div>
  );
}
