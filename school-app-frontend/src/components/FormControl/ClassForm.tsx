import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Form } from '../../types/Form';
import { FormErrors } from '../../types/FormErrors';
import { Teacher } from '../../types/Teacher';

type TeacherFormProps = {
    handleChange: (field: string, value: string) => void
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
    setIsAdding: (value: React.SetStateAction<boolean>) => void
    formData: Form
    errors: FormErrors
    teachers: Teacher[]
};

const TeacherForm = ({ handleChange, setActiveTab, setIsAdding, formData, errors, teachers }: TeacherFormProps) => {
    const [selectOpen, setSelectOpen] = useState(false);
    

    return(
        <>
            <FormControl fullWidth error={!!errors.level}>
            <InputLabel>Class Level</InputLabel>
            <Select
                value={formData.level}
                label="Select a level"
                onChange={(e) => handleChange('level', e.target.value)}
            >
                <MenuItem value="Primary 1">Primary 1</MenuItem>
                <MenuItem value="Primary 2">Primary 2</MenuItem>
                <MenuItem value="Primary 3">Primary 3</MenuItem>
                <MenuItem value="Primary 4">Primary 4</MenuItem>
                <MenuItem value="Primary 5">Primary 5</MenuItem>
                <MenuItem value="Primary 6">Primary 6</MenuItem>
            </Select>
            </FormControl>

            <TextField
            label="Class Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            />

            <FormControl fullWidth error={!!errors.teacherEmail}>
            <InputLabel>Form Teacher</InputLabel>
            <Select
                value={formData.teacherEmail}
                label="Form Teacher"
                onChange={(e) => handleChange('teacherEmail', e.target.value)}
                onOpen={() => setSelectOpen(true)}
                onClose={() => setSelectOpen(false)}
                displayEmpty
                renderValue={(selected) => {
                if (!selected && selectOpen) {
                    return <span style={{ color: '#aaa' }}>Assign a form teacher</span>;
                }
                return teachers.find(t => t.email === selected)?.name || selected;
                }}
            >
                {teachers.length === 0 ? (
                <>
                    <MenuItem disabled>No existing teachers.</MenuItem>
                    <MenuItem onClick={()=>{
                       setActiveTab('Teachers'); // switch to Teachers tab
                       setIsAdding(true); // open the Add Teacher form
                    }} value="add_teacher" style={{ color: '#673ab7' }}>
                    Add a teacher
                    </MenuItem>
                </>
                ) : (
                teachers.map((teacher) => (
                    <MenuItem key={teacher.email} value={teacher.email}>
                    {teacher.name}
                    </MenuItem>
                ))
                )}
            </Select>
            {errors.teacherEmail && (
                <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '4px' }}>
                {errors.teacherEmail}
                </p>
            )}
            </FormControl>
        </>
    )
   
}

export default TeacherForm;