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
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const garageViewBtn = document.getElementById('garage-menu');
    const winnersViewBtn = document.getElementById('winners-menu');
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
        const winnersView = document.getElementById('winners-view');
        winnersView.innerHTML = renderWinners();
    });
}
const addListeners = function () {
    const garageCars = document.getElementById('garage-cars');
    const createNameInput = document.getElementById('create-name');
    const createColorInput = document.getElementById('create-color');
    const createForm = document.getElementById('create');
    const updateNameInput = document.getElementById('update-name');
    const updateColorInput = document.getElementById('update-color');
    const updateBtn = document.getElementById('update-submit');
    const updateForm = document.getElementById('update');
    const winnersBtn = document.getElementById('winners-menu');
    const garageBtn = document.getElementById('garage-menu');
    const winnersView = document.getElementById('winners-view');
    const garageView = document.getElementById('garage-view');
    const btnPrev = document.getElementById('prev');
    const btnNext = document.getElementById('next');
    const btnGenerateCar = document.getElementById('generator');
    const raceBtn = document.getElementById('race');
    const raceResetBtn = document.getElementById('reset');
    const message = document.querySelector('.winner-message');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS8uL3NyYy9zdHlsZS5zY3NzP2JjM2IiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS8uL3NyYy9jb21wb25lbnRzL2FwaS50cyIsIndlYnBhY2s6Ly9hc3luYy1yYWNlLy4vc3JjL2NvbXBvbmVudHMvYXBwLnRzIiwid2VicGFjazovL2FzeW5jLXJhY2UvLi9zcmMvY29tcG9uZW50cy9jYXJEYXRhLnRzIiwid2VicGFjazovL2FzeW5jLXJhY2UvLi9zcmMvY29tcG9uZW50cy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS8uL3NyYy9jb21wb25lbnRzL2RyaXZlLnRzIiwid2VicGFjazovL2FzeW5jLXJhY2UvLi9zcmMvY29tcG9uZW50cy9nZW5lcmF0ZS1jYXIudHMiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS8uL3NyYy9jb21wb25lbnRzL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9hc3luYy1yYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FzeW5jLXJhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hc3luYy1yYWNlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYXN5bmMtcmFjZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xyXG5cclxuaW1wb3J0IHsgY29uc3RhbnRzLCBwYXRoIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IElDYXIsIElDYXJDcmVhdGUsIElDYXJTcGVlZCwgSVdpbm5lciwgSVJhY2UgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLUNBUlMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IGdldENhcnMgPSBhc3luYyAoXHJcbiAgcGFnZTogbnVtYmVyLFxyXG4gIGxpbWl0ID0gY29uc3RhbnRzLmRlZmF1bHRHYXJhZ2VQYWdlTGltaXRcclxuICApOiBQcm9taXNlPHtpdGVtczpJQ2FyW107IGNvdW50OiBudW1iZXJ9PiA9PiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtwYXRoLmdhcmFnZX0/X3BhZ2U9JHtwYWdlfSZfbGltaXQ9JHtsaW1pdH1gKTtcclxuICBcclxuICByZXR1cm4ge1xyXG4gICAgaXRlbXM6IGF3YWl0IHJlc3BvbnNlLmpzb24oKSxcclxuICAgIGNvdW50OiBOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoJ1gtVG90YWwtQ291bnQnKSksXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldENhciA9IGFzeW5jIChpZDogbnVtYmVyKTogUHJvbWlzZTxJQ2FyPiA9PiB7XHJcbiAgcmV0dXJuIChhd2FpdCBmZXRjaChgJHtwYXRoLmdhcmFnZX0vJHtpZH1gKSkuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQ2FyID0gYXN5bmMgKGJvZHk6IElDYXJDcmVhdGUpOiBQcm9taXNlPElDYXI+ID0+IFxyXG4gIChhd2FpdCBmZXRjaCAocGF0aC5nYXJhZ2UsIHtcclxuICBtZXRob2Q6ICdQT1NUJyxcclxuICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcclxuICBoZWFkZXJzOiB7XHJcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgfSxcclxufSkpLmpzb24oKTtcclxuXHJcbiAgXHJcbmV4cG9ydCBjb25zdCBkZWxldGVDYXIgPSBhc3luYyAoaWQ6bnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiAoXHJcbiAgYXdhaXQgZmV0Y2goYCR7cGF0aC5nYXJhZ2V9LyR7aWR9YCwge21ldGhvZDogJ0RFTEVURSd9KSkuanNvbigpO1xyXG4gIFxyXG5leHBvcnQgY29uc3QgdXBkYXRlQ2FyID0gYXN5bmMgKGlkOm51bWJlciwgYm9keTpJQ2FyQ3JlYXRlKTogUHJvbWlzZTx2b2lkPiA9PiBcclxuICAoYXdhaXQgZmV0Y2ggKGAke3BhdGguZ2FyYWdlfS8ke2lkfWAsIHtcclxuICBtZXRob2Q6ICdQVVQnLFxyXG4gIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxyXG4gIGhlYWRlcnM6IHtcclxuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICB9LFxyXG59KSkuanNvbigpO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLUVOR0lORS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgc3RhcnRFbmdpbmUgPSBhc3luYyAoaWQ6bnVtYmVyKTogUHJvbWlzZTxJQ2FyU3BlZWQ+ID0+IFxyXG4oYXdhaXQgZmV0Y2goYCR7cGF0aC5lbmdpbmV9P2lkPSR7aWR9JnN0YXR1cz1zdGFydGVkYCwgeyBtZXRob2Q6IFwiUEFUQ0hcIiB9KSkuanNvbigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0b3BFbmdpbmUgPSBhc3luYyAoaWQ6bnVtYmVyKTogIFByb21pc2U8SUNhclNwZWVkPiA9PiBcclxuKGF3YWl0IGZldGNoKGAke3BhdGguZW5naW5lfT9pZD0ke2lkfSZzdGF0dXM9c3RvcHBlZGAsIHsgbWV0aG9kOiBcIlBBVENIXCIgfSkpLmpzb24oKTtcclxuXHJcblxyXG4vLyDQvdC1INC/0L7QvdC40LzQsNGOINGF0LDRh9C10Lwg0LfQtNC10YHRjCBjYXRjaCDQuCDQv9C+0YLQvtC8INCy0YvQstC+0LQgXHJcbmV4cG9ydCBjb25zdCBzd2l0Y2hDYXJUb0RyaXZlID0gYXN5bmMgKGlkOm51bWJlcik6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuIH0+ID0+IHtcclxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtwYXRoLmVuZ2luZX0/aWQ9JHtpZH0mc3RhdHVzPWRyaXZlYCx7IG1ldGhvZDogXCJQQVRDSFwiIH0gKS5jYXRjaCgpO1xyXG4gcmV0dXJuIHJlcy5zdGF0dXMgIT09IDIwMCA/IHsgc3VjY2VzczogZmFsc2UgfSA6IHsgLi4uKGF3YWl0IHJlcy5qc29uKCkpfTsgLy8g0LLRi9Cy0L7QtFxyXG59XHJcblxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVdJTk5FUlMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmNvbnN0IGdldFNvcnRPcmRlciA9IChzb3J0OnN0cmluZywgb3JkZXI6c3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBpZiAoc29ydCAmJiBvcmRlcikgcmV0dXJuIGAmX3NvcnQ9JHtzb3J0fSZfb3JkZXI9JHtvcmRlcn1gO1xyXG4gIHJldHVybiAnJztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFdpbm5lcnMgPSBhc3luYyAoe3BhZ2UsIGxpbWl0ID0gY29uc3RhbnRzLmRlZmF1bHRXaW5uZXJzUGFnZSwgc29ydCwgb3JkZXJ9OiB7cGFnZTogbnVtYmVyO1xyXG4gIGxpbWl0OiBudW1iZXI7XHJcbiAgc29ydDogc3RyaW5nO1xyXG4gIG9yZGVyOiBzdHJpbmc7XHJcbn0pOiBQcm9taXNlPHsgaXRlbXM6IElXaW5uZXJbXTsgY291bnQ6IG51bWJlciB9PiA9PiB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7cGF0aC53aW5uZXJzfT9fcGFnZT0ke3BhZ2V9Jl9saW1pdD0ke2xpbWl0fSR7Z2V0U29ydE9yZGVyKHNvcnQsIG9yZGVyKX1gKTtcclxuICBjb25zdCBpdGVtcyA9IGF3YWl0IHJlcy5qc29uKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpdGVtczogYXdhaXQgUHJvbWlzZS5hbGwoXHJcbiAgICAgIGl0ZW1zLm1hcChhc3luYyAod2lubmVyOiB7IGlkOiBudW1iZXIgfSkgPT4gKHsgLi4ud2lubmVyLCBjYXI6IGF3YWl0IGdldENhcih3aW5uZXIuaWQpIH0pKVxyXG4gICAgKSxcclxuICAgIGNvdW50OiBOdW1iZXIocmVzLmhlYWRlcnMuZ2V0KCdYLVRvdGFsLUNvdW50JykpLFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFdpbm5lciA9IGFzeW5jIChpZDogbnVtYmVyIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxJV2lubmVyPiA9PlxyXG4oYXdhaXQgZmV0Y2goYCR7cGF0aC53aW5uZXJzfS8ke2lkfWApKS5qc29uKCk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0V2lubmVyU3RhdHVzID0gYXN5bmMgKGlkOiBudW1iZXIgfCB1bmRlZmluZWQpOiBQcm9taXNlPG51bWJlcj4gPT5cclxuKGF3YWl0IGZldGNoKGAke3BhdGgud2lubmVyc30vJHtpZH1gKSkuc3RhdHVzO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZVdpbm5lciA9IGFzeW5jIChpZDpudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IFxyXG4oYXdhaXQgZmV0Y2goYCR7cGF0aC53aW5uZXJzfS8ke2lkfWAsIHttZXRob2Q6ICdERUxFVEUnfSkpLmpzb24oKTtcclxuICBcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVdpbm5lciA9IGFzeW5jICAoYm9keTogeyBpZDogbnVtYmVyIHwgdW5kZWZpbmVkOyB3aW5zOiBudW1iZXI7IHRpbWU6IG51bWJlciB9KTogUHJvbWlzZTx2b2lkPiA9PlxyXG4gKGF3YWl0IGZldGNoIChwYXRoLndpbm5lcnMsIHtcclxuICBtZXRob2Q6ICdQT1NUJyxcclxuICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcclxuICBoZWFkZXJzOiB7XHJcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgfSxcclxufSkpLmpzb24oKTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVXaW5uZXIgPSBhc3luYyAoaWQ6IG51bWJlciB8IHVuZGVmaW5lZCwgYm9keTogeyBpZDogbnVtYmVyIHwgdW5kZWZpbmVkOyB3aW5zOiBudW1iZXI7IHRpbWU6IG51bWJlciB9KTogUHJvbWlzZTx2b2lkPiA9PlxyXG4oYXdhaXQgZmV0Y2ggKGAke3BhdGgud2lubmVyc30vJHtpZH1gLCB7XHJcbiAgbWV0aG9kOiAnUFVUJyxcclxuICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcclxuICBoZWFkZXJzOiB7XHJcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgfSxcclxufSkpLmpzb24oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBzYXZlV2lubmVyID0gYXN5bmMgKHtpZCwgdGltZSB9OiBJUmFjZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIFxyXG4gIGNvbnN0IHdpbm5lclN0YXR1cyA9IGF3YWl0IGdldFdpbm5lclN0YXR1cyhpZCk7XHJcbiAgaWYgKHdpbm5lclN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICBhd2FpdCBjcmVhdGVXaW5uZXIoe1xyXG4gICAgICBpZCxcclxuICAgICAgd2luczogMSxcclxuICAgICAgdGltZSxcclxuICAgIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHdpbm5lciA9IGF3YWl0IGdldFdpbm5lcihpZCk7XHJcbiAgICBhd2FpdCB1cGRhdGVXaW5uZXIoaWQse1xyXG4gICAgICBpZCxcclxuICAgICAgd2luczogd2lubmVyLndpbnMgKyAxLFxyXG4gICAgICB0aW1lOiB0aW1lIDwgd2lubmVyLnRpbWUgPyB0aW1lIDogd2lubmVyLnRpbWUsXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBjcmVhdGVDYXIsIGRlbGV0ZUNhciwgZGVsZXRlV2lubmVyLCBnZXRDYXIsIGdldENhcnMsIGdldFdpbm5lcnMsIHNhdmVXaW5uZXIsIHVwZGF0ZUNhciB9IGZyb20gJy4vYXBpJztcclxuaW1wb3J0IHsgY29uc3RhbnRzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBJQ2FyfSBmcm9tICcuL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVDYXJzIH0gZnJvbSAnLi9nZW5lcmF0ZS1jYXInO1xyXG5pbXBvcnQgeyByYWNlICwgc3RhcnREcml2ZSwgc3RvcERyaXZlIH0gZnJvbSAnLi9kcml2ZSc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2FyYWdlVXBkYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gIGNvbnN0IGNhckluZm8gPSBhd2FpdCBnZXRDYXJzKHN0b3JhZ2UuZ2FyYWdlUGFnZSk7XHJcbiAgc3RvcmFnZS5jYXJzQ291bnQgPSBjYXJJbmZvLmNvdW50O1xyXG4gIHN0b3JhZ2UuY2FycyA9IGNhckluZm8uaXRlbXM7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3aW5uZXJzVXBkYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gIGNvbnN0IHdpbm5lcnNJbmZvID0gYXdhaXQgZ2V0V2lubmVycyh7XHJcbiAgICBwYWdlOiBzdG9yYWdlLndpbm5lcnNQYWdlLFxyXG4gICAgbGltaXQ6IGNvbnN0YW50cy5kZWZhdWx0V2lubmVyc1BhZ2VMaW1pdCxcclxuICAgIHNvcnQ6IHN0b3JhZ2Uuc29ydCxcclxuICAgIG9yZGVyOiBzdG9yYWdlLnNvcnRPcmRlcixcclxuICB9KTtcclxuICBzdG9yYWdlLndpbm5lcnNDb3VudCA9IHdpbm5lcnNJbmZvLmNvdW50O1xyXG4gIHN0b3JhZ2Uud2lubmVycyA9IHdpbm5lcnNJbmZvLml0ZW1zO1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJDYXIgPSAoY29sb3I6IHN0cmluZykgPT4gYDxzdmcgdmVyc2lvbj1cIjEuMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG53aWR0aD1cIjEwMC4wMDAwMDBwdFwiIGhlaWdodD1cIjQwLjAwMDAwMHB0XCIgdmlld0JveD1cIjAgMCAxMjgwLjAwMDAwMCA2NDAuMDAwMDAwXCJcclxucHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIj5cclxuPG1ldGFkYXRhPlxyXG5DcmVhdGVkIGJ5IHBvdHJhY2UgMS4xNSwgd3JpdHRlbiBieSBQZXRlciBTZWxpbmdlciAyMDAxLTIwMTdcclxuPC9tZXRhZGF0YT5cclxuPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAuMDAwMDAwLDY0MC4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMClcIlxyXG5maWxsPSR7Y29sb3J9IHN0cm9rZT1cIm5vbmVcIj5cclxuPHBhdGggZD1cIk0zNTY1IDUzMzYgYy0xMDYgLTMwIC0xMDEgLTI2IC0xMDggLTExMSAtNCAtNDIgLTkgLTgwIC0xMiAtODUgLTYgLTEwIC0yNDYgLTEwNSAtNTkwIC0yMzQgLTQ0OCAtMTY3IC0xMDUyIC00MTUgLTExNzMgLTQ4MyAtNzggLTQzIC0xOTMgLTkxIC0yNTAgLTEwNCAtMjMgLTUgLTk4IC0xNCAtMTY1IC0xOSAtNjcgLTYgLTE2NyAtMTkgLTIyMiAtMzAgLTE1NCAtMzEgLTM0MCAtNDkgLTU2MyAtNTcgbC0yMDMgLTYgLTQzIC02NiBjLTU5IC05MSAtNjAgLTk1IC0yNiAtMTMwIDM3IC0zNyAzOCAtNjUgMyAtMTUwIC0yNSAtNjIgLTI3IC03OCAtMzEgLTI1NiBsLTQgLTE5MCAtMzggLTMyIGMtOTEgLTc4IC0xMzMgLTIwOSAtMTM0IC00MTggMCAtMTk0IDExIC0zOTYgMjYgLTQ4MiAxMyAtNzEgMTQgLTc0IDcyIC0xMjIgNjkgLTU4IDEzMCAtMTI5IDE1OCAtMTg0IDY0IC0xMjYgNTM0IC0yMTEgMTM4NCAtMjUwIGw5MiAtNCAtNiAxMTkgYy02IDE0MiA4IDI1NiA0OSAzODMgMTEyIDM1MiAzOTQgNjIyIDc1NiA3MjIgOTAgMjYgMTEyIDI4IDI3OCAyOCAxNjUgMCAxODggLTIgMjc4IC0yNyAyMDEgLTU2IDM2MSAtMTUyIDUwNCAtMzAyIDE0MCAtMTQ1IDIyMiAtMjkzIDI3NCAtNDkyIDIxIC03OSAyNCAtMTA5IDIzIC0yNzkgLTEgLTEyNyAtNiAtMjE0IC0xNiAtMjYzIGwtMTUgLTczIDMwMDYgNyBjMTY1MyA0IDMwMDcgOCAzMDA5IDkgMSAxIC04IDM3IC0yMCA4MSAtMTkgNjcgLTIyIDEwNSAtMjIgMjU5IC0xIDE2NiAxIDE4NyAyNyAyNzkgMTE3IDQyMSA0NjcgNzM2IDg4NSA3OTcgMTE5IDE3IDMyNSA3IDQzMiAtMjEgMjM5IC02MyA0NTMgLTIwNSA2MDEgLTM5OSA3MCAtOTIgMTU0IC0yNjcgMTg1IC0zODYgMjQgLTg4IDI3IC0xMTkgMjcgLTI2MCAxIC0xMTYgLTQgLTE4MSAtMTYgLTIzNCAtMTAgLTQxIC0xNiAtNzUgLTE1IC03NiAyIC0xIDYyIDIgMTMzIDYgMjY2IDE2IDQ1OCA0NSA1MjUgNzkgNDggMjQgOTcgODEgMTI3IDE0NiBsMjQgNTIgLTE2IDE1NyBjLTE1IDE1MiAtMTUgMTYzIDQgMjg0IDYzIDM4OCA1MCA2ODAgLTM1IDgwMiAtMTM0IDE5MyAtNTI2IDMzNiAtMTQyOSA1MTkgLTczNyAxNDkgLTEzMjIgMjA5IC0yMDMzIDIxMCAtMjI4IDAgLTIyNiAwIC0zNDcgODUgLTE4NyAxMzEgLTEwNDUgNjA3IC0xNDcxIDgxNSAtMzgzIDE4NyAtNzg4IDI4MSAtMTQzOSAzMzJcclxuLTIwOCAxNyAtMTEwNiAxNiAtMTQwMCAwIC0xMjEgLTcgLTMxNCAtMTkgLTQzMCAtMjcgLTMwMiAtMjIgLTI4NiAtMjIgLTM0MSAxMCAtMTQwIDgxIC0xODcgOTQgLTI2OSA3MXogbTE4ODUgLTMzMyBjNiAtMzcgMzggLTIzOCA3MSAtNDQ2IDMyIC0yMDkgNjZcclxuLTQyMiA3NSAtNDc0IDkgLTUyIDE1IC05NiAxMyAtOTcgLTExIC05IC0xNjk5IDI5IC0xOTUxIDQ0IC0yMDYgMTMgLTQxNyAzNiAtNDg1IDU0IC05OCAyNiAtMTk4IDExOSAtMjQ5IDIzMSAtMzUgNzUgLTM2IDE3MiAtNSAyNTUgMTcgNDUgMzAgNjEgNjggODYgODNcclxuNTQgMTM1IDgwIDI1MyAxMjcgMzQxIDEzNiA4NTggMjMwIDE0NjAgMjY3IDI2OSAxNiAyNzAgMTYgNTExIDE4IGwyMjcgMiAxMiAtNjd6IG02MzAgNDcgYzI2NCAtMTggNzc3IC0xMTAgMTAyOSAtMTg2IDE4NiAtNTYgNDQ1IC0xODggNzU2IC0zODcgMjExIC0xMzRcclxuMjc0IC0xODEgMjUwIC0xODUgLTc1IC0xMiAtMTMzIC01MCAtMTYyIC0xMDYgLTE5IC0zNSAtMjEgLTEzNiAtNCAtMTc5IGwxMSAtMjcgLTkwNyAyIC05MDYgMyAtNTkgMTYwIGMtMTEwIDMwMiAtMjk4IDg3OCAtMjk4IDkxNiAwIDYgOTUgMiAyOTAgLTExelwiLz5cclxuPHBhdGggZD1cIk0yNjMzIDMxMjUgYy0yMjMgLTQwIC00MTAgLTE0MSAtNTY4IC0zMDYgLTEzMiAtMTM4IC0yMTMgLTI4MyAtMjYyIC00NjcgLTIyIC04MyAtMjYgLTExOSAtMjYgLTI0NyAtMSAtMTY5IDEwIC0yMzYgNjUgLTM4MiA4NyAtMjMwIDI3MSAtNDM2IDQ5M1xyXG4tNTUxIDg1IC00NCAxNzggLTc4IDI3MSAtOTggMTA3IC0yMyAzMTIgLTIzIDQxOSAxIDM5MiA4NCA2OTkgMzc1IDgwMiA3NjEgMjMgODYgMjYgMTIwIDI3IDI1NCAxIDE1OCAtNSAxOTkgLTQ2IDMzMCAtOTggMzEwIC0zNTUgNTY3IC02NjggNjY5IC0xNTAgNTBcclxuLTM1NCA2NCAtNTA3IDM2eiBtMzUwIC0zMDEgYzI0OSAtNTYgNDU3IC0yNDcgNTQzIC00OTkgMjUgLTcyIDI4IC05NSAyOCAtMjIwIDEgLTE1MyAtMTUgLTIyOCAtNzQgLTM0NSAtOTQgLTE4NiAtMjgzIC0zMzcgLTQ4NSAtMzg2IC05NiAtMjQgLTI2OCAtMjQgLTM2MFxyXG4wIC0zMjAgODQgLTU0NCAzNTUgLTU2MiA2ODEgLTIwIDM1OSAyMDkgNjczIDU1OCA3NjUgOTQgMjQgMjUzIDI2IDM1MiA0elwiLz4gXHJcbjxwYXRoIGQ9XCJNMjYwMCAyNjk3IGMtMzYgLTEzIC04NSAtMzYgLTEwOSAtNTEgbC00NCAtMjggMTE2IC0xMTUgYzgxIC04MiAxMjAgLTExNCAxMzEgLTExMCAxNCA2IDE2IDI5IDE2IDE2NyAwIDE4NiA2IDE3OCAtMTEwIDEzN3pcIi8+XHJcbjxwYXRoIGQ9XCJNMjkyMCAyNTYxIGMwIC0xMzkgMiAtMTYyIDE2IC0xNjggMTEgLTQgNTAgMjggMTMwIDEwOCBsMTE1IDExNCAtMjhcclxuMjIgYy0zNCAyOCAtMTM4IDcwIC0xOTMgNzkgbC00MCA3IDAgLTE2MnpcIi8+XHJcbjxwYXRoIGQ9XCJNMjI4MiAyNDQ4IGMtMjggLTM2IC05MiAtMTkxIC05MiAtMjI1IDAgLTEwIDM0IC0xMyAxNjUgLTEzIDE1MSAwXHJcbjE2NSAxIDE2NSAxOCAwIDE1IC0yMDYgMjMyIC0yMjEgMjMyIC00IDAgLTExIC02IC0xNyAtMTJ6XCIvPlxyXG48cGF0aCBkPVwiTTMyMjIgMjM1MSBjLTYyIC01OSAtMTEyIC0xMTUgLTExMiAtMTI0IDAgLTE1IDE3IC0xNyAxNjUgLTE3IDEzMSAwXHJcbjE2NSAzIDE2NSAxMyAwIDQwIC02OSAyMDUgLTk1IDIyNyAtNyA2IC00OCAtMjcgLTEyMyAtOTl6XCIvPlxyXG48cGF0aCBkPVwiTTI3ODEgMjMzMiBjLTEyIC0yMiAxMSAtNjIgMzQgLTYyIDggMCAyMSAxMCAyOSAyMiAyMCAyOCA0IDU4IC0yOVxyXG41OCAtMTMgMCAtMjkgLTggLTM0IC0xOHpcIi8+XHJcbjxwYXRoIGQ9XCJNMjc0OSAyMTYxIGMtMzIgLTMzIC0zNyAtNjcgLTE0IC0xMTAgMjkgLTU3IDEwNCAtNjQgMTUxIC0xNCA1MyA1N1xyXG45IDE1MyAtNzEgMTUzIC0yNyAwIC00NCAtOCAtNjYgLTI5elwiLz5cclxuPHBhdGggZD1cIk0yNTcwIDIxMjUgYy0yNiAtMzIgMTMgLTgxIDQ4IC01OSAyNCAxNiAyNyA0NSA2IDYxIC0yMyAxNyAtMzkgMTZcclxuLTU0IC0yelwiLz5cclxuPHBhdGggZD1cIk0zMDA2IDIxMjQgYy0yMCAtMTkgLTIwIC0zOCAtMiAtNTQgMjMgLTE5IDYxIC04IDY0IDE4IDcgNDQgLTMyIDY3XHJcbi02MiAzNnpcIi8+XHJcbjxwYXRoIGQ9XCJNMjE5MCAxOTc1IGMwIC0yOSA0MSAtMTQwIDcyIC0xOTQgbDMxIC01MyAxMTcgMTE3IGM3MSA3MSAxMTYgMTIzXHJcbjExMyAxMzEgLTQgMTEgLTQwIDE0IC0xNjkgMTQgLTE0MSAwIC0xNjQgLTIgLTE2NCAtMTV6XCIvPlxyXG48cGF0aCBkPVwiTTMxMTAgMTk3MiBjMCAtOSA1MSAtNjggMTE0IC0xMzEgbDExNCAtMTE0IDMxIDU0IGMzMCA1MSA3MSAxNjUgNzFcclxuMTk1IDAgMTEgLTMxIDE0IC0xNjUgMTQgLTE1MSAwIC0xNjUgLTEgLTE2NSAtMTh6XCIvPlxyXG48cGF0aCBkPVwiTTI3ODAgMTkwMSBjLTcgLTE1IC01IC0yNCA4IC00MSAzMiAtNDAgODUgLTQgNjIgNDEgLTE0IDI1IC01NiAyNVxyXG4tNzAgMHpcIi8+XHJcbjxwYXRoIGQ9XCJNMjU2MiAxNjk3IGMtNjEgLTYyIC0xMTIgLTExNSAtMTEyIC0xMTkgMCAtMTggMjA4IC0xMDggMjQ5IC0xMDggN1xyXG4wIDExIDU0IDExIDE2NCAwIDE0MCAtMiAxNjUgLTE2IDE3MCAtOSAzIC0xNiA2IC0xNyA2IC0xIDAgLTUzIC01MSAtMTE1IC0xMTN6XCIvPlxyXG48cGF0aCBkPVwiTTI5MzMgMTgwMyBjLTE1IC02IC0xOSAtMzMzIC00IC0zMzMgNDYgMCAyNTEgODggMjUxIDEwOCAwIDkgLTIyM1xyXG4yMzIgLTIzMCAyMzEgLTMgMCAtMTEgLTMgLTE3IC02elwiLz5cclxuPHBhdGggZD1cIk0xMDcwMCAzMTE5IGMtMzkwIC04NCAtNjk2IC0zNzYgLTc5NyAtNzU5IC0zMSAtMTE3IC00MSAtMjkyIC0yNFxyXG4tNDExIDMzIC0yMjcgMTUwIC00NTMgMzE4IC02MDkgMjY3IC0yNTAgNjQzIC0zNDQgOTkzIC0yNDkgMTE3IDMyIDI4MyAxMThcclxuMzgwIDE5NiA0ODcgMzk2IDUxOCAxMTI4IDY3IDE1NjAgLTk3IDkzIC0xNjYgMTQwIC0yOTAgMTk4IC0xMzcgNjQgLTIzNSA4NlxyXG4tNDA3IDkxIC0xMjAgMyAtMTYyIDAgLTI0MCAtMTd6IG00NDUgLTMxMyBjMjM4IC04MSA0MDkgLTI1OCA0ODYgLTUwNiAzMCAtOTZcclxuMzMgLTI4OSA1IC0zODggLTExMCAtNDAwIC01MTMgLTYzNyAtOTExIC01MzYgLTE0OSAzOCAtMzEzIDE0NyAtNDAyIDI2NyAtMTc2XHJcbjIzOCAtMjAzIDUzMyAtNzEgNzk3IDM0IDY5IDYwIDEwMyAxMzggMTgwIDc3IDc4IDExMSAxMDQgMTgxIDEzOSAxMjkgNjUgMjA3XHJcbjgxIDM2NCA3NyAxMDkgLTMgMTQzIC03IDIxMCAtMzB6XCIvPlxyXG48cGF0aCBkPVwiTTEwNzAzIDI3MDAgYy01NCAtMTkgLTE1MyAtNzEgLTE1MyAtODAgMCAtMyA1MSAtNTcgMTE0IC0xMTkgODAgLTgwXHJcbjExOSAtMTEyIDEzMCAtMTA4IDE0IDUgMTYgMjkgMTYgMTY3IGwwIDE2MCAtMjcgLTEgYy0xNiAwIC01MiAtOSAtODAgLTE5elwiLz5cclxuPHBhdGggZD1cIk0xMTAyMCAyNTYxIGMwIC0xMzkgMiAtMTYyIDE2IC0xNjggMjIgLTggMjQ3IDIxNiAyMzQgMjMyIC0xNyAyMFxyXG4tMTYzIDg0IC0yMDcgOTEgbC00MyA3IDAgLTE2MnpcIi8+XHJcbjxwYXRoIGQ9XCJNMTAzNjYgMjQyNCBjLTI5IC00NCAtNzYgLTE2NSAtNzYgLTE5NCAwIC0xOSA3IC0yMCAxNjUgLTIwIDEyNiAwXHJcbjE2NSAzIDE2NSAxMyAwIDcgLTUxIDYzIC0xMTQgMTI2IGwtMTE0IDExNCAtMjYgLTM5elwiLz5cclxuPHBhdGggZD1cIk0xMTMxMyAyMzQ4IGMtNjEgLTYyIC0xMDkgLTExOSAtMTA2IC0xMjUgNiAtMTUgMzMzIC0xOSAzMzMgLTQgMCA0NVxyXG4tODggMjQxIC0xMDggMjQxIC00IDAgLTU3IC01MSAtMTE5IC0xMTJ6XCIvPlxyXG48cGF0aCBkPVwiTTEwODgyIDIzMzggYy0xNyAtMTcgLTE1IC0zMiA3IC01MiAxNiAtMTQgMjMgLTE1IDQxIC02IDMxIDE3IDI0IDY0XHJcbi0xMCA2OCAtMTQgMiAtMzEgLTMgLTM4IC0xMHpcIi8+XHJcbjxwYXRoIGQ9XCJNMTA4NDYgMjE1OSBjLTY4IC04MSAxNyAtMTk0IDExMCAtMTQ0IDg5IDQ4IDU2IDE3NSAtNDYgMTc1IC0zMCAwXHJcbi00NCAtNiAtNjQgLTMxelwiLz5cclxuPHBhdGggZD1cIk0xMDY3MCAyMTI2IGMtMTkgLTIzIC04IC02MSAxOCAtNjQgNDQgLTcgNjcgMzIgMzYgNjIgLTE5IDIwIC0zOCAyMFxyXG4tNTQgMnpcIi8+XHJcbjxwYXRoIGQ9XCJNMTExMDYgMjEyNyBjLTIxIC0xNiAtMTggLTQ1IDcgLTYxIDM3IC0yMyA3NyAzNSA0MSA2MSAtMTAgNyAtMjEgMTNcclxuLTI0IDEzIC0zIDAgLTE0IC02IC0yNCAtMTN6XCIvPlxyXG48cGF0aCBkPVwiTTEwMjkwIDE5NzAgYzAgLTI5IDQzIC0xNDEgNzQgLTE5NSBsMjggLTQ4IDExNiAxMTYgYzgxIDgxIDExMyAxMjBcclxuMTA5IDEzMSAtNiAxNCAtMjkgMTYgLTE2NyAxNiAtMTUyIDAgLTE2MCAtMSAtMTYwIC0yMHpcIi8+XHJcbjxwYXRoIGQ9XCJNMTEyMDcgMTk3OCBjLTMgLTcgNDcgLTY2IDExMSAtMTMwIGwxMTYgLTExOCAyNyA0MyBjMjcgNDQgNzkgMTc3XHJcbjc5IDIwMyAwIDEyIC0yOCAxNCAtMTY0IDE0IC0xMjIgMCAtMTY2IC0zIC0xNjkgLTEyelwiLz5cclxuPHBhdGggZD1cIk0xMDg4MSAxOTAxIGMtMTQgLTI1IC01IC00OCAyMCAtNTYgMjcgLTkgNTEgMTMgNDcgNDQgLTQgMzQgLTUxIDQzXHJcbi02NyAxMnpcIi8+XHJcbjxwYXRoIGQ9XCJNMTA2NjIgMTY5NyBjLTYxIC02MiAtMTEyIC0xMTUgLTExMiAtMTE5IDAgLTIwIDIwMSAtMTA4IDI0NyAtMTA4XHJcbjEwIDAgMTMgMzQgMTMgMTY0IDAgMTQwIC0yIDE2NSAtMTYgMTcwIC05IDMgLTE2IDYgLTE3IDYgLTEgMCAtNTMgLTUxIC0xMTVcclxuLTExM3pcIi8+XHJcbjxwYXRoIGQ9XCJNMTEwMzMgMTgwMyBjLTEwIC0zIC0xMyAtNDcgLTEzIC0xNjkgMCAtOTAgNCAtMTY0IDggLTE2NCAzNiAwIDE4NlxyXG42MSAyMzkgOTggMTYgMTAgLTIxNiAyNDIgLTIzNCAyMzV6XCIvPlxyXG48L2c+XHJcbjwvc3ZnPmA7XHJcblxyXG5jb25zdCByZW5kZXJHYXJhZ2VSb3cgPSAoeyBpZCwgbmFtZSwgY29sb3IgfTogSUNhcikgPT4gYFxyXG4gIDxkaXYgY2xhc3M9XCJjYXItaGVhZGVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LWJ0bnNcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0xIHNlbGVjdC1idG5cIiBpZD1cInNlbGVjdC1jYXItJHtpZH1cIj5TZWxlY3Q8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0xIHJlbW92ZS1idG5cIiBpZD1cInJlbW92ZS1jYXItJHtpZH1cIj5SZW1vdmU8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNhci1uYW1lXCI+JHtuYW1lfTwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3MgPSBcImNhci1yb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXItY29udHJvbHNcIj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJidG4tMSBzdGFydC1lbmdpbmUtYnRuXCIgaWQ9XCJzdGFydC1lbmdpbmUtY2FyLSR7aWR9XCI+U3RhcnQ8L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJidG4tMSBzdG9wLWVuZ2luZS1idG5cIiBpZD1cInN0b3AtZW5naW5lLWNhci0ke2lkfVwiIGRpc2FibGVkPlN0b3A8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJvYWRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyXCIgaWQ9XCJjYXItJHtpZH1cIj5cclxuICAgICAgICAgICR7cmVuZGVyQ2FyKGNvbG9yKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZsYWdcIj5cclxuICAgICAgXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbmA7XHJcblxyXG5jb25zdCByZW5kZXJHYXJhZ2UgPSAoKSA9PiBgXHJcbiAgPGgxPkdhcmFnZSAodG90YWwgbnVtYmVyIG9mIGNhcnM6ICR7c3RvcmFnZS5jYXJzQ291bnR9KTwvaDE+XHJcbiAgPGgyPlBhZ2U6ICR7c3RvcmFnZS5nYXJhZ2VQYWdlfSAvICR7TWF0aC5jZWlsKHN0b3JhZ2UuY2Fyc0NvdW50IC8gY29uc3RhbnRzLmRlZmF1bHRHYXJhZ2VQYWdlTGltaXQpfTwvaDI+XHJcbiAgPHVsIGNsYXNzPVwiZ2FyYWdlXCI+XHJcbiAgJHtzdG9yYWdlLmNhcnMubWFwKChjYXIpID0+IGA8bGk+JHtyZW5kZXJHYXJhZ2VSb3coY2FyKX08L2xpPmApLmpvaW4oXCJcIil9XHJcbiAgPC91bD5cclxuYDtcclxuXHJcblxyXG5jb25zdCByZW5kZXJXaW5uZXJzID0gKCkgPT4gYFxyXG4gIDxoMT5XaW5uZXJzICh0b3RhbCBudW1iZXIgb2Ygd2lubmVyczogJHtzdG9yYWdlLndpbm5lcnNDb3VudH0pPC9oMT5cclxuICA8aDI+UGFnZTogJHtzdG9yYWdlLndpbm5lcnNQYWdlfSAvICR7TWF0aC5jZWlsKHN0b3JhZ2Uud2lubmVyc0NvdW50IC8gY29uc3RhbnRzLmRlZmF1bHRXaW5uZXJzUGFnZUxpbWl0KX08L2gyPlxyXG4gIDx0YWJsZSBjbGFzcz1cInRhYmxlXCIgY2VsbHNwYXNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiPlxyXG4gICAgPHRoZWFkPlxyXG4gICAgICA8dGg+TnVtYmVyPC90aD5cclxuICAgICAgPHRoPkNhcjwvdGg+XHJcbiAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgPHRoIGNsYXNzPVwidGFibGUtYnRuIHRhYmxlLXdpbnNcIiBpZD1cInNvcnQtYnktd2luc1wiPldpbnM8L3RoPlxyXG4gICAgICA8dGggY2xhc3M9XCJ0YWJsZS1idG4gdGFibGUtdGltZVwiIGlkPVwic29ydC1ieS10aW1lXCI+QmVzdCB0aW1lIChzZWNvbmRzKTwvdGg+XHJcbiAgICA8L3RoZWFkPlxyXG4gICAgPHRib2R5PlxyXG4gICAgICAke3N0b3JhZ2Uud2lubmVyc1xyXG4gICAgICAgIC5tYXAoXHJcbiAgICAgICAgICAod2lubmVyLCBpbmRleCkgPT4gYFxyXG4gICAgICA8dHI+XHJcbiAgICAgICAgPHRkPiR7KHN0b3JhZ2Uud2lubmVyc1BhZ2UgLSAxKSAqIGNvbnN0YW50cy5kZWZhdWx0V2lubmVyc1BhZ2VMaW1pdCArIGluZGV4ICsgMX08L3RkPlxyXG4gICAgICAgIDx0ZD4ke3JlbmRlckNhcih3aW5uZXIuY2FyLmNvbG9yKX08L3RkPlxyXG4gICAgICAgIDx0ZD4ke3dpbm5lci5jYXIubmFtZX08L3RkPlxyXG4gICAgICAgIDx0ZD4ke3dpbm5lci53aW5zfTwvdGQ+XHJcbiAgICAgICAgPHRkPiR7d2lubmVyLnRpbWV9PC90ZD5cclxuICAgICAgPC90cj5cclxuICAgIGBcclxuICAgICAgICApXHJcbiAgICAgICAgLmpvaW4oXCJcIil9XHJcbiAgICA8L3Rib2R5PlxyXG4gIDwvdGFibGU+XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgPG5hdiBjbGFzcz1cIm1lbnVcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBnYXJhZ2UtbWVudS1idG4gcHJpbWFyeVwiIGlkPVwiZ2FyYWdlLW1lbnVcIiBkaXNhYmxlZD5UbyBnYXJhZ2U8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3aW5uZXJzLW1lbnUtYnRuIHByaW1hcnlcIiBpZD1cIndpbm5lcnMtbWVudVwiPlRvIHdpbm5lcnM8L2J1dHRvbj5cclxuICAgIDwvbmF2PlxyXG4gICAgPG1haW4gaWQ9XCJnYXJhZ2Utdmlld1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwid2lubmVyLW1lc3NhZ2VcIiBpZD1cIm1lc3NhZ2VcIj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtXCIgaWQ9XCJjcmVhdGVcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgaWQ9XCJjcmVhdGUtbmFtZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9yXCIgaWQ9XCJjcmVhdGUtY29sb3JcIiBuYW1lPVwiY29sb3JcIiB0eXBlPVwiY29sb3JcIiB2YWx1ZT1cIiMwMDAwMDBcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gY3JlYXRlLXN1Ym1pdFwiIGlkPVwiY3JlYXRlLXN1Ym1pdFwiIHR5cGU9XCJzdWJtaXRcIj5DcmVhdGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtXCIgaWQ9XCJ1cGRhdGVcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgaWQ9XCJ1cGRhdGUtbmFtZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiBkaXNhYmxlZD5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9yXCIgaWQ9XCJ1cGRhdGUtY29sb3JcIiBuYW1lPVwiY29sb3JcIiB0eXBlPVwiY29sb3JcIiB2YWx1ZT1cIiMwMDAwMDBcIiBkaXNhYmxlZD5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gdXBkYXRlLWJ0blwiIGlkPVwidXBkYXRlLXN1Ym1pdFwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD5VcGRhdGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicmFjZS1jb250cm9sc1wiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gcmFjZS1idG5cIiBpZD1cInJhY2VcIj5SYWNlPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biByZXNldC1idG5cIiBpZD1cInJlc2V0XCI+UmVzZXQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGdlbmVyYXRvci1idG5cIiBpZD1cImdlbmVyYXRvclwiPkdlbmVyYXRlIGNhcnM8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgaWQ9XCJnYXJhZ2UtY2Fyc1wiPlxyXG4gICAgICAgICR7cmVuZGVyR2FyYWdlKCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9tYWluPlxyXG4gICAgPG1haW4gaWQ9XCJ3aW5uZXJzLXZpZXdcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj5cclxuICAgICAgJHtyZW5kZXJXaW5uZXJzKCl9XHJcbiAgICA8L21haW4+XHJcbiAgICA8bmF2IGNsYXNzPVwicGFnaW5hdGlvblwiPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLTEgcHJldi1idG4gcHJpbWFyeVwiIGRpc2FibGVkIGlkPVwicHJldlwiPnByZXZpb3VzPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tMSBuZXh0LWJ0biBwcmltYXJ5XCIgZGlzYWJsZWQgaWQ9XCJuZXh0XCI+bmV4dDwvYnV0dG9uPlxyXG4gICAgPC9uYXY+XHJcbiAgICBcclxuICBgO1xyXG4gIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHJvb3QuaW5uZXJIVE1MID0gdGVtcGxhdGU7XHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyb290KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQYWdlQnV0dG9uc1VwZGF0ZSgpOiB2b2lkIHtcclxuICBjb25zdCBwcmV2QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXYnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBjb25zdCBuZXh0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25leHQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBjb25zdCBnYXJhZ2VWaWV3QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhcmFnZS1tZW51JykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29uc3Qgd2lubmVyc1ZpZXdCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVycy1tZW51JykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgaWYgKHN0b3JhZ2UudmlldyA9PT0gJ2dhcmFnZScpIHtcclxuICAgIGdhcmFnZVZpZXdCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgd2lubmVyc1ZpZXdCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGlmIChzdG9yYWdlLmdhcmFnZVBhZ2UgKiBjb25zdGFudHMuZGVmYXVsdEdhcmFnZVBhZ2VMaW1pdCA8IHN0b3JhZ2UuY2Fyc0NvdW50KSB7XHJcbiAgICAgIG5leHRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5leHRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0b3JhZ2UuZ2FyYWdlUGFnZSA+IDEpIHtcclxuICAgICAgcHJldkJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcHJldkJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChzdG9yYWdlLnZpZXcgPT09ICd3aW5uZXJzJykge1xyXG4gICAgZ2FyYWdlVmlld0J0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgd2lubmVyc1ZpZXdCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgaWYgKHN0b3JhZ2Uud2lubmVyc1BhZ2UgKiBjb25zdGFudHMuZGVmYXVsdFdpbm5lcnNQYWdlTGltaXQgPCBzdG9yYWdlLndpbm5lcnNDb3VudCkge1xyXG4gICAgICBuZXh0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXh0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChzdG9yYWdlLndpbm5lcnNQYWdlID4gMSkge1xyXG4gICAgICBwcmV2QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcmV2QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNldFNvcnRPcmRlcihzb3J0OiBzdHJpbmcpIHtcclxuICBpZiAoc3RvcmFnZS5zb3J0T3JkZXIgPT09ICdhc2MnKSB7XHJcbiAgICBzdG9yYWdlLnNvcnRPcmRlciA9ICdkZXNjJztcclxuICB9IGVsc2Uge1xyXG4gICAgc3RvcmFnZS5zb3J0T3JkZXIgPSAnYXNjJztcclxuICB9XHJcbiAgc3RvcmFnZS5zb3J0ID0gc29ydDtcclxuICBhd2FpdCB3aW5uZXJzVXBkYXRlKCk7XHJcbiAgY29uc3Qgd2lubmVyc1ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVycy12aWV3JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgd2lubmVyc1ZpZXcuaW5uZXJIVE1MID0gcmVuZGVyV2lubmVycygpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gKCk6IHZvaWQge1xyXG4gIGNvbnN0IGdhcmFnZUNhcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FyYWdlLWNhcnMnKSBhcyBIVE1MRWxlbWVudDtcclxuICBjb25zdCBjcmVhdGVOYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLW5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGNvbnN0IGNyZWF0ZUNvbG9ySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLWNvbG9yJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICBjb25zdCBjcmVhdGVGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZScpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICBjb25zdCB1cGRhdGVOYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlLW5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGNvbnN0IHVwZGF0ZUNvbG9ySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlLWNvbG9yJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICBjb25zdCB1cGRhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlLXN1Ym1pdCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IHVwZGF0ZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gIGNvbnN0IHdpbm5lcnNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVycy1tZW51JykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29uc3QgZ2FyYWdlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhcmFnZS1tZW51JykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29uc3Qgd2lubmVyc1ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVycy12aWV3JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgY29uc3QgZ2FyYWdlVmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYXJhZ2UtdmlldycpIGFzIEhUTUxFbGVtZW50O1xyXG4gIGNvbnN0IGJ0blByZXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IGJ0bk5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IGJ0bkdlbmVyYXRlQ2FyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlbmVyYXRvcicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IHJhY2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFjZScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IHJhY2VSZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLW1lc3NhZ2UnKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcblxyXG4gIGxldCBzZWxlY3RlZENhcjogSUNhciB8IG51bGwgPSBudWxsO1xyXG4gIFxyXG5cclxuICAgYnRuUHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgIG1lc3NhZ2UuY2xhc3NMaXN0LnRvZ2dsZShcInZpc2libGVcIiwgZmFsc2UpO1xyXG4gICAgaWYgKHN0b3JhZ2UudmlldyA9PT0gJ2dhcmFnZScpIHtcclxuICAgICAgc3RvcmFnZS5nYXJhZ2VQYWdlIC09IDE7XHJcbiAgICAgIGF3YWl0IGdhcmFnZVVwZGF0ZSgpO1xyXG4gICAgICBQYWdlQnV0dG9uc1VwZGF0ZSgpO1xyXG4gICAgICBnYXJhZ2VDYXJzLmlubmVySFRNTCA9IHJlbmRlckdhcmFnZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcmFnZS53aW5uZXJzUGFnZSAtPSAxO1xyXG4gICAgICBhd2FpdCB3aW5uZXJzVXBkYXRlKCk7XHJcbiAgICAgIFBhZ2VCdXR0b25zVXBkYXRlKCk7XHJcbiAgICAgIHdpbm5lcnNWaWV3LmlubmVySFRNTCA9IHJlbmRlcldpbm5lcnMoKTtcclxuICAgIH1cclxuICAgfSlcclxuXHJcbiAgIGJ0bk5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICBtZXNzYWdlLmNsYXNzTGlzdC50b2dnbGUoXCJ2aXNpYmxlXCIsIGZhbHNlKTtcclxuICAgIGlmIChzdG9yYWdlLnZpZXcgPT09ICdnYXJhZ2UnKSB7XHJcbiAgICAgIHN0b3JhZ2UuZ2FyYWdlUGFnZSArPSAxO1xyXG4gICAgICBhd2FpdCBnYXJhZ2VVcGRhdGUoKTtcclxuICAgICAgUGFnZUJ1dHRvbnNVcGRhdGUoKTtcclxuICAgICAgZ2FyYWdlQ2Fycy5pbm5lckhUTUwgPSByZW5kZXJHYXJhZ2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3JhZ2Uud2lubmVyc1BhZ2UgKz0gMTtcclxuICAgICAgYXdhaXQgd2lubmVyc1VwZGF0ZSgpO1xyXG4gICAgICBQYWdlQnV0dG9uc1VwZGF0ZSgpO1xyXG4gICAgICB3aW5uZXJzVmlldy5pbm5lckhUTUwgPSByZW5kZXJXaW5uZXJzKCk7XHJcbiAgICB9XHJcbiAgIH0pXHJcbiAgICBcclxuICAgIGJ0bkdlbmVyYXRlQ2FyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBidG5HZW5lcmF0ZUNhci5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIGNvbnN0IGNhcnMgPSBnZW5lcmF0ZUNhcnMoY29uc3RhbnRzLmRlZmF1bHROdW1iZXJHZW5lcmF0ZUNhcik7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGNhcnMubWFwKGFzeW5jIChjYXIpID0+IGNyZWF0ZUNhcihjYXIpKSk7XHJcbiAgICAgIGF3YWl0IGdhcmFnZVVwZGF0ZSgpO1xyXG4gICAgICBQYWdlQnV0dG9uc1VwZGF0ZSgpO1xyXG4gICAgICBnYXJhZ2VDYXJzLmlubmVySFRNTCA9IHJlbmRlckdhcmFnZSgpO1xyXG4gICAgICBidG5HZW5lcmF0ZUNhci5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfSlcclxuXHJcbiAgICB3aW5uZXJzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC50b2dnbGUoXCJ2aXNpYmxlXCIsIGZhbHNlKTtcclxuICAgICAgc3RvcmFnZS52aWV3ID0gJ3dpbm5lcnMnO1xyXG4gICAgICBnYXJhZ2VWaWV3LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgIHdpbm5lcnNWaWV3LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICBhd2FpdCB3aW5uZXJzVXBkYXRlKCk7XHJcbiAgICAgIHdpbm5lcnNWaWV3LmlubmVySFRNTCA9IHJlbmRlcldpbm5lcnMoKTtcclxuICAgICAgUGFnZUJ1dHRvbnNVcGRhdGUoKTtcclxuICAgICAgcmFjZVJlc2V0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgc3RvcmFnZS5jYXJzLm1hcCgoeyBpZCB9KSA9PiBzdG9wRHJpdmUoaWQpKTtcclxuICAgICAgcmFjZUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfSlcclxuXHJcbiAgICBnYXJhZ2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIFxyXG4gICAgICBjb25zb2xlLmxvZygnY2xpY2snKTtcclxuICAgICAgc3RvcmFnZS52aWV3ID0gJ2dhcmFnZSc7XHJcbiAgICAgIGdhcmFnZVZpZXcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIHdpbm5lcnNWaWV3LnN0eWxlLmRpc3BsYXkgPSAgJ25vbmUnO1xyXG4gICAgICBQYWdlQnV0dG9uc1VwZGF0ZSgpO1xyXG4gICAgfSlcclxuXHJcbiAgICByYWNlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnc3RhcnQnKTtcclxuICAgICAgcmFjZUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIGNvbnN0IHdpbm5lciA9IGF3YWl0IHJhY2UoKTtcclxuICAgICAgY29uc3QgbmFtZSA9IChhd2FpdCBnZXRDYXIod2lubmVyLmlkKSkubmFtZTtcclxuICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBgVGhlIHdpbm5lciBpcyAke25hbWV9IHdpdGggKCR7d2lubmVyLnRpbWV9cykhYDtcclxuICAgICAgbWVzc2FnZS5jbGFzc0xpc3QudG9nZ2xlKFwidmlzaWJsZVwiLCB0cnVlKTtcclxuICAgICAgYXdhaXQgc2F2ZVdpbm5lcih3aW5uZXIpO1xyXG4gICAgICB3aW5uZXJzVXBkYXRlKCk7XHJcbiAgICAgIHJhY2VSZXNldEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICBcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByYWNlUmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHJhY2VSZXNldEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIHN0b3JhZ2UuY2Fycy5tYXAoKHsgaWQgfSkgPT4gc3RvcERyaXZlKGlkKSk7XHJcbiAgICAgIHJhY2VCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgbWVzc2FnZS5jbGFzc0xpc3QudG9nZ2xlKFwidmlzaWJsZVwiLCBmYWxzZSk7XHJcbiAgICB9KTsgICBcclxuXHJcbiAgICBjcmVhdGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zb2xlLmxvZygnY3JlYXRlJyk7XHJcbiAgICAgIGlmIChjcmVhdGVOYW1lSW5wdXQudmFsdWUpIHtcclxuICAgICAgICBjb25zdCBib2R5Q2FyID0ge1xyXG4gICAgICAgICAgbmFtZTogY3JlYXRlTmFtZUlucHV0LnZhbHVlLFxyXG4gICAgICAgICAgY29sb3I6IGNyZWF0ZUNvbG9ySW5wdXQudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGF3YWl0IGNyZWF0ZUNhcihib2R5Q2FyKTtcclxuICAgICAgICBhd2FpdCBnYXJhZ2VVcGRhdGUoKTtcclxuICAgICAgICBnYXJhZ2VDYXJzLmlubmVySFRNTCA9IHJlbmRlckdhcmFnZSgpO1xyXG4gICAgICAgIGNyZWF0ZU5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNyZWF0ZUNvbG9ySW5wdXQudmFsdWUgPSAnIzAwMDAwMCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ3Bhc3RlIG5hbWUgY2FyIScpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICAgIGlmKGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLWJ0bicpKXtcclxuICAgICAgICBjb25zdCBpZCA9ICtldmVudFRhcmdldC5pZC5zcGxpdCgncmVtb3ZlLWNhci0nKVsxXTtcclxuICAgICAgICBhd2FpdCBkZWxldGVDYXIoaWQpO1xyXG4gICAgICAgIGF3YWl0IGRlbGV0ZVdpbm5lcihpZCk7XHJcbiAgICAgICAgYXdhaXQgZ2FyYWdlVXBkYXRlKCk7XHJcbiAgICAgICAgZ2FyYWdlQ2Fycy5pbm5lckhUTUwgPSByZW5kZXJHYXJhZ2UoKTtcclxuICAgICAgICBQYWdlQnV0dG9uc1VwZGF0ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZXZlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QtYnRuJykpe1xyXG4gICAgICAgIHNlbGVjdGVkQ2FyID0gYXdhaXQgZ2V0Q2FyKCtldmVudFRhcmdldC5pZC5zcGxpdCgnc2VsZWN0LWNhci0nKVsxXSk7XHJcbiAgICAgICAgdXBkYXRlTmFtZUlucHV0LnZhbHVlID0gc2VsZWN0ZWRDYXIubmFtZTtcclxuICAgICAgICB1cGRhdGVDb2xvcklucHV0LnZhbHVlID0gc2VsZWN0ZWRDYXIuY29sb3I7XHJcbiAgICAgICAgdXBkYXRlTmFtZUlucHV0LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdXBkYXRlQ29sb3JJbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHVwZGF0ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZXZlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGFydC1lbmdpbmUtYnRuJykpe1xyXG4gICAgICAgIGNvbnN0IGlkID0gK2V2ZW50VGFyZ2V0LmlkLnNwbGl0KCdzdGFydC1lbmdpbmUtY2FyLScpWzFdO1xyXG5cclxuICAgICAgICBhd2FpdCBzdGFydERyaXZlKGlkKTtcclxuICAgICAgfSBcclxuICAgICAgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc3RvcC1lbmdpbmUtYnRuJykpe1xyXG4gICAgICAgIGNvbnN0IGlkID0gK2V2ZW50VGFyZ2V0LmlkLnNwbGl0KCdzdG9wLWVuZ2luZS1jYXItJylbMV07XHJcbiAgICAgICAgYXdhaXQgc3RvcERyaXZlKGlkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdXBkYXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBib2R5Q2FyID0ge1xyXG4gICAgICAgICAgbmFtZTogdXBkYXRlTmFtZUlucHV0LnZhbHVlLFxyXG4gICAgICAgICAgY29sb3I6IHVwZGF0ZUNvbG9ySW5wdXQudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgdXBkYXRlQ2FyKCtldmVudFRhcmdldC5pZC5zcGxpdCgnc2VsZWN0LWNhci0nKVsxXSwgYm9keUNhcik7XHJcbiAgICAgICAgYXdhaXQgZ2FyYWdlVXBkYXRlKCk7XHJcbiAgICAgICAgdXBkYXRlTmFtZUlucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB1cGRhdGVOYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICB1cGRhdGVDb2xvcklucHV0LnZhbHVlID0gJyMwMDAwMDAnO1xyXG4gICAgICAgIHVwZGF0ZUNvbG9ySW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHVwZGF0ZUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc2VsZWN0ZWRDYXIgPSBudWxsO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFibGUtd2lucycpKXtcclxuICAgICAgICBhd2FpdCBzZXRTb3J0T3JkZXIoJ3dpbnMnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZWVlJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFibGUtdGltZScpKXtcclxuICAgICAgIGF3YWl0IHNldFNvcnRPcmRlcigndGltZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdmZWZlJyk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9KVxyXG4gICAgICBcclxufSAgXHJcblxyXG5cclxuXHJcblxyXG4iLCJleHBvcnQgY29uc3QgY2FyQnJhbmRzOiBBcnJheTxzdHJpbmc+ID0gW1xyXG4gIFwiQXVkaVwiLFxyXG4gIFwiQWxmYSBSb21lb1wiLFxyXG4gIFwiQWxwaW5hXCIsXHJcbiAgXCJBc3RvbiBNYXJ0aW5cIixcclxuICBcIkF4b25cIixcclxuICBcIkZvcmRcIixcclxuICBcIkZlcnJhcmlcIixcclxuICBcIkZpYXRcIixcclxuICBcIkdBWlwiLFxyXG4gIFwiR01DXCIsXHJcbiAgXCJIb25kYVwiLFxyXG4gIFwiSHVtbWVyXCIsXHJcbiAgXCJIeXVuZGFpXCIsXHJcbiAgXCJJbmZpbml0aVwiLFxyXG4gIFwiSXN1enVcIixcclxuICBcIkpBQ1wiLFxyXG4gIFwiSmFndWFyXCIsXHJcbiAgXCJKZWVwXCIsXHJcbiAgXCJLYW1helwiLFxyXG4gIFwiTGFkYVwiLFxyXG4gIFwiTGV4dXNcIixcclxuICBcIkxvdHVzXCIsXHJcbiAgXCJNQU5cIixcclxuICBcIk1heWJhY2hcIixcclxuICBcIk1BWlwiLFxyXG4gIFwiTWF6ZGFcIixcclxuICBcIk1jTGFyZW5cIixcclxuICBcIk5pc3NhblwiLFxyXG4gIFwiT3BlbFwiLFxyXG4gIFwiUGFjY2FyXCIsXHJcbiAgXCJQYWdhbmlcIixcclxuICBcIlBvbnRpYWNcIixcclxuICBcIlBvcnNjaGVcIixcclxuICBcIlJlbmF1bHRcIixcclxuICBcIsWga29kYVwiLFxyXG4gIFwiU21hcnRcIixcclxuICBcIlN1YmFydVwiLFxyXG4gIFwiU3V6dWtpXCIsXHJcbiAgXCJUZXNsYVwiLFxyXG4gIFwiVG95b3RhXCIsXHJcbiAgXCJVQVpcIixcclxuICBcIlZvbHZvXCIsXHJcbiAgXCJaQVpcIixcclxuICBcIlhQZW5nXCIsXHJcbiAgXCJUVlJcIixcclxuICBcIlNhYWJcIixcclxuICBcIlJBTVwiLFxyXG4gIFwiQ2hldnJvbGV0XCIsXHJcbiAgXCJNYXp6YW50aVwiLFxyXG4gIFwiRGFld29vXCIsXHJcbiAgXCJaYXBvcm96aGV0c1wiLFxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNhck1vZGVsczogQXJyYXk8c3RyaW5nPiA9IFtcclxuICBcIkdyYW4gVHVyaXNtb1wiLFxyXG4gIFwiUlNcIixcclxuICBcIlJvYWRzdGVyXCIsXHJcbiAgXCJTXCIsXHJcbiAgXCJYXCIsXHJcbiAgXCIzXCIsXHJcbiAgXCJZXCIsXHJcbiAgXCJDeWJlcnRydWNrXCIsXHJcbiAgXCJYNVwiLFxyXG4gIFwiWDdcIixcclxuICBcIlgzXCIsXHJcbiAgXCJYNlwiLFxyXG4gIFwiR1Q0XCIsXHJcbiAgXCJGWFhcIixcclxuICBcIjU5OSBHVE9cIixcclxuICBcIkVuem9cIixcclxuICBcIjQ1OCBJdGFsaWFcIixcclxuICBcIjI1MCBHVE9cIixcclxuICBcIlByaW9yYVwiLFxyXG4gIFwiNHg0XCIsXHJcbiAgXCJSaW9cIixcclxuICBcIkZvY3VzXCIsXHJcbiAgXCJLYWxpbmFcIixcclxuICBcIlZlc3RhXCIsXHJcbiAgXCJTcGFya1wiLFxyXG4gIFwiTGFjZXR0aVwiLFxyXG4gIFwiTmV4aWFcIixcclxuICBcIk1hdGl6XCIsXHJcbiAgXCJDb2JhbHRcIixcclxuICBcIkNhcHRpdmFcIixcclxuICBcIkE3XCIsXHJcbiAgXCJBNVwiLFxyXG4gIFwiQTNcIixcclxuICBcIkE4XCIsXHJcbiAgXCJUVFwiLFxyXG4gIFwiQ29yb2xsYVwiLFxyXG4gIFwiQ2FtcnlcIixcclxuICBcIlJBVjRcIixcclxuICBcIkltcHJlemFcIixcclxuICBcIldSWFwiLFxyXG4gIFwiRVNcIixcclxuICBcIkxTXCIsXHJcbiAgXCJSWFwiLFxyXG4gIFwiR1hcIixcclxuICBcIkxYXCIsXHJcbiAgXCJHU1wiLFxyXG4gIFwiTEM1MDBcIixcclxuICBcIkdhbGxhcmRvXCIsXHJcbiAgXCJBdmVudGFkb3JcIixcclxuICBcIjkxMVwiLFxyXG4gIFwiQ2F5ZW5uZVwiLFxyXG4gIFwiRlgzN1wiLFxyXG5dOyIsImV4cG9ydCBjb25zdCBjb25zdGFudHMgPSB7XHJcbiAgZGVmYXVsdEdhcmFnZVBhZ2U6IDEsXHJcbiAgZGVmYXVsdFdpbm5lcnNQYWdlOiAxLFxyXG4gIGRlZmF1bHRHYXJhZ2VQYWdlTGltaXQ6IDcsXHJcbiAgZGVmYXVsdE51bWJlckdlbmVyYXRlQ2FyOiAxMDAsXHJcbiAgZGVmYXVsdFdpbm5lcnNQYWdlTGltaXQ6IDEwXHJcbn1cclxuXHJcbmNvbnN0IGJhc2UgPSAnaHR0cDovLzEyNy4wLjAuMTozMDAwJztcclxuXHJcbmV4cG9ydCBjb25zdCBwYXRoID0ge1xyXG4gIGdhcmFnZTogYCR7YmFzZX0vZ2FyYWdlYCxcclxuICBlbmdpbmU6IGAke2Jhc2V9L2VuZ2luZWAsXHJcbiAgd2lubmVyczogYCR7YmFzZX0vd2lubmVyc2AsXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IHN0YXJ0RW5naW5lLCBzdG9wRW5naW5lLCBzd2l0Y2hDYXJUb0RyaXZlIH0gZnJvbSBcIi4vYXBpXCI7XHJcbmltcG9ydCB7IElTdGFydERyaXZlLCBJUmFjZSB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydERyaXZlKGlkOm51bWJlcik6IFByb21pc2U8SVN0YXJ0RHJpdmU+e1xyXG4gIGNvbnN0IHN0b3BCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3RvcC1lbmdpbmUtY2FyLSR7aWR9YCkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3RhcnQtZW5naW5lLWNhci0ke2lkfWApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IGNhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjYXItJHtpZH1gKSBhcyBIVE1MRWxlbWVudDtcclxuICBzdG9wQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgc3RhcnRCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gIGNvbnN0IHsgdmVsb2NpdHksIGRpc3RhbmNlIH0gPSBhd2FpdCBzdGFydEVuZ2luZShpZCk7XHJcbiAgY29uc3QgdGltZSA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyB2ZWxvY2l0eSk7XHJcbiAgY2FyLnN0eWxlLmFuaW1hdGlvbk5hbWUgPSAnYW5pbWF0aW9uLWNhcic7XHJcbiAgY2FyLnN0eWxlLmFuaW1hdGlvbkR1cmF0aW9uID0gYCR7dGltZS50b1N0cmluZygpfW1zYDtcclxuICBjb25zdCB7c3VjY2Vzc30gPSBhd2FpdCBzd2l0Y2hDYXJUb0RyaXZlKGlkKTtcclxuICBpZiAoIXN1Y2Nlc3Mpe1xyXG4gICAgY2FyLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdwYXVzZWQnO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyh7c3VjY2VzcywgaWQsIHRpbWV9KTtcclxuICByZXR1cm4ge3N1Y2Nlc3MsIGlkLCB0aW1lfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RvcERyaXZlKGlkOm51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gIGNvbnN0IHN0b3BCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3RvcC1lbmdpbmUtY2FyLSR7aWR9YCkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3RhcnQtZW5naW5lLWNhci0ke2lkfWApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGNvbnN0IGNhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjYXItJHtpZH1gKSBhcyBIVE1MRWxlbWVudDtcclxuICBzdG9wQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICBzdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIGF3YWl0IHN0b3BFbmdpbmUoaWQpO1xyXG4gIGNhci5zdHlsZS5hbmltYXRpb25OYW1lID0gXCJub25lXCI7XHJcbiAgY2FyLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9IFwiaW5pdGlhbFwiO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmFjZSgpOiBQcm9taXNlPElSYWNlPiAge1xyXG4gIGNvbnN0IHByb21pc2UgPSBzdG9yYWdlLmNhcnMubWFwKCh7aWR9KSA9PiBzdGFydERyaXZlKGlkKSk7XHJcbiAgY29uc3QgY2FycyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2UpO1xyXG4gIGNvbnN0IGNhcnNTdWNjZXNzID0gY2Fycy5maWx0ZXIoZWwgPT4gZWwuc3VjY2Vzcykuc29ydCgoYSxiKSA9PiBhLnRpbWUgLSBiLnRpbWUpO1xyXG4gIGNvbnN0IFtpZCAsIHRpbWVdID0gW2NhcnNTdWNjZXNzWzBdLmlkLCBjYXJzU3VjY2Vzc1swXS50aW1lXTsgXHJcbiAgcmV0dXJuIHtpZCAsIHRpbWU6ICsodGltZSAvIDEwMDApLnRvRml4ZWQoMil9XHJcbn0iLCJpbXBvcnQgeyBjYXJCcmFuZHMsIGNhck1vZGVscyB9IGZyb20gXCIuL2NhckRhdGFcIjtcclxuaW1wb3J0IHsgSUNhckNyZWF0ZSB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlQ29sb3IoKTogc3RyaW5nIHtcclxuICByZXR1cm4gXCIjXCIgKyAoXCIwMDAwMFwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5wb3coMTYsIDYpKS50b1N0cmluZygxNikpLnNsaWNlKC02KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVOYW1lKCk6IHN0cmluZyB7XHJcbiAgY29uc3QgbW9kZWwgPSBjYXJCcmFuZHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2FyQnJhbmRzLmxlbmd0aCldO1xyXG4gIGNvbnN0IG5hbWUgPSBjYXJNb2RlbHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2FyTW9kZWxzLmxlbmd0aCldO1xyXG4gIHJldHVybiBgJHttb2RlbH0gJHtuYW1lfWBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ2Fycyhjb3VudDogbnVtYmVyKTogSUNhckNyZWF0ZVtdIHtcclxuICByZXR1cm4gbmV3IEFycmF5KGNvdW50KS5maWxsKDApLm1hcCgoKSA9PiAoeyBuYW1lOiBnZW5lcmF0ZU5hbWUoKSwgY29sb3I6IGdlbmVyYXRlQ29sb3IoKSB9KSk7XHJcbn0iLCJpbXBvcnQgeyBJU3RvcmFnZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGNvbnN0YW50cyB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBzdG9yYWdlOiBJU3RvcmFnZSA9IHtcclxuICBnYXJhZ2VQYWdlOiBjb25zdGFudHMuZGVmYXVsdEdhcmFnZVBhZ2UsXHJcbiAgd2lubmVyc1BhZ2U6IGNvbnN0YW50cy5kZWZhdWx0V2lubmVyc1BhZ2UsXHJcbiAgY2FyczogW10sXHJcbiAgd2lubmVyczogW10sXHJcbiAgY2Fyc0NvdW50OiAwLFxyXG4gIHdpbm5lcnNDb3VudDogMCxcclxuICB2aWV3OiBcImdhcmFnZVwiLFxyXG4gIHNvcnQ6IFwidGltZVwiLFxyXG4gIHNvcnRPcmRlcjogXCJhc2NcIixcclxufTtcclxuIiwiaW1wb3J0IHsgYWRkTGlzdGVuZXJzLCBnYXJhZ2VVcGRhdGUsIFBhZ2VCdXR0b25zVXBkYXRlLCByZW5kZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL2FwcFwiO1xyXG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0KCkge1xyXG4gIGF3YWl0IGdhcmFnZVVwZGF0ZSgpO1xyXG4gIGF3YWl0IHJlbmRlcigpO1xyXG4gIFBhZ2VCdXR0b25zVXBkYXRlKCk7XHJcbiAgYWRkTGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbmluaXQoKTtcclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==