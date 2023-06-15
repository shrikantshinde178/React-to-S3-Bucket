import React, { useState } from 'react';
import AWS from 'aws-sdk';

const S3Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to megabytes
      if (fileSizeInMB > 1) {
        setError('File size exceeds the limit of 1MB');
        setSelectedFile(null);
      } 
    }
  };

  const uploadFile = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file');
    } else {
      const fileSizeInMB = selectedFile.size / (1024 * 1024); // Convert bytes to megabytes
      if (fileSizeInMB > 1) {
        setError('File size exceeds the limit of 1MB');
        setSelectedFile(null);
      } else {
        setUploading(true);

        const s3 = new AWS.S3({
          accessKeyId: 'aAKIAVVBMZHMOM4XSI3O2',
          secretAccessKey: 'gCBtlsT4wC+d2E/5+zIeckdaeItCuouP8vi35X5W',
          region: 'ap-south-1',
        });

        const params = {
          Bucket: 'tasktilltoday',
          Key: selectedFile.name,
          Body: selectedFile,
        };

        s3.upload(params, (err, data) => {
          if (err) {
            setError('Something went wrong, please try again');
            setUploading(false);
            
          } else {
            console.log('File uploaded successfully!', data);
            setError('File uploaded successfully');
            setUploading(false);
          }
        });
      }
    }
  };

  return (
    <div class="container mt-5 mb-5">
      <h2 class="mt-5 mb-5"><b>Upload to S3 Bucket</b></h2>
      
     <h6 class="mt-5 mb-5"> By using React Js, AWS Lambda Function & Cloud Watch Metrices.</h6>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={uploadFile} disabled={!selectedFile || uploading}>
        Upload
      </button>
      {uploading && <p>Uploading file...</p>}
      {error && <p>{error}</p>}
    </div>
  
  );
};

export default S3Uploader;

