import { OneTask } from "../components/oneTask";

interface ArchivedTasksProps {
  listOfArchivedTasks: OneTask[];
}

const ArchivedTasks = ({ listOfArchivedTasks }: ArchivedTasksProps) => {
  return (
    <>
      <div>
        {listOfArchivedTasks.map((task) => (
          <div key={task.id}>{task.description}</div>
        ))}
      </div>
    </>
  );
};

export default ArchivedTasks;
