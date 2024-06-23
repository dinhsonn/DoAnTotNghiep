import axios from 'axios';

const API_URL = 'http://localhost:8082/api/reports';

const submitReport = (report) => {
  return axios.post(API_URL, report);
};

const getReports = () => {
  return axios.get(API_URL);
};

const respondToReport = (reportId, response) => {
  return axios.post(`${API_URL}/${reportId}/response`, response);
};

const ReportService = {
  submitReport,
  getReports,
  respondToReport,
};

export default ReportService;
