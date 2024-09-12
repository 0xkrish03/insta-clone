import React, { useEffect, useRef } from "react";
import { HiCamera } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  Open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ Open, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the modal if clicking outside
      }
    };

    if (Open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [Open, onClose]);

  if (!Open) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      {/* Modal content */}
      <div
        ref={modalRef}
        className="bg-white p-5 rounded shadow-md max-w-lg w-full relative"
      >
        <div className="flex flex-col justify-center items-center h-[100%]">
          <HiCamera className="text-5xl text-gray-400 cursor-pointer" />
          <input
            type="text"
            maxLength={50}
            placeholder="Please enter a Caption..."
            className="border-none text-center w-full focus:ring-0 outline-none"
          />
          <button
            disabled
            className="w-full bg-blue-500 rounded-lg p-2 mt-4 hover:brightness-90 disabled:bg-gray-500 disabled:text-slate-900 disabled:cursor-not-allowed disabled:brightness-95"
          >
            Post
          </button>
          <IoMdClose
            onClick={onClose}
            className="cursor-pointer absolute top-2 right-2 text-xl hover:text-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
