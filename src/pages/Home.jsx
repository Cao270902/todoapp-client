import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import SearchGroup from "../components/SearchGroup";
import TaskList from "../components/TaskList";
import Loading from "../components/Loading";
import {
  getTasks,
  createTasks,
  updateTasks,
  deleteTasks,
  deleteTask,
} from "../services/task-api";

import { getQueryString } from "../utils";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [taskUpdateId, setTaskUpdateId] = useState(null);
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (query = "") => {
    // console.log(query);
    setIsLoading(true);
    try {
      const data = await getTasks(query);
      // console.log(Array.isArray(data.tasks));
      // console.log(typeof data.tasks);
      if (data.tasks === "Not found") {
        setTasks([]);
      } else {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModifyTask = async () => {
    if (!task.trim()) {
      // Không thực hiện hành động nếu ô input trống
      return;
    }

    const newTask = { title: task, isChecked: false };
    setIsLoading(true);
    try {
      if (taskUpdateId) {
        await updateTasks({ ...newTask, id: taskUpdateId });
        setTaskUpdateId(null);
      } else {
        await createTasks(newTask);
      }
      setTask("");
      await fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleDeleteTask = async () => {
  //     setIsLoading(true);
  //     try {
  //       if (taskUpdateId) {
  //         await deleteTasks(taskUpdateId);
  //         setTaskUpdateId(null);
  //         setTask("");
  //         await fetchTasks();
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handleDeleteTask = async () => {
    setIsLoading(true);
    try {
      // Lọc các task có isChecked = true
      const tasksToDelete = tasks.filter((task) => task.isChecked);

      // Xóa từng task một
      for (const task of tasksToDelete) {
        await deleteTasks(task.id);
      }
      //   setTaskUpdateId(null);
      //   setTask("");
      await fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickDeleteTask = async (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    // console.log(taskToDelete);

    try {
      if (taskToDelete) {
        await deleteTask(taskToDelete);
        await fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleTask = async (id) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (taskToToggle) {
      const updatedTask = {
        ...taskToToggle,
        isChecked: !taskToToggle.isChecked,
      };
      setIsLoading(true);
      try {
        await updateTasks(updatedTask);
        await fetchTasks();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleToggleAllTasks = async (isChecked) => {
    setIsLoading(true);
    try {
      const updatedTasks = tasks.map((task) => ({ ...task, isChecked }));
      for (const task of updatedTasks) {
        await updateTasks(task);
      }
      isChecked = false;
      await fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickUpdateTask = (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      setTaskUpdateId(id);
      setTask(taskToUpdate.title);
    }
  };

  const handleFilter = async () => {
    const query = getQueryString({
      // title_like: searchValue,
      title: searchValue,
      isChecked:
        filterValue === "1" ? true : filterValue === "-1" ? false : null,
    });

    await fetchTasks(query);
  };

  useEffect(() => {
    handleFilter();
  }, [searchValue, filterValue]);

  return (
    <div className="wrapper">
      <TaskForm
        task={task}
        setTask={setTask}
        handleModifyTask={handleModifyTask}
        handleDeleteTask={handleDeleteTask}
        taskUpdateId={taskUpdateId}
      />
      <SearchGroup
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        handleFilter={handleFilter}
      />
      <Loading isLoading={isLoading} />
      <TaskList
        tasks={tasks}
        handleClickUpdateTask={handleClickUpdateTask}
        handleClickDeleteTask={handleClickDeleteTask}
        handleToggleTask={handleToggleTask}
        handleToggleAllTasks={handleToggleAllTasks}
      />
      <div id="pagination"></div>
    </div>
  );
};

export default Home;
