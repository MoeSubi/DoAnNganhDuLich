import React, {  useRef, useState } from 'react';
import Button from '../../node_modules/react-bootstrap/esm/Button';
import Form from '../../node_modules/react-bootstrap/esm/Form'
import { useNavigate } from '../../node_modules/react-router/dist/index';
import API, { endpoints } from '../configs/API';

import Modal from '../../node_modules/react-bootstrap/esm/Modal';

export default function DangKy(){
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [firstName, setFisrtName]= useState()
    const [lastName, setLastName] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email,setEmail] = useState()

    const [sdt,setSdt] = useState()
    const [cmnd,setCmnd] = useState()
    const [ngaySinh,setNgaysinh] = useState()
    const [diachi,setDiachi] = useState()
    const [gioiTinh,setGioiTinh]=useState()
    const avatar = useRef()
    const useNav = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dangky = (event)=>{
        event.preventDefault()
        
        let dangkynguoidung = async()=>{
          
            const formData= new FormData()
            formData.append("first_name",firstName)
            formData.append("last_name",lastName)
            formData.append("email",email)
            formData.append("sdt",sdt)
             formData.append("cmnd",cmnd)
             formData.append("ngay_sinh",ngaySinh)
             formData.append("dia_chi",diachi)
            formData.append("gioi_tinh",gioiTinh)
            formData.append("password",password)
            formData.append("username",username)
            // @ts-ignore
            // formData.append("avatar",avatar)
            try{

                let res = await API.post(endpoints['dangky'],formData,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                })
            }catch(err){
                console.error(err)
            }
           
            useNav('/dangnhap')
 
        }

        if(password != null && password === confirmPassword){
            dangkynguoidung()
        }

    }
    return(<>
        <h1>Đăng ký</h1>
        <Form onSubmit={dangky}>
            <FormDangKy id="first_name" label="Tên" type="text"
                        value={firstName}
                        change={(event)=>setFisrtName(event.target.value)}>
            </FormDangKy>
            <FormDangKy id="last_name" label="Họ" type="text"
                        value={lastName}
                        change={(event)=>setLastName(event.target.value)}>
            </FormDangKy>



            <FormDangKy id="sdt" label="Số điện thoại" type="text"
                        value={sdt}
                        change={(event)=>setSdt(event.target.value)}>
            </FormDangKy>

            <FormDangKy id="cmnd" label="Số chứng minh nhân dân" type="text"
                        value={cmnd}
                        change={(event)=>setCmnd(event.target.value)}>
            </FormDangKy>

            <FormDangKy id="ngay_sinh" label="Ngày sinh" type="date"
                        value={ngaySinh}
                        change={(event)=>setNgaysinh(event.target.value)}>
            </FormDangKy>

            <FormDangKy id="dia_chi" label="Địa chỉ" type="text"
                        value={diachi}
                        change={(event)=>setDiachi(event.target.value)}>
            </FormDangKy>


            <FormDangKy id="gioi_tinh" label="Giới tính ( 1 nếu là nam, 0 nếu là nữ )" type="text"
                        value={gioiTinh}
                        change={(event)=>setGioiTinh(event.target.value)}>
            </FormDangKy>



            <FormDangKy id="email" label="Email" type="email"
                        value={email}
                        change={(event)=>setEmail(event.target.value)}>
            </FormDangKy>
            <FormDangKy id="username" label="Tên tài khoản" type="text"
                        value={username}
                        change={(event)=>setUsername(event.target.value)}>
            </FormDangKy>
            <FormDangKy id="password" label="Mật khẩu" type="password"
                        value={password}
                        change={(event)=>setPassword(event.target.value)}>
            </FormDangKy>
            <FormDangKy id="password" label="Nhập lại mật khẩu" type="password"
                        value={confirmPassword}
                        change={(event)=>setConfirmPassword(event.target.value)}>
            </FormDangKy>

          
        <Button variant="primary"  onClick={handleShow}>
            Submit
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>Đã đăng ký thành công !</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={dangky}>
                Đồng ý
            </Button>
            </Modal.Footer>
        </Modal>
    </Form>
    </>)
}

function FormDangKy(props){
    return(<>
         <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type}  
                        // @ts-ignore
                        value ={props.value} onChange={props.change}/>
        </Form.Group>
    
    </>)
}
