import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const fetchPublicationIds = async (query, resultStart, resultMax) => {
  const response = await axios.post(`${API_BASE_URL}/publications`, {
    query,
    resultStart,
    resultMax
  });
  return response.data.ids;
};

export const fetchPublicationDetails = async (ids, fields) => {
  const response = await axios.get(`${API_BASE_URL}/publications/details`, {
    params: { ids: ids.join(','), fields: fields.join(',') }
  });
  return response.data;
};
