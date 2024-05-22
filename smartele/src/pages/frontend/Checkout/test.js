import axios from 'axios';
import React, { useEffect, useState } from 'react';

const QueryCount = ({ query }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchQueryCount = async () => {
      try {
        const response = await axios.get('/api/search-log/count', { params: { query } });
        setCount(response.data);
      } catch (error) {
        console.error('Error fetching query count:', error);
      }
    };

    if (query) {
      fetchQueryCount();
    }
  }, [query]);

  return (
    <div>
      <h1>Số lần tìm kiếm cho: {query}</h1>
      <p>{count} lần</p>
    </div>
  );
};

export default QueryCount;
