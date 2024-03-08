import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleUpload = () => {
    if (!file || !imageName) {
      setMessage('Please select a file and provide a custom name.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('customName', imageName);

    axios.post('http://localhost:8082/api/sliders/image', formData)
      .then(response => {
        setMessage(response.data);
        setFile(null);
        setImageName('');
      })
      .catch(error => {
        setMessage('Failed to upload image.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <input type="text" placeholder="Custom Name" value={imageName} onChange={handleNameChange} />
      <br />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ImageUpload;