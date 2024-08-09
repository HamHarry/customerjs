import { useState } from "react";
import "./App.css";
import mockup from "../data/MockUp";

function App() {
  const [data] = useState(mockup);
  const [open, setOpen] = useState(false);
  const [summaryList, setSummaryList] = useState();
  const [summary, setSummary] = useState(0);

  const Dialog = () => {
    return (
      <dialog open={open}>
        {summaryList && (
          <div className="container-dialog">
            <div className="nav">
              <h2>ข้อมูลการเข้างานทั้งหมด</h2>
              <i
                className="fa-regular fa-circle-xmark"
                onClick={() => {
                  setOpen(!open);
                }}
              ></i>
            </div>
            <div className="content-dialog">
              <p>late: {summaryList.late}</p>
              <p>early: {summaryList.early}</p>
              <p>onTime:{summaryList.onTime}</p>
              <p>leave: {summaryList.leave}</p>
              <p>absent: {summaryList.absent}</p>
              <p>workabsent: {summaryList.workAbsent}</p>
            </div>
          </div>
        )}
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
                    </>
                  );
                })}
                <td>
                  <button
                    onClick={() => {
                      setOpen(!open);
                      setSummaryList(item.summary);
                    }}
                  ></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog />
    </div>
  );
}

export default App;
