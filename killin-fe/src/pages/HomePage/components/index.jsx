import React, { useEffect, useState } from "react";
import { Grid, Paper, Button, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { POST_BANNER, POST_BESTSELLER } from "../../../services/constants/apiConstants";
import { axiosUrl } from "../../../services/api/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { width } from "@mui/system";
import { SHOP_PATH } from "../../../services/constants/pathConstants";


const Image = styled('img')({
    height: 200,
    width: "100%",
    objectFit: "cover",
});

const Root = styled('div')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Box = styled('div')(({ theme }) => ({ 
    padding: theme.spacing(10)
}));

const Banner = () => {
    const [images, setImages] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);

    const fetchBanner = async () => {
        try {
            const response = await axiosUrl.get(POST_BANNER);
            const bannerData = [...response.data];
            setImages(bannerData);
            console.log(bannerData);
        } catch (error) {
            console.error(`Error fetching banner data: ${error}`);
        }
    };
    const fetchBestSeller = async () => {
        try {
            const response = await axiosUrl.get(POST_BESTSELLER);
            const bestSellerData = [...response.data];
            setBestSeller(bestSellerData);
            console.log(`this is the best seller product : ${bestSellerData}`);
        } catch (error) {
            console.error(`Error fetching best : ${error}`);
        }
    };
    useEffect(() => {
        fetchBanner();
        fetchBestSeller();
    }, []);
    const Image = styled('img')({
        height: 700,
        width: "100%",
        objectFit: "cover",
    });
    const Root = styled('div')(({ theme }) => ({
        flexGrow: 1,
        paddingTop: 65,
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        textAlign: 'center',
        justifyContent: 'center',
        height: 500,
    }));
    const PaperStyled = styled(Paper)(({ theme }) => ({
        padding: 0,
        textAlign: "center",
        color: theme.palette.text.secondary,
        width: "100%",
        border: '1px solid',
        height: 500,
    }));


    const settings = {
        paddingTop: "100px",
        height: "500px",
        dots: true,
        infinite: true,
        speed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2700,
        pauseOnHover: false,
        appendDots: (dots) => (
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <ul style={{ marginBottom: "10px", padding: "0px" }}> {dots} </ul>
            </div>
        ),
        // Thêm margin và padding của Slide component
        // để bỏ viền trắng bên ngoài của Slider
        // và để hình ảnh có thể tràn viền luôn
        cssEase: "linear",
        centerMode: true,
        centerPadding: "0px",
        edgeFriction: 0,
        touchThreshold: 100,
        touchMove: true,
        swipeToSlide: true,
        variableWidth: false,
        adaptiveHeight: true,
    };

    const settingSeller = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2700,
        pauseOnHover: true,
        appendDots: (dots) => (
            <div
                style={{
                    position: "relative",
                    bottom: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <ul style={{ marginBottom: "0px", padding: "0px" }}> {dots} </ul>
            </div>
        ),
        // Thêm margin và padding của Slide component
        // để bỏ viền trắng bên ngoài của Slider
        // và để hình ảnh có thể tràn viền luôn
        cssEase: "linear",
        centerMode: true,
        centerPadding: "0px",
        edgeFriction: 0,
        touchThreshold: 100,
        touchMove: true,
        swipeToSlide: true,
        variableWidth: false,
        adaptiveHeight: true,
    };


    return (
        <Root>
            <Slider {...settings}>
                {images.slice(0, 3).map((image) => (
                    <div key={image.id} >
                        <PaperStyled>
                            <Image src={image.banner_url} />
                        </PaperStyled>
                    </div>
                ))}
            </Slider>
            <h1>
                BEST SELLER
            </h1>
                <Slider {...settingSeller}>
                    {bestSeller.slice(0, 7).map((product) => (
                        <div key={product.id}>
                            <p>{product.productName}</p>
                            <Image src={product.productImages[0].url} style={{ height: '200px', objectFit: 'cover' }} />
                        </div>
                    ))}
                </Slider>
            <Button href={`../${SHOP_PATH}`} sx={{ mt: '10px', backgroundColor: 'black', color: 'white', width: '100px' }}>See more</Button>
        </Root>
    );
};

export default Banner;
