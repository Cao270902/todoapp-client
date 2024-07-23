import React from "react";

const TaskForm = ({
  task,
  setTask,
  handleModifyTask,
  handleDeleteTask,
  taskUpdateId,
}) => {
  return (
    <div className="form flex items-center justify-between">
      <div>
        <input
          type="text"
          id="task"
          placeholder="New Task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="ml-3 w-[490px] rounded border p-2 shadow-md"
        />
        <button
          onClick={handleModifyTask}
          id="add-task"
          className="rounded border bg-green-600 p-2 text-white shadow-md hover:bg-green-700"
        >
          {taskUpdateId ? "Update Task" : "Add Task"}
        </button>
      </div>
      <div>
        <button
          onClick={handleDeleteTask}
          id="delete"
          className="mr-3 rounded border bg-black p-2 text-white shadow-md hover:bg-slate-800"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
