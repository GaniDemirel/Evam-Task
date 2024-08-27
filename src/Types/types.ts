export type User = {
  id: number;
  name: string;
  email: string;
  role: "Manager" | "Intern" | "Developer" | "HR";
  subscription: boolean;
  gender: "Male" | "Female";
};
