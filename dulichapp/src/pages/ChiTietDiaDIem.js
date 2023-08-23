import React, { useEffect } from 'react';
import { useState } from "react";
import { useParams } from 'react-router';
import Button from "../../node_modules/react-bootstrap/esm/Button";
import Col from "../../node_modules/react-bootstrap/esm/Col";
import Image from "../../node_modules/react-bootstrap/esm/Image";
import Row from "../../node_modules/react-bootstrap/esm/Row";
import Spinner from "../../node_modules/react-bootstrap/esm/Spinner";
import API, { endpoints } from '../configs/API';


export default function ChiTietDiaDiem(){
    const [tour, setTour] = useState(null)
    const [comment,setComment] = useState([])
    // @ts-ignore
    let {diemdulichId} = useParams()
    useEffect(()=>{
        let loadTour = async()=>{
            try {
                let res = await API.get(endpoints["diemdulich-chitiet"](diemdulichId))
                setTour(res.data)
            } catch (error) {
                console.error(error)
            }    
        }
        let loadComment = async () =>{

        }
        loadTour()
        loadComment()
    },[])
    

    if (tour === null)
        return( <Spinner animation="border" variant="primary" /> )

    return (
        <>
            <h1>Chi tiết</h1>

            <Row>
                <Col md = {4} xs = {12}>
                    <Image src={tour.hinh_anh_ddl} rounded fluid></Image>
                </Col>
                <Col md={8} xs={12}>
                    <h2>{tour.ten}</h2>
                    <p style={{fontSize:'18px'}}>Nội dung:{tour.noi_dung}</p>
                    <p>Ngày tạo: {tour.ngay_tao}</p>
                </Col>
               
            </Row>

            <br></br>
            {comment.map(c=>
                
                
                <Row>

                    <Col md={2}>
                        <Image ></Image>
                    </Col>

                    <Col md={10}></Col>
                </Row>
            )}
        </>
    )
}