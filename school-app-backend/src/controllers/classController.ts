import { Request, Response } from 'express';
import { Class } from '../model/Class';
import { Teacher } from '../model/Teacher';
import { AddClassRequest } from '../entity/Request/addClassRequest';
import { AddClassErrorResponse, AddClassSuccessResponse } from '../entity/Response/addClassResponse';
import { ListClassErrorResponse, ListClassSuccessResponse } from '../entity/Response/listClassResponse';


export const addClass = async (req: Request<AddClassRequest>, res: Response<AddClassSuccessResponse | AddClassErrorResponse>) => {
  try {
    const { level, name, teacherEmail } = req.body;

    const teacher = await Teacher.findOne({ where: { email: teacherEmail } });
    if (!teacher) {
      res.status(400).json({ error: 'Form teacher is not found.' });
      return;
    }

    const existingClass = await Class.findOne({ where: { level, name } });
    if (existingClass) {
      res.status(400).json({ error: 'This class already exists' });
      return;
    }

    const teacherAlreadyAssigned = await Class.findOne({ where: { formTeacherId: teacher.id } });
    if (teacherAlreadyAssigned) {
      res.status(400).json({ error: 'This teacher is already a form teacher for another class' });
      return;
    }


    const newClass = await Class.create({
      level,
      name,
      formTeacherId: teacher.id,
    });

    res.status(201).json({
      level: newClass.level,
      name: newClass.name,
      formTeacher: {
        name: teacher.name,
      },
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add class.' });
  }
};

export const listClasses = async (_req: Request, res: Response<ListClassSuccessResponse | ListClassErrorResponse>) => {
    try {
      const classes = await Class.findAll({
        attributes: ['level', 'name', 'formTeacherId'],
        order: [['level', 'ASC'], ['name', 'ASC']],
      });
  
      const formattedClasses = await Promise.all(
        classes.map(async (cls) => {
          const teacher = await Teacher.findByPk(cls.formTeacherId);
  
          return {
            level: cls.level,
            name: cls.name,
            formTeacher: {
              name: teacher?.name ?? '',
            },
          };
        })
      );
  
      res.status(200).json({
        data: formattedClasses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve classes.' });
    }
};
