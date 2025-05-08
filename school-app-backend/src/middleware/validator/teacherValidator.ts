import { Request, Response, NextFunction } from 'express';

export const validateTeacher = (req: Request, res: Response, next: NextFunction): void => {
  const requiredFields = ['name', 'subject', 'email', 'contactNumber'];

  for (const field of requiredFields) {
    if (!req.body[field] || String(req.body[field]).trim() === '') {
      res.status(400).json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.` });
      return;
    }
  }

  next();
};