import axios from "axios";

const housingAPI = axios.create({
  baseURL: "/api/housing",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
housingAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Landlord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cellPhone?: string;
}

export interface HousingInfo {
  id: string;
  address: Address;
  landlord: Landlord;
  maxOccupant: number;
  description?: string;
}

export const getCurrentHousing = async (): Promise<HousingInfo> => {
  const response = await housingAPI.get<HousingInfo>("/current");
  return response.data;
};
