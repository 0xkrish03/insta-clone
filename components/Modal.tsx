'use client'

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { HiCamera } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { app } from "../app/firebase";

interface ModalProps {
  Open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ Open, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (Open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [Open, onClose]);

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      const imagePreviewUrl = URL.createObjectURL(file);
      setImageUrl(imagePreviewUrl);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    setUploading(true);
    const storage = getStorage(app);
    const filename = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error(error);
        setUploading(false);
        setImageUrl("");
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  if (!Open) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white p-5 rounded shadow-md max-w-lg w-full relative m-4">
        {selectedFile ? (
          <div className="flex flex-col justify-center items-center m-2 p-2 cursor-pointer object-cover">
            <img src={imageUrl} alt="selected file" onClick={() => setSelectedFile(null)} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <HiCamera
              onClick={() => filePickerRef.current?.click()}
              className="text-5xl text-gray-400 cursor-pointer"
            />
            <input
              hidden
              ref={filePickerRef}
              type="file"
              accept="image/*"
              onChange={addImageToPost}
            />
          </div>
        )}
        <div className="flex flex-col justify-center items-center h-[100%]">
          <input
            type="text"
            maxLength={50}
            placeholder="Please enter a Caption..."
            className="border-none text-center w-full focus:ring-0 outline-none"
          />
          <button
            disabled={uploading}
            className="w-full bg-blue-500 rounded-lg p-2 mt-4 hover:brightness-90 disabled:bg-gray-500 disabled:text-slate-900 disabled:cursor-not-allowed disabled:brightness-95"
          >
            Post
          </button>
          <IoMdClose
            onClick={onClose}
            className="cursor-pointer absolute top-2 right-2 text-2xl hover:text-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
