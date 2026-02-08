import type { Profession } from "@/types/user";

export const PROFESSIONS: { value: Profession; label: string; icon: string }[] = [
  { value: "employee", label: "Employee", icon: "💼" },
  { value: "individual", label: "Individual", icon: "👤" },
];
