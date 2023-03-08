import { Box, CssBaseline } from "@mui/material";
import React from "react";
import BannerDashBoard from "./components/BannerDashBoard";
import Navbar from "../../../components/Navbar";
import { OwnerSidebar } from "../../../services/constants/componentConstants";
import { useEffect } from "react";
import { useState } from "react";
import { axiosUrl } from "../../../services/api/axios";
import {
  DELETE_BANNER,
  GET_BANNER,
} from "../../../services/constants/apiConstants";

const banner = [];

const initialValues = {
  id: "",
  banner_url: "",
};

const Index = () => {
  const [bannerList, setBannerList] = useState(banner);
  const [values, setvalues] = useState(initialValues);
  const [isAddNew, setIsAddNew] = useState(false);
  const [isUpdateRow, setIsUpdateRow] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.get(GET_BANNER, params);
      const data = [...response.data];
      console.log(data);
      setBannerList(data);
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };

  const addData = async (value) => {
    const params = {
      banner_url: value.banner_url,
    };
    try {
      await axiosUrl.post(GET_BANNER, params);
      setvalues(initialValues);
      setIsAddNew(false);
      // setIsDisabled(false);

      fetchData();
    } catch (error) {
      console.error(`Error at addData: ${error}`);
    }
  };

  const updateData = async (value) => {
    const params = {
      id: value.id,
      banner_url: value.banner_url,
    };
    try {
      await axiosUrl.put(GET_BANNER, params);
      setvalues(initialValues);
      setIsUpdateRow(false);

      fetchData();
    } catch (error) {
      console.error(`Error at updateData: ${error}`);
    }
  };

  const handleDelete = async (value) => {
    try {
      await axiosUrl.delete(DELETE_BANNER(value.id));

      fetchData();
    } catch (error) {
      console.error(`Error at handleDelete: ${error}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isAddNew === true ? addData(values) : updateData(values);
  };

  const showAddForm = () => {
    setIsAddNew(true);
    setIsUpdateRow(false);
  };

  const cancelForm = () => {
    setvalues(initialValues);
    setIsAddNew(false);
    setIsUpdateRow(false);
  };

  const showUpdateForm = (row) => {
    setIsAddNew(false);
    setIsUpdateRow(true);
    setvalues(row);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <OwnerSidebar />
      <BannerDashBoard
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        cancelForm={cancelForm}
        handleChange={handleChange}
        values={values}
        showUpdateForm={showUpdateForm}
        showAddForm={showAddForm}
        isUpdateRow={isUpdateRow}
        isAddNew={isAddNew}
        bannerList={bannerList}
      />
    </Box>
  );
};

export default Index;
