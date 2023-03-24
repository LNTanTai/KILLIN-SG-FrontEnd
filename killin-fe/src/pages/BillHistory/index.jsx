import { CssBaseline, Box } from "@mui/material";
import {
  Footer,
  UserSidebar,
} from "../../services/constants/componentConstants";
import React, { useEffect, useState } from "react";
import BillHistory from "./component/BillHistory";
import jwtDecode from "jwt-decode";
import { axiosUrl } from "../../services/api/axios";
import {
  POST_BILL_BY_USERID,
  POST_CREATE_REFUND,
  POST_GET_REFUND_BY_USER_ID,
  POST_UPDATE_BILL_STATUS,
} from "../../services/constants/apiConstants";

const initialValues = {
  reason: "",
  images: [""],
};

const Index = () => {
  const [open, setOpen] = useState(-1);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const [openDialog, setOpenDialog] = React.useState(false);
  const [values, setvalues] = useState(initialValues);
  let [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedBill, setSelectedBill] = useState({});
  const [refundList, setRefundList] = useState([]);
  const [temp, setTemp] = useState(0);
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }

  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchRefund();
    fetchBill();
  }, [temp]);

  useEffect(() => {
    const body = document.querySelector("#root");

    body.scrollIntoView(
      {
        behavior: "auto",
      },
      500
    );
  }, []);

  const fetchBill = async () => {
    const params = {
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_BILL_BY_USERID, params);
      const data = [...response.data];
      setOrders(data);
      console.log(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Hệ thống này đang cập nhật");
      } else {
        console.error(`Error at fetchBill: ${err.message}`);
      }
    }
  };

  const fetchRefund = async () => {
    const params = {
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_GET_REFUND_BY_USER_ID, params);
      const data = { ...response.data };
      setRefundList(data.refundList);
      console.log(data.refundList);
    } catch (err) {
      console.error(`Error at fetchRefund: ${err.message}`);
    }
  };

  const onAdd = () => {
    if (parseInt(quantity) < parseInt(selectedProduct.quantity)) {
      setQuantity(parseInt(quantity) + 1);
    }
  };

  const onMinus = () => {
    if (parseInt(quantity) > 1) {
      setQuantity(parseInt(quantity) - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const handleCancel = async (id) => {
    const params = {
      billId: id,
      billStatus: "",
      processStatus: "Cancel",
      staffUserId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_UPDATE_BILL_STATUS, params);
      // const data = [...response.data];
      console.log(response);
      fetchBill();
    } catch (error) {
      console.error(`Error at handleCancel: ${error}`);
    }
  };

  const handleUrlAdd = () => {
    const list = [...values.images, ""];
    setvalues({ ...values, images: list });
  };

  const handleUrlRemove = (index) => {
    const list = [...values.images];
    list.splice(index, 1);
    setvalues({ ...values, images: list });
  };

  const handleUrlChange = (e, index) => {
    const list = [...values.images];
    list[index] = e.target.value;
    setvalues({ ...values, images: list });
  };

  const handleClickOpenDialog = (product, bill) => {
    // console.log(product);
    setSelectedProduct(product);
    setSelectedBill(bill);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setQuantity(1);
    setSelectedProduct({});
    setSelectedBill({});
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    const params = {
      userId: token.userId,
      billId: selectedBill.billId,
      productList: [
        {
          productId: selectedProduct.productId,
          quantity: `${quantity}`,
          reason: values.reason,
          images: values.images,
        },
      ],
    };
    try {
      await axiosUrl.post(POST_CREATE_REFUND, params);

      setQuantity(1);
      setvalues(initialValues);
      setSelectedProduct({});
      setSelectedBill({});
      setOpenDialog(false);
      fetchRefund();
      fetchBill();
    } catch (error) {
      console.error(`Error at handleSubmit: ${error}`);
      setQuantity(1);
      setSelectedProduct({});
      setSelectedBill({});
      setOpenDialog(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <UserSidebar />
      <BillHistory
        refundList={refundList}
        handleSubmit={handleSubmit}
        handleUrlChange={handleUrlChange}
        handleUrlRemove={handleUrlRemove}
        handleUrlAdd={handleUrlAdd}
        selectedProduct={selectedProduct}
        setQuantity={setQuantity}
        quantity={quantity}
        onMinus={onMinus}
        onAdd={onAdd}
        values={values}
        handleChange={handleChange}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleClickOpenDialog={handleClickOpenDialog}
        userName={token.fullName}
        handleCancel={handleCancel}
        open={open}
        setOpen={setOpen}
        error={error}
        orders={orders}
      />
    </Box>
  );
};

export default Index;
