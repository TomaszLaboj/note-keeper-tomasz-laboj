type GridProps = {
  columns: number;
  children: React.ReactNode;
};

const Grid = ({ children, columns }: GridProps) => {
  return <div className="grid-container">{children}</div>;
};

export default Grid;
