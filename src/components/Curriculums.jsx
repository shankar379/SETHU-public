import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Curriculums = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  // Fetch folders and files within the "Curriculums" main folder
  const fetchFolders = async () => {
    const storageRef = ref(storage, '/Curriculums');
    const folderList = await listAll(storageRef);
    const folderData = await Promise.all(
      folderList.prefixes.map(async (folderRef) => {
        const folderContent = await listAll(folderRef);
        const files = await Promise.all(
          folderContent.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );
        return { name: folderRef.name, files };
      })
    );
    setFolders(folderData);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile || !selectedFolder) return;
    setUploading(true);

    const fileRef = ref(storage, `Curriculums/${selectedFolder}/${selectedFile.name}`);
    try {
      await uploadBytes(fileRef, selectedFile);
      console.log(`Uploaded ${selectedFile.name} to Curriculums/${selectedFolder}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
      setSelectedFile(null);
      fetchFolders();
    }
  };

  // Handle new folder creation within "Curriculums"
  const handleCreateFolder = () => {
    if (!newFolderName) return;

    // Add new folder to state
    setFolders((prevFolders) => [...prevFolders, { name: newFolderName, files: [] }]);
    setNewFolderName('');
  };

  return (
    <div className="p-8 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-[rgba(75,30,133,1)]">
        Curriculums
      </h2>

      {/* New Folder Section */}
      <div className="mb-6 flex flex-col items-center">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New Folder Name"
          className="border-2 border-gray-300 rounded-lg p-2 mb-2"
        />
        <button
          onClick={handleCreateFolder}
          className="px-4 py-2 rounded-full text-white font-semibold bg-[rgba(75,30,133,1)] hover:bg-[rgba(75,30,133,0.8)]"
        >
          Create Folder
        </button>
      </div>

      {/* Folder Selection Section */}
      <div className="mb-6">
        <label htmlFor="folderSelect" className="block mb-2 font-semibold text-lg">
          Select Folder:
        </label>
        <select
          id="folderSelect"
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="block appearance-none w-full bg-white border-2 border-gray-300 rounded-lg p-2 pr-8 focus:outline-none focus:border-[rgba(75,30,133,1)]"
        >
          <option value="">-- Select a Folder --</option>
          {folders.map((folder, index) => (
            <option key={index} value={folder.name}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Section */}
      <div className="mb-6 flex flex-col items-center">
        <label className="flex flex-col items-center border-2 border-dashed border-[rgba(75,30,133,0.5)] rounded-lg p-4 cursor-pointer hover:bg-[rgba(75,30,133,0.1)]">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="text-lg text-[rgba(75,30,133,1)]">Upload PDF</span>
          <p className="text-sm text-gray-500">Drag and drop a PDF file here or click to select one</p>
        </label>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading || !selectedFolder}
          className={`mt-4 px-4 py-2 rounded-full text-white font-semibold ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[rgba(75,30,133,1)] hover:bg-[rgba(75,30,133,0.8)]'}`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {/* Folder Content Display */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {folders.map((folder, index) => {
          const randomColor = getRandomColor();
          return (
            <div key={index} className="group overflow-hidden rounded-xl text-gray-50" style={{ backgroundColor: randomColor }}>
              <div className="before:duration-700 before:absolute before:w-28 before:h-28 before:bg-transparent before:blur-none before:border-8 before:opacity-50 before:rounded-full before:-left-4 before:-top-12 w-64 h-48 flex flex-col justify-between relative z-10 group-hover:before:top-28 group-hover:before:left-44 group-hover:before:scale-125 group-hover:before:blur">
                <div className="text p-3 flex flex-col justify-evenly h-full">
                  <span className="font-bold text-2xl">{folder.name}</span>
                  <p className="subtitle">Access your document instantly, simply click the download link.</p>
                </div>
                <div className="w-full flex flex-row justify-between z-10">
                  {folder.files.length > 0 ? (
                    folder.files.map((file, idx) => (
                      <a key={idx} className="hover:opacity-90 py-3 bg-neutral-800 w-full flex justify-center" href={file.url} target="_blank" rel="noopener noreferrer">
                        <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="w-6 h-6 stroke-cyan-800">
                          <path strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" fill="none" d="M18.3,65.8v4A11.9,11.9,0,0,0,30.2,81.7H69.8A11.9,11.9,0,0,0,81.7,69.8v-4M65.8,50,50,65.8m0,0L34.2,50m15.8,15.8V21.7M69.8,39.8V50M39.8,39.8V50" />
                        </svg>
                      </a>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No PDFs available</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Curriculums;
