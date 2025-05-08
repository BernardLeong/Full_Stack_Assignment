import { Request, Response } from 'express';
import { Teacher } from '../model/Teacher';
import { AddTeacherRequest } from '../entity/Request/addTeacherRequest';
import { AddTeacherErrorResponse, AddTeacherSuccessResponse } from '../entity/Response/addTeacherResponse';
import { ListTeacherErrorResponse, ListTeacherSuccessResponse } from '../entity/Response/listTeacherResponse';

export const addTeacher = async (req: Request<AddTeacherRequest>, res: Response<AddTeacherSuccessResponse | AddTeacherErrorResponse>) => {
    try {
      const { name, subject, email, contactNumber } = req.body;
  
      const existing = await Teacher.findOne({ where: { email } });
      if (existing) {
        res.status(400).json({ error: 'Teacher already exists.' });
        return;
      }
  
      const newTeacher = await Teacher.create({ name, subject, email, contactNumber });
  
      res.status(201).json({
        name: newTeacher.name,
        subject: newTeacher.subject,
        email: newTeacher.email,
        contactNumber: newTeacher.contactNumber,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add teacher.' });
    }
  };

  export const listTeachers = async (_req: Request, res: Response<ListTeacherSuccessResponse | ListTeacherErrorResponse>) => {
    try {
      const teachers = await Teacher.findAll({
        attributes: ['name', 'subject', 'email', 'contactNumber'],
        order: [['name', 'ASC']],
      });
  
      res.status(200).json({
        data: teachers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve teachers.' });
    }
  };