import styled from "styled-components";
import LoginForm from "../features/LoginForm";
import { Box, Typography, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock"; // Import Material UI icon

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-items: center; /* Vertically center */
  justify-items: center; /* Horizontally center */
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

interface LoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <LoginLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
        }}
      >
        <IconButton color="primary" sx={{ fontSize: 50 }}>
          <LockIcon />
        </IconButton>
        <Typography variant="h5" component="h1" align="center">
          Log in to your account
        </Typography>
        <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Box>
    </LoginLayout>
  );
};

export default Login;
