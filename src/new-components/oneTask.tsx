export interface OneTask {
  title: string;
  description: string;
  date_added: string;
  due_date?: string | undefined;
  status: string;
  id?: number | undefined;
}

export function OneTaskElement(props: OneTask) {
  return (
    <>
      <div className="oneTask">
        <p>
          <span className="cells">{props.title}</span>
          <span className="cells">{props.description}</span>
          <span className="cells">{props.date_added}</span>
          <span className="cells">{props.due_date}</span>
          <span className="cells">{props.status}</span>
        </p>
      </div>
    </>
  );
}
