import React from "react";
import styles from "./camera.module.css";
import cloud from "../../assets/cloud.png";
import device from "../../assets/device.png";
import warning from "../../assets/warning.png";
import { fetchCameras, updateCameraStatus } from "../../api/api";
const Camera = ({ cameraData, data, setCameraData, setCameraDataInitial }) => {

  const fetchData = async () => {
    const response = await fetchCameras();
    setCameraData(response);
    setCameraDataInitial(response);
  };

  const handleDeleteCamera = (id) => {
    setCameraData(cameraData.filter((data) => data._id !== id));
  }

  const handleStatusChange = async (id, status) => {
    const changedStatus = status === "Active" ? "Inactive" : "Active";
    const response = await updateCameraStatus(id, changedStatus);
    fetchData();
  }

  return (
    <>
      <div className={styles.fieldContainer}>
        <div className={styles.field}>
          <div className={styles.cloudDevice}>
            <div
              style={{
                height: 12,
                width: 12,
                backgroundColor:
                  data.current_status === "Online" ? "green" : "red",
                borderRadius: 100,
              }}
            ></div>
            <p className={styles.fieldText}>{data.name}</p>
            {data.hasWarning && <img src={warning} alt="warning" />}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.cloudDevice} style={{ marginRight: 10 }}>
            <img src={cloud} alt="cloud" />
            <div style={{ color: "black" }} className={styles.fieldText}>
              {data.health.cloud}
            </div>
          </div>
          <div className={styles.cloudDevice}>
            <img src={device} alt="device" />
            <div style={{ color: "black" }} className={styles.fieldText}>
              {data.health.device}
            </div>
          </div>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldText}>{data.location}</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldText}>{data.recorder ? data.recorder : "N/A"}</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldText}>{data.tasks} tasks</p>
        </div>
        <div className={styles.field}>
          <div
            style={{
              backgroundColor:
                data.status === "Active" ? "rgba(2,146,90,0.1)" : "#F0F0F0",
                display: 'flex',
                justifyItems: 'flex-end',
              padding: "3px 12px",
            }}
          >
            <button
              style={{
                color: data.status === "Active" ? "#029262" : "rgb(84,84,84)",
                margin: 0,
                border: 'none'
              }}
              className={styles.statusButton}
              onClick={() => handleStatusChange(data.id, data.status)}
            >
              {data.status}
            </button>
          </div>
        </div>
        <div className={styles.field}>
          <button onClick={() => handleDeleteCamera(data._id)} className={styles.deleteButton}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default Camera;
