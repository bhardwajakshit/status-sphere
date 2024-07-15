export interface StatusData {
  title: string;
  status: string;
  updatedAt: string | number;
  icon: React.ReactNode;
  indicator?: string;
}

export type ServicesStatus = {
  [key: string]: {
    status: {
      page: {
        updated_at: string;
      };
      status: {
        description: string;
        indicator: string;
      };
    } | null;
    icon: React.ReactNode;
  };
};

export enum StatusColor {
  GREEN = "green",
  RED = "red",
  ORANGE = "orange",
}
