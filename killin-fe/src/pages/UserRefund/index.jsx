import { Box, CssBaseline } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserRefundTable from './components/UserRefundTable'
import { UserSidebar } from '../../services/constants/componentConstants'
import jwtDecode from 'jwt-decode'
import { POST_GET_REFUND_BY_USER_ID } from '../../services/constants/apiConstants'
import { axiosUrl } from '../../services/api/axios'
import ModalImg from './components/ModalImg'

const Index = () => {
  const [refundList, setRefundList] = useState([]);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  };
  const [clickImg, setClickImg] = useState(null);
  const [currentIndexImg, setCurrentIndexImg] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageListFilter, setImageListFilter] = useState([]);

  const [temp, setTemp] = useState(0);

  useEffect(()=>{
    setInterval(()=>{
      setTemp((prevTemp)=>prevTemp+1)
    }, 2000)
  }, []);
  
  useEffect(()=>{
    fetchRefund();
  }, [temp]);

  const fetchRefund = async () => {
    const params = {
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_GET_REFUND_BY_USER_ID, params);
      const data = {...response.data};
      setRefundList([]);
      setRefundList(data.refundList);
      // console.log(data.refundList);
    } catch (err) {
      console.error(`Error at fetchRefund: ${err.message}`);
    }
  };

  const handleClickImg = (imageList, image, index2) => {
    setCurrentIndexImg(index2);
    setClickImg(image);
    setImageList(imageList);
    setImageListFilter(imageList);
  };

  const handleRoutationRight = () => {
    const totalLength = imageList.length;
    if (currentIndexImg + 1 >= totalLength) {
      setCurrentIndexImg(0);
      const newUrl = imageList[0];
      setImageList(newUrl);
      return;
    }
    const newIndex = currentIndexImg + 1;

    const newUrl = imageListFilter.filter((img) => {
      return imageListFilter.indexOf(img) === newIndex;
    });
    const newImg = newUrl[0];

    setClickImg(newImg);
    setCurrentIndexImg(newIndex);
  };

  const handleRoutationLeft = () => {
    const totalLength = imageList.length;
    if (currentIndexImg === 0) {
      setCurrentIndexImg(totalLength - 1);
      const newUrl = imageList[totalLength - 1];
      setImageList(newUrl);
    }

    const newIndex = currentIndexImg - 1;

    const newUrl = imageListFilter.filter((img) => {
      return imageListFilter.indexOf(img) === newIndex;
    });
    const newImg = newUrl[0];

    setClickImg(newImg);
    setCurrentIndexImg(newIndex);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <UserSidebar/>
      <UserRefundTable handleClickImg={handleClickImg} refundList={refundList}/>
      {clickImg && (
        <ModalImg
          currentIndexImg={currentIndexImg}
          imageList={imageListFilter}
          clickImg={clickImg}
          handleRoutationRight={handleRoutationRight}
          handleRoutationLeft={handleRoutationLeft}
          setClickImg={setClickImg}
        />
      )}
    </Box>
  )
}

export default Index
