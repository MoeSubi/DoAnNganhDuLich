
import Button from "../../node_modules/react-bootstrap/esm/Button";
import Card from "../../node_modules/react-bootstrap/esm/Card";
import React, { Component, useEffect, useState }  from 'react';
// @ts-ignore
import styles from '../../src/css/styles.css' 
import Col from "../../node_modules/react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
export default function DiaDiemCard(props){
    let path = `/diadiems/${props.obj.id}/diemdulichs`
    if (props.type === "diemdulichs")
        path =`/diemdulichs/${props.obj.id}`
    let test = props.obj.id
    return(
        <>
            <Col md={12} xs={12}>
                <Card style={{ marginTop:'20px', border:'0' }} >
                    <Card.Title className="text-center" style={{fontSize:"30px"}}>{props.obj.ten}</Card.Title>
                <div className="relative">
                    <Link to={path}>
                        <Card.Img className="img" style={{ width:'600px',height:'400px' }} fluid="true" variant="top" src={props.obj.hinh_anh_ddl} />
                    </Link>
                </div>
                    
                <Card.Body>
                    <Card.Text style={{fontSize:'20px'}}>
                        {props.obj.noi_dung}
                    </Card.Text>
                 
                </Card.Body>
                </Card>
            </Col>
            
        </>
    )
}