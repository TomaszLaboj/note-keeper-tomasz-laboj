import { useState, useCallback } from "react";
import { type OneTask } from "../new-components/oneTask";
import TaskEditor from "./TaskEditor";
import isEqual from "lodash.isequal";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
  type UniqueIdentifier,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Grid from "./Grid";
import SortableItemForGrid from "./SortableItemForGrid";
import { findTask } from "./ArchivedTasksList";

interface ListOfTasksProps {
  listOfTasks: OneTask[];
  updateTask: (task: OneTask) => void;
  deleteTask: (taskId: number | undefined) => void;
  updateStatus: (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => void;
  setTasksList: React.Dispatch<React.SetStateAction<OneTask[]>>;
}

const TasksListSortable = ({
  listOfTasks,
  updateTask,
  deleteTask,
  updateStatus,
  setTasksList,
}: ListOfTasksProps) => {
  const [highlightedTask, setHighlightedTask] = useState<OneTask | undefined>(
    undefined
  );

  const [highlightedTaskOriginal, setHighlightedTaskOriginal] = useState<
    OneTask | undefined
  >(undefined);

  const [edited, setEdited] = useState(false);
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    console.log('drag end', event)
    const active = event.active;
    const overId = event.over ? event.over.id : null;

    if (active.id !== overId) {
      setTasksList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === overId);
        console.log("active id: ", active.id, "overId: ", overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleHighlightTask = (task: OneTask) => {
    console.log("handle highlight task: ", task);
    setHighlightedTask(task);
    setHighlightedTaskOriginal({ ...task });
  };

  const handleUpdateTitle = (value: string) => {
    setEdited(true);
    setHighlightedTask((prev) => {
      if (prev) {
        return {
          ...prev,
          title: value,
        };
      }
    });
  };

  const handleUpdateDescription = (value: string) => {
    setEdited(true);
    setHighlightedTask((prev) => {
      if (prev) {
        return {
          ...prev,
          description: value,
        };
      }
    });
  };

  const handleUpdateDueDate = (value: string) => {
    setEdited(true);
    setHighlightedTask((prev) => {
      if (prev) {
        return {
          ...prev,
          due_date: value,
        };
      }
    });
  };

  const updateTaskStatus = (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => {
    console.log(taskId);
    updateStatus(taskId, status);
    if (highlightedTask) {
      setHighlightedTask(undefined);
      setHighlightedTaskOriginal(undefined);
    }
    if (edited) setEdited(false);
  };

  const handleDeleteTask = (taskId: number | undefined) => {
    deleteTask(taskId);
    setHighlightedTask(undefined);
    setHighlightedTaskOriginal(undefined);
    if (edited) setEdited(false);
  };

  const handleCloseAndUpdate = () => {
    if (
      highlightedTask &&
      edited &&
      !isEqual(highlightedTask, highlightedTaskOriginal)
    ) {
      updateTask(highlightedTask);
    }
    setEdited(false);
    setHighlightedTask(undefined);
    setHighlightedTaskOriginal(undefined);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={listOfTasks.map((task) => task.id as UniqueIdentifier)}
          strategy={rectSortingStrategy}
        >
          <Grid columns={5}>
            {listOfTasks.map((task: OneTask) => {
              return (
                <div key={task.id} onClick={() => handleHighlightTask(task)}>
                  <SortableItemForGrid
                    title={task.title}
                    description={task.description}
                    dateAdded={new Date(task.date_added).toLocaleDateString()}
                    dueDate={
                      task.due_date &&
                      new Date(task.due_date).toLocaleDateString()
                    }
                    status={task.status}
                    deleteTask={deleteTask}
                    updateStatus={updateTaskStatus}
                    key={task.id}
                    id={task.id as number}
                  />
                </div>
              );
            })}
          </Grid>
        </SortableContext>
                <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                        {activeId ? findTask(parseInt(activeId.toString()), listOfTasks, deleteTask, updateTaskStatus): null}
                    </DragOverlay>
      </DndContext>

      <div className="notes-list-container-sortable"></div>
      {highlightedTask && (
        <TaskEditor
          id={highlightedTask.id}
          title={highlightedTask?.title}
          description={highlightedTask?.description}
          dateAdded={highlightedTask?.date_added}
          dueDate={highlightedTask?.due_date}
          status={highlightedTask?.status}
          updateTitle={handleUpdateTitle}
          updateDescription={handleUpdateDescription}
          updateStatus={updateTaskStatus}
          updateDueDate={handleUpdateDueDate}
          closeAndUpdate={handleCloseAndUpdate}
          deleteTask={handleDeleteTask}
        />
      )}
    </>
  );
};

export default TasksListSortable;
