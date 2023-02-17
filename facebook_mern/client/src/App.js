import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import LoginFacebook from "./scenes/loginPage/LoginFacebook";
import ProfilePage from "./scenes/profilePage";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Post from "./scenes/SearchPage/Search";
import DetailShortNews from "./scenes/homePage/ShortNews/DetailShortNews";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  // console.log("isAuth", isAuth);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* <Route path="/login" element={<LoginFacebook />} /> */}
            {/* <Route path="/" element={<LoginPage />} /> */}

            <Route
              path="/"
              // element={<LoginFacebook />}
              element={isAuth ? <HomePage /> : <LoginFacebook />}
            />
            <Route path="/posts" element={<Post />}></Route>
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/stories/:idStories" element={<DetailShortNews />} />
          </Routes>
          <button className="new_message">
            <i className="fa-solid fa-pen-nib"></i>
          </button>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
