/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/api.ts":
/*!*******************************!*\
  !*** ./src/components/api.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveWinner = exports.updateWinner = exports.createWinner = exports.deleteWinner = exports.getWinnerStatus = exports.getWinner = exports.getWinners = exports.switchCarToDrive = exports.stopEngine = exports.startEngine = exports.updateCar = exports.deleteCar = exports.createCar = exports.getCar = exports.getCars = void 0;
const constants_1 = __webpack_require__(/*! ./constants */ "./src/components/constants.ts");
// ----------------CARS------------------------
const getCars = (page, limit = constants_1.constants.defaultGaragePageLimit) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${constants_1.path.garage}?_page=${page}&_limit=${limit}`);
    return {
        items: yield response.json(),
        count: Number(response.headers.get('X-Total-Count')),
    };
});
exports.getCars = getCars;
const getCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield fetch(`${constants_1.path.garage}/${id}`)).json();
});
exports.getCar = getCar;
const createCar = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield fetch(constants_1.path.garage, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })).json();
});
exports.createCar = createCar;
const deleteCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield fetch(`${constants_1.path.garage}/${id}`, { method: 'DELETE' })).json();
});
exports.deleteCar = deleteCar;
const updateCar = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield fetch(`${constants_1.path.garage}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })).json();
});
exports.updateCar = updateCar;
// ----------------ENGINE------------------------
const startEngine = (id) => __awaiter(void 0, void 0, void 0, function* () { return (yield fetch(`${constants_1.path.engine}?id=${id}&status=started`, { method: "PATCH" })).json(); });
exports.startEngine = startEngine;
const stopEngine = (id) => __awaiter(void 0, void 0, void 0, function* () { return (yield fetch(`${constants_1.path.engine}?id=${id}&status=stopped`, { method: "PATCH" })).json(); });
exports.stopEngine = stopEngine;
// не понимаю хачем здесь catch и потом вывод 
const switchCarToDrive = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${constants_1.path.engine}?id=${id}&status=drive`, { method: "PATCH" }).catch();
    return res.status !== 200 ? { success: false } : Object.assign({}, (yield res.json())); // вывод
});
exports.switchCarToDrive = switchCarToDrive;
// ----------------WINNERS------------------------
const getSortOrder = (sort, order) => {
    if (sort && order)
        return `&_sort=${sort}&_order=${order}`;
    return '';
};
const getWinners = ({ page, limit = constants_1.constants.defaultWinnersPage, sort, order }) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${constants_1.path.winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
    const items = yield res.json();
    return {
        items: yield Promise.all(items.map((winner) => __awaiter(void 0, void 0, void 0, function* () { return (Object.assign(Object.assign({}, winner), { car: yield (0, exports.getCar)(winner.id) })); }))),
        count: Number(res.headers.get('X-Total-Count')),
    };
});
exports.getWinners = getWinners;
const getWinner = (id) => __awaiter(void 0, void 0, void 0, function* () { return (yield fetch(`${constants_1.path.winners}/${id}`)).json(); });
exports.getWinner = getWinner;
const getWinnerStatus = (id) => __awaiter(void 0, void 0, void 0, function* () { return (yield fetch(`${constants_1.path.winners}/${id}`)).status; });
exports.getWinnerStatus = getWinnerStatus;
const deleteWinner = (id) => __awaiter(void 0, void 0, void 0, function* () { return (yield fetch(`${constants_1.path.winners}/${id}`, { method: 'DELETE' })).json(); });
exports.deleteWinner = deleteWinner;
const createWinner = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield fetch(constants_1.path.winners, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })).json();
});
exports.createWinner = createWinner;
const updateWinner = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield fetch(`${constants_1.path.winners}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })).json();
});
exports.updateWinner = updateWinner;
const saveWinner = ({ id, time }) => __awaiter(void 0, void 0, void 0, function* () {
    const winnerStatus = yield (0, exports.getWinnerStatus)(id);
    if (winnerStatus === 404) {
        yield (0, exports.createWinner)({
            id,
            wins: 1,
            time,
        });
    }
    else {
        const winner = yield (0, exports.getWinner)(id);
        yield (0, exports.updateWinner)(id, {
            id,
            wins: winner.wins + 1,
            time: time < winner.time ? time : winner.time,
        });
    }
});
exports.saveWinner = saveWinner;


/***/ }),

/***/ "./src/components/app.ts":
/*!*******************************!*\
  !*** ./src/components/app.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addListeners = exports.PageButtonsUpdate = exports.render = exports.winnersUpdate = exports.garageUpdate = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./src/components/api.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/components/constants.ts");
const storage_1 = __webpack_require__(/*! ./storage */ "./src/components/storage.ts");
const generate_car_1 = __webpack_require__(/*! ./generate-car */ "./src/components/generate-car.ts");
const drive_1 = __webpack_require__(/*! ./drive */ "./src/components/drive.ts");
const selectors_1 = __webpack_require__(/*! ./selectors */ "./src/components/selectors.ts");
function garageUpdate() {
    return __awaiter(this, void 0, void 0, function* () {
        const carInfo = yield (0, api_1.getCars)(storage_1.storage.garagePage);
        storage_1.storage.carsCount = carInfo.count;
        storage_1.storage.cars = carInfo.items;
    });
}
exports.garageUpdate = garageUpdate;
function winnersUpdate() {
    return __awaiter(this, void 0, void 0, function* () {
        const winnersInfo = yield (0, api_1.getWinners)({
            page: storage_1.storage.winnersPage,
            limit: constants_1.constants.defaultWinnersPageLimit,
            sort: storage_1.storage.sort,
            order: storage_1.storage.sortOrder,
        });
        storage_1.storage.winnersCount = winnersInfo.count;
        storage_1.storage.winners = winnersInfo.items;
    });
}
exports.winnersUpdate = winnersUpdate;
const renderCar = (color) => `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
width="100.000000pt" height="40.000000pt" viewBox="0 0 1280.000000 640.000000"
preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
fill=${color} stroke="none">
<path d="M3565 5336 c-106 -30 -101 -26 -108 -111 -4 -42 -9 -80 -12 -85 -6 -10 -246 -105 -590 -234 -448 -167 -1052 -415 -1173 -483 -78 -43 -193 -91 -250 -104 -23 -5 -98 -14 -165 -19 -67 -6 -167 -19 -222 -30 -154 -31 -340 -49 -563 -57 l-203 -6 -43 -66 c-59 -91 -60 -95 -26 -130 37 -37 38 -65 3 -150 -25 -62 -27 -78 -31 -256 l-4 -190 -38 -32 c-91 -78 -133 -209 -134 -418 0 -194 11 -396 26 -482 13 -71 14 -74 72 -122 69 -58 130 -129 158 -184 64 -126 534 -211 1384 -250 l92 -4 -6 119 c-6 142 8 256 49 383 112 352 394 622 756 722 90 26 112 28 278 28 165 0 188 -2 278 -27 201 -56 361 -152 504 -302 140 -145 222 -293 274 -492 21 -79 24 -109 23 -279 -1 -127 -6 -214 -16 -263 l-15 -73 3006 7 c1653 4 3007 8 3009 9 1 1 -8 37 -20 81 -19 67 -22 105 -22 259 -1 166 1 187 27 279 117 421 467 736 885 797 119 17 325 7 432 -21 239 -63 453 -205 601 -399 70 -92 154 -267 185 -386 24 -88 27 -119 27 -260 1 -116 -4 -181 -16 -234 -10 -41 -16 -75 -15 -76 2 -1 62 2 133 6 266 16 458 45 525 79 48 24 97 81 127 146 l24 52 -16 157 c-15 152 -15 163 4 284 63 388 50 680 -35 802 -134 193 -526 336 -1429 519 -737 149 -1322 209 -2033 210 -228 0 -226 0 -347 85 -187 131 -1045 607 -1471 815 -383 187 -788 281 -1439 332
-208 17 -1106 16 -1400 0 -121 -7 -314 -19 -430 -27 -302 -22 -286 -22 -341 10 -140 81 -187 94 -269 71z m1885 -333 c6 -37 38 -238 71 -446 32 -209 66
-422 75 -474 9 -52 15 -96 13 -97 -11 -9 -1699 29 -1951 44 -206 13 -417 36 -485 54 -98 26 -198 119 -249 231 -35 75 -36 172 -5 255 17 45 30 61 68 86 83
54 135 80 253 127 341 136 858 230 1460 267 269 16 270 16 511 18 l227 2 12 -67z m630 47 c264 -18 777 -110 1029 -186 186 -56 445 -188 756 -387 211 -134
274 -181 250 -185 -75 -12 -133 -50 -162 -106 -19 -35 -21 -136 -4 -179 l11 -27 -907 2 -906 3 -59 160 c-110 302 -298 878 -298 916 0 6 95 2 290 -11z"/>
<path d="M2633 3125 c-223 -40 -410 -141 -568 -306 -132 -138 -213 -283 -262 -467 -22 -83 -26 -119 -26 -247 -1 -169 10 -236 65 -382 87 -230 271 -436 493
-551 85 -44 178 -78 271 -98 107 -23 312 -23 419 1 392 84 699 375 802 761 23 86 26 120 27 254 1 158 -5 199 -46 330 -98 310 -355 567 -668 669 -150 50
-354 64 -507 36z m350 -301 c249 -56 457 -247 543 -499 25 -72 28 -95 28 -220 1 -153 -15 -228 -74 -345 -94 -186 -283 -337 -485 -386 -96 -24 -268 -24 -360
0 -320 84 -544 355 -562 681 -20 359 209 673 558 765 94 24 253 26 352 4z"/> 
<path d="M2600 2697 c-36 -13 -85 -36 -109 -51 l-44 -28 116 -115 c81 -82 120 -114 131 -110 14 6 16 29 16 167 0 186 6 178 -110 137z"/>
<path d="M2920 2561 c0 -139 2 -162 16 -168 11 -4 50 28 130 108 l115 114 -28
22 c-34 28 -138 70 -193 79 l-40 7 0 -162z"/>
<path d="M2282 2448 c-28 -36 -92 -191 -92 -225 0 -10 34 -13 165 -13 151 0
165 1 165 18 0 15 -206 232 -221 232 -4 0 -11 -6 -17 -12z"/>
<path d="M3222 2351 c-62 -59 -112 -115 -112 -124 0 -15 17 -17 165 -17 131 0
165 3 165 13 0 40 -69 205 -95 227 -7 6 -48 -27 -123 -99z"/>
<path d="M2781 2332 c-12 -22 11 -62 34 -62 8 0 21 10 29 22 20 28 4 58 -29
58 -13 0 -29 -8 -34 -18z"/>
<path d="M2749 2161 c-32 -33 -37 -67 -14 -110 29 -57 104 -64 151 -14 53 57
9 153 -71 153 -27 0 -44 -8 -66 -29z"/>
<path d="M2570 2125 c-26 -32 13 -81 48 -59 24 16 27 45 6 61 -23 17 -39 16
-54 -2z"/>
<path d="M3006 2124 c-20 -19 -20 -38 -2 -54 23 -19 61 -8 64 18 7 44 -32 67
-62 36z"/>
<path d="M2190 1975 c0 -29 41 -140 72 -194 l31 -53 117 117 c71 71 116 123
113 131 -4 11 -40 14 -169 14 -141 0 -164 -2 -164 -15z"/>
<path d="M3110 1972 c0 -9 51 -68 114 -131 l114 -114 31 54 c30 51 71 165 71
195 0 11 -31 14 -165 14 -151 0 -165 -1 -165 -18z"/>
<path d="M2780 1901 c-7 -15 -5 -24 8 -41 32 -40 85 -4 62 41 -14 25 -56 25
-70 0z"/>
<path d="M2562 1697 c-61 -62 -112 -115 -112 -119 0 -18 208 -108 249 -108 7
0 11 54 11 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z"/>
<path d="M2933 1803 c-15 -6 -19 -333 -4 -333 46 0 251 88 251 108 0 9 -223
232 -230 231 -3 0 -11 -3 -17 -6z"/>
<path d="M10700 3119 c-390 -84 -696 -376 -797 -759 -31 -117 -41 -292 -24
-411 33 -227 150 -453 318 -609 267 -250 643 -344 993 -249 117 32 283 118
380 196 487 396 518 1128 67 1560 -97 93 -166 140 -290 198 -137 64 -235 86
-407 91 -120 3 -162 0 -240 -17z m445 -313 c238 -81 409 -258 486 -506 30 -96
33 -289 5 -388 -110 -400 -513 -637 -911 -536 -149 38 -313 147 -402 267 -176
238 -203 533 -71 797 34 69 60 103 138 180 77 78 111 104 181 139 129 65 207
81 364 77 109 -3 143 -7 210 -30z"/>
<path d="M10703 2700 c-54 -19 -153 -71 -153 -80 0 -3 51 -57 114 -119 80 -80
119 -112 130 -108 14 5 16 29 16 167 l0 160 -27 -1 c-16 0 -52 -9 -80 -19z"/>
<path d="M11020 2561 c0 -139 2 -162 16 -168 22 -8 247 216 234 232 -17 20
-163 84 -207 91 l-43 7 0 -162z"/>
<path d="M10366 2424 c-29 -44 -76 -165 -76 -194 0 -19 7 -20 165 -20 126 0
165 3 165 13 0 7 -51 63 -114 126 l-114 114 -26 -39z"/>
<path d="M11313 2348 c-61 -62 -109 -119 -106 -125 6 -15 333 -19 333 -4 0 45
-88 241 -108 241 -4 0 -57 -51 -119 -112z"/>
<path d="M10882 2338 c-17 -17 -15 -32 7 -52 16 -14 23 -15 41 -6 31 17 24 64
-10 68 -14 2 -31 -3 -38 -10z"/>
<path d="M10846 2159 c-68 -81 17 -194 110 -144 89 48 56 175 -46 175 -30 0
-44 -6 -64 -31z"/>
<path d="M10670 2126 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20
-54 2z"/>
<path d="M11106 2127 c-21 -16 -18 -45 7 -61 37 -23 77 35 41 61 -10 7 -21 13
-24 13 -3 0 -14 -6 -24 -13z"/>
<path d="M10290 1970 c0 -29 43 -141 74 -195 l28 -48 116 116 c81 81 113 120
109 131 -6 14 -29 16 -167 16 -152 0 -160 -1 -160 -20z"/>
<path d="M11207 1978 c-3 -7 47 -66 111 -130 l116 -118 27 43 c27 44 79 177
79 203 0 12 -28 14 -164 14 -122 0 -166 -3 -169 -12z"/>
<path d="M10881 1901 c-14 -25 -5 -48 20 -56 27 -9 51 13 47 44 -4 34 -51 43
-67 12z"/>
<path d="M10662 1697 c-61 -62 -112 -115 -112 -119 0 -20 201 -108 247 -108
10 0 13 34 13 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115
-113z"/>
<path d="M11033 1803 c-10 -3 -13 -47 -13 -169 0 -90 4 -164 8 -164 36 0 186
61 239 98 16 10 -216 242 -234 235z"/>
</g>
</svg>`;
const renderGarageRow = ({ id, name, color }) => `
  <div class="car-header">
    <div class="select-btns">
      <button class="btn-1 select-btn" id="select-car-${id}">Select</button>
      <button class="btn-1 remove-btn" id="remove-car-${id}">Remove</button>
    </div>
    <div class="car-name">${name}</div>
  </div>
  <div class = "car-row">
    <div class="car-controls">
    <button class="btn-1 start-engine-btn" id="start-engine-car-${id}">Start</button>
    <button class="btn-1 stop-engine-btn" id="stop-engine-car-${id}" disabled>Stop</button>
    </div>
    <div class="road">
        <div class="car" id="car-${id}">
          ${renderCar(color)}
        </div>
      <div class="flag">
      
      </div>
    </div>
  </div>
`;
const renderGarage = () => `
  <h1>Garage (total number of cars: ${storage_1.storage.carsCount})</h1>
  <h2>Page: ${storage_1.storage.garagePage} / ${Math.ceil(storage_1.storage.carsCount / constants_1.constants.defaultGaragePageLimit)}</h2>
  <ul class="garage">
  ${storage_1.storage.cars.map((car) => `<li>${renderGarageRow(car)}</li>`).join("")}
  </ul>
`;
const renderWinners = () => `
  <h1>Winners (total number of winners: ${storage_1.storage.winnersCount})</h1>
  <h2>Page: ${storage_1.storage.winnersPage} / ${Math.ceil(storage_1.storage.winnersCount / constants_1.constants.defaultWinnersPageLimit)}</h2>
  <table class="table" cellspasing="0" border="0" cellpadding="0">
    <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th class="table-btn table-wins" id="sort-by-wins">Wins</th>
      <th class="table-btn table-time" id="sort-by-time">Best time (seconds)</th>
    </thead>
    <tbody>
      ${storage_1.storage.winners
    .map((winner, index) => `
      <tr>
        <td>${(storage_1.storage.winnersPage - 1) * constants_1.constants.defaultWinnersPageLimit + index + 1}</td>
        <td>${renderCar(winner.car.color)}</td>
        <td>${winner.car.name}</td>
        <td>${winner.wins}</td>
        <td>${winner.time}</td>
      </tr>
    `)
    .join("")}
    </tbody>
  </table>
`;
const render = () => __awaiter(void 0, void 0, void 0, function* () {
    const template = `
    <nav class="menu">
      <button class="btn garage-menu-btn primary" id="garage-menu" disabled>To garage</button>
      <button class="btn winners-menu-btn primary" id="winners-menu">To winners</button>
    </nav>
    <main id="garage-view">
      <div class="winner-message" id="message">
      </div>
      <div>
        <form class="form" id="create">
          <input class="input" id="create-name" name="name" type="text">
          <input class="color" id="create-color" name="color" type="color" value="#000000">
          <button class="btn create-submit" id="create-submit" type="submit">Create</button>
        </form>
        <form class="form" id="update">
          <input class="input" id="update-name" name="name" type="text" disabled>
          <input class="color" id="update-color" name="color" type="color" value="#000000" disabled>
          <button class="btn update-btn" id="update-submit" type="submit" disabled>Update</button>
        </form>
      </div>
      <div class="race-controls">
        <button class="btn race-btn" id="race">Race</button>
        <button class="btn reset-btn" id="reset">Reset</button>
        <button class="btn generator-btn" id="generator">Generate cars</button>
      </div>
      <div id="garage-cars">
        ${renderGarage()}
      </div>
    </main>
    <main id="winners-view" style="display: none">
      ${renderWinners()}
    </main>
    <nav class="pagination">
      <button class="btn-1 prev-btn primary" disabled id="prev">previous</button>
      <button class="btn-1 next-btn primary" disabled id="next">next</button>
    </nav>
    
  `;
    const root = document.createElement("div");
    root.innerHTML = template;
    document.body.appendChild(root);
});
exports.render = render;
function PageButtonsUpdate() {
    const prevButton = document.getElementById(selectors_1.selectors.btnPrev);
    const nextButton = document.getElementById(selectors_1.selectors.btnNext);
    const garageViewBtn = document.getElementById(selectors_1.selectors.btnGarageView);
    const winnersViewBtn = document.getElementById(selectors_1.selectors.btnWinnersView);
    if (storage_1.storage.view === 'garage') {
        garageViewBtn.disabled = true;
        winnersViewBtn.disabled = false;
        if (storage_1.storage.garagePage * constants_1.constants.defaultGaragePageLimit < storage_1.storage.carsCount) {
            nextButton.disabled = false;
        }
        else {
            nextButton.disabled = true;
        }
        if (storage_1.storage.garagePage > 1) {
            prevButton.disabled = false;
        }
        else {
            prevButton.disabled = true;
        }
    }
    else if (storage_1.storage.view === 'winners') {
        garageViewBtn.disabled = false;
        winnersViewBtn.disabled = true;
        if (storage_1.storage.winnersPage * constants_1.constants.defaultWinnersPageLimit < storage_1.storage.winnersCount) {
            nextButton.disabled = false;
        }
        else {
            nextButton.disabled = true;
        }
        if (storage_1.storage.winnersPage > 1) {
            prevButton.disabled = false;
        }
        else {
            prevButton.disabled = true;
        }
    }
}
exports.PageButtonsUpdate = PageButtonsUpdate;
function setSortOrder(sort) {
    return __awaiter(this, void 0, void 0, function* () {
        if (storage_1.storage.sortOrder === 'asc') {
            storage_1.storage.sortOrder = 'desc';
        }
        else {
            storage_1.storage.sortOrder = 'asc';
        }
        storage_1.storage.sort = sort;
        yield winnersUpdate();
        const winnersView = document.getElementById(selectors_1.selectors.winnersView);
        winnersView.innerHTML = renderWinners();
    });
}
const addListeners = function () {
    const garageCars = document.getElementById(selectors_1.selectors.garageCars);
    const createNameInput = document.getElementById(selectors_1.selectors.createNameInput);
    const createColorInput = document.getElementById(selectors_1.selectors.createColorInput);
    const createForm = document.getElementById(selectors_1.selectors.createForm);
    const updateNameInput = document.getElementById(selectors_1.selectors.updateNameInput);
    const updateColorInput = document.getElementById(selectors_1.selectors.updateColorInput);
    const updateBtn = document.getElementById(selectors_1.selectors.btnUpdate);
    const updateForm = document.getElementById(selectors_1.selectors.updateForm);
    const winnersBtn = document.getElementById(selectors_1.selectors.btnWinners);
    const garageBtn = document.getElementById(selectors_1.selectors.btnGarage);
    const winnersView = document.getElementById(selectors_1.selectors.winnersView);
    const garageView = document.getElementById(selectors_1.selectors.garageView);
    const btnPrev = document.getElementById(selectors_1.selectors.btnPrev);
    const btnNext = document.getElementById(selectors_1.selectors.btnNext);
    const btnGenerateCar = document.getElementById(selectors_1.selectors.btnGenerateCar);
    const raceBtn = document.getElementById(selectors_1.selectors.btnRace);
    const raceResetBtn = document.getElementById(selectors_1.selectors.btnRaceReset);
    const message = document.getElementById(selectors_1.selectors.message);
    let selectedCar = null;
    btnPrev.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        message.classList.toggle("visible", false);
        if (storage_1.storage.view === 'garage') {
            storage_1.storage.garagePage -= 1;
            yield garageUpdate();
            PageButtonsUpdate();
            garageCars.innerHTML = renderGarage();
        }
        else {
            storage_1.storage.winnersPage -= 1;
            yield winnersUpdate();
            PageButtonsUpdate();
            winnersView.innerHTML = renderWinners();
        }
    }));
    btnNext.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        message.classList.toggle("visible", false);
        if (storage_1.storage.view === 'garage') {
            storage_1.storage.garagePage += 1;
            yield garageUpdate();
            PageButtonsUpdate();
            garageCars.innerHTML = renderGarage();
        }
        else {
            storage_1.storage.winnersPage += 1;
            yield winnersUpdate();
            PageButtonsUpdate();
            winnersView.innerHTML = renderWinners();
        }
    }));
    btnGenerateCar.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        btnGenerateCar.disabled = true;
        const cars = (0, generate_car_1.generateCars)(constants_1.constants.defaultNumberGenerateCar);
        yield Promise.all(cars.map((car) => __awaiter(this, void 0, void 0, function* () { return (0, api_1.createCar)(car); })));
        yield garageUpdate();
        PageButtonsUpdate();
        garageCars.innerHTML = renderGarage();
        btnGenerateCar.disabled = false;
    }));
    winnersBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        message.classList.toggle("visible", false);
        storage_1.storage.view = 'winners';
        garageView.style.display = 'none';
        winnersView.style.display = 'block';
        yield winnersUpdate();
        winnersView.innerHTML = renderWinners();
        PageButtonsUpdate();
        raceResetBtn.disabled = true;
        storage_1.storage.cars.map(({ id }) => (0, drive_1.stopDrive)(id));
        raceBtn.disabled = false;
    }));
    garageBtn.addEventListener('click', () => {
        console.log('click');
        storage_1.storage.view = 'garage';
        garageView.style.display = 'block';
        winnersView.style.display = 'none';
        PageButtonsUpdate();
    });
    raceBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        console.log('start');
        raceBtn.disabled = true;
        const winner = yield (0, drive_1.race)();
        const name = (yield (0, api_1.getCar)(winner.id)).name;
        message.innerHTML = `The winner is ${name} with (${winner.time}s)!`;
        message.classList.toggle("visible", true);
        yield (0, api_1.saveWinner)(winner);
        winnersUpdate();
        raceResetBtn.disabled = false;
    }));
    raceResetBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        raceResetBtn.disabled = true;
        storage_1.storage.cars.map(({ id }) => (0, drive_1.stopDrive)(id));
        raceBtn.disabled = false;
        message.classList.toggle("visible", false);
    }));
    createForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        console.log('create');
        if (createNameInput.value) {
            const bodyCar = {
                name: createNameInput.value,
                color: createColorInput.value
            };
            yield (0, api_1.createCar)(bodyCar);
            yield garageUpdate();
            garageCars.innerHTML = renderGarage();
            createNameInput.value = '';
            createColorInput.value = '#000000';
        }
        else {
            alert('paste name car!');
        }
    }));
    document.body.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
        const eventTarget = event.target;
        if (eventTarget.classList.contains('remove-btn')) {
            const id = +eventTarget.id.split('remove-car-')[1];
            yield (0, api_1.deleteCar)(id);
            yield (0, api_1.deleteWinner)(id);
            yield garageUpdate();
            garageCars.innerHTML = renderGarage();
            PageButtonsUpdate();
        }
        if (eventTarget.classList.contains('select-btn')) {
            selectedCar = yield (0, api_1.getCar)(+eventTarget.id.split('select-car-')[1]);
            updateNameInput.value = selectedCar.name;
            updateColorInput.value = selectedCar.color;
            updateNameInput.disabled = false;
            updateColorInput.disabled = false;
            updateBtn.disabled = false;
        }
        if (eventTarget.classList.contains('start-engine-btn')) {
            const id = +eventTarget.id.split('start-engine-car-')[1];
            yield (0, drive_1.startDrive)(id);
        }
        if (eventTarget.classList.contains('stop-engine-btn')) {
            const id = +eventTarget.id.split('stop-engine-car-')[1];
            yield (0, drive_1.stopDrive)(id);
        }
        updateForm.addEventListener('submit', () => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const bodyCar = {
                name: updateNameInput.value,
                color: updateColorInput.value
            };
            yield (0, api_1.updateCar)(+eventTarget.id.split('select-car-')[1], bodyCar);
            yield garageUpdate();
            updateNameInput.disabled = true;
            updateNameInput.value = '';
            updateColorInput.value = '#000000';
            updateColorInput.disabled = true;
            updateBtn.disabled = true;
            selectedCar = null;
        }));
        if (eventTarget.classList.contains('table-wins')) {
            yield setSortOrder('wins');
            console.log('eee');
        }
        if (eventTarget.classList.contains('table-time')) {
            yield setSortOrder('time');
            console.log('fefe');
        }
    }));
};
exports.addListeners = addListeners;


/***/ }),

/***/ "./src/components/carData.ts":
/*!***********************************!*\
  !*** ./src/components/carData.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.carModels = exports.carBrands = void 0;
exports.carBrands = [
    "Audi",
    "Alfa Romeo",
    "Alpina",
    "Aston Martin",
    "Axon",
    "Ford",
    "Ferrari",
    "Fiat",
    "GAZ",
    "GMC",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Isuzu",
    "JAC",
    "Jaguar",
    "Jeep",
    "Kamaz",
    "Lada",
    "Lexus",
    "Lotus",
    "MAN",
    "Maybach",
    "MAZ",
    "Mazda",
    "McLaren",
    "Nissan",
    "Opel",
    "Paccar",
    "Pagani",
    "Pontiac",
    "Porsche",
    "Renault",
    "Škoda",
    "Smart",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "UAZ",
    "Volvo",
    "ZAZ",
    "XPeng",
    "TVR",
    "Saab",
    "RAM",
    "Chevrolet",
    "Mazzanti",
    "Daewoo",
    "Zaporozhets",
];
exports.carModels = [
    "Gran Turismo",
    "RS",
    "Roadster",
    "S",
    "X",
    "3",
    "Y",
    "Cybertruck",
    "X5",
    "X7",
    "X3",
    "X6",
    "GT4",
    "FXX",
    "599 GTO",
    "Enzo",
    "458 Italia",
    "250 GTO",
    "Priora",
    "4x4",
    "Rio",
    "Focus",
    "Kalina",
    "Vesta",
    "Spark",
    "Lacetti",
    "Nexia",
    "Matiz",
    "Cobalt",
    "Captiva",
    "A7",
    "A5",
    "A3",
    "A8",
    "TT",
    "Corolla",
    "Camry",
    "RAV4",
    "Impreza",
    "WRX",
    "ES",
    "LS",
    "RX",
    "GX",
    "LX",
    "GS",
    "LC500",
    "Gallardo",
    "Aventador",
    "911",
    "Cayenne",
    "FX37",
];


/***/ }),

/***/ "./src/components/constants.ts":
/*!*************************************!*\
  !*** ./src/components/constants.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.path = exports.constants = void 0;
exports.constants = {
    defaultGaragePage: 1,
    defaultWinnersPage: 1,
    defaultGaragePageLimit: 7,
    defaultNumberGenerateCar: 100,
    defaultWinnersPageLimit: 10
};
const base = 'http://127.0.0.1:3000';
exports.path = {
    garage: `${base}/garage`,
    engine: `${base}/engine`,
    winners: `${base}/winners`,
};


/***/ }),

/***/ "./src/components/drive.ts":
/*!*********************************!*\
  !*** ./src/components/drive.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.race = exports.stopDrive = exports.startDrive = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./src/components/api.ts");
const storage_1 = __webpack_require__(/*! ./storage */ "./src/components/storage.ts");
function startDrive(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const stopBtn = document.getElementById(`stop-engine-car-${id}`);
        const startBtn = document.getElementById(`start-engine-car-${id}`);
        const car = document.getElementById(`car-${id}`);
        stopBtn.disabled = false;
        startBtn.disabled = true;
        const { velocity, distance } = yield (0, api_1.startEngine)(id);
        const time = Math.round(distance / velocity);
        car.style.animationName = 'animation-car';
        car.style.animationDuration = `${time.toString()}ms`;
        const { success } = yield (0, api_1.switchCarToDrive)(id);
        if (!success) {
            car.style.animationPlayState = 'paused';
        }
        console.log({ success, id, time });
        return { success, id, time };
    });
}
exports.startDrive = startDrive;
function stopDrive(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const stopBtn = document.getElementById(`stop-engine-car-${id}`);
        const startBtn = document.getElementById(`start-engine-car-${id}`);
        const car = document.getElementById(`car-${id}`);
        stopBtn.disabled = true;
        startBtn.disabled = false;
        yield (0, api_1.stopEngine)(id);
        car.style.animationName = "none";
        car.style.animationPlayState = "initial";
    });
}
exports.stopDrive = stopDrive;
function race() {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = storage_1.storage.cars.map(({ id }) => startDrive(id));
        const cars = yield Promise.all(promise);
        const carsSuccess = cars.filter(el => el.success).sort((a, b) => a.time - b.time);
        const [id, time] = [carsSuccess[0].id, carsSuccess[0].time];
        return { id, time: +(time / 1000).toFixed(2) };
    });
}
exports.race = race;


/***/ }),

/***/ "./src/components/generate-car.ts":
/*!****************************************!*\
  !*** ./src/components/generate-car.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateCars = void 0;
const carData_1 = __webpack_require__(/*! ./carData */ "./src/components/carData.ts");
function generateColor() {
    return "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
}
function generateName() {
    const model = carData_1.carBrands[Math.floor(Math.random() * carData_1.carBrands.length)];
    const name = carData_1.carModels[Math.floor(Math.random() * carData_1.carModels.length)];
    return `${model} ${name}`;
}
function generateCars(count) {
    return new Array(count).fill(0).map(() => ({ name: generateName(), color: generateColor() }));
}
exports.generateCars = generateCars;


/***/ }),

/***/ "./src/components/selectors.ts":
/*!*************************************!*\
  !*** ./src/components/selectors.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.selectors = void 0;
exports.selectors = {
    btnPrev: 'prev',
    btnNext: 'next',
    btnGarageView: 'garage-menu',
    btnWinnersView: 'winners-menu',
    garageCars: 'garage-cars',
    createNameInput: 'create-name',
    createColorInput: 'create-color',
    createForm: 'create',
    updateNameInput: 'update-name',
    updateColorInput: 'update-color',
    btnUpdate: 'update-submit',
    updateForm: 'update',
    btnWinners: 'winners-menu',
    btnGarage: 'garage-menu',
    winnersView: 'winners-view',
    garageView: 'garage-view',
    btnGenerateCar: 'generator',
    btnRace: 'race',
    btnRaceReset: 'reset',
    message: 'message'
};


/***/ }),

/***/ "./src/components/storage.ts":
/*!***********************************!*\
  !*** ./src/components/storage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.storage = void 0;
const constants_1 = __webpack_require__(/*! ./constants */ "./src/components/constants.ts");
exports.storage = {
    garagePage: constants_1.constants.defaultGaragePage,
    winnersPage: constants_1.constants.defaultWinnersPage,
    cars: [],
    winners: [],
    carsCount: 0,
    winnersCount: 0,
    view: "garage",
    sort: "time",
    sortOrder: "asc",
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const app_1 = __webpack_require__(/*! ./components/app */ "./src/components/app.ts");
__webpack_require__(/*! ./style.scss */ "./src/style.scss");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, app_1.garageUpdate)();
        yield (0, app_1.render)();
        (0, app_1.PageButtonsUpdate)();
        (0, app_1.addListeners)();
    });
}
init();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQ3hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLGNBQWMsRUFBRSxXQUFXO0lBQzNCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsWUFBWSxFQUFFLE9BQU87SUFDckIsT0FBTyxFQUFFLFNBQVM7Q0FDbkI7Ozs7Ozs7Ozs7Ozs7O0FDcEJELDRGQUF3QztBQUUzQixlQUFPLEdBQWE7SUFDL0IsVUFBVSxFQUFFLHFCQUFTLENBQUMsaUJBQWlCO0lBQ3ZDLFdBQVcsRUFBRSxxQkFBUyxDQUFDLGtCQUFrQjtJQUN6QyxJQUFJLEVBQUUsRUFBRTtJQUNSLE9BQU8sRUFBRSxFQUFFO0lBQ1gsU0FBUyxFQUFFLENBQUM7SUFDWixZQUFZLEVBQUUsQ0FBQztJQUNmLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixTQUFTLEVBQUUsS0FBSztDQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkYscUZBQXlGO0FBQ3pGLDREQUFzQjtBQUV0QixTQUFlLElBQUk7O1FBQ2pCLE1BQU0sc0JBQVksR0FBRSxDQUFDO1FBQ3JCLE1BQU0sZ0JBQU0sR0FBRSxDQUFDO1FBQ2YsMkJBQWlCLEdBQUUsQ0FBQztRQUNwQixzQkFBWSxHQUFFLENBQUM7SUFDakIsQ0FBQztDQUFBO0FBRUQsSUFBSSxFQUFFLENBQUM7Ozs7Ozs7VUNWUDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3luYy1yYWNlLy4vc3JjL3N0eWxlLnNjc3M/YmMzYiIsIndlYnBhY2s6Ly9hc3luYy1yYWNlLy4vc3JjL2NvbXBvbmVudHMvYXBpLnRzIiwid2VicGFjazovL2FzeW5jLXJhY2UvLi9zcmMvY29tcG9uZW50cy9hcHAudHMiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS8uL3NyYy9jb21wb25lbnRzL2NhckRhdGEudHMiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9hc3luYy1yYWNlLy4vc3JjL2NvbXBvbmVudHMvZHJpdmUudHMiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS8uL3NyYy9jb21wb25lbnRzL2dlbmVyYXRlLWNhci50cyIsIndlYnBhY2s6Ly9hc3luYy1yYWNlLy4vc3JjL2NvbXBvbmVudHMvc2VsZWN0b3JzLnRzIiwid2VicGFjazovL2FzeW5jLXJhY2UvLi9zcmMvY29tcG9uZW50cy9zdG9yYWdlLnRzIiwid2VicGFjazovL2FzeW5jLXJhY2UvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hc3luYy1yYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2FzeW5jLXJhY2Uvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2FzeW5jLXJhY2Uvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cclxuXHJcbmltcG9ydCB7IGNvbnN0YW50cywgcGF0aCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBJQ2FyLCBJQ2FyQ3JlYXRlLCBJQ2FyU3BlZWQsIElXaW5uZXIsIElSYWNlIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1DQVJTLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBnZXRDYXJzID0gYXN5bmMgKFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBsaW1pdCA9IGNvbnN0YW50cy5kZWZhdWx0R2FyYWdlUGFnZUxpbWl0XHJcbiAgKTogUHJvbWlzZTx7aXRlbXM6SUNhcltdOyBjb3VudDogbnVtYmVyfT4gPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cGF0aC5nYXJhZ2V9P19wYWdlPSR7cGFnZX0mX2xpbWl0PSR7bGltaXR9YCk7XHJcbiAgXHJcbiAgcmV0dXJuIHtcclxuICAgIGl0ZW1zOiBhd2FpdCByZXNwb25zZS5qc29uKCksXHJcbiAgICBjb3VudDogTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdYLVRvdGFsLUNvdW50JykpLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDYXIgPSBhc3luYyAoaWQ6IG51bWJlcik6IFByb21pc2U8SUNhcj4gPT4ge1xyXG4gIHJldHVybiAoYXdhaXQgZmV0Y2goYCR7cGF0aC5nYXJhZ2V9LyR7aWR9YCkpLmpzb24oKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhciA9IGFzeW5jIChib2R5OiBJQ2FyQ3JlYXRlKTogUHJvbWlzZTxJQ2FyPiA9PiBcclxuICAoYXdhaXQgZmV0Y2ggKHBhdGguZ2FyYWdlLCB7XHJcbiAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgaGVhZGVyczoge1xyXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gIH0sXHJcbn0pKS5qc29uKCk7XHJcblxyXG4gIFxyXG5leHBvcnQgY29uc3QgZGVsZXRlQ2FyID0gYXN5bmMgKGlkOm51bWJlcik6IFByb21pc2U8dm9pZD4gPT4gKFxyXG4gIGF3YWl0IGZldGNoKGAke3BhdGguZ2FyYWdlfS8ke2lkfWAsIHttZXRob2Q6ICdERUxFVEUnfSkpLmpzb24oKTtcclxuICBcclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNhciA9IGFzeW5jIChpZDpudW1iZXIsIGJvZHk6SUNhckNyZWF0ZSk6IFByb21pc2U8dm9pZD4gPT4gXHJcbiAgKGF3YWl0IGZldGNoIChgJHtwYXRoLmdhcmFnZX0vJHtpZH1gLCB7XHJcbiAgbWV0aG9kOiAnUFVUJyxcclxuICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcclxuICBoZWFkZXJzOiB7XHJcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgfSxcclxufSkpLmpzb24oKTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1FTkdJTkUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHN0YXJ0RW5naW5lID0gYXN5bmMgKGlkOm51bWJlcik6IFByb21pc2U8SUNhclNwZWVkPiA9PiBcclxuKGF3YWl0IGZldGNoKGAke3BhdGguZW5naW5lfT9pZD0ke2lkfSZzdGF0dXM9c3RhcnRlZGAsIHsgbWV0aG9kOiBcIlBBVENIXCIgfSkpLmpzb24oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBzdG9wRW5naW5lID0gYXN5bmMgKGlkOm51bWJlcik6ICBQcm9taXNlPElDYXJTcGVlZD4gPT4gXHJcbihhd2FpdCBmZXRjaChgJHtwYXRoLmVuZ2luZX0/aWQ9JHtpZH0mc3RhdHVzPXN0b3BwZWRgLCB7IG1ldGhvZDogXCJQQVRDSFwiIH0pKS5qc29uKCk7XHJcblxyXG5cclxuLy8g0L3QtSDQv9C+0L3QuNC80LDRjiDRhdCw0YfQtdC8INC30LTQtdGB0YwgY2F0Y2gg0Lgg0L/QvtGC0L7QvCDQstGL0LLQvtC0IFxyXG5leHBvcnQgY29uc3Qgc3dpdGNoQ2FyVG9Ecml2ZSA9IGFzeW5jIChpZDpudW1iZXIpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbiB9PiA9PiB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7cGF0aC5lbmdpbmV9P2lkPSR7aWR9JnN0YXR1cz1kcml2ZWAseyBtZXRob2Q6IFwiUEFUQ0hcIiB9ICkuY2F0Y2goKTtcclxuIHJldHVybiByZXMuc3RhdHVzICE9PSAyMDAgPyB7IHN1Y2Nlc3M6IGZhbHNlIH0gOiB7IC4uLihhd2FpdCByZXMuanNvbigpKX07IC8vINCy0YvQstC+0LRcclxufVxyXG5cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1XSU5ORVJTLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5jb25zdCBnZXRTb3J0T3JkZXIgPSAoc29ydDpzdHJpbmcsIG9yZGVyOnN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHNvcnQgJiYgb3JkZXIpIHJldHVybiBgJl9zb3J0PSR7c29ydH0mX29yZGVyPSR7b3JkZXJ9YDtcclxuICByZXR1cm4gJyc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRXaW5uZXJzID0gYXN5bmMgKHtwYWdlLCBsaW1pdCA9IGNvbnN0YW50cy5kZWZhdWx0V2lubmVyc1BhZ2UsIHNvcnQsIG9yZGVyfToge3BhZ2U6IG51bWJlcjtcclxuICBsaW1pdDogbnVtYmVyO1xyXG4gIHNvcnQ6IHN0cmluZztcclxuICBvcmRlcjogc3RyaW5nO1xyXG59KTogUHJvbWlzZTx7IGl0ZW1zOiBJV2lubmVyW107IGNvdW50OiBudW1iZXIgfT4gPT4ge1xyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke3BhdGgud2lubmVyc30/X3BhZ2U9JHtwYWdlfSZfbGltaXQ9JHtsaW1pdH0ke2dldFNvcnRPcmRlcihzb3J0LCBvcmRlcil9YCk7XHJcbiAgY29uc3QgaXRlbXMgPSBhd2FpdCByZXMuanNvbigpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXRlbXM6IGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICBpdGVtcy5tYXAoYXN5bmMgKHdpbm5lcjogeyBpZDogbnVtYmVyIH0pID0+ICh7IC4uLndpbm5lciwgY2FyOiBhd2FpdCBnZXRDYXIod2lubmVyLmlkKSB9KSlcclxuICAgICksXHJcbiAgICBjb3VudDogTnVtYmVyKHJlcy5oZWFkZXJzLmdldCgnWC1Ub3RhbC1Db3VudCcpKSxcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRXaW5uZXIgPSBhc3luYyAoaWQ6IG51bWJlciB8IHVuZGVmaW5lZCk6IFByb21pc2U8SVdpbm5lcj4gPT5cclxuKGF3YWl0IGZldGNoKGAke3BhdGgud2lubmVyc30vJHtpZH1gKSkuanNvbigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFdpbm5lclN0YXR1cyA9IGFzeW5jIChpZDogbnVtYmVyIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxudW1iZXI+ID0+XHJcbihhd2FpdCBmZXRjaChgJHtwYXRoLndpbm5lcnN9LyR7aWR9YCkpLnN0YXR1cztcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVXaW5uZXIgPSBhc3luYyAoaWQ6bnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiBcclxuKGF3YWl0IGZldGNoKGAke3BhdGgud2lubmVyc30vJHtpZH1gLCB7bWV0aG9kOiAnREVMRVRFJ30pKS5qc29uKCk7XHJcbiAgXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVXaW5uZXIgPSBhc3luYyAgKGJvZHk6IHsgaWQ6IG51bWJlciB8IHVuZGVmaW5lZDsgd2luczogbnVtYmVyOyB0aW1lOiBudW1iZXIgfSk6IFByb21pc2U8dm9pZD4gPT5cclxuIChhd2FpdCBmZXRjaCAocGF0aC53aW5uZXJzLCB7XHJcbiAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgaGVhZGVyczoge1xyXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gIH0sXHJcbn0pKS5qc29uKCk7XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlV2lubmVyID0gYXN5bmMgKGlkOiBudW1iZXIgfCB1bmRlZmluZWQsIGJvZHk6IHsgaWQ6IG51bWJlciB8IHVuZGVmaW5lZDsgd2luczogbnVtYmVyOyB0aW1lOiBudW1iZXIgfSk6IFByb21pc2U8dm9pZD4gPT5cclxuKGF3YWl0IGZldGNoIChgJHtwYXRoLndpbm5lcnN9LyR7aWR9YCwge1xyXG4gIG1ldGhvZDogJ1BVVCcsXHJcbiAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgaGVhZGVyczoge1xyXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gIH0sXHJcbn0pKS5qc29uKCk7XHJcblxyXG5leHBvcnQgY29uc3Qgc2F2ZVdpbm5lciA9IGFzeW5jICh7aWQsIHRpbWUgfTogSVJhY2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBcclxuICBjb25zdCB3aW5uZXJTdGF0dXMgPSBhd2FpdCBnZXRXaW5uZXJTdGF0dXMoaWQpO1xyXG4gIGlmICh3aW5uZXJTdGF0dXMgPT09IDQwNCkge1xyXG4gICAgYXdhaXQgY3JlYXRlV2lubmVyKHtcclxuICAgICAgaWQsXHJcbiAgICAgIHdpbnM6IDEsXHJcbiAgICAgIHRpbWUsXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCB3aW5uZXIgPSBhd2FpdCBnZXRXaW5uZXIoaWQpO1xyXG4gICAgYXdhaXQgdXBkYXRlV2lubmVyKGlkLHtcclxuICAgICAgaWQsXHJcbiAgICAgIHdpbnM6IHdpbm5lci53aW5zICsgMSxcclxuICAgICAgdGltZTogdGltZSA8IHdpbm5lci50aW1lID8gdGltZSA6IHdpbm5lci50aW1lLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgY3JlYXRlQ2FyLCBkZWxldGVDYXIsIGRlbGV0ZVdpbm5lciwgZ2V0Q2FyLCBnZXRDYXJzLCBnZXRXaW5uZXJzLCBzYXZlV2lubmVyLCB1cGRhdGVDYXIgfSBmcm9tICcuL2FwaSc7XHJcbmltcG9ydCB7IGNvbnN0YW50cyB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgSUNhcn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZSc7XHJcbmltcG9ydCB7IGdlbmVyYXRlQ2FycyB9IGZyb20gJy4vZ2VuZXJhdGUtY2FyJztcclxuaW1wb3J0IHsgcmFjZSAsIHN0YXJ0RHJpdmUsIHN0b3BEcml2ZSB9IGZyb20gJy4vZHJpdmUnO1xyXG5pbXBvcnQgeyBzZWxlY3RvcnMgfSBmcm9tICcuL3NlbGVjdG9ycyc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2FyYWdlVXBkYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gIGNvbnN0IGNhckluZm8gPSBhd2FpdCBnZXRDYXJzKHN0b3JhZ2UuZ2FyYWdlUGFnZSk7XHJcbiAgc3RvcmFnZS5jYXJzQ291bnQgPSBjYXJJbmZvLmNvdW50O1xyXG4gIHN0b3JhZ2UuY2FycyA9IGNhckluZm8uaXRlbXM7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3aW5uZXJzVXBkYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gIGNvbnN0IHdpbm5lcnNJbmZvID0gYXdhaXQgZ2V0V2lubmVycyh7XHJcbiAgICBwYWdlOiBzdG9yYWdlLndpbm5lcnNQYWdlLFxyXG4gICAgbGltaXQ6IGNvbnN0YW50cy5kZWZhdWx0V2lubmVyc1BhZ2VMaW1pdCxcclxuICAgIHNvcnQ6IHN0b3JhZ2Uuc29ydCxcclxuICAgIG9yZGVyOiBzdG9yYWdlLnNvcnRPcmRlcixcclxuICB9KTtcclxuICBzdG9yYWdlLndpbm5lcnNDb3VudCA9IHdpbm5lcnNJbmZvLmNvdW50O1xyXG4gIHN0b3JhZ2Uud2lubmVycyA9IHdpbm5lcnNJbmZvLml0ZW1zO1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJDYXIgPSAoY29sb3I6IHN0cmluZykgPT4gYDxzdmcgdmVyc2lvbj1cIjEuMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG53aWR0aD1cIjEwMC4wMDAwMDBwdFwiIGhlaWdodD1cIjQwLjAwMDAwMHB0XCIgdmlld0JveD1cIjAgMCAxMjgwLjAwMDAwMCA2NDAuMDAwMDAwXCJcclxucHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIj5cclxuPG1ldGFkYXRhPlxyXG5DcmVhdGVkIGJ5IHBvdHJhY2UgMS4xNSwgd3JpdHRlbiBieSBQZXRlciBTZWxpbmdlciAyMDAxLTIwMTdcclxuPC9tZXRhZGF0YT5cclxuPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAuMDAwMDAwLDY0MC4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMClcIlxyXG5maWxsPSR7Y29sb3J9IHN0cm9rZT1cIm5vbmVcIj5cclxuPHBhdGggZD1cIk0zNTY1IDUzMzYgYy0xMDYgLTMwIC0xMDEgLTI2IC0xMDggLTExMSAtNCAtNDIgLTkgLTgwIC0xMiAtODUgLTYgLTEwIC0yNDYgLTEwNSAtNTkwIC0yMzQgLTQ0OCAtMTY3IC0xMDUyIC00MTUgLTExNzMgLTQ4MyAtNzggLTQzIC0xOTMgLTkxIC0yNTAgLTEwNCAtMjMgLTUgLTk4IC0xNCAtMTY1IC0xOSAtNjcgLTYgLTE2NyAtMTkgLTIyMiAtMzAgLTE1NCAtMzEgLTM0MCAtNDkgLTU2MyAtNTcgbC0yMDMgLTYgLTQzIC02NiBjLTU5IC05MSAtNjAgLTk1IC0yNiAtMTMwIDM3IC0zNyAzOCAtNjUgMyAtMTUwIC0yNSAtNjIgLTI3IC03OCAtMzEgLTI1NiBsLTQgLTE5MCAtMzggLTMyIGMtOTEgLTc4IC0xMzMgLTIwOSAtMTM0IC00MTggMCAtMTk0IDExIC0zOTYgMjYgLTQ4MiAxMyAtNzEgMTQgLTc0IDcyIC0xMjIgNjkgLTU4IDEzMCAtMTI5IDE1OCAtMTg0IDY0IC0xMjYgNTM0IC0yMTEgMTM4NCAtMjUwIGw5MiAtNCAtNiAxMTkgYy02IDE0MiA4IDI1NiA0OSAzODMgMTEyIDM1MiAzOTQgNjIyIDc1NiA3MjIgOTAgMjYgMTEyIDI4IDI3OCAyOCAxNjUgMCAxODggLTIgMjc4IC0yNyAyMDEgLTU2IDM2MSAtMTUyIDUwNCAtMzAyIDE0MCAtMTQ1IDIyMiAtMjkzIDI3NCAtNDkyIDIxIC03OSAyNCAtMTA5IDIzIC0yNzkgLTEgLTEyNyAtNiAtMjE0IC0xNiAtMjYzIGwtMTUgLTczIDMwMDYgNyBjMTY1MyA0IDMwMDcgOCAzMDA5IDkgMSAxIC04IDM3IC0yMCA4MSAtMTkgNjcgLTIyIDEwNSAtMjIgMjU5IC0xIDE2NiAxIDE4NyAyNyAyNzkgMTE3IDQyMSA0NjcgNzM2IDg4NSA3OTcgMTE5IDE3IDMyNSA3IDQzMiAtMjEgMjM5IC02MyA0NTMgLTIwNSA2MDEgLTM5OSA3MCAtOTIgMTU0IC0yNjcgMTg1IC0zODYgMjQgLTg4IDI3IC0xMTkgMjcgLTI2MCAxIC0xMTYgLTQgLTE4MSAtMTYgLTIzNCAtMTAgLTQxIC0xNiAtNzUgLTE1IC03NiAyIC0xIDYyIDIgMTMzIDYgMjY2IDE2IDQ1OCA0NSA1MjUgNzkgNDggMjQgOTcgODEgMTI3IDE0NiBsMjQgNTIgLTE2IDE1NyBjLTE1IDE1MiAtMTUgMTYzIDQgMjg0IDYzIDM4OCA1MCA2ODAgLTM1IDgwMiAtMTM0IDE5MyAtNTI2IDMzNiAtMTQyOSA1MTkgLTczNyAxNDkgLTEzMjIgMjA5IC0yMDMzIDIxMCAtMjI4IDAgLTIyNiAwIC0zNDcgODUgLTE4NyAxMzEgLTEwNDUgNjA3IC0xNDcxIDgxNSAtMzgzIDE4NyAtNzg4IDI4MSAtMTQzOSAzMzJcclxuLTIwOCAxNyAtMTEwNiAxNiAtMTQwMCAwIC0xMjEgLTcgLTMxNCAtMTkgLTQzMCAtMjcgLTMwMiAtMjIgLTI4NiAtMjIgLTM0MSAxMCAtMTQwIDgxIC0xODcgOTQgLTI2OSA3MXogbTE4ODUgLTMzMyBjNiAtMzcgMzggLTIzOCA3MSAtNDQ2IDMyIC0yMDkgNjZcclxuLTQyMiA3NSAtNDc0IDkgLTUyIDE1IC05NiAxMyAtOTcgLTExIC05IC0xNjk5IDI5IC0xOTUxIDQ0IC0yMDYgMTMgLTQxNyAzNiAtNDg1IDU0IC05OCAyNiAtMTk4IDExOSAtMjQ5IDIzMSAtMzUgNzUgLTM2IDE3MiAtNSAyNTUgMTcgNDUgMzAgNjEgNjggODYgODNcclxuNTQgMTM1IDgwIDI1MyAxMjcgMzQxIDEzNiA4NTggMjMwIDE0NjAgMjY3IDI2OSAxNiAyNzAgMTYgNTExIDE4IGwyMjcgMiAxMiAtNjd6IG02MzAgNDcgYzI2NCAtMTggNzc3IC0xMTAgMTAyOSAtMTg2IDE4NiAtNTYgNDQ1IC0xODggNzU2IC0zODcgMjExIC0xMzRcclxuMjc0IC0xODEgMjUwIC0xODUgLTc1IC0xMiAtMTMzIC01MCAtMTYyIC0xMDYgLTE5IC0zNSAtMjEgLTEzNiAtNCAtMTc5IGwxMSAtMjcgLTkwNyAyIC05MDYgMyAtNTkgMTYwIGMtMTEwIDMwMiAtMjk4IDg3OCAtMjk4IDkxNiAwIDYgOTUgMiAyOTAgLTExelwiLz5cclxuPHBhdGggZD1cIk0yNjMzIDMxMjUgYy0yMjMgLTQwIC00MTAgLTE0MSAtNTY4IC0zMDYgLTEzMiAtMTM4IC0yMTMgLTI4MyAtMjYyIC00NjcgLTIyIC04MyAtMjYgLTExOSAtMjYgLTI0NyAtMSAtMTY5IDEwIC0yMzYgNjUgLTM4MiA4NyAtMjMwIDI3MSAtNDM2IDQ5M1xyXG4tNTUxIDg1IC00NCAxNzggLTc4IDI3MSAtOTggMTA3IC0yMyAzMTIgLTIzIDQxOSAxIDM5MiA4NCA2OTkgMzc1IDgwMiA3NjEgMjMgODYgMjYgMTIwIDI3IDI1NCAxIDE1OCAtNSAxOTkgLTQ2IDMzMCAtOTggMzEwIC0zNTUgNTY3IC02NjggNjY5IC0xNTAgNTBcclxuLTM1NCA2NCAtNTA3IDM2eiBtMzUwIC0zMDEgYzI0OSAtNTYgNDU3IC0yNDcgNTQzIC00OTkgMjUgLTcyIDI4IC05NSAyOCAtMjIwIDEgLTE1MyAtMTUgLTIyOCAtNzQgLTM0NSAtOTQgLTE4NiAtMjgzIC0zMzcgLTQ4NSAtMzg2IC05NiAtMjQgLTI2OCAtMjQgLTM2MFxyXG4wIC0zMjAgODQgLTU0NCAzNTUgLTU2MiA2ODEgLTIwIDM1OSAyMDkgNjczIDU1OCA3NjUgOTQgMjQgMjUzIDI2IDM1MiA0elwiLz4gXHJcbjxwYXRoIGQ9XCJNMjYwMCAyNjk3IGMtMzYgLTEzIC04NSAtMzYgLTEwOSAtNTEgbC00NCAtMjggMTE2IC0xMTUgYzgxIC04MiAxMjAgLTExNCAxMzEgLTExMCAxNCA2IDE2IDI5IDE2IDE2NyAwIDE4NiA2IDE3OCAtMTEwIDEzN3pcIi8+XHJcbjxwYXRoIGQ9XCJNMjkyMCAyNTYxIGMwIC0xMzkgMiAtMTYyIDE2IC0xNjggMTEgLTQgNTAgMjggMTMwIDEwOCBsMTE1IDExNCAtMjhcclxuMjIgYy0zNCAyOCAtMTM4IDcwIC0xOTMgNzkgbC00MCA3IDAgLTE2MnpcIi8+XHJcbjxwYXRoIGQ9XCJNMjI4MiAyNDQ4IGMtMjggLTM2IC05MiAtMTkxIC05MiAtMjI1IDAgLTEwIDM0IC0xMyAxNjUgLTEzIDE1MSAwXHJcbjE2NSAxIDE2NSAxOCAwIDE1IC0yMDYgMjMyIC0yMjEgMjMyIC00IDAgLTExIC02IC0xNyAtMTJ6XCIvPlxyXG48cGF0aCBkPVwiTTMyMjIgMjM1MSBjLTYyIC01OSAtMTEyIC0xMTUgLTExMiAtMTI0IDAgLTE1IDE3IC0xNyAxNjUgLTE3IDEzMSAwXHJcbjE2NSAzIDE2NSAxMyAwIDQwIC02OSAyMDUgLTk1IDIyNyAtNyA2IC00OCAtMjcgLTEyMyAtOTl6XCIvPlxyXG48cGF0aCBkPVwiTTI3ODEgMjMzMiBjLTEyIC0yMiAxMSAtNjIgMzQgLTYyIDggMCAyMSAxMCAyOSAyMiAyMCAyOCA0IDU4IC0yOVxyXG41OCAtMTMgMCAtMjkgLTggLTM0IC0xOHpcIi8+XHJcbjxwYXRoIGQ9XCJNMjc0OSAyMTYxIGMtMzIgLTMzIC0zNyAtNjcgLTE0IC0xMTAgMjkgLTU3IDEwNCAtNjQgMTUxIC0xNCA1MyA1N1xyXG45IDE1MyAtNzEgMTUzIC0yNyAwIC00NCAtOCAtNjYgLTI5elwiLz5cclxuPHBhdGggZD1cIk0yNTcwIDIxMjUgYy0yNiAtMzIgMTMgLTgxIDQ4IC01OSAyNCAxNiAyNyA0NSA2IDYxIC0yMyAxNyAtMzkgMTZcclxuLTU0IC0yelwiLz5cclxuPHBhdGggZD1cIk0zMDA2IDIxMjQgYy0yMCAtMTkgLTIwIC0zOCAtMiAtNTQgMjMgLTE5IDYxIC04IDY0IDE4IDcgNDQgLTMyIDY3XHJcbi02MiAzNnpcIi8+XHJcbjxwYXRoIGQ9XCJNMjE5MCAxOTc1IGMwIC0yOSA0MSAtMTQwIDcyIC0xOTQgbDMxIC01MyAxMTcgMTE3IGM3MSA3MSAxMTYgMTIzXHJcbjExMyAxMzEgLTQgMTEgLTQwIDE0IC0xNjkgMTQgLTE0MSAwIC0xNjQgLTIgLTE2NCAtMTV6XCIvPlxyXG48cGF0aCBkPVwiTTMxMTAgMTk3MiBjMCAtOSA1MSAtNjggMTE0IC0xMzEgbDExNCAtMTE0IDMxIDU0IGMzMCA1MSA3MSAxNjUgNzFcclxuMTk1IDAgMTEgLTMxIDE0IC0xNjUgMTQgLTE1MSAwIC0xNjUgLTEgLTE2NSAtMTh6XCIvPlxyXG48cGF0aCBkPVwiTTI3ODAgMTkwMSBjLTcgLTE1IC01IC0yNCA4IC00MSAzMiAtNDAgODUgLTQgNjIgNDEgLTE0IDI1IC01NiAyNVxyXG4tNzAgMHpcIi8+XHJcbjxwYXRoIGQ9XCJNMjU2MiAxNjk3IGMtNjEgLTYyIC0xMTIgLTExNSAtMTEyIC0xMTkgMCAtMTggMjA4IC0xMDggMjQ5IC0xMDggN1xyXG4wIDExIDU0IDExIDE2NCAwIDE0MCAtMiAxNjUgLTE2IDE3MCAtOSAzIC0xNiA2IC0xNyA2IC0xIDAgLTUzIC01MSAtMTE1IC0xMTN6XCIvPlxyXG48cGF0aCBkPVwiTTI5MzMgMTgwMyBjLTE1IC02IC0xOSAtMzMzIC00IC0zMzMgNDYgMCAyNTEgODggMjUxIDEwOCAwIDkgLTIyM1xyXG4yMzIgLTIzMCAyMzEgLTMgMCAtMTEgLTMgLTE3IC02elwiLz5cclxuPHBhdGggZD1cIk0xMDcwMCAzMTE5IGMtMzkwIC04NCAtNjk2IC0zNzYgLTc5NyAtNzU5IC0zMSAtMTE3IC00MSAtMjkyIC0yNFxyXG4tNDExIDMzIC0yMjcgMTUwIC00NTMgMzE4IC02MDkgMjY3IC0yNTAgNjQzIC0zNDQgOTkzIC0yNDkgMTE3IDMyIDI4MyAxMThcclxuMzgwIDE5NiA0ODcgMzk2IDUxOCAxMTI4IDY3IDE1NjAgLTk3IDkzIC0xNjYgMTQwIC0yOTAgMTk4IC0xMzcgNjQgLTIzNSA4NlxyXG4tNDA3IDkxIC0xMjAgMyAtMTYyIDAgLTI0MCAtMTd6IG00NDUgLTMxMyBjMjM4IC04MSA0MDkgLTI1OCA0ODYgLTUwNiAzMCAtOTZcclxuMzMgLTI4OSA1IC0zODggLTExMCAtNDAwIC01MTMgLTYzNyAtOTExIC01MzYgLTE0OSAzOCAtMzEzIDE0NyAtNDAyIDI2NyAtMTc2XHJcbjIzOCAtMjAzIDUzMyAtNzEgNzk3IDM0IDY5IDYwIDEwMyAxMzggMTgwIDc3IDc4IDExMSAxMDQgMTgxIDEzOSAxMjkgNjUgMjA3XHJcbjgxIDM2NCA3NyAxMDkgLTMgMTQzIC03IDIxMCAtMzB6XCIvPlxyXG48cGF0aCBkPVwiTTEwNzAzIDI3MDAgYy01NCAtMTkgLTE1MyAtNzEgLTE1MyAtODAgMCAtMyA1MSAtNTcgMTE0IC0xMTkgODAgLTgwXHJcbjExOSAtMTEyIDEzMCAtMTA4IDE0IDUgMTYgMjkgMTYgMTY3IGwwIDE2MCAtMjcgLTEgYy0xNiAwIC01MiAtOSAtODAgLTE5elwiLz5cclxuPHBhdGggZD1cIk0xMTAyMCAyNTYxIGMwIC0xMzkgMiAtMTYyIDE2IC0xNjggMjIgLTggMjQ3IDIxNiAyMzQgMjMyIC0xNyAyMFxyXG4tMTYzIDg0IC0yMDcgOTEgbC00MyA3IDAgLTE2MnpcIi8+XHJcbjxwYXRoIGQ9XCJNMTAzNjYgMjQyNCBjLTI5IC00NCAtNzYgLTE2NSAtNzYgLTE5NCAwIC0xOSA3IC0yMCAxNjUgLTIwIDEyNiAwXHJcbjE2NSAzIDE2NSAxMyAwIDcgLTUxIDYzIC0xMTQgMTI2IGwtMTE0IDExNCAtMjYgLTM5elwiLz5cclxuPHBhdGggZD1cIk0xMTMxMyAyMzQ4IGMtNjEgLTYyIC0xMDkgLTExOSAtMTA2IC0xMjUgNiAtMTUgMzMzIC0xOSAzMzMgLTQgMCA0NVxyXG4tODggMjQxIC0xMDggMjQxIC00IDAgLTU3IC01MSAtMTE5IC0xMTJ6XCIvPlxyXG48cGF0aCBkPVwiTTEwODgyIDIzMzggYy0xNyAtMTcgLTE1IC0zMiA3IC01MiAxNiAtMTQgMjMgLTE1IDQxIC02IDMxIDE3IDI0IDY0XHJcbi0xMCA2OCAtMTQgMiAtMzEgLTMgLTM4IC0xMHpcIi8+XHJcbjxwYXRoIGQ9XCJNMTA4NDYgMjE1OSBjLTY4IC04MSAxNyAtMTk0IDExMCAtMTQ0IDg5IDQ4IDU2IDE3NSAtNDYgMTc1IC0zMCAwXHJcbi00NCAtNiAtNjQgLTMxelwiLz5cclxuPHBhdGggZD1cIk0xMDY3MCAyMTI2IGMtMTkgLTIzIC04IC02MSAxOCAtNjQgNDQgLTcgNjcgMzIgMzYgNjIgLTE5IDIwIC0zOCAyMFxyXG4tNTQgMnpcIi8+XHJcbjxwYXRoIGQ9XCJNMTExMDYgMjEyNyBjLTIxIC0xNiAtMTggLTQ1IDcgLTYxIDM3IC0yMyA3NyAzNSA0MSA2MSAtMTAgNyAtMjEgMTNcclxuLTI0IDEzIC0zIDAgLTE0IC02IC0yNCAtMTN6XCIvPlxyXG48cGF0aCBkPVwiTTEwMjkwIDE5NzAgYzAgLTI5IDQzIC0xNDEgNzQgLTE5NSBsMjggLTQ4IDExNiAxMTYgYzgxIDgxIDExMyAxMjBcclxuMTA5IDEzMSAtNiAxNCAtMjkgMTYgLTE2NyAxNiAtMTUyIDAgLTE2MCAtMSAtMTYwIC0yMHpcIi8+XHJcbjxwYXRoIGQ9XCJNMTEyMDcgMTk3OCBjLTMgLTcgNDcgLTY2IDExMSAtMTMwIGwxMTYgLTExOCAyNyA0MyBjMjcgNDQgNzkgMTc3XHJcbjc5IDIwMyAwIDEyIC0yOCAxNCAtMTY0IDE0IC0xMjIgMCAtMTY2IC0zIC0xNjkgLTEyelwiLz5cclxuPHBhdGggZD1cIk0xMDg4MSAxOTAxIGMtMTQgLTI1IC01IC00OCAyMCAtNTYgMjcgLTkgNTEgMTMgNDcgNDQgLTQgMzQgLTUxIDQzXHJcbi02NyAxMnpcIi8+XHJcbjxwYXRoIGQ9XCJNMTA2NjIgMTY5NyBjLTYxIC02MiAtMTEyIC0xMTUgLTExMiAtMTE5IDAgLTIwIDIwMSAtMTA4IDI0NyAtMTA4XHJcbjEwIDAgMTMgMzQgMTMgMTY0IDAgMTQwIC0yIDE2NSAtMTYgMTcwIC05IDMgLTE2IDYgLTE3IDYgLTEgMCAtNTMgLTUxIC0xMTVcclxuLTExM3pcIi8+XHJcbjxwYXRoIGQ9XCJNMTEwMzMgMTgwMyBjLTEwIC0zIC0xMyAtNDcgLTEzIC0xNjkgMCAtOTAgNCAtMTY0IDggLTE2NCAzNiAwIDE4NlxyXG42MSAyMzkgOTggMTYgMTAgLTIxNiAyNDIgLTIzNCAyMzV6XCIvPlxyXG48L2c+XHJcbjwvc3ZnPmA7XHJcblxyXG5jb25zdCByZW5kZXJHYXJhZ2VSb3cgPSAoeyBpZCwgbmFtZSwgY29sb3IgfTogSUNhcikgPT4gYFxyXG4gIDxkaXYgY2xhc3M9XCJjYXItaGVhZGVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LWJ0bnNcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0xIHNlbGVjdC1idG5cIiBpZD1cInNlbGVjdC1jYXItJHtpZH1cIj5TZWxlY3Q8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0xIHJlbW92ZS1idG5cIiBpZD1cInJlbW92ZS1jYXItJHtpZH1cIj5SZW1vdmU8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNhci1uYW1lXCI+JHtuYW1lfTwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3MgPSBcImNhci1yb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXItY29udHJvbHNcIj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJidG4tMSBzdGFydC1lbmdpbmUtYnRuXCIgaWQ9XCJzdGFydC1lbmdpbmUtY2FyLSR7aWR9XCI+U3RhcnQ8L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJidG4tMSBzdG9wLWVuZ2luZS1idG5cIiBpZD1cInN0b3AtZW5naW5lLWNhci0ke2lkfVwiIGRpc2FibGVkPlN0b3A8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJvYWRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyXCIgaWQ9XCJjYXItJHtpZH1cIj5cclxuICAgICAgICAgICR7cmVuZGVyQ2FyKGNvbG9yKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZsYWdcIj5cclxuICAgICAgXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbmA7XHJcblxyXG5jb25zdCByZW5kZXJHYXJhZ2UgPSAoKSA9PiBgXHJcbiAgPGgxPkdhcmFnZSAodG90YWwgbnVtYmVyIG9mIGNhcnM6ICR7c3RvcmFnZS5jYXJzQ291bnR9KTwvaDE+XHJcbiAgPGgyPlBhZ2U6ICR7c3RvcmFnZS5nYXJhZ2VQYWdlfSAvICR7TWF0aC5jZWlsKHN0b3JhZ2UuY2Fyc0NvdW50IC8gY29uc3RhbnRzLmRlZmF1bHRHYXJhZ2VQYWdlTGltaXQpfTwvaDI+XHJcbiAgPHVsIGNsYXNzPVwiZ2FyYWdlXCI+XHJcbiAgJHtzdG9yYWdlLmNhcnMubWFwKChjYXIpID0+IGA8bGk+JHtyZW5kZXJHYXJhZ2VSb3coY2FyKX08L2xpPmApLmpvaW4oXCJcIil9XHJcbiAgPC91bD5cclxuYDtcclxuXHJcblxyXG5jb25zdCByZW5kZXJXaW5uZXJzID0gKCkgPT4gYFxyXG4gIDxoMT5XaW5uZXJzICh0b3RhbCBudW1iZXIgb2Ygd2lubmVyczogJHtzdG9yYWdlLndpbm5lcnNDb3VudH0pPC9oMT5cclxuICA8aDI+UGFnZTogJHtzdG9yYWdlLndpbm5lcnNQYWdlfSAvICR7TWF0aC5jZWlsKHN0b3JhZ2Uud2lubmVyc0NvdW50IC8gY29uc3RhbnRzLmRlZmF1bHRXaW5uZXJzUGFnZUxpbWl0KX08L2gyPlxyXG4gIDx0YWJsZSBjbGFzcz1cInRhYmxlXCIgY2VsbHNwYXNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiPlxyXG4gICAgPHRoZWFkPlxyXG4gICAgICA8dGg+TnVtYmVyPC90aD5cclxuICAgICAgPHRoPkNhcjwvdGg+XHJcbiAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgPHRoIGNsYXNzPVwidGFibGUtYnRuIHRhYmxlLXdpbnNcIiBpZD1cInNvcnQtYnktd2luc1wiPldpbnM8L3RoPlxyXG4gICAgICA8dGggY2xhc3M9XCJ0YWJsZS1idG4gdGFibGUtdGltZVwiIGlkPVwic29ydC1ieS10aW1lXCI+QmVzdCB0aW1lIChzZWNvbmRzKTwvdGg+XHJcbiAgICA8L3RoZWFkPlxyXG4gICAgPHRib2R5PlxyXG4gICAgICAke3N0b3JhZ2Uud2lubmVyc1xyXG4gICAgICAgIC5tYXAoXHJcbiAgICAgICAgICAod2lubmVyLCBpbmRleCkgPT4gYFxyXG4gICAgICA8dHI+XHJcbiAgICAgICAgPHRkPiR7KHN0b3JhZ2Uud2lubmVyc1BhZ2UgLSAxKSAqIGNvbnN0YW50cy5kZWZhdWx0V2lubmVyc1BhZ2VMaW1pdCArIGluZGV4ICsgMX08L3RkPlxyXG4gICAgICAgIDx0ZD4ke3JlbmRlckNhcih3aW5uZXIuY2FyLmNvbG9yKX08L3RkPlxyXG4gICAgICAgIDx0ZD4ke3dpbm5lci5jYXIubmFtZX08L3RkPlxyXG4gICAgICAgIDx0ZD4ke3dpbm5lci53aW5zfTwvdGQ+XHJcbiAgICAgICAgPHRkPiR7d2lubmVyLnRpbWV9PC90ZD5cclxuICAgICAgPC90cj5cclxuICAgIGBcclxuICAgICAgICApXHJcbiAgICAgICAgLmpvaW4oXCJcIil9XHJcbiAgICA8L3Rib2R5PlxyXG4gIDwvdGFibGU+XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgPG5hdiBjbGFzcz1cIm1lbnVcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBnYXJhZ2UtbWVudS1idG4gcHJpbWFyeVwiIGlkPVwiZ2FyYWdlLW1lbnVcIiBkaXNhYmxlZD5UbyBnYXJhZ2U8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3aW5uZXJzLW1lbnUtYnRuIHByaW1hcnlcIiBpZD1cIndpbm5lcnMtbWVudVwiPlRvIHdpbm5lcnM8L2J1dHRvbj5cclxuICAgIDwvbmF2PlxyXG4gICAgPG1haW4gaWQ9XCJnYXJhZ2Utdmlld1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwid2lubmVyLW1lc3NhZ2VcIiBpZD1cIm1lc3NhZ2VcIj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtXCIgaWQ9XCJjcmVhdGVcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgaWQ9XCJjcmVhdGUtbmFtZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9yXCIgaWQ9XCJjcmVhdGUtY29sb3JcIiBuYW1lPVwiY29sb3JcIiB0eXBlPVwiY29sb3JcIiB2YWx1ZT1cIiMwMDAwMDBcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gY3JlYXRlLXN1Ym1pdFwiIGlkPVwiY3JlYXRlLXN1Ym1pdFwiIHR5cGU9XCJzdWJtaXRcIj5DcmVhdGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtXCIgaWQ9XCJ1cGRhdGVcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgaWQ9XCJ1cGRhdGUtbmFtZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiBkaXNhYmxlZD5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9yXCIgaWQ9XCJ1cGRhdGUtY29sb3JcIiBuYW1lPVwiY29sb3JcIiB0eXBlPVwiY29sb3JcIiB2YWx1ZT1cIiMwMDAwMDBcIiBkaXNhYmxlZD5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gdXBkYXRlLWJ0blwiIGlkPVwidXBkYXRlLXN1Ym1pdFwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD5VcGRhdGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicmFjZS1jb250cm9sc1wiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gcmFjZS1idG5cIiBpZD1cInJhY2VcIj5SYWNlPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biByZXNldC1idG5cIiBpZD1cInJlc2V0XCI+UmVzZXQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGdlbmVyYXRvci1idG5cIiBpZD1cImdlbmVyYXRvclwiPkdlbmVyYXRlIGNhcnM8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgaWQ9XCJnYXJhZ2UtY2Fyc1wiPlxyXG4gICAgICAgICR7cmVuZGVyR2FyYWdlKCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9tYWluPlxyXG4gICAgPG1haW4gaWQ9XCJ3aW5uZXJzLXZpZXdcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj5cclxuICAgICAgJHtyZW5kZXJXaW5uZXJzKCl9XHJcbiAgICA8L21haW4+XHJcbiAgICA8bmF2IGNsYXNzPVwicGFnaW5hdGlvblwiPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLTEgcHJldi1idG4gcHJpbWFyeVwiIGRpc2FibGVkIGlkPVwicHJldlwiPnByZXZpb3VzPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tMSBuZXh0LWJ0biBwcmltYXJ5XCIgZGlzYWJsZWQgaWQ9XCJuZXh0XCI+bmV4dDwvYnV0dG9uPlxyXG4gICAgPC9uYXY+XHJcbiAgICBcclxuICBgO1xyXG4gIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHJvb3QuaW5uZXJIVE1MID0gdGVtcGxhdGU7XHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyb290KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQYWdlQnV0dG9uc1VwZGF0ZSgpOiB2b2lkIHtcclxuICBjb25zdCBwcmV2QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLmJ0blByZXYpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IG5leHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuYnRuTmV4dCkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29uc3QgZ2FyYWdlVmlld0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5idG5HYXJhZ2VWaWV3KSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBjb25zdCB3aW5uZXJzVmlld0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5idG5XaW5uZXJzVmlldykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgaWYgKHN0b3JhZ2UudmlldyA9PT0gJ2dhcmFnZScpIHtcclxuICAgIGdhcmFnZVZpZXdCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgd2lubmVyc1ZpZXdCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGlmIChzdG9yYWdlLmdhcmFnZVBhZ2UgKiBjb25zdGFudHMuZGVmYXVsdEdhcmFnZVBhZ2VMaW1pdCA8IHN0b3JhZ2UuY2Fyc0NvdW50KSB7XHJcbiAgICAgIG5leHRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5leHRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0b3JhZ2UuZ2FyYWdlUGFnZSA+IDEpIHtcclxuICAgICAgcHJldkJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcHJldkJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChzdG9yYWdlLnZpZXcgPT09ICd3aW5uZXJzJykge1xyXG4gICAgZ2FyYWdlVmlld0J0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgd2lubmVyc1ZpZXdCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgaWYgKHN0b3JhZ2Uud2lubmVyc1BhZ2UgKiBjb25zdGFudHMuZGVmYXVsdFdpbm5lcnNQYWdlTGltaXQgPCBzdG9yYWdlLndpbm5lcnNDb3VudCkge1xyXG4gICAgICBuZXh0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXh0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChzdG9yYWdlLndpbm5lcnNQYWdlID4gMSkge1xyXG4gICAgICBwcmV2QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcmV2QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNldFNvcnRPcmRlcihzb3J0OiBzdHJpbmcpIHtcclxuICBpZiAoc3RvcmFnZS5zb3J0T3JkZXIgPT09ICdhc2MnKSB7XHJcbiAgICBzdG9yYWdlLnNvcnRPcmRlciA9ICdkZXNjJztcclxuICB9IGVsc2Uge1xyXG4gICAgc3RvcmFnZS5zb3J0T3JkZXIgPSAnYXNjJztcclxuICB9XHJcbiAgc3RvcmFnZS5zb3J0ID0gc29ydDtcclxuICBhd2FpdCB3aW5uZXJzVXBkYXRlKCk7XHJcbiAgY29uc3Qgd2lubmVyc1ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMud2lubmVyc1ZpZXcpIGFzIEhUTUxFbGVtZW50O1xyXG4gIHdpbm5lcnNWaWV3LmlubmVySFRNTCA9IHJlbmRlcldpbm5lcnMoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGFkZExpc3RlbmVycyA9IGZ1bmN0aW9uICgpOiB2b2lkIHtcclxuICBjb25zdCBnYXJhZ2VDYXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLmdhcmFnZUNhcnMpIGFzIEhUTUxFbGVtZW50O1xyXG4gIGNvbnN0IGNyZWF0ZU5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5jcmVhdGVOYW1lSW5wdXQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgY29uc3QgY3JlYXRlQ29sb3JJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5jcmVhdGVDb2xvcklucHV0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGNvbnN0IGNyZWF0ZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuY3JlYXRlRm9ybSkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gIGNvbnN0IHVwZGF0ZU5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy51cGRhdGVOYW1lSW5wdXQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgY29uc3QgdXBkYXRlQ29sb3JJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy51cGRhdGVDb2xvcklucHV0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGNvbnN0IHVwZGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5idG5VcGRhdGUpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IHVwZGF0ZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMudXBkYXRlRm9ybSkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gIGNvbnN0IHdpbm5lcnNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuYnRuV2lubmVycykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29uc3QgZ2FyYWdlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLmJ0bkdhcmFnZSkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29uc3Qgd2lubmVyc1ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMud2lubmVyc1ZpZXcpIGFzIEhUTUxFbGVtZW50O1xyXG4gIGNvbnN0IGdhcmFnZVZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuZ2FyYWdlVmlldykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgY29uc3QgYnRuUHJldiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5idG5QcmV2KSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBjb25zdCBidG5OZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLmJ0bk5leHQpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IGJ0bkdlbmVyYXRlQ2FyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLmJ0bkdlbmVyYXRlQ2FyKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBjb25zdCByYWNlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLmJ0blJhY2UpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IHJhY2VSZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5idG5SYWNlUmVzZXQpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMubWVzc2FnZSkgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cclxuICBsZXQgc2VsZWN0ZWRDYXI6IElDYXIgfCBudWxsID0gbnVsbDtcclxuICBcclxuXHJcbiAgIGJ0blByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICBtZXNzYWdlLmNsYXNzTGlzdC50b2dnbGUoXCJ2aXNpYmxlXCIsIGZhbHNlKTtcclxuICAgIGlmIChzdG9yYWdlLnZpZXcgPT09ICdnYXJhZ2UnKSB7XHJcbiAgICAgIHN0b3JhZ2UuZ2FyYWdlUGFnZSAtPSAxO1xyXG4gICAgICBhd2FpdCBnYXJhZ2VVcGRhdGUoKTtcclxuICAgICAgUGFnZUJ1dHRvbnNVcGRhdGUoKTtcclxuICAgICAgZ2FyYWdlQ2Fycy5pbm5lckhUTUwgPSByZW5kZXJHYXJhZ2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3JhZ2Uud2lubmVyc1BhZ2UgLT0gMTtcclxuICAgICAgYXdhaXQgd2lubmVyc1VwZGF0ZSgpO1xyXG4gICAgICBQYWdlQnV0dG9uc1VwZGF0ZSgpO1xyXG4gICAgICB3aW5uZXJzVmlldy5pbm5lckhUTUwgPSByZW5kZXJXaW5uZXJzKCk7XHJcbiAgICB9XHJcbiAgIH0pXHJcblxyXG4gICBidG5OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbWVzc2FnZS5jbGFzc0xpc3QudG9nZ2xlKFwidmlzaWJsZVwiLCBmYWxzZSk7XHJcbiAgICBpZiAoc3RvcmFnZS52aWV3ID09PSAnZ2FyYWdlJykge1xyXG4gICAgICBzdG9yYWdlLmdhcmFnZVBhZ2UgKz0gMTtcclxuICAgICAgYXdhaXQgZ2FyYWdlVXBkYXRlKCk7XHJcbiAgICAgIFBhZ2VCdXR0b25zVXBkYXRlKCk7XHJcbiAgICAgIGdhcmFnZUNhcnMuaW5uZXJIVE1MID0gcmVuZGVyR2FyYWdlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdG9yYWdlLndpbm5lcnNQYWdlICs9IDE7XHJcbiAgICAgIGF3YWl0IHdpbm5lcnNVcGRhdGUoKTtcclxuICAgICAgUGFnZUJ1dHRvbnNVcGRhdGUoKTtcclxuICAgICAgd2lubmVyc1ZpZXcuaW5uZXJIVE1MID0gcmVuZGVyV2lubmVycygpO1xyXG4gICAgfVxyXG4gICB9KVxyXG4gICAgXHJcbiAgICBidG5HZW5lcmF0ZUNhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgYnRuR2VuZXJhdGVDYXIuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICBjb25zdCBjYXJzID0gZ2VuZXJhdGVDYXJzKGNvbnN0YW50cy5kZWZhdWx0TnVtYmVyR2VuZXJhdGVDYXIpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChjYXJzLm1hcChhc3luYyAoY2FyKSA9PiBjcmVhdGVDYXIoY2FyKSkpO1xyXG4gICAgICBhd2FpdCBnYXJhZ2VVcGRhdGUoKTtcclxuICAgICAgUGFnZUJ1dHRvbnNVcGRhdGUoKTtcclxuICAgICAgZ2FyYWdlQ2Fycy5pbm5lckhUTUwgPSByZW5kZXJHYXJhZ2UoKTtcclxuICAgICAgYnRuR2VuZXJhdGVDYXIuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH0pXHJcblxyXG4gICAgd2lubmVyc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbWVzc2FnZS5jbGFzc0xpc3QudG9nZ2xlKFwidmlzaWJsZVwiLCBmYWxzZSk7XHJcbiAgICAgIHN0b3JhZ2UudmlldyA9ICd3aW5uZXJzJztcclxuICAgICAgZ2FyYWdlVmlldy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICB3aW5uZXJzVmlldy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgYXdhaXQgd2lubmVyc1VwZGF0ZSgpO1xyXG4gICAgICB3aW5uZXJzVmlldy5pbm5lckhUTUwgPSByZW5kZXJXaW5uZXJzKCk7XHJcbiAgICAgIFBhZ2VCdXR0b25zVXBkYXRlKCk7XHJcbiAgICAgIHJhY2VSZXNldEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIHN0b3JhZ2UuY2Fycy5tYXAoKHsgaWQgfSkgPT4gc3RvcERyaXZlKGlkKSk7XHJcbiAgICAgIHJhY2VCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH0pXHJcblxyXG4gICAgZ2FyYWdlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBcclxuICAgICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XHJcbiAgICAgIHN0b3JhZ2UudmlldyA9ICdnYXJhZ2UnO1xyXG4gICAgICBnYXJhZ2VWaWV3LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICB3aW5uZXJzVmlldy5zdHlsZS5kaXNwbGF5ID0gICdub25lJztcclxuICAgICAgUGFnZUJ1dHRvbnNVcGRhdGUoKTtcclxuICAgIH0pXHJcblxyXG4gICAgcmFjZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ3N0YXJ0Jyk7XHJcbiAgICAgIHJhY2VCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICBjb25zdCB3aW5uZXIgPSBhd2FpdCByYWNlKCk7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSAoYXdhaXQgZ2V0Q2FyKHdpbm5lci5pZCkpLm5hbWU7XHJcbiAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gYFRoZSB3aW5uZXIgaXMgJHtuYW1lfSB3aXRoICgke3dpbm5lci50aW1lfXMpIWA7XHJcbiAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LnRvZ2dsZShcInZpc2libGVcIiwgdHJ1ZSk7XHJcbiAgICAgIGF3YWl0IHNhdmVXaW5uZXIod2lubmVyKTtcclxuICAgICAgd2lubmVyc1VwZGF0ZSgpO1xyXG4gICAgICByYWNlUmVzZXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcmFjZVJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICByYWNlUmVzZXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICBzdG9yYWdlLmNhcnMubWFwKCh7IGlkIH0pID0+IHN0b3BEcml2ZShpZCkpO1xyXG4gICAgICByYWNlQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LnRvZ2dsZShcInZpc2libGVcIiwgZmFsc2UpO1xyXG4gICAgfSk7ICAgXHJcblxyXG4gICAgY3JlYXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZScpO1xyXG4gICAgICBpZiAoY3JlYXRlTmFtZUlucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgYm9keUNhciA9IHtcclxuICAgICAgICAgIG5hbWU6IGNyZWF0ZU5hbWVJbnB1dC52YWx1ZSxcclxuICAgICAgICAgIGNvbG9yOiBjcmVhdGVDb2xvcklucHV0LnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBhd2FpdCBjcmVhdGVDYXIoYm9keUNhcik7XHJcbiAgICAgICAgYXdhaXQgZ2FyYWdlVXBkYXRlKCk7XHJcbiAgICAgICAgZ2FyYWdlQ2Fycy5pbm5lckhUTUwgPSByZW5kZXJHYXJhZ2UoKTtcclxuICAgICAgICBjcmVhdGVOYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICBjcmVhdGVDb2xvcklucHV0LnZhbHVlID0gJyMwMDAwMDAnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdwYXN0ZSBuYW1lIGNhciEnKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gICAgICBpZihldmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JlbW92ZS1idG4nKSl7XHJcbiAgICAgICAgY29uc3QgaWQgPSArZXZlbnRUYXJnZXQuaWQuc3BsaXQoJ3JlbW92ZS1jYXItJylbMV07XHJcbiAgICAgICAgYXdhaXQgZGVsZXRlQ2FyKGlkKTtcclxuICAgICAgICBhd2FpdCBkZWxldGVXaW5uZXIoaWQpO1xyXG4gICAgICAgIGF3YWl0IGdhcmFnZVVwZGF0ZSgpO1xyXG4gICAgICAgIGdhcmFnZUNhcnMuaW5uZXJIVE1MID0gcmVuZGVyR2FyYWdlKCk7XHJcbiAgICAgICAgUGFnZUJ1dHRvbnNVcGRhdGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0LWJ0bicpKXtcclxuICAgICAgICBzZWxlY3RlZENhciA9IGF3YWl0IGdldENhcigrZXZlbnRUYXJnZXQuaWQuc3BsaXQoJ3NlbGVjdC1jYXItJylbMV0pO1xyXG4gICAgICAgIHVwZGF0ZU5hbWVJbnB1dC52YWx1ZSA9IHNlbGVjdGVkQ2FyLm5hbWU7XHJcbiAgICAgICAgdXBkYXRlQ29sb3JJbnB1dC52YWx1ZSA9IHNlbGVjdGVkQ2FyLmNvbG9yO1xyXG4gICAgICAgIHVwZGF0ZU5hbWVJbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHVwZGF0ZUNvbG9ySW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB1cGRhdGVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc3RhcnQtZW5naW5lLWJ0bicpKXtcclxuICAgICAgICBjb25zdCBpZCA9ICtldmVudFRhcmdldC5pZC5zcGxpdCgnc3RhcnQtZW5naW5lLWNhci0nKVsxXTtcclxuXHJcbiAgICAgICAgYXdhaXQgc3RhcnREcml2ZShpZCk7XHJcbiAgICAgIH0gXHJcbiAgICAgIGlmIChldmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3N0b3AtZW5naW5lLWJ0bicpKXtcclxuICAgICAgICBjb25zdCBpZCA9ICtldmVudFRhcmdldC5pZC5zcGxpdCgnc3RvcC1lbmdpbmUtY2FyLScpWzFdO1xyXG4gICAgICAgIGF3YWl0IHN0b3BEcml2ZShpZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVwZGF0ZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgYm9keUNhciA9IHtcclxuICAgICAgICAgIG5hbWU6IHVwZGF0ZU5hbWVJbnB1dC52YWx1ZSxcclxuICAgICAgICAgIGNvbG9yOiB1cGRhdGVDb2xvcklucHV0LnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IHVwZGF0ZUNhcigrZXZlbnRUYXJnZXQuaWQuc3BsaXQoJ3NlbGVjdC1jYXItJylbMV0sIGJvZHlDYXIpO1xyXG4gICAgICAgIGF3YWl0IGdhcmFnZVVwZGF0ZSgpO1xyXG4gICAgICAgIHVwZGF0ZU5hbWVJbnB1dC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdXBkYXRlTmFtZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgdXBkYXRlQ29sb3JJbnB1dC52YWx1ZSA9ICcjMDAwMDAwJztcclxuICAgICAgICB1cGRhdGVDb2xvcklucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB1cGRhdGVCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHNlbGVjdGVkQ2FyID0gbnVsbDtcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmIChldmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RhYmxlLXdpbnMnKSl7XHJcbiAgICAgICAgYXdhaXQgc2V0U29ydE9yZGVyKCd3aW5zJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2VlZScpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChldmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RhYmxlLXRpbWUnKSl7XHJcbiAgICAgICBhd2FpdCBzZXRTb3J0T3JkZXIoJ3RpbWUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZmVmZScpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfSlcclxuICAgICAgXHJcbn0gIFxyXG5cclxuXHJcblxyXG5cclxuIiwiZXhwb3J0IGNvbnN0IGNhckJyYW5kczogQXJyYXk8c3RyaW5nPiA9IFtcclxuICBcIkF1ZGlcIixcclxuICBcIkFsZmEgUm9tZW9cIixcclxuICBcIkFscGluYVwiLFxyXG4gIFwiQXN0b24gTWFydGluXCIsXHJcbiAgXCJBeG9uXCIsXHJcbiAgXCJGb3JkXCIsXHJcbiAgXCJGZXJyYXJpXCIsXHJcbiAgXCJGaWF0XCIsXHJcbiAgXCJHQVpcIixcclxuICBcIkdNQ1wiLFxyXG4gIFwiSG9uZGFcIixcclxuICBcIkh1bW1lclwiLFxyXG4gIFwiSHl1bmRhaVwiLFxyXG4gIFwiSW5maW5pdGlcIixcclxuICBcIklzdXp1XCIsXHJcbiAgXCJKQUNcIixcclxuICBcIkphZ3VhclwiLFxyXG4gIFwiSmVlcFwiLFxyXG4gIFwiS2FtYXpcIixcclxuICBcIkxhZGFcIixcclxuICBcIkxleHVzXCIsXHJcbiAgXCJMb3R1c1wiLFxyXG4gIFwiTUFOXCIsXHJcbiAgXCJNYXliYWNoXCIsXHJcbiAgXCJNQVpcIixcclxuICBcIk1hemRhXCIsXHJcbiAgXCJNY0xhcmVuXCIsXHJcbiAgXCJOaXNzYW5cIixcclxuICBcIk9wZWxcIixcclxuICBcIlBhY2NhclwiLFxyXG4gIFwiUGFnYW5pXCIsXHJcbiAgXCJQb250aWFjXCIsXHJcbiAgXCJQb3JzY2hlXCIsXHJcbiAgXCJSZW5hdWx0XCIsXHJcbiAgXCLFoGtvZGFcIixcclxuICBcIlNtYXJ0XCIsXHJcbiAgXCJTdWJhcnVcIixcclxuICBcIlN1enVraVwiLFxyXG4gIFwiVGVzbGFcIixcclxuICBcIlRveW90YVwiLFxyXG4gIFwiVUFaXCIsXHJcbiAgXCJWb2x2b1wiLFxyXG4gIFwiWkFaXCIsXHJcbiAgXCJYUGVuZ1wiLFxyXG4gIFwiVFZSXCIsXHJcbiAgXCJTYWFiXCIsXHJcbiAgXCJSQU1cIixcclxuICBcIkNoZXZyb2xldFwiLFxyXG4gIFwiTWF6emFudGlcIixcclxuICBcIkRhZXdvb1wiLFxyXG4gIFwiWmFwb3JvemhldHNcIixcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBjYXJNb2RlbHM6IEFycmF5PHN0cmluZz4gPSBbXHJcbiAgXCJHcmFuIFR1cmlzbW9cIixcclxuICBcIlJTXCIsXHJcbiAgXCJSb2Fkc3RlclwiLFxyXG4gIFwiU1wiLFxyXG4gIFwiWFwiLFxyXG4gIFwiM1wiLFxyXG4gIFwiWVwiLFxyXG4gIFwiQ3liZXJ0cnVja1wiLFxyXG4gIFwiWDVcIixcclxuICBcIlg3XCIsXHJcbiAgXCJYM1wiLFxyXG4gIFwiWDZcIixcclxuICBcIkdUNFwiLFxyXG4gIFwiRlhYXCIsXHJcbiAgXCI1OTkgR1RPXCIsXHJcbiAgXCJFbnpvXCIsXHJcbiAgXCI0NTggSXRhbGlhXCIsXHJcbiAgXCIyNTAgR1RPXCIsXHJcbiAgXCJQcmlvcmFcIixcclxuICBcIjR4NFwiLFxyXG4gIFwiUmlvXCIsXHJcbiAgXCJGb2N1c1wiLFxyXG4gIFwiS2FsaW5hXCIsXHJcbiAgXCJWZXN0YVwiLFxyXG4gIFwiU3BhcmtcIixcclxuICBcIkxhY2V0dGlcIixcclxuICBcIk5leGlhXCIsXHJcbiAgXCJNYXRpelwiLFxyXG4gIFwiQ29iYWx0XCIsXHJcbiAgXCJDYXB0aXZhXCIsXHJcbiAgXCJBN1wiLFxyXG4gIFwiQTVcIixcclxuICBcIkEzXCIsXHJcbiAgXCJBOFwiLFxyXG4gIFwiVFRcIixcclxuICBcIkNvcm9sbGFcIixcclxuICBcIkNhbXJ5XCIsXHJcbiAgXCJSQVY0XCIsXHJcbiAgXCJJbXByZXphXCIsXHJcbiAgXCJXUlhcIixcclxuICBcIkVTXCIsXHJcbiAgXCJMU1wiLFxyXG4gIFwiUlhcIixcclxuICBcIkdYXCIsXHJcbiAgXCJMWFwiLFxyXG4gIFwiR1NcIixcclxuICBcIkxDNTAwXCIsXHJcbiAgXCJHYWxsYXJkb1wiLFxyXG4gIFwiQXZlbnRhZG9yXCIsXHJcbiAgXCI5MTFcIixcclxuICBcIkNheWVubmVcIixcclxuICBcIkZYMzdcIixcclxuXTsiLCJleHBvcnQgY29uc3QgY29uc3RhbnRzID0ge1xyXG4gIGRlZmF1bHRHYXJhZ2VQYWdlOiAxLFxyXG4gIGRlZmF1bHRXaW5uZXJzUGFnZTogMSxcclxuICBkZWZhdWx0R2FyYWdlUGFnZUxpbWl0OiA3LFxyXG4gIGRlZmF1bHROdW1iZXJHZW5lcmF0ZUNhcjogMTAwLFxyXG4gIGRlZmF1bHRXaW5uZXJzUGFnZUxpbWl0OiAxMFxyXG59XHJcblxyXG5jb25zdCBiYXNlID0gJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMCc7XHJcblxyXG5leHBvcnQgY29uc3QgcGF0aCA9IHtcclxuICBnYXJhZ2U6IGAke2Jhc2V9L2dhcmFnZWAsXHJcbiAgZW5naW5lOiBgJHtiYXNlfS9lbmdpbmVgLFxyXG4gIHdpbm5lcnM6IGAke2Jhc2V9L3dpbm5lcnNgLFxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBzdGFydEVuZ2luZSwgc3RvcEVuZ2luZSwgc3dpdGNoQ2FyVG9Ecml2ZSB9IGZyb20gXCIuL2FwaVwiO1xyXG5pbXBvcnQgeyBJU3RhcnREcml2ZSwgSVJhY2UgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnREcml2ZShpZDpudW1iZXIpOiBQcm9taXNlPElTdGFydERyaXZlPntcclxuICBjb25zdCBzdG9wQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHN0b3AtZW5naW5lLWNhci0ke2lkfWApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHN0YXJ0LWVuZ2luZS1jYXItJHtpZH1gKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBjb25zdCBjYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2FyLSR7aWR9YCkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgc3RvcEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICBjb25zdCB7IHZlbG9jaXR5LCBkaXN0YW5jZSB9ID0gYXdhaXQgc3RhcnRFbmdpbmUoaWQpO1xyXG4gIGNvbnN0IHRpbWUgPSBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gdmVsb2NpdHkpO1xyXG4gIGNhci5zdHlsZS5hbmltYXRpb25OYW1lID0gJ2FuaW1hdGlvbi1jYXInO1xyXG4gIGNhci5zdHlsZS5hbmltYXRpb25EdXJhdGlvbiA9IGAke3RpbWUudG9TdHJpbmcoKX1tc2A7XHJcbiAgY29uc3Qge3N1Y2Nlc3N9ID0gYXdhaXQgc3dpdGNoQ2FyVG9Ecml2ZShpZCk7XHJcbiAgaWYgKCFzdWNjZXNzKXtcclxuICAgIGNhci5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncGF1c2VkJztcclxuICB9XHJcbiAgY29uc29sZS5sb2coe3N1Y2Nlc3MsIGlkLCB0aW1lfSk7XHJcbiAgcmV0dXJuIHtzdWNjZXNzLCBpZCwgdGltZX1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN0b3BEcml2ZShpZDpudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICBjb25zdCBzdG9wQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHN0b3AtZW5naW5lLWNhci0ke2lkfWApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHN0YXJ0LWVuZ2luZS1jYXItJHtpZH1gKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBjb25zdCBjYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2FyLSR7aWR9YCkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgc3RvcEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgc3RhcnRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICBhd2FpdCBzdG9wRW5naW5lKGlkKTtcclxuICBjYXIuc3R5bGUuYW5pbWF0aW9uTmFtZSA9IFwibm9uZVwiO1xyXG4gIGNhci5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSBcImluaXRpYWxcIjtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJhY2UoKTogUHJvbWlzZTxJUmFjZT4gIHtcclxuICBjb25zdCBwcm9taXNlID0gc3RvcmFnZS5jYXJzLm1hcCgoe2lkfSkgPT4gc3RhcnREcml2ZShpZCkpO1xyXG4gIGNvbnN0IGNhcnMgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlKTtcclxuICBjb25zdCBjYXJzU3VjY2VzcyA9IGNhcnMuZmlsdGVyKGVsID0+IGVsLnN1Y2Nlc3MpLnNvcnQoKGEsYikgPT4gYS50aW1lIC0gYi50aW1lKTtcclxuICBjb25zdCBbaWQgLCB0aW1lXSA9IFtjYXJzU3VjY2Vzc1swXS5pZCwgY2Fyc1N1Y2Nlc3NbMF0udGltZV07IFxyXG4gIHJldHVybiB7aWQgLCB0aW1lOiArKHRpbWUgLyAxMDAwKS50b0ZpeGVkKDIpfVxyXG59IiwiaW1wb3J0IHsgY2FyQnJhbmRzLCBjYXJNb2RlbHMgfSBmcm9tIFwiLi9jYXJEYXRhXCI7XHJcbmltcG9ydCB7IElDYXJDcmVhdGUgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbG9yKCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGgucG93KDE2LCA2KSkudG9TdHJpbmcoMTYpKS5zbGljZSgtNik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlTmFtZSgpOiBzdHJpbmcge1xyXG4gIGNvbnN0IG1vZGVsID0gY2FyQnJhbmRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhckJyYW5kcy5sZW5ndGgpXTtcclxuICBjb25zdCBuYW1lID0gY2FyTW9kZWxzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhck1vZGVscy5sZW5ndGgpXTtcclxuICByZXR1cm4gYCR7bW9kZWx9ICR7bmFtZX1gXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNhcnMoY291bnQ6IG51bWJlcik6IElDYXJDcmVhdGVbXSB7XHJcbiAgcmV0dXJuIG5ldyBBcnJheShjb3VudCkuZmlsbCgwKS5tYXAoKCkgPT4gKHsgbmFtZTogZ2VuZXJhdGVOYW1lKCksIGNvbG9yOiBnZW5lcmF0ZUNvbG9yKCkgfSkpO1xyXG59IiwiZXhwb3J0IGNvbnN0IHNlbGVjdG9ycyA9IHtcclxuICBidG5QcmV2OiAncHJldicsXHJcbiAgYnRuTmV4dDogJ25leHQnLFxyXG4gIGJ0bkdhcmFnZVZpZXc6ICdnYXJhZ2UtbWVudScsXHJcbiAgYnRuV2lubmVyc1ZpZXc6ICd3aW5uZXJzLW1lbnUnLFxyXG4gIGdhcmFnZUNhcnM6J2dhcmFnZS1jYXJzJyxcclxuICBjcmVhdGVOYW1lSW5wdXQ6ICdjcmVhdGUtbmFtZScsXHJcbiAgY3JlYXRlQ29sb3JJbnB1dDonY3JlYXRlLWNvbG9yJyxcclxuICBjcmVhdGVGb3JtOiAnY3JlYXRlJyxcclxuICB1cGRhdGVOYW1lSW5wdXQ6ICd1cGRhdGUtbmFtZScsXHJcbiAgdXBkYXRlQ29sb3JJbnB1dDogJ3VwZGF0ZS1jb2xvcicsXHJcbiAgYnRuVXBkYXRlOiAndXBkYXRlLXN1Ym1pdCcsXHJcbiAgdXBkYXRlRm9ybTogJ3VwZGF0ZScsXHJcbiAgYnRuV2lubmVyczogJ3dpbm5lcnMtbWVudScsXHJcbiAgYnRuR2FyYWdlOiAnZ2FyYWdlLW1lbnUnLFxyXG4gIHdpbm5lcnNWaWV3OiAnd2lubmVycy12aWV3JyxcclxuICBnYXJhZ2VWaWV3OiAnZ2FyYWdlLXZpZXcnLFxyXG4gIGJ0bkdlbmVyYXRlQ2FyOiAnZ2VuZXJhdG9yJyxcclxuICBidG5SYWNlOiAncmFjZScsXHJcbiAgYnRuUmFjZVJlc2V0OiAncmVzZXQnLFxyXG4gIG1lc3NhZ2U6ICdtZXNzYWdlJ1xyXG59XHJcbiIsImltcG9ydCB7IElTdG9yYWdlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgY29uc3RhbnRzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0b3JhZ2U6IElTdG9yYWdlID0ge1xyXG4gIGdhcmFnZVBhZ2U6IGNvbnN0YW50cy5kZWZhdWx0R2FyYWdlUGFnZSxcclxuICB3aW5uZXJzUGFnZTogY29uc3RhbnRzLmRlZmF1bHRXaW5uZXJzUGFnZSxcclxuICBjYXJzOiBbXSxcclxuICB3aW5uZXJzOiBbXSxcclxuICBjYXJzQ291bnQ6IDAsXHJcbiAgd2lubmVyc0NvdW50OiAwLFxyXG4gIHZpZXc6IFwiZ2FyYWdlXCIsXHJcbiAgc29ydDogXCJ0aW1lXCIsXHJcbiAgc29ydE9yZGVyOiBcImFzY1wiLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBhZGRMaXN0ZW5lcnMsIGdhcmFnZVVwZGF0ZSwgUGFnZUJ1dHRvbnNVcGRhdGUsIHJlbmRlciB9IGZyb20gXCIuL2NvbXBvbmVudHMvYXBwXCI7XHJcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgYXdhaXQgZ2FyYWdlVXBkYXRlKCk7XHJcbiAgYXdhaXQgcmVuZGVyKCk7XHJcbiAgUGFnZUJ1dHRvbnNVcGRhdGUoKTtcclxuICBhZGRMaXN0ZW5lcnMoKTtcclxufVxyXG5cclxuaW5pdCgpO1xyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9