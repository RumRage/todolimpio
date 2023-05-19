import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { CategoryProvider } from './Context/CategoryContext';

import { CategoryIndex } from './components/categories/CategoryIndex';
import { CategoryCreate } from './components/categories/CategoryCreate';
import { CategoryEdit } from './components/categories/CategoryEdit';

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Sidebar isSidebar={isSidebar} />
          <main className="content">
             <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
              path="/categories/*"
              element={
                <CategoryProvider>
                  <Routes>
                    <Route path="/" element={<CategoryIndex />} />
                    <Route path="/create" element={<CategoryCreate />} />
                    <Route path="/:id/edit" element={<CategoryEdit />} />
                  </Routes>
                </CategoryProvider>
              }
            />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
