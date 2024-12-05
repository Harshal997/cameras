const API_BASE_URL = 'https://api-app-staging.wobot.ai/app/v1';

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy',
};

export const fetchCameras = async () => {
  const response = await fetch(`${API_BASE_URL}/fetch/cameras`, { headers });
  const data = await response.json();
  return data.data;
};

export const updateCameraStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/update/camera/status`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
