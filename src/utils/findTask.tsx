import Item from "../new-components/Item";
import { type OneTask } from "../new-components/oneTask";

export const findTask = (taskId: number | undefined, tasks: OneTask[], deleteTask: (taskId: number | undefined) => void, updateTaskStatus: (taskId: number | undefined, status: "In progress" | "Done") => void) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      return (
        <Item
            id={taskId ? taskId.toString() : ""}
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
      )
    }
    return null;
  }