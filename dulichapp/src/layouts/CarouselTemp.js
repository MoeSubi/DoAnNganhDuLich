import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from '../../node_modules/react-bootstrap/esm/CarouselItem';
import React from 'react';
export default function CarouselTemp(){
    const SliderData = [
        {
            "id": 1,
            "ten": "Hà Nội Lăng Viếng",
            "hinh_anh": "http://localhost:8000/static/diadiem/HN1.png",
            "ngay_khoi_hanh": "2022-09-29 14:33:28.803147",
            "chuyen_di": "3 ngày 2 đêm",
            "phuong_tien": "Máy Bay",
            "hang_muc": 2,
            "ngay_tao": "2022-09-29T14:33:28.800154Z"
        },
        {
            "id": 2,
            "ten": "Đà Lạt mộng mơ",
            "hinh_anh": "http://localhost:8000/static/diadiem/DL1_XZC1yPI.png",
            "ngay_khoi_hanh": "2022-09-29 14:33:46.067455",
            "chuyen_di": "6 ngày 6 đêm",
            "phuong_tien": "Xe khách Phương Trang",
            "hang_muc": 1,
            "ngay_tao": "2022-09-29T14:33:46.066458Z"
        },
        {
            "id": 3,
            "ten": "Cần Thơ mùa nước nổi",
            "hinh_anh": "http://localhost:8000/static/diadiem/CT4.png",
            "ngay_khoi_hanh": "2022-10-03 14:02:32.420919",
            "chuyen_di": "1 ngày 2 đêm",
            "phuong_tien": "Xe Máy",
            "hang_muc": 3,
            "ngay_tao": "2022-10-03T14:02:32.418925Z"
        },
    ]
    return(<>
        
    <Carousel fade>
        
        <Carousel.Item>
            <img
            className="d-block w-100"
            style={{height:'500px'}}
            src={SliderData[0].hinh_anh}
            alt="First slide"
            />
            <Carousel.Caption>
            <h2>{SliderData[0].ten}</h2>
            <p>{SliderData[0].chuyen_di}</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
              style={{height:'500px'}}
            className="d-block w-100"
            src={SliderData[1].hinh_anh}
            alt="Second slide"
            />

            <Carousel.Caption>
            <h2>{SliderData[1].ten}</h2>
            <p>{SliderData[1].chuyen_di}</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
              style={{height:'500px'}}
            className="d-block w-100"
            src={SliderData[2].hinh_anh}
            alt="Third slide"
            />

            <Carousel.Caption>
            <h2>{SliderData[2].ten}</h2>
            <p>{SliderData[2].chuyen_di}</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    </>)
}