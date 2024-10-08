import { useState, useEffect } from 'react';

export type ItemType = {
  id: string;
  img: string;
  title: string;
};

export const useQuery = () => {
  const [data, setData] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleData = (dragEndData: ItemType[]) => setData(dragEndData);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const savedItems = localStorage.getItem('items');
    if (savedItems == null || JSON.parse(savedItems).length === 0) {
      fetchData();
    } else {
      setData(JSON.parse(savedItems));
      setLoading(false);
    }
  }, []);

  return { data, loading, error, handleData };
};
