import React, {
  forwardRef,
  type HTMLAttributes,
  type CSSProperties,
} from "react";
import Task from "./Task";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
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
  id: string | number;
  withOpacity?: boolean;
  isDragging?: boolean;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      id,
      withOpacity,
      isDragging,
      style,
      title,
      description,
      dateAdded,
      dueDate,
      status,
      deleteTask,
      updateStatus,
      ...props
    },
    ref
  ) => {
    console.log(isDragging);
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? "0.5" : "1",
      height: "100%",
      transformOrigin: "50% 50%",
      display: "flex",
      flexDirection: "column",
      borderRadius: "10px",
      cursor: isDragging ? "all-scroll" : "",
      backgroundColor: "#ffffff",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        <Task
          id={id as unknown as number}
          title={title}
          description={description}
          dateAdded={dateAdded}
          dueDate={dueDate}
          status={status}
          deleteTask={deleteTask}
          updateStatus={updateStatus}
        />
      </div>
    );
  }
);
Item.displayName = "Item";
export default Item;
