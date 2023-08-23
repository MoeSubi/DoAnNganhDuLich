
import Button from "../../node_modules/react-bootstrap/esm/Button";
import Card from "../../node_modules/react-bootstrap/esm/Card";
import React, { Component, useEffect, useState }  from 'react';
// @ts-ignore
import styles from '../../src/css/styles.css' 
import Col from "../../node_modules/react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import Row from "../../node_modules/react-bootstrap/esm/Row";
export default function DulichCard(props){
    let path = `/diadiems/${props.obj.id}/diemdulichs`
    if (props.type === "diemdulichs")
        path =`/diemdulichs/${props.obj.id}`
    let test = props.obj.id
    return(
        <>

            
            <Col md={4} xs={12}>
                <Card style={{ width: '22rem', marginTop:'20px' }} >
                <Link to={path}>
                    <Card.Img className="image_scale" variant="top" src={props.obj.hinh_anh} />
                </Link>
                <Card.Body style={{height: '16rem'}}>
                    
                        <Card.Title>
                            <Link style={{textDecoration:'none', color:'black',fontSize:'20px'}} to={path}>

                                {props.obj.ten}
                            </Link> 
                        </Card.Title>         
                    <Card.Text style={{fontSize:'20px'}}>
                        Phương tiện di chuyển: {props.obj.phuong_tien}
                    </Card.Text  >
                    <Card.Text style={{fontSize:'20px'}}>
                        Thời gian: {props.obj.chuyen_di}
                    </Card.Text>
                    <Card.Text style={{fontSize:'20px'}}>
                        Ngày khởi hành: {props.obj.ngay_khoi_hanh}
                    </Card.Text>
              
                </Card.Body>
               
                <Card.Footer >
                    <Row>
                        <Col className="text-center">
                            <Link to={path}>

                                <Button style={{fontSize: '20px', fontWeight:'600'}} variant="outline-primary" 
                                >Xem chi tiết</Button>{' '}
                            </Link>
                        </Col>
                    </Row>
                  
                </Card.Footer>
                </Card>
            </Col>
            
        </>
    )
}