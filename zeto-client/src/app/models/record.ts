export enum Status {
    SCHEDULED = "SCHEDULED",
    RECORDED = "RECORDED",
    REPORTED = "REPORTED"
  }
  
  export interface Recording {
    id: number; 
    title: string;
    duration: number;
    status: Status;
    sedation?: string;
    activation?: string;
  }
  