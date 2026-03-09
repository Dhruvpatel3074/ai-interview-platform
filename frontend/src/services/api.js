const API_URL = "http://localhost:5000";

export const loginUser = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  return { data, status: res.status };
};

export const registerUser = async (username, password) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  return { data, status: res.status };
};

export const startInterview = async (role, difficulty, questions) => {
  const res = await fetch(`${API_URL}/api/start-interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role, difficulty, questions }),
  });

  return res.json();
};

export const submitInterview = async (answers) => {
  const res = await fetch(`${API_URL}/api/submit-interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });

  return res.json();
};