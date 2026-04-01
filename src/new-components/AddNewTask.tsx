import { useState, useEffect, useRef } from "react";

export interface AddNewTaskInterface {
  dueDate: string;
  title: string;
  description: string;
  setAddTitle: (title: string) => void;
  setAddDescription: (value: string) => void;
  setAddDate: (value: string) => void;
  handleAddTask: () => void;
}

const AddNewTask = ({
  title,
  description,
  dueDate,
  setAddTitle,
  setAddDescription,
  setAddDate,
  handleAddTask,
}: AddNewTaskInterface) => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (expanded) {
      descriptionRef.current?.focus();
    }
  }, [expanded]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        if (title || description) {
          handleAddTask();
        }
        setAddDate("");
        setExpanded(false);
      }
    };
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Escape") {
        if (title || description) {
          handleAddTask();
        }
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [title, description, setAddDate, handleAddTask]);

  const handleDateChange = (date: string) => {
    setAddDate(date);
  };

  const autoResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";
  };

  const handleClickClose = () => {
    if (title || description) handleAddTask();
    if (dueDate) setAddDate("");
    setExpanded(false);
  };

  return (
    <div className="note-container" ref={containerRef}>
      {expanded ? (
        <>
          <textarea
            value={title}
            className="title-input"
            placeholder="Title"
            rows={1}
            onInput={autoResize}
            onChange={(e) => setAddTitle(e.target.value)}
          />
          <textarea
            value={description}
            ref={descriptionRef}
            className={"description-input"}
            placeholder="Take a note..."
            rows={1}
            onInput={autoResize}
            onChange={(e) => setAddDescription(e.target.value)}
          />
          <span>
            <input
              type="date"
              className="date-input"
              value={dueDate}
              placeholder="dd/mm/yyyy"
              onChange={(event) => {
                handleDateChange(event.target.value);
              }}
            />
            <button className="close-button" onClick={handleClickClose}>
              Close
            </button>
          </span>
        </>
      ) : (
        <div onClick={() => setExpanded(true)} className="collapsed-input">
          Take a note...
        </div>
      )}
    </div>
  );
};

export default AddNewTask;
