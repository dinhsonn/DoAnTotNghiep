import React, { useEffect, useState } from 'react';
import ReportService from '../../../services/ReportServices';
import './AdminReports.css';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReportService.getReports()
      .then(response => {
        setReports(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
        setLoading(false);
      });
  }, []);

  const handleResponse = (reportId, responseText) => {
    ReportService.respondToReport(reportId, responseText)
      .then(() => {
        // Optionally update the local state to reflect the response
        setReports(reports.map(report => 
          report.id === reportId ? { ...report, response: responseText } : report
        ));
      })
      .catch(error => {
        console.error('Error responding to report:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-reports">
      <h2>Danh sách báo cáo</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Nội dung</th>
            <th>Phản hồi</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.order.id}</td>
              <td>{report.user.id}</td>
              <td>{report.content}</td>
              <td>
                <textarea 
                  placeholder="Nhập phản hồi" 
                  defaultValue={report.response || ''} 
                  onBlur={(e) => handleResponse(report.id, e.target.value)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReports;
