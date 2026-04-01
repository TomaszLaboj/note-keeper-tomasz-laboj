import { SyntheticEvent, useEffect, useRef } from "react";
import { BiTrash, BiArchiveIn, BiArchiveOut } from "react-icons/bi";

interface TaskEditorInterface {
  id: number | undefined;
  title: string;
  description: string;
  dateAdded: string;
  dueDate: string | undefined;
  status: string;
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  updateDueDate: (dueDate: string) => void;
  updateStatus: (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => void;
  closeAndUpdate?: () => void;
  deleteTask: (taskId: number | undefined) => void;
}

const TaskEditor = ({
  id,
  title,
  description,
  dateAdded,
  dueDate,
  status,
  updateTitle,
  updateDescription,
  updateDueDate,
  updateStatus,
  closeAndUpdate,
  deleteTask,
}: TaskEditorInterface) => {
  const taskEditorRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const statusInProgress = status === "In progress";

  const autoResize = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !taskEditorRef.current?.contains(e.target as Node) &&
        closeAndUpdate
      ) {
        closeAndUpdate();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeAndUpdate) {
        closeAndUpdate();
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
  }, [title, id, description, dateAdded, dueDate, status, closeAndUpdate]);

  return (
    <div className="background">
      <div ref={taskEditorRef} className="task-editor">
        <span>
          <textarea
            value={title}
            ref={titleRef}
            className="task-editor-title"
            placeholder="Title"
            rows={1}
            onInput={autoResize}
            onChange={(e) => updateTitle(e.target.value)}
          />
          <div className="task-editor-date-added">
            Date added: {new Date(dateAdded).toLocaleDateString()}
          </div>
        </span>
        <textarea
          value={description}
          ref={descriptionRef}
          className="task-editor-description"
          rows={1}
          onInput={autoResize}
          onChange={(e) => updateDescription(e.target.value)}
        />
        <span>
          <input
            type="date"
            value={dueDate ? dueDate?.split("T")[0] : ""}
            onChange={(e) => updateDueDate(e.target.value)}
          />
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
            <button className="close-button" onClick={closeAndUpdate}>
              Close
            </button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default TaskEditor;
