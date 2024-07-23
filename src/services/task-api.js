const BASE_URL = "https://669dddbb9a1bda3680048f12.mockapi.io";

export const getTasks = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks?${query}`, {
      method: "GET",
    });
    const data = await res.json();

    return { tasks: data };
    return data;
  } catch (error) {
    throw error;
  }
};

export const createTasks = async (task) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTasks = async (task) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTasks = async (taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${taskId.id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    throw error;
  }
};
