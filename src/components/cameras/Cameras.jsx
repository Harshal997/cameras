import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchCameras } from "../../api/api";
import Camera from "../camera/Camera";
import { Header } from "../header/Header";
import leftArrow from "../../assets/arrow-left.png";
import rightArrow from "../../assets/arrow-right.png";
import styles from "./cameras.module.css";


const Cameras = () => {
  const [cameraData, setCameraData] = useState([]);
  const [cameraDataInitial, setCameraDataInitial] = useState([]);
  const [locations, setLocations] = useState([]);
  const [start, setStart] = useState(0);
  const [currNumber, setCurrNumber] = useState(10);
  const fetchData = async () => {
    const response = await fetchCameras();
    setCameraData(response);
    setCameraDataInitial(response);
    setLocations(response.map((resp) => resp.location));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const end = start + currNumber;

  const handleNumberChange = (e) => {
    const newNumber = parseInt(e.target.value, 10);
    setCurrNumber(newNumber);
    setStart(0);
  };

  const handleRightArrow = () => {
    if (end < cameraData.length) {
      setStart(start + currNumber);
    }
  };

  const handleLeftArrow = () => {
    if (start > 0) {
      setStart(start - currNumber);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Header
        locations={locations}
        setCameraData={setCameraData}
        cameraDataInitial={cameraDataInitial}
      />
      {cameraData &&
        cameraData.length &&
        cameraData
          .slice(start, end)
          .map((camera) => (
            <Camera
              cameraData={cameraData}
              key={camera.id}
              data={camera}
              setCameraData={setCameraData}
              setCameraDataInitial={setCameraDataInitial}
            />
          ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "1em",
          marginTop: "1rem",
        }}
      >
        <select className={styles.customSelect} name="items" id="items" onChange={(e) => handleNumberChange(e)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
        </select>
        <button className={styles.arrowStyles} disabled={start <= 0} onClick={handleLeftArrow}>
          <img src={leftArrow} alt="leftArrow" />
        </button>
        <button className={styles.arrowStyles} disabled={end >= cameraData.length} onClick={handleRightArrow}>
          <img src={rightArrow} alt="rightArrow" />
        </button>
      </div>
    </div>
  );
};

export default Cameras;
