export type AddTeacherSuccessResponse = {
    name: string,
    subject: string,
    email: string,
    contactNumber: string,
};
  
export type AddTeacherErrorResponse = {
  error: string;
};