import { useState } from "react";
import { OneTask } from "../components/oneTask";
import Task from "./Task";
import TaskEditor from "./TaskEditor";
import isEqual from "lodash/isEqual";

interface ListOfTasksProps {
  listOfTasks: OneTask[];
  updateTask: (task: OneTask) => void;
  deleteTask: (taskId: number | undefined) => void;
  updateStatus: (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => void;
}

const TasksList = ({
  listOfTasks,
  updateTask,
  deleteTask,
  updateStatus,
}: ListOfTasksProps) => {
  const [highlightedTask, setHighlightedTask] = useState<OneTask | undefined>(
    undefined
  );
  const [highlightedTaskOriginal, setHighlightedTaskOriginal] = useState<
    OneTask | undefined
  >(undefined);
  const [edited, setEdited] = useState(false);

  const handleHighlightTask = (task: OneTask) => {
    setHighlightedTask(task);
    setHighlightedTaskOriginal({ ...task });
  };

  const handleUpdateTitle = (value: string) => {
    setEdited(true);
    setHighlightedTask((prev) => {
      if (prev) {
        return {
          ...prev,
          title: value,
        };
      }
    });
  };

  const handleUpdateDescription = (value: string) => {
    setEdited(true);
    setHighlightedTask((prev) => {
      if (prev) {
        return {
          ...prev,
          description: value,
        };
      }
    });
  };

  const handleUpdateDueDate = (value: string) => {
    setEdited(true);
    setHighlightedTask((prev) => {
      if (prev) {
        return {
          ...prev,
          due_date: value,
        };
      }
    });
  };

  const updateTaskStatus = (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => {
    console.log(taskId);
    updateStatus(taskId, status);
    if (highlightedTask) {
      setHighlightedTask(undefined);
      setHighlightedTaskOriginal(undefined);
    }
    if (edited) setEdited(false);
  };

  const handleDeleteTask = (taskId: number | undefined) => {
    deleteTask(taskId);
    setHighlightedTask(undefined);
    setHighlightedTaskOriginal(undefined);
    if (edited) setEdited(false);
  };

  const handleCloseAndUpdate = () => {
    if (
      highlightedTask &&
      edited &&
      !isEqual(highlightedTask, highlightedTaskOriginal)
    ) {
      updateTask(highlightedTask);
    }
    setEdited(false);
    setHighlightedTask(undefined);
    setHighlightedTaskOriginal(undefined);
  };

  return (
    <>
      <div className="notes-list-container">
        {listOfTasks.map((task: OneTask) => {
          return (
            <div key={task.id} onClick={() => handleHighlightTask(task)}>
              <Task
                id={task.id}
                title={task.title}
                description={task.description}
                dateAdded={new Date(task.date_added).toLocaleDateString()}
                dueDate={
                  task.due_date && new Date(task.due_date).toLocaleDateString()
                }
                status={task.status}
                deleteTask={deleteTask}
                updateStatus={updateTaskStatus}
              />
            </div>
          );
        })}
      </div>
      {highlightedTask && (
        <TaskEditor
          id={highlightedTask.id}
          title={highlightedTask?.title}
          description={highlightedTask?.description}
          dateAdded={highlightedTask?.date_added}
          dueDate={highlightedTask?.due_date}
          status={highlightedTask?.status}
          updateTitle={handleUpdateTitle}
          updateDescription={handleUpdateDescription}
          updateStatus={updateTaskStatus}
          updateDueDate={handleUpdateDueDate}
          closeAndUpdate={handleCloseAndUpdate}
          deleteTask={handleDeleteTask}
        />
      )}
    </>
  );
};

export default TasksList;
