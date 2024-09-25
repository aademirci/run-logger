import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './index.scss'
import NavBar from './Common/NavBar.jsx'
import Sidebar from './Common/Sidebar.jsx'
import Runs from './Profile/Runs.jsx'
import CreateRun from './Profile/CreateRun.jsx'
import EditProfile from './Profile/EditProfile.jsx'
import Shoes from './Profile/Shoes.jsx'
import CreateShoes from './Profile/CreateShoes.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App register={false} />} />
                <Route path='/register' element={<App register={true} />} />
                <Route element={
                    <>
                    <NavBar />
                    <div className="profile-container">
                        <Sidebar />
                        <Outlet />
                    </div>
                    </>
                }>
                    <Route path='/user/:username' element={<Runs />} />
                    <Route path='/user/:username/edit' element={<EditProfile />} />
                    <Route path='/user/:username/run/create' element={<CreateRun editing={false} />} />
                    <Route path='/user/:username/run/edit/:id' element={<CreateRun editing={true} />} />
                    <Route path='/user/:username/shoes/' element={<Shoes />} />
                    <Route path='/user/:username/shoes/add' element={<CreateShoes editing={false} />} />
                    <Route path='/user/:username/shoes/edit/:id' element={<CreateShoes editing={true} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
