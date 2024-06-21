import React, { useEffect, useState } from "react";
import { Badge, Image, Table } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { toast } from "react-toastify";
import { adminConfig } from "../../utils/helpers/token.config";
import axios from "../../utils/helpers/axios";
import moment from "moment";

export default function AllPayments() {
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);

  useEffect(() => {
    getAllTransaction();
  }, []);

  const getAllTransaction = () => {
    setLoading(true);
    axios
      .get("/wallet/all-transaction-for-admin", adminConfig())
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { transaction } = res.data;

          setAllTransaction(transaction);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong!!");
      });
  };

  const approveTransaction = (item) => {
    let { balance, _id, user_id } = item;
    let isAccept = window.prompt("Accept this payment?");

    const data = {
      balance,
      transaction_id: _id,
      user_id: user_id._id,
    };

    if (isAccept === null) return;
    setLoading(true);

    axios
      .post("/wallet/approve-transaction", data, adminConfig())
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(res.data.message);
          getAllTransaction();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong!!");
      });
  };

  const deleteTransaction = (id) => {
    let isAccept = window.prompt("Delete this transaction?");
    if (isAccept === null) return;

    setLoading(true);

    axios
      .delete(`/wallet/transaction/${id}`, adminConfig())
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(res.data.message);
          getAllTransaction();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong!!");
      });
  };

  return (
    <div>
      {loading && <Loader />}

      <h1>All Transactions</h1>

      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Balance</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allTransaction.map((item, key) => {
            return (
              <tr key={key}>
                <td>
                  <Image
                    src={item.user_id?.avatar}
                    roundedCircle
                    width="40"
                    height="40"
                  />
                </td>
                <td>{item.user_id?.name}</td>
                <td>{item.balance}</td>
                <td>{moment(item.date).format("DD-MMM-YYYY")}</td>
                <td>
                  <h5>
                    <Badge bg={item.status ? "success" : "danger"}>
                      {item.status ? "Success" : "Pending"}
                    </Badge>
                  </h5>
                </td>
                <td>
                  {!item.status && (
                    <>
                      <i
                        className="fa-solid fa-check-double approve_payment"
                        onClick={() => {
                          approveTransaction(item);
                        }}
                      />
                      <i
                        className="fa-regular fa-trash-can ms-2 delete"
                        onClick={() => {
                          deleteTransaction(item._id);
                        }}
                      />
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
