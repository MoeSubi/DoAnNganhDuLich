import React, { Component, useEffect, useState } from 'react';
import Col from '../../node_modules/react-bootstrap/esm/Col';
import Row from '../../node_modules/react-bootstrap/esm/Row';
import Button from "../../node_modules/react-bootstrap/esm/Button";
import Card from "../../node_modules/react-bootstrap/esm/Card";

import API, { endpoints } from '../configs/API';
import DulichCard from '../layouts/DulichCard';
import { useLocation } from 'react-router-dom';
import ButtonGroup from '../../node_modules/react-bootstrap/esm/ButtonGroup';
import CarouselTemp from '../layouts/CarouselTemp';
export default function Home() {
    const [diadiems, setDiadiems] = useState([])
    const location = useLocation()
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(() => {

        let loadDiadiems = async() => {
            document.title="Du lịch Việt"
            try {
                let query = location.search
                if (query === "")
                    query = `?page=${page}`
                else
                    query += `&page=${page}`
                let res = await API.get(`${endpoints['diadiems']}${query}`)


                setNext(res.data.next !== null)
                setPrev(res.data.previous !== null)
                setDiadiems(res.data.results)

            } catch (err) {
                console.error(err)
            }
        }
        loadDiadiems()
    }, [location.search, page])

    const paging = (inc) => {
        setPage(page + inc)
    }
    return ( <>
             <CarouselTemp></CarouselTemp>
            <h1 style={{marginTop:"20px"}} className = "text-center text-danger" > Các Tour du lịch</h1>

            <Row> {
                diadiems.map(c => < DulichCard obj = { c } > </DulichCard>)}
            </Row>
         
            <Row className="justify-content-md-center">
                <Col xs lg="2">
             
                </Col>
                <Col md="auto">
                    
             
                    <ButtonGroup style={{paddingTop: "40px"}} className="text-center">
                    <Button variant = 'variant="outline-primary"'
                    onClick = {() => paging(-1) }
                    disabled = {!prev } >&lt;&lt; </Button>
                    <Button variant = 'variant="outline-primary"'onClick = {() => paging(1) }
                    disabled = {!next } > &gt;&gt; </Button>

                </ButtonGroup>
                
                
                </Col>
                <Col xs lg="2">
               
                </Col>
            </Row>
            </>
        )
}