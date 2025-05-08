import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

export class Teacher extends Model{
    public id!: number;
    public name!: string;
    public subject!: string;
    public email!: string;
    public contactNumber!: string;
}

Teacher.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      contactNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'contact_number', // In DB: snake_case
      },
    },
    {
      sequelize,
      tableName: 'teachers',
      modelName: 'Teacher',
      timestamps: false,
    }
  );