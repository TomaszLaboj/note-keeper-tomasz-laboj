import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./Item";

interface SortableItemForGridProps {
  id: number;
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

  withOpacity?: boolean;
  isDragging?: boolean;
}

const SortableItemForGrid = (props: SortableItemForGridProps) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id?.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      {...{ ...props, id: props.id.toString() }}
      {...attributes}
      {...listeners}
      isDragging={isDragging}
    />
  );
};

export default SortableItemForGrid;
