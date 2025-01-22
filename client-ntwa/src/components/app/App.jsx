import './App.css'
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg'
import Login from '../auth/Login'
import ForgottenPassword from '../auth/ForgottenPassword'
import PasswordReset from '../auth/PasswordReset'
import SignUp from '../auth/SignUp'
import Notes from '../core/Notes'
import ArchivedNotes from '../core/ArchivedNotes';
import Search from '../core/Search';
import Tags from '../core/Tags';
import { ThemeProvider } from '../shared/ThemeProvider';
import Settings from '../core/Settings';
import {NoteProvider} from '../shared/NoteProvider';

// protected Route component to handle authentication
const ProtectedRoute = ({ children }) => {

  //check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? children : <Navigate to="/login" replace/>

}

//layout component to maintain consistent header accross pages
const Layout = ({ children }) => {
  const navigate = useNavigate();

  
  const isAuthenticated = !!localStorage.getItem('token');


  return (
    <main className='flex flex-col justify-center items-center w-375 largePhone:w-410  '>
      <div>
        {isAuthenticated && <section className='bg-gray-200 '>
        <div className='h-14 flex justify-between items-center px-4 lg:hidden'>
            <img 
              src={logo} 
              alt='logo' 
              className='h-8 ' 
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            />
            
        </div>
        </section>}
        {children}
    
    </div>
</main>
)}




function App() {

   const [create, setCreate] = useState(false);
   
   
   

 
  
  return (
    <ThemeProvider>
      <BrowserRouter>
        <NoteProvider>
        <Layout>
          <Routes>
            {/*public routes*/}
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/forgot-password' element={<ForgottenPassword/>}/>
            <Route path='/reset-password' element={<PasswordReset/>}/>

            {/*private route */}
            <Route path='/' element={
              <ProtectedRoute>
                
                  <Notes create={create} setCreate={setCreate} />

                
                
              </ProtectedRoute>
            }/>

            <Route path='/archive' element={
              <ProtectedRoute>
                
                <ArchivedNotes setCreate={setCreate} />

              
                
              </ProtectedRoute>
            }/>

            <Route path='/search' element={
              <ProtectedRoute>
                <Search setCreate={setCreate}/>
              </ProtectedRoute>
            }/>

            <Route path='/tags' element={
              <ProtectedRoute>
                
                <Tags setCreate={setCreate}/>
                
              </ProtectedRoute>
            }/>

            <Route path='/settings' element={
              <ProtectedRoute>
                <Settings setCreate={setCreate}/>
              </ProtectedRoute>
            }/>

            {/*Catch all routes for 404s */}
            <Route path='*' element={<Navigate to='/' replace/>}/>
          </Routes>
        </Layout>
        </NoteProvider>
      </BrowserRouter>
      
    </ThemeProvider>
  )
}



export default App;
