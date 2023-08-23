import React from 'react';
import { BrowserRouter, Route, Routes } from '../../node_modules/react-router-dom/dist/index';
import ChiTietDiaDiem from '../pages/ChiTietDiaDIem';
import DangKy from '../pages/DangKy';

import DangNhap from '../pages/DangNhap';
import Diadiemdulich from '../pages/Diadiemdulich';
import Home from '../pages/Home';
import CarouselTemp from './CarouselTemp';
import Carousel from './CarouselTemp';
import Footer from './Footer';
import Header from './Header';
export default function Body(){
    return(

        <>
            <BrowserRouter>
                <Header></Header>

               
                <Routes>

                    <Route exact path = "/" 
// @ts-ignore
                     element={<Home/>}></Route>

                    <Route exact path = "/diadiems/:diadiemId/diemdulichs" 
// @ts-ignore 
                     element={<Diadiemdulich/>}></Route>

                    <Route exact path="diemdulichs/:diemdulichId"
// @ts-ignore 
                    element={<ChiTietDiaDiem/>} ></Route>

                    <Route exact path="/dangnhap"
                    // @ts-ignore 
                     element={<DangNhap></DangNhap>}></Route>

                    <Route exact path="/dangky" 
// @ts-ignore
                    element={<DangKy></DangKy>}></Route>
                </Routes>
                <Footer></Footer>
            </BrowserRouter>
        </>
    )
}