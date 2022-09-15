import React, { useEffect, useState } from "react";
// import NoSleep from "nosleep";

import Maze from "./Maze";

const debug = true;

const MazeMain = () => {
  // useEffect(() => {
  //   const noSleep = new NoSleep();
  //   noSleep.enable();
  //   return () => {
  //     noSleep.disable();
  //   };
  // }, []);
  const [{ xAcceleration, yAcceleration }, setMotion] = useState({
    x: 0,
    y: 0,
  });
  const [supported, setSupported] = useState(true);
  // useEffect(() => {
  //   if (!window.DeviceMotionEvent) {
  //     setSupported(false);
  //   }
  //   const handleMotionEvent = (event) => {
  //     requestAnimationFrame(() =>
  //       setMotion({
  //         xAcceleration: -event.accelerationIncludingGravity.x * 5,
  //         yAcceleration: event.accelerationIncludingGravity.y * 5,
  //       })
  //     );
  //   };

  //   window.addEventListener("devicemotion", handleMotionEvent, true);

  //   return () => window.removeEventListener("devicemotion", handleMotionEvent);
  // }, []);

  // if (debug) {
  //   useEffect(() => {
  //     const handleMouseMove = (event) => {
  //       requestAnimationFrame(() =>
  //         setMotion({
  //           xAcceleration: event.movementX,
  //           yAcceleration: event.movementY,
  //         })
  //       );
  //     };

  //     document.addEventListener("mousemove", handleMouseMove);

  //     return () => window.removeEventListener("mousemove", handleMouseMove);
  //   }, []);
  // }

  if (!supported && !debug) {
    return <p>Not supported</p>;
  }

  return (
    <>
      <Maze
        xAcceleration={xAcceleration}
        yAcceleration={yAcceleration}
        width={800}
        height={1000}
      />
    </>
  );
};

export default MazeMain;
