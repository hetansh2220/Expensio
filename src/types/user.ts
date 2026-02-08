import { Timestamp } from "firebase/firestore";

export type Profession = "employee" | "individual";
export type IncomeType = "fixed" | "variable";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  profession: Profession;
  incomeType: IncomeType;
  monthlyIncome: number;
  salaryDate?: number;
  currency: "INR";
  onboardingComplete: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
