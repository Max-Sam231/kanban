export type Task = {
  id: string;
  title: string;
  descrption: string | null;
  status: "TODO" | "WIP" | "DONE";
  due_date: string;
  created_at: string;
  update_at: string;
};

export type TaskInput = {
  title: string;
  descrption: string | null;
  status: "TODO" | "WIP" | "DONE";
  due_date: string;
};
