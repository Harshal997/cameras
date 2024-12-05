import React from "react";
import styles from "./header.module.css";
import logo from "../../assets/logo.svg";
import location from "../../assets/location.png";
import status from "../../assets/status.png";
import { useState } from "react";
import { useEffect } from "react";

export const Header = ({
  locations,
  setCameraData,
  cameraDataInitial,
}) => {
  const [selectLocation, setSelectedLocation] = useState("");
  const [selectStatus, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState(0);

  const handleSelectLocation = (e) => setSelectedLocation(e.target.value);
  const handleSelectStatus = (e) => setStatus(e.target.value);

  const implementSearch = (search) => {
    if (timer) {
      clearTimeout(timer);
    }
    const timeout = setTimeout(() => {
      if (search) {
        setCameraData(
          cameraDataInitial.filter((data) =>
            data.recorder.toLowerCase().includes(search.toLowerCase())
          )
        );
        return;
      }
      setCameraData(cameraDataInitial);
    }, 500);
    setTimer(timeout);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (selectStatus && selectLocation) {
      setCameraData(
        cameraDataInitial.filter(
          (data) =>
            data.location === selectLocation && data.status === selectStatus
        )
      );
    } else if (selectLocation) {
      setCameraData(
        cameraDataInitial.filter((data) => data.location === selectLocation)
      );
    } else if (selectStatus) {
      setCameraData(
        cameraDataInitial.filter((data) => data.status === selectStatus)
      );
    } else {
      setCameraData(cameraDataInitial);
    }
  }, [selectLocation, selectStatus]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "6.7rem",
        }}
      >
        <img src={logo} alt="logo" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 1em",
          alignItems: "center",
          marginBottom: "2em",
        }}
      >
        <div>
          <h2 className={styles.fieldText} style={{ color: "black" }}>
            Cameras
          </h2>
          <p className={styles.fieldText}>Manage your cameras here.</p>
        </div>
        <input
          className={styles.input}
          value={search}
          type="text"
          placeholder="search"
          onChange={(e) => {setSearch(e.target.value); implementSearch(e.target.value)}}
        />
      </div>
      <div className={styles.dropdownContainer}>
        <select
          className={styles.dropdown}
          defaultValue="Location"
          value={selectLocation}
          name="location"
          id="loc"
          onChange={(e) => handleSelectLocation(e)}
        >
          <option value="" disabled selected>
            Location
          </option>
          <option value="">Clear Location</option>
          {locations &&
            locations.length &&
            locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
        </select>
        <select
          className={styles.dropdown}
          defaultValue="Status"
          value={selectStatus}
          name="status"
          id="status"
          onChange={(e) => handleSelectStatus(e)}
        >
          <option value="" disabled selected>
            Status
          </option>
          <option value="">Clear Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.field}>
          <p className={styles.fieldText}>NAME</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldText}>HEALTH</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldText}>LOCATION</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldText}>RECORDER</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldText}>TASKS</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldText}>STATUS</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldText}>ACTIONS</p>
        </div>
      </div>
    </>
  );
};
