import React from 'react'
import Topbar from './Topbar'
import SideBar from './SideBar'
import MobileScreenSideBar from './MobileScreenSideBar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <>
            <div className="main-wrapper">
                <Topbar />
                <SideBar />
                <MobileScreenSideBar />
                <main className="main-content-wrapper">

                    <Outlet />
                </main>


            </div>


        </>
    )
}
