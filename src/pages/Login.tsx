import styled from "styled-components";
import LoginForm from "../features/LoginForm";
import { Box, Typography, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr; 
  place-items: center; /
  background-color: var(--color-grey-50);
`;

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
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
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <IconButton color="primary" sx={{ fontSize: 50 }}>
          <LockIcon />
        </IconButton>
        <Typography variant="h5" component="h1" align="center">
          Log in to your account
        </Typography>
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      </Box>
    </LoginLayout>
  );
};

export default Login;
