import React, { useState, useEffect } from 'react';
import './Quotafull.css';

const QuotaFullPage = ({ location }) => {
  const [ipAddress, setIPAddress] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://geolocation-db.com/json/')
      .then(response => response.json())
      .then(data => {
        setIPAddress(data.IPv4);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pid = searchParams.get('pid');
    const uid = searchParams.get('uid');
    const status = 'Quotafull';
    const completionTime = new Date().toISOString().slice(0, 10);

    if (pid && uid && ipAddress) {
      const newData = {
        pid,
        uid,
        ip: ipAddress,
        status,
        completionTime, // Include completionTime in newData
      };

      console.log('New Data:', newData);
      setData(prevData => [...prevData, newData]);

      // Send data to backend
      fetch('http://localhost:8083/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
      .then(response => {
        if (response.ok) {
          console.log('Data saved successfully');
        } else {
          console.error('Failed to save data');
        }
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
    }
  }, [location.search, ipAddress]);

  return (
    <div className="complete-page">
      <h1 className="complete-title">Opps!! QuotaFull</h1>
      <div className="complete-table-container">
        <table className="complete-table">
          <thead>
            <tr>
              <th>Serial NO.</th>
              <th>Project ID</th>
              <th>User ID</th>
              <th>Status</th>
              <th>IP Address</th>
              <th>Completion Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((survey, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{survey.pid}</td>
                <td>{survey.uid}</td>
                <td>{survey.status}</td>
                <td>{survey.ip}</td>
                <td>{survey.completionTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotaFullPage;
