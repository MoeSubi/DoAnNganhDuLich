
import React, { Component }  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from '../../node_modules/react-bootstrap/esm/Col';
import Row from '../../node_modules/react-bootstrap/esm/Row';
import Card from '../../node_modules/react-bootstrap/esm/Card';
import Container from '../../node_modules/react-bootstrap/esm/Container';
import footer from '../../src/css/footer.css'
export default function Footer(){
    return(

        <>

            

            <Row className='footer'>
                <Col md={4}>
                    <Card style={{backgroundColor:"#f7f7f7", width: '18rem', borderWidth:'0px' }}>
                    <Card.Body>
                        <Card.Title>Giới thiệu</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">HỆ THỐNG THÔNG TIN TOUR DU LỊCH</Card.Subtitle>
                        <Card.Text>
                            Giúp du khách tiết kiệm thời gian chọn địa điểm du lịch, tìm hiểu thông tin, giá cả của những tour
                            du lịch ở Việt Nam
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card style={{backgroundColor:"#f7f7f7", width: '18rem', borderWidth:'0px' }}>
                    <Card.Body>
                        <Card.Title>Liên kết</Card.Title>
                        <Card.Link href="#">Các chính sách bảo hành</Card.Link>
                        <br></br>
                        <Card.Link href="#">Bảo hiểm cho người du lịch</Card.Link>
                        <br></br>
                        <Card.Link href="#">Các tour du lịch hot</Card.Link>
                        <br>
                        </br>
                        <Card.Link href="#">Cách đặt tour du lịch</Card.Link>
                    </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card style={{backgroundColor:"#f7f7f7", width: '18rem', borderWidth:'0px' }}>
                    <Card.Body>
                        <Card.Title>Liên hệ</Card.Title>
                        <Card.Text>Địa chỉ liên hệ: 333 Hồng Bàng, Phường 11, Quận 5, Tp HCM</Card.Text>
                        <Card.Text>Email: 1951052105long@ou.edu.vn</Card.Text>
                        <Card.Text>Số điện thoại: 0846269194</Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
           
            <Modal.Body>
                <p className="text-center">Copyright 2022 © Nguyễn Vũ Quang Long & Trần Đức Trọng Hiền</p>
            </Modal.Body>
       

         </>
    )
}