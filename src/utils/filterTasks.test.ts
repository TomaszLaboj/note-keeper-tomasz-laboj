import { filterTasksAsInprogress, returnArchivedTasks } from "./filterTasks";

test("filters tasks to show only in progress", () => {
  expect(
    filterTasksAsInprogress([
      {
        title: "new task",
        description: "new taks",
        date_added: "08/08/2023",
        due_date: "09/08/2023",
        status: "In progress",
      },
      {
        title: "new task",
        description: "new task2",
        date_added: "08/08/2023",
        due_date: "09/09/2023",
        status: "Done",
      },
    ])
  ).toEqual([
    {
      title: "new task",
      description: "new taks",
      date_added: "08/08/2023",
      due_date: "09/08/2023",
      status: "In progress",
    },
  ]);
});

test("filters tasks to show only done", () => {
  expect(
    returnArchivedTasks([
      {
        title: "new task",
        description: "new taks",
        date_added: "08/08/2023",
        due_date: "09/08/2023",
        status: "In progress",
      },
      {
        title: "new task",
        description: "new task2",
        date_added: "08/08/2023",
        due_date: "09/09/2023",
        status: "Done",
      },
    ])
  ).toEqual([
    {
      title: "new task",
      description: "new task2",
      date_added: "08/08/2023",
      due_date: "09/09/2023",
      status: "Done",
    },
  ]);
});
