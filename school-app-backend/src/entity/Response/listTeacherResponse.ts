export type TeacherItem = {
    name: string,
    subject: string,
    email: string,
    contactNumber: string,
};

export type ListTeacherSuccessResponse = {
    data: TeacherItem[];
};

export type ListTeacherErrorResponse = {
    error: string;
};