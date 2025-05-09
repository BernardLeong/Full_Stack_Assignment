import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './cardbody.css';
import { Teacher } from '../../types/Teacher';
import { Class } from '../../types/Class';
import { Form } from '../../types/Form';
import { FormErrors } from '../../types/FormErrors';
import TeacherForm from '../../components/FormControl/TeacherForm.tsx';
import ClassForm from '../../components/FormControl/ClassForm.tsx';
import { API_BASE_URL } from '../../config.ts';

type CardBodyProps = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
};

const CardBody = ({ setActiveTab, activeTab }: CardBodyProps) => {
const [isAdding, setIsAdding] = useState(false);
const [teachers, setTeachers] = useState<Teacher[]>([]);
const [classes, setClasses] = useState<Class[]>([]);
const [loading, setLoading] = useState<boolean>(true);

const [formData, setFormData] = useState<Form>({
  name: '',
  subject: '',
  email: '',
  contactNumber: '',
  level: '',
  teacherEmail: '',
});

const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
    console.log(teachers.length)
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/teachers`);
      console.log(response.data.data)
      setTeachers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/classes`);
      setClasses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let newErrors: any = {};
    const digitCount = formData.contactNumber.replace(/\D/g, '').length;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (activeTab === 'Teachers') {
      newErrors = {
        name: formData.name ? '' : 'Name is required',
        subject: formData.subject ? '' : 'Subject is required',
        email: formData.email
        ? isValidEmail.test(formData.email)
          ? ''
          : 'Email must be a valid address'
        : 'Email is required',
        contactNumber: formData.contactNumber
        ? /^[\d+\-\s]+$/.test(formData.contactNumber) && digitCount <= 20
          ? ''
          : 'Contact number may include digits, +, - or spaces, and can contain up to 20 digits, no characters are allowed'
        : 'Contact number is required',
      };      
    } else if (activeTab === 'Classes') {
      newErrors = {
        level: formData.level ? '' : 'Level is required',
        name: formData.name ? '' : 'Class Name is required',
        teacherEmail: formData.teacherEmail ? '' : 'Form Teacher is required',
      };
    }
    
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) return;

    try {
      if (activeTab === 'Teachers') {
        await axios.post(`${API_BASE_URL}/api/teachers`, {
          name: formData.name,
          subject: formData.subject,
          email: formData.email,
          contactNumber: formData.contactNumber,
        })
        fetchTeachers()
      } else if (activeTab === 'Classes') {
        await axios.post(`${API_BASE_URL}/api/classes`, {
          level: formData.level,
          name: formData.name,
          teacherEmail: formData.teacherEmail,
        });
        fetchClasses()
      }

      setFormData({ name: '', subject: '', email: '', contactNumber: '', level: '', teacherEmail: '' });
      setIsAdding(false);
      console.log('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      console.log(errors)
      setErrors({teacherEmail: error.response.data.error})
    }
  };

  const teacherColumns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'subject', headerName: 'Subject', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'contactNumber', headerName: 'Work Contact', flex: 1 },
  ];

  const classColumns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'level', headerName: 'Class Level', flex: 1 },
    { field: 'name', headerName: 'Class Name', flex: 1 },
    { field: 'formTeacher', headerName: 'Form Teacher', flex: 1 },
  ];

  const teacherRows = teachers.map((teacher, index) => ({
    id: index + 1,
    name: teacher.name,
    subject: teacher.subject,
    email: teacher.email,
    contactNumber: teacher.contactNumber,
  }));

  const classRows = classes.map((cls, index) => ({
    id: index + 1,
    level: cls.level,
    name: cls.name,
    formTeacher: cls.formTeacher?.name || '',
  }));

  const shouldShowAddButton =
  !isAdding &&
  ((activeTab === 'Teachers' && teachers.length > 0) ||
   (activeTab === 'Classes' && classes.length > 0));


  return (
    <div className="container-card">
      <div className="card-header">
      <div className="card-title">{activeTab}</div>
      {shouldShowAddButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAdding(true)}
          className="add-button"
        >
          + Add {activeTab}
        </Button>
      )}
      </div>

      <div className="card-body">
        {isAdding ? (
          <form onSubmit={handleSubmit} className="teacher-form">
            {activeTab === 'Teachers' ? (
             <TeacherForm 
             handleChange={handleChange} formData={formData} errors={errors}
             />
            ) : (
             <ClassForm handleChange={handleChange} setActiveTab={setActiveTab} setIsAdding={setIsAdding} formData={formData} 
             errors={errors} teachers={teachers} 
             />
            )}
          </form>
        ) : loading ? (
          <p>Loading...</p>
        ) : (activeTab === 'Teachers' ? teachers.length === 0 : classes.length === 0) ? (
          <>
            <p>There are no existing {activeTab.toLowerCase()} yet.</p>
            <Button variant="contained" color="primary" onClick={() => setIsAdding(true)}>
              + Add {activeTab}
            </Button>
          </>
        ) : (
          <div style={{ height: '90%', width: '100%' }}>
            <DataGrid
              rows={activeTab === 'Teachers' ? teacherRows : classRows}
              columns={activeTab === 'Teachers' ? teacherColumns : classColumns}
              pageSizeOptions={[5]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
            />
          </div>
        )}
      </div>

      {isAdding && (
        <div className="card-buttons">
          <button className="back-button" onClick={() => setIsAdding(false)}>Back</button>
          <button className="submit-button" onClick={handleSubmit}>
            Add {activeTab}
          </button>
        </div>
      )}
    </div>
  );
};

export default CardBody;
