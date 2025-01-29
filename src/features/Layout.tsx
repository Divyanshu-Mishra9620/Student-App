import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Dispatch, SetStateAction } from "react";
interface LayoutProps {
  children: React.ReactNode;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Layout = ({ children, setIsLoggedIn }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
