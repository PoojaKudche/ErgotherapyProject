import React, { useEffect, useRef, useState } from "react";
import generate from "generate-maze";
import Draggable from "react-native-draggable";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Svg, { G, Defs, Mask, Path, Rect } from "react-native-svg";
import * as ScreenOrientation from "expo-screen-orientation";

const Nachfahren = () => {
  useEffect(() => {
    console.log("screen called");
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    changeScreenOrientation();
  }, []);
  //   const generator = generate;

  //   // Width == 8, height == 4, maze edges are closed, using random seed
  //   const maze = generator(8, 4, true, 123456);
  const [xPosition, setxPosition] = useState(0);
  const [yPosition, setyPosition] = useState(0);
  const nxtBtnRef = useRef(null);
  const path = useRef();
  let x = 0;
  let y = 0;
  useEffect(() => {
    // x = path.current.offsetLeft;
    // y = path.current.offsetTop;
    // abc = path.current.getBoundingClientRect();
    // const [path,setPath] = useState('')
    // let pathData = path.getPathData()
    // alert(pathData)
  }, []);

  const CollisionCheck = (value) => {
    alert(value);
    if (value === "maze-border") {
      alert("You lost. Try again!");
    }
    if (value === "finish") {
    }
  };
  function handlePress(evt) {}

  function pathToAbsolute(relativePath) {
    var pattern = /([ml])\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)/gi,
      coords = [];

    relativePath.replace(pattern, function (match, command, x, y) {
      var prev;

      x = parseFloat(x);
      y = parseFloat(y);

      if (coords.length === 0 || command.toUpperCase() === command) {
        coords.push([x, y]);
      } else {
        prev = coords[coords.length - 1];
        coords.push([x + prev[0], y + prev[1]]);
      }
    });

    return coords;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Level 1</Text>
      </View>
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.buttonText}>Next Level</Text>
      </TouchableOpacity>

      <View style={styles.gamebox}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          height="600"
          viewBox="0 0 323 264"
          preserveAspectRatio="xMidYMid meet">
          <G
            transform="translate(0.000000,264.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none">
            <Path
              onPress={() => {
                alert("pressed");
              }}
              d="M0 1320 l0 -1320 1615 0 1615 0 0 30 c0 17 -4 30 -10 30 -7 0 -10 292 -10 855 0 563 3 855 10 855 6 0 10 32 10 76 0 47 -4 73 -10 69 -7 -4 -10 115 -10 349 0 231 4 356 10 356 6 0 10 5 10 10 0 7 -545 10 -1615 10 l-1615 0 0 -1320z m63 1281 c12 -19 312 -366 444 -515 35 -39 63 -78 63 -86 0 -9 -59 -99 -131 -200 -72 -101 -133 -189 -136 -195 -2 -7 51 -63 119 -126 68 -62 166 -154 218 -204 53 -49 161 -152 242 -227 193 -182 228 -250 179 -346 -24 -47 -67 -72 -123 -72 -46 0 -252 51 -470 116 l-128 38 -27 -20 c-38 -27 -92 -138 -93 -188 0 -84 81 -189 187 -241 55 -27 62 -27 222 -28 214 0 211 -1 436 126 72 41 400 241 413 253 2 1 -36 56 -84 121 -48 65 -178 240 -289 388 -111 149 -220 296 -243 328 l-43 57 3 363 c3 350 4 363 25 403 28 52 93 111 152 137 43 19 71 20 518 25 443 5 473 4 479 -13 4 -9 7 -259 8 -555 l1 -538 -25 -27 c-53 -57 -136 -72 -197 -36 -43 27 -120 145 -243 376 -82 155 -76 148 -131 142 -27 -3 -60 -14 -74 -23 -55 -36 -52 -86 12 -192 36 -58 341 -508 457 -672 290 -411 423 -601 445 -630 l26 -35 5 265 c3 146 2 269 -1 274 -4 4 -64 10 -133 13 -69 3 -126 9 -126 14 0 10 26 69 84 192 25 55 46 100 46 102 0 1 20 45 44 96 24 52 73 159 109 239 36 80 81 179 100 220 19 41 81 176 137 300 205 451 191 427 275 466 191 90 382 -102 295 -295 -11 -24 -20 -58 -20 -75 0 -59 21 -147 46 -194 21 -37 25 -57 21 -96 -4 -45 -10 -54 -68 -110 -36 -34 -93 -83 -128 -111 -36 -27 -69 -58 -75 -67 -9 -16 8 -143 35 -248 5 -19 20 -89 34 -155 37 -168 82 -352 116 -471 16 -56 29 -109 29 -119 0 -9 -39 -62 -86 -118 -47 -56 -88 -108 -91 -114 -3 -7 48 -71 114 -143 65 -72 120 -135 121 -141 2 -5 -35 -9 -90 -9 l-94 0 -55 57 c-119 124 -148 162 -154 206 -9 59 4 85 95 194 65 76 79 99 74 117 -8 25 -12 41 -59 226 -38 150 -64 266 -91 405 -8 44 -19 99 -25 122 -13 59 -23 215 -16 245 4 13 28 45 54 71 48 46 185 152 207 160 7 3 3 19 -12 48 -28 56 -52 166 -52 245 0 45 7 73 25 111 25 48 25 53 11 87 -16 40 -52 55 -94 40 -26 -9 -44 -35 -79 -119 -12 -27 -42 -93 -66 -145 -24 -52 -77 -167 -117 -255 -40 -88 -90 -198 -111 -243 -22 -46 -39 -85 -39 -87 0 -1 -22 -49 -48 -106 -160 -343 -176 -381 -161 -390 8 -5 49 -9 91 -9 42 0 79 -4 83 -9 3 -6 2 -192 -1 -415 l-7 -406 -122 0 -121 0 -60 85 c-32 47 -104 149 -160 228 -353 498 -606 865 -718 1041 -115 180 -130 263 -63 363 53 78 143 123 249 123 95 0 138 -34 208 -165 77 -145 179 -322 200 -346 l19 -24 1 295 c0 162 -3 359 -7 438 l-6 142 -399 0 -398 0 -40 -40 -40 -40 0 -323 1 -322 112 -150 c466 -625 607 -817 607 -828 -1 -6 -67 -52 -148 -101 -81 -50 -205 -125 -277 -169 -307 -186 -370 -210 -575 -223 -226 -14 -371 29 -490 147 -70 69 -120 163 -128 239 -13 133 86 324 194 375 61 29 88 24 384 -67 36 -11 102 -28 147 -38 45 -11 94 -26 108 -36 24 -15 25 -15 25 1 0 19 -58 78 -296 300 -122 114 -269 252 -513 481 l-24 22 123 174 c68 95 134 187 147 204 l24 32 -98 114 c-54 63 -137 160 -185 215 l-88 101 0 101 c0 81 3 101 14 101 8 0 21 -9 29 -19z m3125 -338 c1 -194 -2 -353 -6 -353 -11 0 -37 59 -52 115 -15 61 -12 108 12 161 53 118 0 269 -116 332 -48 26 -179 23 -231 -5 -71 -38 -100 -80 -185 -268 -46 -99 -102 -222 -126 -274 -24 -51 -44 -95 -44 -96 0 -2 -23 -51 -50 -110 -28 -59 -50 -108 -50 -110 0 -2 -18 -41 -39 -87 -98 -209 -331 -723 -331 -730 0 -3 62 -8 137 -12 76 -4 139 -9 141 -10 1 -2 1 -97 0 -211 l-3 -208 -45 64 c-24 35 -139 199 -256 364 -366 519 -590 852 -614 914 -13 32 -12 35 14 57 29 26 68 39 89 31 8 -3 46 -65 86 -139 114 -210 199 -341 239 -369 29 -19 48 -24 101 -24 75 0 121 24 159 82 22 33 22 35 22 587 0 433 -3 557 -12 563 -7 4 -236 6 -508 5 -562 -4 -537 -1 -631 -89 -97 -91 -94 -74 -96 -503 l-3 -375 116 -155 c386 -516 519 -696 522 -706 3 -13 -33 -38 -258 -173 -261 -158 -307 -179 -420 -192 -118 -14 -270 -4 -327 21 -102 45 -181 154 -169 234 7 46 59 144 81 152 8 3 58 -8 112 -25 472 -145 555 -152 630 -54 24 31 28 46 28 102 0 112 -8 120 -493 575 -123 115 -234 218 -248 228 -13 11 -24 24 -24 29 0 5 17 33 38 62 124 168 232 326 232 338 0 13 -48 69 -383 453 -67 77 -126 145 -130 153 -7 11 249 13 1540 11 l1548 -3 3 -352z m-2998 -88 l162 -186 -73 -102 c-40 -56 -106 -149 -146 -207 l-74 -105 78 -75 c43 -41 179 -170 303 -285 273 -255 401 -377 397 -382 -2 -1 -52 11 -113 28 -152 42 -160 45 -239 70 -38 12 -99 24 -135 26 -58 3 -71 0 -118 -27 -61 -36 -101 -86 -150 -190 -33 -70 -36 -82 -36 -170 0 -88 3 -100 33 -160 47 -92 148 -188 246 -235 67 -32 92 -39 192 -48 127 -11 310 1 396 28 79 24 201 93 660 374 92 57 167 106 167 109 0 4 -106 149 -235 322 -129 173 -296 397 -370 497 l-135 182 0 311 0 312 31 29 31 29 371 2 c205 2 377 -1 382 -5 6 -5 11 -146 13 -375 2 -240 0 -364 -7 -357 -5 6 -56 96 -114 200 -124 226 -144 247 -255 253 -150 9 -283 -71 -328 -195 -49 -138 -2 -220 671 -1173 87 -124 201 -286 253 -360 52 -74 101 -142 110 -152 14 -13 43 -17 157 -20 l140 -3 6 440 c4 242 4 443 2 448 -2 4 -39 7 -82 7 -43 0 -80 3 -83 6 -6 5 48 128 148 343 24 51 44 95 44 96 0 2 23 51 50 110 28 59 50 108 50 110 0 1 22 49 49 106 26 57 65 142 86 189 53 118 133 292 143 309 15 26 40 37 60 25 25 -16 26 -40 3 -94 -34 -80 -22 -260 23 -351 9 -18 16 -33 16 -35 0 -2 -45 -38 -100 -79 -56 -42 -114 -95 -130 -117 -27 -37 -30 -49 -30 -115 0 -91 56 -419 99 -578 5 -16 28 -109 52 -206 l43 -175 -76 -90 c-90 -106 -98 -120 -98 -174 0 -58 32 -114 116 -201 41 -41 74 -78 74 -82 0 -4 -652 -7 -1450 -7 l-1450 0 0 1170 c0 644 2 1170 4 1170 3 0 77 -83 166 -185z m3000 -1261 c0 -471 -4 -854 -8 -852 -22 9 -223 240 -219 251 3 6 44 58 92 114 l86 103 -30 102 c-56 193 -174 707 -197 854 -6 39 -4 43 31 70 120 92 202 164 214 188 8 14 18 26 23 26 4 0 8 -385 8 -856z"
            />
            <Path
              onPress={() => {
                alert("pressed");
              }}
              d="M60 2483 c0 -5 34 -46 75 -93 45 -52 73 -91 70 -101 -5 -14 13 -26 78 -57 7 -4 -3 26 -26 75 -5 12 -15 19 -22 17 -6 -3 -45 33 -85 81 -65 77 -90 99 -90 78z"
            />
          </G>
          <Draggable
            renderSize={70}
            x={xPosition}
            y={yPosition}
            bounds="parent"
            renderColor="rad"
            renderText="B"
            onDragRelease={(e) => {
              alert(e.nativeEvent.locationX + " " + e.nativeEvent.locationY);
              let pt = e.nativeEvent.touches.findIndex();
              alert(pt);
            }}></Draggable>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DBDBCC",
  },
  header: {
    minHeight: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  headerText: {
    fontSize: 30,
    paddingTop: 2,
  },
  gamebox: {
    minHeight: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#68B2A0",
    borderWidth: 2,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 140,
    marginRight: 50,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Nachfahren;
