
interface CutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WeCanCutForm = ({ isOpen, onClose }: CutFormProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Modal */}
      <div
        className={`fixed overflow-y-scroll top-0 left-1/2 -translate-x-1/2 w-full md:w-[680px] h-screen p-10 bg-white z-[60] transform transition-all duration-300 ease-in-out flex flex-col ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mb-4">
          <button
            onClick={onClose}
            className="ml-auto block text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">We Can Cut Form</h2>
          <p>Your form content goes here...</p>
        </div>
      </div>
    </>
  );
};

export default WeCanCutForm;
