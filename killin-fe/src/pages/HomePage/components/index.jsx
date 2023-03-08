import React, { useEffect, useState } from "react";
import { Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { POST_BANNER, POST_BESTSELLER } from "../../../services/constants/apiConstants";
import { axiosUrl } from "../../../services/api/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { width } from "@mui/system";
import { SHOP_PATH } from "../../../services/constants/pathConstants";
import { Typography, Box } from '@mui/material';


// const Image = styled('img')({
//     height: 200,
//     width: "100%",
//     objectFit: "cover",
// });

// const Root = styled('div')(({ theme }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(2),
// }));

// const PaperStyled = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
// }));


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
        width: "100%",
        height: "500px",
        objectFit: "cover",
    });
    const Root = styled('div')(({ theme }) => ({
        flexGrow: 1,
        paddingTop: 100,
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        textAlign: 'center',
        justifyContent: 'center',
        height: 1700,
    }));
    const PaperStyled = styled(Paper)(({ theme }) => ({
        paddingTop: 0,
        textAlign: "center",
        color: theme.palette.text.secondary,
        width: "100%",
        border: '1px solid',
    }));


    const settings = {
        paddingTop: "100px",
        height: "300px",
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
        <div>
            <Root>
                <Slider {...settings}>
                    {images.slice(0, 4).map((image) => (
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
                            <Image src={product.productImages[0].url} style={{ height: '400px', objectFit: 'cover' }} />
                        </div>
                    ))}
                </Slider>
                <Button href={`../${SHOP_PATH}`} sx={{ mt: '10px', backgroundColor: 'black', color: 'white', width: '100px' }}>See more</Button>
                <div style={{paddingTop:'100px'}}>
                    <Box sx={{
                        textAlign: 'center',
                        paddingTop: '50px',
                        minHeight: '100vh',
                        backgroundColor: '#f2f2f2'
                    }}>
                        <Typography variant="h2" gutterBottom sx={{ fontFamily: 'Helvetica' }}>
                            Giới thiệu
                        </Typography>
                        <Typography variant="body1" sx={{ width: '50%', margin: '0 auto', fontFamily: 'Montserrat' }}>
                            Killin là một thương hiệu thời trang nổi tiếng với chất lượng sản phẩm đồng đều và giá cả phải chăng. Với sứ mệnh đem đến cho người tiêu dùng những sản phẩm thời trang chất lượng cao với giá thành hợp lý, Killin đã trở thành lựa chọn ưa thích của nhiều khách hàng trên thị trường. Từ áo sơ mi đến quần jean, từ giày sneaker đến phụ kiện thời trang, Killin mang đến cho bạn những sản phẩm tốt nhất với giá cả phải chăng. Với một tiêu chí chất lượng nghiêm ngặt, Killin cam kết sẽ mang đến cho bạn trải nghiệm mua sắm thời trang tuyệt vời.
                        </Typography>
                    </Box>
                </div>


            </Root>
        </div>
    );
};

export default Banner;
