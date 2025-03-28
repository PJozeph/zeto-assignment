export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING"
  }
  
  export interface Recording {
    id?: number; 
    title: string;
    duration: number;
    status: Status;
    sedation?: string;
    activation?: string;
  }
  