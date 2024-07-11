import React, { useState } from "react";
import InputType from "../Form/InputType";
import API from "../../../services/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function Model() {
  let [donerEmail, setDonerEmail] = useState("");
  let [inventoryType, setInventoryType] = useState("in");
  let [quantity, setQuantity] = useState(0);
  let [bloodGroup, setBloodGroup] = useState("");
  let { user } = useSelector((item) => item.auth);
  //this is for the model form submit
  async function modelFormHandler(e) {
    try {
      if (!donerEmail || !bloodGroup) return alert("All Feild is required *");
      let { data } = await API.post("/inventory/v1/create-inventory", {
        donerEmail,
        email: user?.email,
        organization: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      toast.success(data.message);
      // alert(data.message);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Manage Blood Records
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="radio d-flex">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inventroy_type"
                  id="flexRadioDefault1"
                  defaultChecked
                  onChange={(e) => {
                    setInventoryType(e.target.value);
                  }}
                  value={inventoryType}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  IN
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inventroy_type"
                  id="flexRadioDefault2"
                  onChange={(e) => {
                    setInventoryType(e.target.value);
                  }}
                  value={inventoryType}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  OUT
                </label>
              </div>
            </div>
            {/* bloodGroup */}
            <br />
            {/* "O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-" */}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option selected>Open this select menu</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
            </select>

            {/* //doner email */}
            <br />
            <InputType
              labelFor="donerEmail"
              labelText="Doner Email"
              inputType="email"
              value={donerEmail}
              onChange={(e) => {
                setDonerEmail(e.target.value);
              }}
              name="donerEmail"
            />
            {/* Quantity */}
            <br />
            <InputType
              labelFor="quantity"
              labelText="Quantity"
              inputType="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              name="quantity"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={modelFormHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model;
