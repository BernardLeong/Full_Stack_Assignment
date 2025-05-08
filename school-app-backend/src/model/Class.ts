import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';
import { Teacher } from './Teacher';

export class Class extends Model {
  public id!: number;
  public level!: string;
  public name!: string;
  public formTeacherId!: number;
}

Class.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    level: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    formTeacherId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      field: 'form_teacher_id',
    },
  },
  {
    sequelize,
    tableName: 'classes',
    modelName: 'Class',
    timestamps: false,
  }
);

Teacher.hasOne(Class, { foreignKey: 'form_teacher_id' });
Class.belongsTo(Teacher, { foreignKey: 'form_teacher_id', as: 'formTeacher' });
