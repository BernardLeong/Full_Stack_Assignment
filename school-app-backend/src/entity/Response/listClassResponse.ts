export type ClassItem = {
    level: string;
    name: string;
    formTeacher: {
      name: string;
    };
};

export type ListClassSuccessResponse = {
    data: ClassItem[];
};

export type ListClassErrorResponse = {
    error: string;
};