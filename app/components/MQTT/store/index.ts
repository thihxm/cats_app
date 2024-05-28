import { create } from "zustand";

interface Activity { 
  title: string,
  type: string,
  timeStamp: string
}
export interface AlertStore {
  alertStatus: {
    waterTemperature: string,
    waterLevelAlert: string,
  };
  activities : Activity[],
  setAlertStatus: (a: any) => void;
  setActivities:(activities: Activity[]) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alertStatus: {
    waterTemperature: "-",
    waterLevelAlert: "Loading"
  },
  activities: [],
  setActivities: (activities: Activity[]) => set(() => ({activities})),
  setAlertStatus: (alertStatus: any) => set((state) => ({ alertStatus })),
}));
