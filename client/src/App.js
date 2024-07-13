import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from './component/Route/PublicRoute';
import PrivateRoute from './component/Route/PrivateRoute';
import Layout from './component/shared/Layout/Layout';
import Donar from './pages/Dashboard/Donar';
import Hospitals from './pages/Dashboard/Hospitals';
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Layout>
              <HomePage />
            </Layout>
          </PrivateRoute>

        } />
        <Route path='/doner' element={
          <PrivateRoute>
            <Layout>
              <Donar />
            </Layout>
          </PrivateRoute>

        } />
        <Route path='/hospital' element={
          <PrivateRoute>
            <Layout>
              <Hospitals />
            </Layout>
          </PrivateRoute>

        } />

        <Route path='/login' element={
          <PublicRoute>

            <Login />


          </PublicRoute>

        } />
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>

        } />
      </Routes>
    </>
  )
}

export default App