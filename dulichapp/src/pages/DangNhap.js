// @ts-ignore
import React, { useEffect, useState } from 'react';
import Button from '../../node_modules/react-bootstrap/esm/Button';
import Form from '../../node_modules/react-bootstrap/esm/Form'
// @ts-ignore
import { useSelector } from 'react-redux';
import API, { endpoints } from '../configs/API';
import { useDispatch } from '../../node_modules/react-redux/es/exports';
import { useHistory } from 'react-router';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';
import { loginUser } from '../css/ActionCreators/UserCreators';
import cookies from 'react-cookies'
export default function DangNhap() {
    const navti = useNavigate()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()

    const login = async(event) => {
        event.preventDefault()
        try {
            let info = await API.get(endpoints['oauth2-info'])
            let res = await API.post(endpoints['dangnhap'], {
                "client_id": info.data.client_id,
                "client_secret": info.data.client_secret,
                "username": username,
                "password": password,
                "grant_type": "password"
            })
            // @ts-ignore
            cookies.save("access_token", res.data.access_token)

            let user = await API.get(endpoints['nguoidung-hientai'], {
                headers: {
                    'Authorization': `Bearer ${ cookies.load("access_token")}`
                }
            })

            // console.info(user)
           // @ts-ignore
           cookies.save("user", user.data)

            dispatch(loginUser(user.data))
            navti(`/`)
        } catch (error) {
            console.error(error)
        }
    }
    return (<>
    <h1 className="text-center">Đăng nhập</h1>
    <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên người dùng</Form.Label>
            <Form.Control type="text" placeholder="Nhập tên người dùng"
                        // @ts-ignore
                        value ={username} onChange={(event)=>setUsername(event.target.value)} />
            <Form.Text className="text-muted">
            Chúng tôi không chia sẻ thông tin của bạn
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" placeholder="Nhập mật khẩu" 
                        // @ts-ignore
                        value ={password} onChange={(event)=>setPassword(event.target.value)}/>
        </Form.Group>
    
        <Button variant="primary" type="submit">
            Đăng nhập
        </Button>
    </Form>
    
    </>
    
    )
}