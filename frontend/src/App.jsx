// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


































// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [message, setMessage] = useState('');
//   const [backendResponse, setBackendResponse] = useState('');

//   // Function to fetch a message from the backend
//   const fetchMessageFromBackend = () => {
//     // The backend is expected to be running on port 5000
//     fetch('http://localhost:5000/api/hello') // Our new Flask endpoint
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setMessage(data.message);
//       })
//       .catch(error => {
//         setMessage(`Failed to fetch message: ${error}`);
//         console.error('There was an error fetching from the backend!', error);
//       });
//   };

//   // useEffect to fetch the message when the component mounts
//   useEffect(() => {
//     fetchMessageFromBackend();
//   }, []); // The empty dependency array means this effect runs once when the component mounts

//   // Example: Function to send data to backend (we'll build the backend for this later)
//   const sendDataToBackend = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/process', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ data: "Hello from React!" }),
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setBackendResponse(data.reply);
//     } catch (error) {
//       setBackendResponse(`Failed to send data: ${error}`);
//       console.error('There was an error sending data to the backend!', error);
//     }
//   };


//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Docubot Interface</h1>
//         <p>
//           Message from Flask Backend: <strong>{message}</strong>
//         </p>
//         <button onClick={sendDataToBackend} style={{ marginTop: '20px', padding: '10px' }}>
//           Send Data to Backend
//         </button>
//         {backendResponse && <p>Backend's Reply: <strong>{backendResponse}</strong></p>}
//       </header>
//     </div>
//   );
// }

// export default App;