import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import { axiosUrl } from "../../services/api/axios";
import {
  GET_ACCOUNT,
  POST_BAN_OR_UNBAN_ACCOUNT,
  POST_REGISTER,
  POST_UPDATE_USER,
} from "../../services/constants/apiConstants";
import dayjs from "dayjs";
import { SimpleSnackbar } from "../../services/utils";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

const account = [];

const initialValues = {
  userId: "",
  fullName: "",
  userName: "",
  password: "",
  dob: null,
  address: "",
  email: "",
  role: "",
};

const Index = () => {
  const [accountList, setAccountList] = useState(account);
  const [accountFilter, setAccountFilter] = useState(account);
  const [values, setvalues] = useState(initialValues);
  const [search, setSearch] = useState("");
  const [isAddNew, setIsAddNew] = useState(false);
  const [isUpdateRow, setIsUpdateRow] = useState(false);
  const [role, setRole] = useState("");
  const [selectDob, setSelectDob] = useState(null);
  const [selectRole, setSelectRole] = useState("");
  const location = useLocation("");
  let notify = location?.state?.notify ?? "";
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    if (notify !== "") {
      setOpenSnackbar(true);
      setMessageSnackbar(notify);
      window.history.replaceState({ notify: "" }, document.title);
    }
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 2000);
  }, []);

  useEffect(() => {
    
    fetchData();
  }, [temp]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.post(GET_ACCOUNT, params);
      const data = [...response.data];
      const filter = data.filter(
        (datas) =>
          `${datas.role}`.toString().toLowerCase() !== "4" &&
          `${datas.role}`.toString().toLowerCase() !== "3"
      );
      // console.log(data);
      if (search !== "" || selectRole !== "") {
        const filterData = filter.filter(
          (datas) =>
            !search.length ||
            `${datas.userFullName} ${datas.userName} ${datas.email}`
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase().trim())
        );
        if (selectRole !== "" && search !== "") {
          console.log(1);
          const filterRole = filterData.filter(
            (data) =>
              !selectRole.length ||
              `${data.role}`
                .toString()
                .toLowerCase()
                .includes(selectRole.toString().toLowerCase())
          );
          setAccountList(filterRole);
          setAccountFilter(filter);
        } else if (selectRole !== "" && search === "") {
          console.log(2);
          const filterRole = filter.filter(
            (data) =>
              !selectRole.length ||
              `${data.role}`
                .toString()
                .toLowerCase()
                .includes(selectRole.toString().toLowerCase())
          );
          setAccountList(filterRole);
          setAccountFilter(filter);
        } else {
          console.log(3);
          setAccountList(filterData);
          setAccountFilter(filter);
        }
      } else {
        console.log(4);
        setAccountList(filter);
        setAccountFilter(filter);
      }
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };

  const handleSearch = () => {
    if (selectRole === "") {
      setAccountList(accountFilter);
    } else {
      const filter = accountFilter.filter(
        (data) =>
          !selectRole.length ||
          `${data.role}`
            .toString()
            .toLowerCase()
            .includes(selectRole.toString().toLowerCase())
      );

      setAccountList(filter);
    }
  };

  const createUser = async (newValues, dob, role) => {
    const params = {
      fullName: newValues.fullName,
      userName: newValues.userName,
      password: newValues.password,
      dob: dayjs(dayjs(dob, "DD/MM/YYYY")).format("YYYY-MM-DD"),
      address: newValues.address,
      email: newValues.email,
      role: role,
    };
    try {
      await axiosUrl.post(POST_REGISTER, params);
      setvalues(initialValues);
      setSelectDob(null);
      setRole("");
      setIsAddNew(false);

      fetchData();
    } catch (error) {
      console.error(`Error at createUser: ${error}`);
    }
  };

  const updateUser = async (newValues, dob) => {
    const params = {
      fullName: newValues.fullName,
      email: newValues.email,
      address: newValues.address,
      dob:
        dob !== null
          ? dayjs(dayjs(dob, "DD/MM/YYYY")).format("YYYY-MM-DD") ===
            "Invalid Date"
            ? dob
            : dayjs(dayjs(dob, "DD/MM/YYYY")).format("YYYY-MM-DD")
          : "",
      phoneNumber: "",
      userId: newValues.userId,
    };
    try {
      await axiosUrl.post(POST_UPDATE_USER, params);
      setvalues(initialValues);
      setSelectDob(null);
      setRole("");
      setIsUpdateRow(false);

      fetchData();
    } catch (error) {
      console.error(`Error at updateUser: ${error}`);
    }
  };

  const handleDelete = async (value) => {
    const params = {
      userName: value.userName,
    };
    try {
      await axiosUrl.post(POST_BAN_OR_UNBAN_ACCOUNT, params);

      fetchData();
    } catch (error) {
      console.error(`Error at handleDelete: ${error}`);
    }
  };

  const handleChangeSearch = (value) => {
    if (value === "") {
      setAccountList(accountFilter);
    } else {
      const filter = accountFilter.filter(
        (data) =>
          !value.length ||
          `${data.userFullName} ${data.userName} ${data.email}`
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
      );

      setAccountList(filter);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isAddNew === true
      ? createUser(values, selectDob, role)
      : updateUser(values, selectDob);
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
    // const data = {
    //   userName: row.userName,
    //   userId: row.userId,
    //   fullName: row.userFullName,
    //   role: row.role,
    //   email: row.email,
    //   dob: row.dob,
    //   address: row.address,
    //   password: "",
    // };
    setvalues({ ...values, userId: row.userId });
    // setRole(row.role);
    // setSelectDob(row.dob);
  };

  const cancelForm = () => {
    setvalues(initialValues);
    setRole("");
    setSelectDob(null);
    setIsAddNew(false);
    setIsUpdateRow(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <Navbar />
      <AdminDashboard
        handleSearch={handleSearch}
        selectRole={selectRole}
        setSelectRole={setSelectRole}
        handleDelete={handleDelete}
        selectDob={selectDob}
        setSelectDob={setSelectDob}
        setRole={setRole}
        role={role}
        values={values}
        isUpdateRow={isUpdateRow}
        isAddNew={isAddNew}
        showAddForm={showAddForm}
        showUpdateForm={showUpdateForm}
        cancelForm={cancelForm}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        search={search}
        setSearch={setSearch}
        handleChangeSearch={handleChangeSearch}
        accountList={accountList}
      />
      <SimpleSnackbar
        messageSnackbar={messageSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        openSnackbar={openSnackbar}
      />
    </Box>
  );
};

export default Index;
