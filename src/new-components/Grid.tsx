type GridProps = {
  columns: number;
  children: React.ReactNode;
};

const Grid = ({ children }: GridProps) => {
  return <div className="grid-container">{children}</div>;
};

export default Grid;
