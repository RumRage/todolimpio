import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { CategoryProvider } from './Context/CategoryContext';
import { ProductProvider } from './Context/ProductContext';
import { DisposableProvider } from './Context/DisposableContext';
import { ServiceProvider } from './Context/ServiceContext';
import { ComboProvider } from './Context/ComboContext';

import { CategoryIndex } from './components/categories/CategoryIndex';
import { CategoryCreate } from './components/categories/CategoryCreate';
import { CategoryEdit } from './components/categories/CategoryEdit';

import { ProductIndex } from './components/products/ProductIndex';
import { ProductCreate } from './components/products/ProductCreate';
import { ProductEdit } from './components/products/ProductEdit';

import { DisposableIndex } from './components/disposables/DisposableIndex';
import { DisposableCreate } from './components/disposables/DisposableCreate';
import { DisposableEdit } from './components/disposables/DisposableEdit';

import { ServiceIndex } from './components/services/ServiceIndex';
import { ServiceCreate } from './components/services/ServiceCreate';
import { ServiceEdit } from './components/services/ServiceEdit';

import { ComboIndex } from './components/combos/ComboIndex';
import { ComboCreate } from './components/combos/ComboCreate';
import { ComboEdit } from './components/combos/ComboEdit';


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
             <Route
              path="/products/*"
              element={
                <ProductProvider>
                  <Routes>
                    <Route path="/" element={<ProductIndex />} />
                    <Route path="/create" element={<ProductCreate />} />
                    <Route path="/:id/edit" element={<ProductEdit />} />
                  </Routes>
                </ProductProvider>
              }
            />
             <Route
              path="/disposables/*"
              element={
                <DisposableProvider>
                  <Routes>
                    <Route path="/" element={<DisposableIndex />} />
                    <Route path="/create" element={<DisposableCreate />} />
                    <Route path="/:id/edit" element={<DisposableEdit />} />
                  </Routes>
                </DisposableProvider>
              }
            />
             <Route
              path="/services/*"
              element={
                <ServiceProvider>
                  <Routes>
                    <Route path="/" element={<ServiceIndex />} />
                    <Route path="/create" element={<ServiceCreate />} />
                    <Route path="/:id/edit" element={<ServiceEdit />} />
                  </Routes>
                </ServiceProvider>
              }
            />
             <Route
              path="/combos/*"
              element={
                <ComboProvider>
                  <Routes>
                    <Route path="/" element={<ComboIndex />} />
                    <Route path="/create" element={<ComboCreate />} />
                    <Route path="/:id/edit" element={<ComboEdit />} />
                  </Routes>
                </ComboProvider>
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
