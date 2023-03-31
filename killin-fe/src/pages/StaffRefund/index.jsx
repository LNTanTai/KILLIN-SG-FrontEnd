import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import StaffRefundDashboard from "./components/StaffRefundDashboard";
import { StaffSidebar } from "../../services/constants/componentConstants";
import { axiosUrl } from "../../services/api/axios";
import {
  POST_GET_ALL_REFUND,
  POST_UPDATE_REFUND_STATUS,
} from "../../services/constants/apiConstants";
import ModalImg from "./components/ModalImg";

const Index = () => {
  const [refundList, setRefundList] = useState([]);
  const [temp, setTemp] = useState(0);
  const [clickImg, setClickImg] = useState(null);
  const [currentIndexImg, setCurrentIndexImg] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageListFilter, setImageListFilter] = useState([]);

  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 2000);
  }, [temp]);

  useEffect(() => {
    fetchData();
  }, [temp]);

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

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.post(POST_GET_ALL_REFUND, params);
      const data = [...response.data];
      setRefundList([]);
      setRefundList(data);
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };

  const handleFinish = async (id) => {
    const params = {
      refundId: id,
      status: "Accept",
    };
    try {
      const response = await axiosUrl.post(POST_UPDATE_REFUND_STATUS, params);
      // const data = [...response.data];
      console.log(response);
      fetchData();
    } catch (error) {
      console.error(`Error at handleFinish: ${error}`);
    }
  };

  const handleCancel = async (id) => {
    const params = {
      refundId: id,
      status: "Cancel",
    };
    try {
      const response = await axiosUrl.post(POST_UPDATE_REFUND_STATUS, params);
      // const data = [...response.data];
      console.log(response);
      fetchData();
    } catch (error) {
      console.error(`Error at handleCancel: ${error}`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StaffSidebar />
      <StaffRefundDashboard
        handleClickImg={handleClickImg}
        handleCancel={handleCancel}
        handleFinish={handleFinish}
        refundList={refundList}
      />
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
  );
};

export default Index;
