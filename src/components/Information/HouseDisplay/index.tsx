import React, { useEffect, useState } from 'react';

interface HousingInfo {
  address: string;
}

const HouseDisplay: React.FC = () => {
  const [housing, setHousing] = useState<HousingInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/composite/housing')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: HousingInfo) => {
        setHousing(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading house information...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!housing) return <div>No house information available.</div>;

  return (
    <div>
      <h2>House Information</h2>
      <p>
        <strong>Address:</strong> {housing.address}
      </p>
    </div>
  );
};

export default HouseDisplay;
