import { useState } from "react";
import "./App.css";
import mockup from "../data/MockUp";

function App() {
  const [data] = useState(mockup);
  const [open, setOpen] = useState(false);

  const Dialog = () => {
    return (
      <dialog open={open}>
        <div className="container-dialog">
          {data.map((item, index) => {
            return (
              <div key={index} className="content-dialog">
                <p>{item.summary.late}</p>
                <p>{item.summary.early}</p>
                <p>{item.summary.onTime}</p>
                <p>{item.summary.leave}</p>
                <p>{item.summary.absent}</p>
                <p>{item.summary.workAbsent}</p>
              </div>
            );
          })}
        </div>
      </dialog>
    );
  };
  return (
    <div className="container">
      <table>
        <thead>
          <th>รหัสพนักงาน</th>
          <th>โปรไฟล์</th>
          <th>status</th>
          <th>score</th>
          <th>summary</th>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.employee.code}</td>
                <td>
                  <div className="profile">
                    <img src={item.employee.image} alt="" />
                    <div className="profile-name">
                      <h2>
                        {item.employee.firstName} {item.employee.lastName}
                      </h2>
                      <p>{item.employee.nickname}</p>
                    </div>
                  </div>
                </td>
                {item.timeAttendances.map((item, index) => {
                  return (
                    <>
                      <td key={index} className="status">
                        <div
                          className={
                            item.status === "absent"
                              ? "warp-status-is-absolute"
                              : item.status === "late"
                              ? "warp-status-is-late"
                              : item.status === "onTime"
                              ? "warp-status-is-onTime"
                              : ""
                          }
                        >
                          {item.status}
                        </div>
                      </td>
                      <td className={item.score > 0 ? "score" : "score-is-not"}>
                        {item.score}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            return setOpen(!open);
                          }}
                        >
                          summary
                        </button>
                      </td>
                      <Dialog />
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
