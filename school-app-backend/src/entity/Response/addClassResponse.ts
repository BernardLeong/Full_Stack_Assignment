export type AddClassSuccessResponse = {
    level: string;
    name: string;
    formTeacher: {
      name: string;
    };
  };
  
export type AddClassErrorResponse = {
  error: string;
};