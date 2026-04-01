import { type OneTask } from "../new-components/oneTask";

export function filterTasksAsInprogress(listOfTasks: OneTask[]): OneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status === "In progress"
  );
  return listOfTasksInProgress;
}
export function returnArchivedTasks(listOfTasks: OneTask[]): OneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status === "Done"
  );
  return listOfTasksInProgress;
}

export function returnActiveTasks(listOfTasks: OneTask[]): OneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status !== "Done"
  );
  return listOfTasksInProgress;
}
