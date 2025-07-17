import {request} from '@umijs/max';

// Landlord endpoints
export async function getLandlordById(id: number, options?: { [key: string]: any }) {
  return request(`/api/housing/landlord/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function updateLandlord(id: number, data: any, options?: { [key: string]: any }) {
  return request(`/api/housing/landlord/${id}`, {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

export async function deleteLandlord(id: number, options?: { [key: string]: any }) {
  return request(`/api/housing/landlord/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function getAllLandlords(params?: any, options?: { [key: string]: any }) {
  return request('/api/housing/landlord', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function createLandlord(data: any, options?: { [key: string]: any }) {
  return request('/api/housing/landlord', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

// House endpoints
export async function getHouseById(id: number, options?: { [key: string]: any }) {
  return request(`/api/housing/house/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function updateHouse(id: number, data: any, options?: { [key: string]: any }) {
  return request(`/api/housing/house/${id}`, {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

export async function deleteHouse(id: number, options?: { [key: string]: any }) {
  return request(`/api/housing/house/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function getAllHouses(params?: any, options?: { [key: string]: any }) {
  return request('/api/housing/house', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function createHouse(data: any, options?: { [key: string]: any }) {
  return request('/api/housing/house', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function increaseOccupant(houseId: number, options?: { [key: string]: any }) {
  return request(`/api/housing/house/${houseId}/current-occupant/increase`, {
    method: 'POST',
    ...(options || {}),
  });
}

export async function decreaseOccupant(houseId: number, options?: { [key: string]: any }) {
  return request(`/api/housing/house/${houseId}/current-occupant/decrease`, {
    method: 'POST',
    ...(options || {}),
  });
}

export async function assignHouse(options?: { [key: string]: any }) {
  return request('/api/housing/house/assign', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function getCurrentOccupant(houseId: number, options?: { [key: string]: any }) {
  return request(`/api/housing/house/${houseId}/current-occupant`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function get3AvailableHouses(options?: { [key: string]: any }) {
  return request('/api/housing/house/available', {
    method: 'GET',
    ...(options || {}),
  });
}

// Facility endpoints
export async function getFacilityById(id: number, options?: { [key: string]: any }) {
  return request(`/api/housing/facilities/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function updateFacility(id: number, data: any, options?: { [key: string]: any }) {
  return request(`/api/housing/facilities/${id}`, {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

export async function deleteFacility(id: number, options?: { [key: string]: any }) {
  return request(`/api/housing/facilities/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function getFacilities(params?: any, options?: { [key: string]: any }) {
  return request('/api/housing/facilities', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function createFacility(data: any, options?: { [key: string]: any }) {
  return request('/api/housing/facilities', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

// Facility Report endpoints
export async function getFacilityReportsByHouseId(params: any, options?: { [key: string]: any }) {
  return request('/api/housing/facility-report', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function createFacilityReport(data: any, options?: { [key: string]: any }) {
  return request('/api/housing/facility-report', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function createComment(reportId: number, data: any, options?: { [key: string]: any }) {
  return request(`/api/housing/facility-report/${reportId}/comment`, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function updateFacilityReportStatus(reportId: number, status: string, options?: { [key: string]: any }) {
  return request(`/api/housing/facility-report/${reportId}/status`, {
    method: 'PATCH',
    params: {status},
    ...(options || {}),
  });
}

export async function updateComment(reportId: number, commentId: number, data: any, options?: { [key: string]: any }) {
  return request(`/api/housing/facility-report/${reportId}/comment/${commentId}`, {
    method: 'PATCH',
    data,
    ...(options || {}),
  });
}

export async function getFacilityReportDetails(reportId: number, options?: { [key: string]: any }) {
  return request(`/api/housing/facility-report/${reportId}/details`, {
    method: 'GET',
    ...(options || {}),
  });
}

