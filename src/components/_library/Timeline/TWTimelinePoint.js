

export default function TimelinePoint({ children, index, moveToNext, nextLabel = "Nästa fas →" }) {
    return (
    <div
      id={`phase${index + 1}`}
      className="relative flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg border-l-4 border-blue-500 mb-10"
    >
      {children}
      <button
        onClick={() => moveToNext(index + 1)}
        className="self-start mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {nextLabel}
      </button>
    </div>
  );
}