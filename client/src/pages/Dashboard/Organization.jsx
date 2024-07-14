import moment from "moment";
import React, { useEffect, useState } from "react";

function Organization() {
  let [data, setData] = useState([]);
  async function getDoner() {
    try {
      let { data } = await API.get("/inventory/v1/get-organization");
      setData(data.organizations);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getDoner();
  }, []);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Organization</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col"> Date</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item?.name || item?.originazationName + "(ORG)"}</td>
                      <td>{item?.email}</td>
                      <td>{item?.phone}</td>
                      <td>
                        {moment(item?.createdAt).startOf("hour").fromNow()}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Organization;
