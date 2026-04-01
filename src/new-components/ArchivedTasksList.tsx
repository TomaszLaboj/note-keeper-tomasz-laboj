import React, { useState, useCallback } from "react";
import { type OneTask } from "../new-components/oneTask";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  // DragOverlay,
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
import ArchivedTaskPreview from "./ArchivedTaskPreview";

interface ListOfTasksProps {
  listOfTasks: OneTask[];
  deleteTask: (taskId: number | undefined) => void;
  updateStatus: (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => void;
  setTasksList: React.Dispatch<React.SetStateAction<OneTask[]>>;
}

const ArchivedTasksList = ({
  listOfTasks,
  deleteTask,
  updateStatus,
  setTasksList,
}: ListOfTasksProps) => {


  const [highlightedTask, setHighlightedTask] = useState<OneTask | undefined>(
    undefined
  );

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
    const active = event.active;
    const overId = event.over ? event.over.id : null;

    if (active.id !== overId) {
      console.log("active id: ", active.id, "overId: ", overId);
      setTasksList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleHighlightTask = (task: OneTask) => {
    setHighlightedTask(task);
  };

  const updateTaskStatus = (
    taskId: number | undefined,
    status: "In progress" | "Done"
  ) => {
    updateStatus(taskId, status);
    if (highlightedTask) {
      setHighlightedTask(undefined);
    }
    if (edited) setEdited(false);
  };

  const handleDeleteTask = (taskId: number | undefined) => {
    deleteTask(taskId);
    setHighlightedTask(undefined);
    if (edited) setEdited(false);
  };

  const closeTaskPreview = () => {
    setHighlightedTask(undefined);
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
        {/* <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <Item id={activeId.toString()} isDragging /> : null}
            </DragOverlay> */}
      </DndContext>

      <div className="notes-list-container-sortable"></div>
      {highlightedTask && (
        <ArchivedTaskPreview
          id={highlightedTask.id}
          title={highlightedTask?.title}
          description={highlightedTask?.description}
          dateAdded={highlightedTask?.date_added}
          dueDate={highlightedTask?.due_date}
          status={highlightedTask?.status}
          updateStatus={updateTaskStatus}
          deleteTask={handleDeleteTask}
          closePreview={closeTaskPreview}
        />
      )}
    </>
  );
};

export default ArchivedTasksList;
