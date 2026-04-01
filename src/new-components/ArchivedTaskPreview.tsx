import { SyntheticEvent, useEffect, useRef } from "react";
import { BiTrash, BiArchiveIn, BiArchiveOut } from "react-icons/bi";

interface TaskEditorInterface {
  id: number | undefined;
  title: string;
  description: string;
  dateAdded: string;
  dueDate: string | undefined;
  status: string;
  updateStatus: (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => void;
  deleteTask: (taskId: number | undefined) => void;
  closePreview: () => void;
}

const ArchivedTaskPreview = ({
  id,
  title,
  description,
  dateAdded,
  dueDate,
  status,
  updateStatus,
  deleteTask,
  closePreview,
}: TaskEditorInterface) => {
  const taskEditorRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const statusInProgress = status === "In progress";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!taskEditorRef.current?.contains(e.target as Node) && closePreview) {
        closePreview();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closePreview) {
        closePreview();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    if (titleRef.current) {
      titleRef.current.style.height = "0px";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "0px";
      descriptionRef.current.style.height =
        descriptionRef.current.scrollHeight + "px";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [title, id, description, dateAdded, dueDate, status, closePreview]);

  return (
    <div className="background">
      <div ref={taskEditorRef} className="task-editor">
        <span>
          <p className="task-editor-title">{title}</p>

          <div className="task-editor-date-added">
            Date added: {new Date(dateAdded).toLocaleDateString()}
          </div>
        </span>
        <p className="task-editor-description">{description}</p>
        <span>
          <p>{dueDate ? dueDate?.split("T")[0] : ""}</p>
          <span className="task-editor-footer-bin-and-close-buttons">
            <div className="archive-button-tooltip">
              <button
                onClick={() =>
                  updateStatus(id, statusInProgress ? "Done" : "In progress")
                }
                className="task-editor-footer-icon-button"
              >
                {statusInProgress ? (
                  <BiArchiveIn size="1.2rem" />
                ) : (
                  <BiArchiveOut size="1.2rem" />
                )}
              </button>
              <span className="archive-button-tooltip-text">
                {statusInProgress ? "Archive" : "Unarchive"}
              </span>
            </div>
            <button
              onClick={() => deleteTask(id)}
              className="task-editor-footer-icon-button"
            >
              <BiTrash size="1.2rem" />
            </button>
            <button className="close-button" onClick={closePreview}>
              Close
            </button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default ArchivedTaskPreview;
