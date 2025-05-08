import { Request, Response, NextFunction } from 'express';

export const validateClassRequest = (req: Request, res: Response, next: NextFunction): void => {
  const requiredFields = ['level', 'name', 'teacherEmail'];

  for (const field of requiredFields) {
    const value = req.body[field];

    if (!value || String(value).trim() === '') {
      res.status(400).json({
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
      });
      return;
    }
  }

  next();
};
