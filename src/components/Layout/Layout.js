import React from 'react'
import Header from './Header'
import Footer from './Footer'
const Layout = ({ children}) => {
  return (
    <div>
        <Header/>
        <main style={{minHeight:'86.3vh'}}>
        {children} 
        </main>
        <Footer/>
           
    </div>
  )
}

export default Layout