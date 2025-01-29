import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Box,
  Button,
  Container,
  Table,
  TableContainer,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Modal,
  TextField,
  TablePagination,
} from "@mui/material";
import AddStudentModal from "../components/AddStudentModal";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
}

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (student: Student) => {
    setSelectedStudent(student);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleViewOpen = (student: Student) => {
    setSelectedStudent(student);
    setViewOpen(true);
  };
  const handleViewClose = () => setViewOpen(false);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsList: Student[] = [];
      querySnapshot.forEach((doc) => {
        studentsList.push({ id: doc.id, ...doc.data() } as Student);
      });
      setStudents(studentsList);
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  const handleEditSave = async () => {
    if (selectedStudent) {
      try {
        await updateDoc(doc(db, "students", selectedStudent.id), {
          name: selectedStudent.name,
          class: selectedStudent.class,
          section: selectedStudent.section,
          rollNumber: selectedStudent.rollNumber,
        });
        fetchStudents();
        setEditOpen(false);
      } catch (error) {
        console.error("Error updating student: ", error);
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPages = Math.ceil(students.length / rowsPerPage);

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        mb={5}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography variant="h4" flexGrow={1} sx={{ mb: { xs: 2, sm: 0 } }}>
          Students
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Student
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6">Fill the Form</Typography>
            <AddStudentModal
              isOpen={open}
              onClose={() => setOpen(false)}
              onSave={() => {
                fetchStudents();
                setOpen(false);
              }}
            />
          </Box>
        </Modal>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewOpen(student)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="success"
                      onClick={() => handleEditOpen(student)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(student.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

      {/* View Student Modal */}
      <Modal open={viewOpen} onClose={handleViewClose}>
        <Box sx={style}>
          {selectedStudent && (
            <>
              <Typography variant="h6">Student Details</Typography>
              <TextField
                label="Name"
                value={selectedStudent.name}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Class"
                value={selectedStudent.class}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Section"
                value={selectedStudent.section}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Roll Number"
                value={selectedStudent.rollNumber}
                fullWidth
                disabled
                margin="normal"
              />
            </>
          )}
        </Box>
      </Modal>

      {/* Edit Student Modal */}
      <Modal open={editOpen} onClose={handleEditClose}>
        <Box sx={style}>
          {selectedStudent && (
            <>
              <Typography variant="h6">Edit Student</Typography>
              <TextField
                label="Name"
                value={selectedStudent.name}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    name: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Class"
                value={selectedStudent.class}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    class: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Section"
                value={selectedStudent.section}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    section: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Roll Number"
                value={selectedStudent.rollNumber}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    rollNumber: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleEditSave}
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default StudentsPage;
