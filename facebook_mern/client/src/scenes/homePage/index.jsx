import classes from "./index.module.css";
import { Box } from "@mui/material";
import React from "react";
import Navbar from "./../navbar";
import SideBarCenter from "./Center/SideBarCenter";
import SideBarLeft from "./Left/SideBarLeft";
import SideBarRight from "./Right/SideBarRight";
import NavBar from "../navbar/NavBar";

const HomePage = (props) => {
  return (
    <Box>
      <NavBar />
      {/* <Navbar /> */}
      <div className={classes.container}>
        <div>
          <SideBarLeft className={classes.children} />
        </div>
        <div>
          <SideBarCenter />
        </div>
        <div>
          <SideBarRight className={classes.children} />
        </div>
      </div>
    </Box>
  );
};

export default HomePage;
