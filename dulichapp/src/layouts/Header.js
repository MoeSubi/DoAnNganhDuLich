import React, { Component, useEffect, useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, FormControl, Nav, Navbar } from '../../node_modules/react-bootstrap/esm/index';
import {Link} from 'react-router-dom';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import API, {endpoints} from '../configs/API';
import { Navigate } from '../../node_modules/react-router-dom/dist/index';
import cookies from 'react-cookies'
import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { logoutUser } from '../css/ActionCreators/UserCreators';
import header from'../../src/css/header.css'
export default function Header(){
    const [hangmucs, setHangmucs] = useState([])
    const [q,setQ] = useState("")
    // @ts-ignore
    const user = useSelector( state => state.user.user)
    const tem = useNavigate()
    const dispatch = useDispatch()
    useEffect (()=>{
        const loadHangmucs = async () => {
           let res =  await API.get(endpoints['hangmucs'])
           setHangmucs(res.data)
           console.log()
        }
        loadHangmucs()

    }, [])
    const search = (event)=>{
      event.preventDefault()
      tem(`/?dd=${q}`)
    }

    const logout = (event) =>{
      event.preventDefault()
      cookies.remove("access_token")
      cookies.remove("user")
      
      dispatch(logoutUser())
    }
    let path = <>
      <Link className='nav-link text-danger font-size-medium' to="/dangnhap">Đăng nhập</Link>
      <Link className='nav-link text-danger font-size-medium ' to="/dangky">Đăng ký</Link>
    
    </> 
    if(user !== null && user !== undefined){
      path= <>
        <Link className='nav-link text-danger font-size-medium' to="/">{user.username}</Link>
        <Link className='nav-link text-danger font-size-medium' to="/dangnhap" onClick={logout}>Đăng xuất</Link>
      </>
      

    }
    return(

   <> <Navbar  bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Du lịch Việt</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

                <Link className='nav-link font-size-medium' to="/">Trang chủ</Link>

                {hangmucs.map(c =>  
                    {let path = `/?hang_muc_id=${c.id}`
                    return<Link className='nav-link font-size-medium' to={path}>{c.ten}</Link>}
                  )}
                {path}
            </Nav>
     
            <Form className="d-flex" onSubmit={search}>
            <Form.Control
              type="search"
              placeholder="Nhập địa điểm cần tìm"
              className="me-2"
              aria-label="Search"
              value={q}
              onChange = {(event)=>setQ(event.target.value)}
            />
            <Button type="submit" variant="outline-success">Tìm</Button>
            </Form>      
          </Navbar.Collapse>
        </Container>
       
      </Navbar>
   
      </>
    )
}