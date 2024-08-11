import { useState } from "react";
import "./App.css";
import mockup from "../data/MockUp";

function App() {
  const [data] = useState(mockup);
  const [open, setOpen] = useState(false);
  const [dialoglist, setDialoglist] = useState();

  const Dialog = () => {
    return (
      <dialog open={open}>
        {dialoglist && (
          <div className="container-dialog">
            <div className="nav">
              <h2>
                ข้อมูลการเข้างานทั้งหมดของ {dialoglist.employee.title.name}
                {dialoglist.employee.firstName} {dialoglist.employee.lastName}
              </h2>
              <i
                className="fa-regular fa-circle-xmark"
                onClick={() => {
                  setOpen(!open);
                }}
              ></i>
            </div>
            <div className="content-dialog">
              <div className="left">
                <p>late:</p>
                <p>early:</p>
                <p>onTime:</p>
                <p>leave:</p>
                <p>absent:</p>
                <p>workabsent:</p>
              </div>
              <div className="center">
                <p>{dialoglist.summary.late}</p>
                <p>{dialoglist.summary.early}</p>
                <p>{dialoglist.summary.onTime}</p>
                <p>{dialoglist.summary.leave}</p>
                <p>{dialoglist.summary.absent}</p>
                <p>{dialoglist.summary.workAbsent}</p>
              </div>
              <div className="right">
                <p>time</p>
                <p>time</p>
                <p>time</p>
                <p>time</p>
                <p>time</p>
                <p>time</p>
              </div>
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
            const { absent, early, late, leave, onTime, workAbsent } =
              item.summary;
            const total = absent + early + late + leave + onTime + workAbsent;
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
                      setDialoglist(item);
                    }}
                  >
                    {total}
                  </button>
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
