import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  DialogActions,
} from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const AddStudentModal = ({ isOpen, onClose, onSave }: AddStudentModalProps) => {
  const [formData, setFormData] = useState({
    ID: "",
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    guardianName: "",
    guardianPhone: "",
    bloodGroup: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value.trim()) {
      error = "This field is required";
    } else {
      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format";
      }
      if (name === "phone" || name === "guardianPhone") {
        if (!/^[0-9]{10}$/.test(value)) {
          error = "Phone number must be 10 digits";
        }
      }
      if (name === "dob" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        error = "Invalid date format (YYYY-MM-DD)";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData]);
      if (errors[key]) valid = false;
    });
    if (!valid) return;
    try {
      await setDoc(doc(db, "students", formData.ID), formData);
      onSave();
      onClose();
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/([A-Z])/g, " $1").trim()}
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  required={key !== "ID"}
                  type={
                    key === "dob" ? "date" : key === "email" ? "email" : "text"
                  }
                  InputLabelProps={key === "dob" ? { shrink: true } : undefined}
                  error={!!errors[key]}
                  helperText={errors[key]}
                />
              </Grid>
            ))}
          </Grid>
          <DialogActions>
            <Button onClick={onClose} color="secondary" variant="contained">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
