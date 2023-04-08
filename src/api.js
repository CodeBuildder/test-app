import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://norinco.ieeesrmist.in/api/v1', // for production
  baseURL: 'http://localhost:3001/api/v1', // for local testing
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export const login = async (email, password) => {
  try {
    const {data} = await instance.post('/users/login', {
      email,
      password,
    });

    return data.data;
  } catch (error) {
    return {
      access_token: '',
      error: true,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getVessel = async (token, vessel) => {
  try {
    const {data} = await instance.get(`/vessels?id=${vessel}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getSchedule = async (token, vessel) => {
  try {
    const {data} = await instance.get(`/vessels/schedules/${vessel}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getVesselEquipment = async (token, vessel) => {
  try {
    const {data} = await instance.get(`/vessels/equipments?vid=${vessel}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getChecklists = async (token, eid) => {
  try {
    const {data} = await instance.get(
      `${eid}/checklists?attr=eid,type,questions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data.data;
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getVesselChecklists = async (token, vessel) => {
  try {
    const {data} = await instance.get(`/vessels/checklists/${vessel}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const storeCheck = async (token, body) => {
  try {
    const {data} = await instance.post('/responses', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const storeChecks = async (token, body) => {
  try {
    const {data} = await instance.post('/responses/many', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const ping = async () => {
  try {
    const {data} = await instance.get('/');

    return data;
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || error.message,
    };
  }
};
