import { BiTrash, BiArchiveIn, BiArchiveOut } from "react-icons/bi";

interface TaskInterface {
  id: number | undefined;
  title: string;
  description: string;
  dateAdded: string;
  dueDate: string | undefined;
  status: string;
  deleteTask: (taskId: number | undefined) => void;
  updateStatus: (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => void;
}

const Task = ({
  id,
  title,
  description,
  dateAdded,
  dueDate,
  status,
  deleteTask,
  updateStatus,
}: TaskInterface) => {
  const statusInProgress = status === "In progress";
  return (
    <div className="task">
      <h4 className="task-title">{title}</h4>
      <p className="task-description">{description}</p>
      <span className="task-footer">
        <div className="task-footer-date">
          {dueDate && "Due date: " + dueDate}
        </div>
        <div>
          <div className="archive-button-tooltip">
            <button
              className="task-footer-archive-icon-button"
              onClick={(e) => {
                e.stopPropagation();
                updateStatus(id, statusInProgress ? "Done" : "In progress");
              }}
            >
              {statusInProgress ? <BiArchiveIn /> : <BiArchiveOut />}
            </button>
            <span className="archive-button-tooltip-text">
              {statusInProgress ? "Archive" : "Unarchive"}
            </span>
          </div>
          <div className="delete-button-tooltip">
            <button
              className="task-footer-bin-icon-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(id);
              }}
            >
              <BiTrash />
            </button>
            <span className="delete-button-tooltip-text">Delete note</span>
          </div>
        </div>
      </span>
    </div>
  );
};

export default Task;
