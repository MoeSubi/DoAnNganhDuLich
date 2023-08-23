import React, { useEffect, useState } from 'react';

import DulichCard from '../layouts/DulichCard';

import API, {endpoints} from '../configs/API';
import { useParams } from 'react-router';
import Row from '../../node_modules/react-bootstrap/esm/Row';
import DiaDiemCard from '../layouts/DiaDiemCard';
export default function Diadiemdulich(){
    const [diadiemdulichs, setDiadiemdulichs] = useState([])
    // @ts-ignore
    const { diadiemId } = useParams()
    useEffect(()=>{
        let loadDiadiemdulichs = async()=>{
            try{

                    let res = await API.get(endpoints['diadiemdulichs'](diadiemId))
                    setDiadiemdulichs(res.data)
            }catch(err){
                console.error(err)
            }
            
        }
        loadDiadiemdulichs()
    },[])
    return (
        <>
            <h1>Các địa điểm du lịch</h1>
            <Row>
                {diadiemdulichs.map( l  => <DiaDiemCard obj={l} type="diemdulichs"></DiaDiemCard>)}
            </Row>
        </>
    )
}