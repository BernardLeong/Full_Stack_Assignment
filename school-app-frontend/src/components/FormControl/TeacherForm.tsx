import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Form } from '../../types/Form';
import { FormErrors } from '../../types/FormErrors';

type TeacherFormProps = {
    handleChange: (field: string, value: string) => void
    formData: Form
    errors: FormErrors
};

const TeacherForm = ({ handleChange, formData, errors }: TeacherFormProps) => {
   const [selectOpen, setSelectOpen] = useState(false);
    return(
        <>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />

        <FormControl fullWidth error={!!errors.subject}>
          <InputLabel>Main Subject</InputLabel>
          <Select
            value={formData.subject}
            label="Select a level"
            onChange={(e) => handleChange('subject', e.target.value)}
            onOpen={() => setSelectOpen(true)}
            onClose={() => setSelectOpen(false)}
            renderValue={(selected) => {
              if (!selected && selectOpen) {
                return <span style={{ color: '#aaa' }}>Select a level</span>;
              }
              return selected;
            }}
          >
            <MenuItem value="English Language">English Language</MenuItem>
            <MenuItem value="Mother Tongue Language">Mother Tongue Language</MenuItem>
            <MenuItem value="Mathematics">Mathematics</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="Art">Art</MenuItem>
            <MenuItem value="Music">Music</MenuItem>
            <MenuItem value="Physical Education">Physical Education</MenuItem>
            <MenuItem value="Social Studies">Social Studies</MenuItem>
            <MenuItem value="Character and Citizenship Education">Character and Citizenship Education</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />

        <TextField
          label="Work Contact Number"
          value={formData.contactNumber}
          onChange={(e) => handleChange('contactNumber', e.target.value)}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber}
          fullWidth
        />
      </>
    )
   
}

export default TeacherForm;