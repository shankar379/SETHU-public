import React, { useState, useEffect } from 'react';
import { storage, storageRef, listAll, getDownloadURL, uploadBytes, ref, set, push, database, get, child } from '../firebase'; // Import necessary methods
import './Colleges.css';

const StaticColleges = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [newImageName, setNewImageName] = useState('');
  const [newImageDescription, setNewImageDescription] = useState('');

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const dbRef = ref(database, 'college_images');
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map((key) => ({
            ...data[key], // Spread each college's name, image, and description
          }));
          setCollegeData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };

    fetchCollegeData();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !newImageName || !newImageDescription) {
      alert("Please provide all required information.");
      return;
    }
    setUploading(true);
    try {
      // Upload image to Firebase Storage
      const fileRef = storageRef(storage, `colleges/${selectedFile.name}`);
      await uploadBytes(fileRef, selectedFile);
      const imageUrl = await getDownloadURL(fileRef);

      // Save image data in Firebase Realtime Database
      const newCollegeRef = push(ref(database, 'college_images')); // Create a new push reference
      await set(newCollegeRef, {
        name: newImageName,
        image: imageUrl,
        description: newImageDescription,
      });

      // Update UI with the new data
      setCollegeData((prevData) => [
        ...prevData,
        { name: newImageName, image: imageUrl, description: newImageDescription },
      ]);
      alert("Image uploaded and data stored successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setUploading(false);
    setSelectedFile(null);
    setNewImageName('');
    setNewImageDescription('');
  };

  return (
    <section className="collegess">
      <h2 className="text-4xl font-bold mb-6 text-center">Colleges</h2>
      <p className="text-lg text-center max-w-2xl mx-auto mb-12">
        We partner with top colleges and universities to provide comprehensive training programs. Learn more about our partnerships and the benefits they offer to students.
      </p>

      {/* <div className="upload-section text-center mb-8">
        <input type="file" onChange={handleFileChange} />
        <div>
          <input
            type="text"
            placeholder="Enter Image Name"
            value={newImageName}
            onChange={(e) => setNewImageName(e.target.value)}
            className="text-black border border-gray-300 rounded p-2 mt-2"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Image Description"
            value={newImageDescription}
            onChange={(e) => setNewImageDescription(e.target.value)}
            className="text-black border border-gray-300 rounded p-2 mt-2"
          />
        </div>
        <button className="upload-button mt-4" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div> */}

      <div className="logoss">
        <div className="logoss-slide">
          {collegeData.map((college, index) => (
            <div key={index} className="college-item">
              <img src={college.image} alt={college.name} />
              <div className="overlay">
                <h3>{college.name}</h3>
                <p>{college.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="logoss-slide">
          {collegeData.map((college, index) => (
            <div key={`copy-${index}`} className="college-item">
              <img src={college.image} alt={college.name} />
              <div className="overlay">
                <h3>{college.name}</h3>
                <p>{college.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaticColleges;
