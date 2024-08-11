import React, { useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Sortable from "sortablejs";

const TaskList = ({
  tasks,
  handleClickUpdateTask,
  handleClickDeleteTask,
  handleToggleTask,
  handleToggleAllTasks,
  // handleUpdateTaskOrder,
}) => {
  const sortableRef = useRef(null);

  useEffect(() => {
    if (sortableRef.current) {
      const sortable = new Sortable(sortableRef.current, {
        animation: 150,
        ghostClass: "blue-background-class",
        onEnd: (evt) => {
          const newOrder = [...tasks];
          const [movedItem] = newOrder.splice(evt.oldIndex, 1);
          newOrder.splice(evt.newIndex, 0, movedItem);
          // handleUpdateTaskOrder(newOrder);
        },
      });

      return () => {
        sortable.destroy();
      };
    }
  }, [tasks]);
  // [tasks, handleUpdateTaskOrder]);

  if (tasks.length === 0) {
    return (
      <div className="m-3">
        <p>No tasks found</p>
      </div>
    );
  }

  return (
    <>
      <div id="task-list" ref={sortableRef} className="m-3">
        <div className="task mb-2 flex items-center rounded border-b border-l border-r bg-slate-200 p-2 font-serif shadow-md">
          <div className="flex items-center justify-center pl-4">
            <input
              type="checkbox"
              onChange={(e) => handleToggleAllTasks(e.target.checked)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
          <div className="ml-[16px]">
            <p className="font-black">Task Name</p>
          </div>
          <div className="ml-auto mr-6">
            <p className="font-black">Action</p>
          </div>
        </div>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded border pb-2 pl-6 pr-6 pt-2 shadow-md"
            data-id={task.id}
          >
            {/* {console.log(tasks)}
            {console.log(Array.isArray(tasks))} */}
            <div className="flex items-center justify-center gap-5">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={() => handleToggleTask(task.id)}
                  className="h-4 w-4 cursor-pointer"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={task.title}
                  key={task.id}
                  className={`${task.isChecked ? "task line-through" : "task"}`}
                  readOnly
                ></input>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div>
                <FaEdit
                  data-id={task.id}
                  onClick={() => handleClickUpdateTask(task.id)}
                  className="text-2xl text-cyan-500 hover:cursor-pointer hover:text-cyan-600"
                ></FaEdit>
              </div>
              <div>
                <MdDelete
                  id="delete-task"
                  data-id={task.id}
                  onClick={() => handleClickDeleteTask(task.id)}
                  className="text-2xl text-red-500 hover:cursor-pointer hover:text-red-600"
                ></MdDelete>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;
