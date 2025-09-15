import { formatDate, formatTime, formatDuration } from "./helpers";
import Card from "../../_library/Card/TWCard";
import Button from "../../_library/Button/TWButton";

export default function SchedulerForm({
  selectedSlot,
  formData,
  handleSubmit,
  handleInputChange,
  setSelectedSlot,
  nameLabel = "Namn",
}) {
  if (!selectedSlot) return null;
  return (
    <Card className="mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Book Appointment - {formatDate(selectedSlot.date)} at{" "}
        {formatTime(selectedSlot.time)}
      </h2>
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <p className="text-sm text-blue-800">
          <strong>Selected slot:</strong> {formatDate(selectedSlot.date)} at{" "}
          {formatTime(selectedSlot.time)} ({formatDuration(selectedSlot.length)}
          )
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {nameLabel}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={`måste fyllas i`}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={`måste fyllas i`}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Extra info (frivilligt)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Extra information eller krav..."
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="success"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Confirm Booking
          </Button>
          <Button
            type="button"
            onClick={() => {
              setSelectedSlot(null);
            }}
            variant="default"
            outline
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
