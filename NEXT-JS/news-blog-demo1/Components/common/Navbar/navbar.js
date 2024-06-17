import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import Style from '../../../styles/Header.module.css'
import { useState } from 'react';


function NavbarHeader() {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className=''>
    <Navbar expand="lg" bg="dark" className="py-3">
    <Navbar.Toggle aria-controls="navbarSupportedContent" style={{ borderColor: 'white', background:'white',marginLeft:'auto',marginRight:'auto'  }}  />
    <Navbar.Collapse id="navbarSupportedContent">
        <Nav>
            <Link href="/" className={Style.textdecoration}>Home</Link>
            <Link href="/Blogs/blog" className={Style.textdecoration}>Blog</Link>
            <Link href="/Blogs/about" className={Style.textdecoration}>About us</Link>
            <Link href="/Blogs/contact" className={Style.textdecoration}>Contact us</Link>
        </Nav>
        {collapsed && (
            <Nav className={`ms-auto`}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: 'white', marginLeft:"20px", marginRight:"40px"}}></i>
            </Nav>
          )}
    </Navbar.Collapse>
</Navbar>
</div>
  );
}

export default NavbarHeader;