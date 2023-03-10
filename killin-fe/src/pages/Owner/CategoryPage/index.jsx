import React from "react";
import CategoryDashBoard from "./components/CategoryDashBoard";
import Navbar from "../../../components/Navbar";
import { Box, CssBaseline } from "@mui/material";
import { OwnerSidebar } from "../../../services/constants/componentConstants";
import { useEffect } from "react";
import { useState } from "react";
import { axiosUrl } from "../../../services/api/axios";
import {
  GET_CATEGORY_NAME,
  POST_CATEGORY,
  POST_REMOVE_CATEGORY,
} from "../../../services/constants/apiConstants";

const category = [];

const initialValues = {
  id: "",
  name: "",
};

const Index = () => {
  const [categoryList, setCategoryList] = useState(category);
  const [values, setvalues] = useState(initialValues);
  const [isAddNew, setIsAddNew] = useState(false);
  const [isUpdateRow, setIsUpdateRow] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(category);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.get(GET_CATEGORY_NAME, params);
      const data = [...response.data];

      if (search !== "") {
        const filter = data.filter(
          (datas) =>
            !search.length ||
            `${datas.name}`
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase())
        );
        setCategoryList(filter);
        setCategoryFilter(data);
      } else {
        setCategoryList(data);
        setCategoryFilter(data);
      }
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };

  const handleChangeSearch = (value) => {
    if (value === "") {
      setCategoryList(categoryFilter);
    } else {
      const filter = categoryFilter.filter(
        (data) =>
          !value.length ||
          `${data.name}`
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
      );

      setCategoryList(filter);
    }
  };

  const addData = async (value) => {
    const params = {
      name: value.name,
    };
    try {
      await axiosUrl.post(POST_CATEGORY, params);
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
      name: value.name,
    };
    try {
      await axiosUrl.put(POST_CATEGORY, params);
      setvalues(initialValues);
      setIsUpdateRow(false);

      fetchData();
    } catch (error) {
      console.error(`Error at updateData: ${error}`);
    }
  };

  const handleDelete = async (value) => {
    const params = {
      categoryId: value.id,
    };
    try {
      await axiosUrl.post(POST_REMOVE_CATEGORY, params);

      fetchData();
    } catch (error) {
      console.error(`Error at handleDelete: ${error}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isAddNew === true ? addData(values) : updateData(values);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const showAddForm = () => {
    setIsAddNew(true);
    setIsUpdateRow(false);
  };

  const showUpdateForm = (row) => {
    setIsAddNew(false);
    setIsUpdateRow(true);
    setvalues(row);
  };

  const cancelForm = () => {
    setvalues(initialValues);
    setIsAddNew(false);
    setIsUpdateRow(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <OwnerSidebar />
      <CategoryDashBoard
        search={search}
        setSearch={setSearch}
        handleChangeSearch={handleChangeSearch}
        handleDelete={handleDelete}
        showAddForm={showAddForm}
        showUpdateForm={showUpdateForm}
        cancelForm={cancelForm}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isUpdateRow={isUpdateRow}
        isAddNew={isAddNew}
        categoryList={categoryList}
      />
    </Box>
  );
};

export default Index;
