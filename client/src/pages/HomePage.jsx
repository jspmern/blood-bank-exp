import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Model from "../component/shared/model/Model";
import API from "../services/API";
import moment from "moment";
function HomePage() {
  let [data, setData] = useState([]);
  //this is for the get blood handler
  async function getBloodHandler() {
    let { data } = await API.get("/inventory/v1//get-inventory");
    setData(data.inventory);
    //console.log(data.inventory);
  }
  useEffect(() => {
    getBloodHandler();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col m-3">
          <h4
            style={{ cursor: "pointer" }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <span>
              <FaPlus className="me-3" />
            </span>{" "}
            Add Inventory
          </h4>
          <Model />
        </div>
      </div>
      <div className="row mt-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity (ML)</th>
              <th scope="col">Doner Email</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, i) => {
                return (
                  <>
                    {" "}
                    <tr key={i}>
                      <th scope="row">{item.bloodGroup}</th>
                      <td>{item.inventoryType}</td>
                      <td>{item.quantity}</td>
                      <td>{item.donerEmail}</td>
                      <td>
                        {moment(item.updatedAt).startOf("hour").fromNow()}
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
