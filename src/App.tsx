import { type OneTask } from "./new-components/oneTask";
import { useState, useEffect } from "react";
import { returnArchivedTasks, returnActiveTasks } from "./utils/filterTasks";
import "./App.css";
import axios from "axios";
import AddNewTask from "./new-components/AddNewTask";
import { Footer } from "./new-components/Footer";
import Header from "./new-components/Header";
import { url } from "./utils/utils";
import ArchivedTasksList from "./new-components/ArchivedTasksList";
import TasksListSortable from "./new-components/TasksListSortable";

export type TitleAndDescription = {
  title: string;
  description: string;
};

function App() {
  const today = new Date().toISOString().substring(0, 10);
  const [listOfActiveTasks, setListOfActiveTasks] = useState<OneTask[]>([]);
  const [listOfArchivedTasks, setListOfArchivedTasks] = useState<OneTask[]>([]);
  console.log(listOfActiveTasks);
  const [titleAndDescription, setTitleAndDescription] =
    useState<TitleAndDescription>({ title: "", description: "" });
  const [dueDate, setDueDate] = useState<string>("");
  const [showArchived, setShowArchive] = useState(false);
  const getTasksList = () => {
    axios
      .get(`${url}/todos/`)
      .then((response) => {
        setListOfActiveTasks(returnActiveTasks(response.data))
        setListOfArchivedTasks(returnArchivedTasks(response.data))
  });
  };
  
  useEffect(() => {
    getTasksList();
  }, []);

  const handleAddTask = () => {
    const task: OneTask = dueDate
      ? {
          title: titleAndDescription.title,
          description: titleAndDescription.description,
          date_added: today,
          due_date: dueDate,
          status: "In progress",
        }
      : {
          title: titleAndDescription.title,
          description: titleAndDescription.description,
          date_added: today,
          status: "In progress",
        };
    axios
      .post(`${url}/todos/`, task)
      .then(() => setDueDate(""))
      .then(() => setTitleAndDescription({ title: "", description: "" }))
      .then(() => getTasksList());
  };

  const handleDeleteTask = (taskId: number | undefined) => {
    if (taskId) {
      axios.delete(`${url}/todos/${taskId}`).then(() => getTasksList());
    }
  };

  const handleUpdateStatus = (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => {
    let task = listOfActiveTasks.find((task) => task.id === taskId);
    if (!task) {
      task = listOfArchivedTasks.find((task) => task.id === taskId);
    }
    console.log(task);
    if (task) {
      axios
        .put(`${url}/todos/${task.id}`, {
          ...task,
          status: status,
        })
        .then(() => getTasksList());
    }
  };

  const handleDateChange = (date: string) => {
    setDueDate(date);
  };

  const handleUpdateTask = (taskToUpdate: OneTask) => {
    const task: OneTask = taskToUpdate.due_date
      ? {
          id: taskToUpdate.id,
          title: taskToUpdate.title,
          description: taskToUpdate.description,
          date_added: taskToUpdate.date_added,
          due_date: taskToUpdate.due_date,
          status: taskToUpdate.status,
        }
      : {
          id: taskToUpdate.id,
          title: taskToUpdate.title,
          description: taskToUpdate.description,
          date_added: taskToUpdate.date_added,
          status: taskToUpdate.status,
        };
    axios
      .put(`${url}/todos/${task.id}`, task)
      .then(() => setTitleAndDescription({ title: "", description: "" }))
      .then(() => getTasksList());
  };

  const handleUpdateTitle = (value: string) => {
    setTitleAndDescription((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value: string) => {
    setTitleAndDescription((prev) => {
      return { ...prev, description: value };
    });
  };

  return (
    <>
      <Header />
      <AddNewTask
        dueDate={dueDate}
        title={titleAndDescription.title}
        description={titleAndDescription.description}
        setAddTitle={handleUpdateTitle}
        setAddDescription={handleUpdateDescription}
        setAddDate={handleDateChange}
        handleAddTask={handleAddTask}
      />
      <br />
      <TasksListSortable
        listOfTasks={listOfActiveTasks}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
        updateStatus={handleUpdateStatus}
        setTasksList={setListOfActiveTasks}
      />
      <hr />
      <button
        className="archived-button"
        onClick={() => setShowArchive(!showArchived)}
      >
        Show archived
      </button>

      {showArchived && (
        <ArchivedTasksList
          listOfTasks={returnArchivedTasks(listOfArchivedTasks)}
          deleteTask={handleDeleteTask}
          updateStatus={handleUpdateStatus}
          setTasksList={setListOfArchivedTasks}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
