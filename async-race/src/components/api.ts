/* eslint-disable @typescript-eslint/no-explicit-any */

import { constants, path } from "./constants";
import { ICar, ICarCreate, ICarSpeed, IWinner, IRace } from "./interfaces";


// ----------------CARS------------------------
export const getCars = async (
  page: number,
  limit = constants.defaultGaragePageLimit
  ): Promise<{items:ICar[]; count: number}> => {
  const response = await fetch(`${path.garage}?_page=${page}&_limit=${limit}`);
  
  return {
    items: await response.json(),
    count: Number(response.headers.get('X-Total-Count')),
  };
}

export const getCar = async (id: number): Promise<ICar> => {
  return (await fetch(`${path.garage}/${id}`)).json();
}

export const createCar = async (body: ICarCreate): Promise<ICar> => 
  (await fetch (path.garage, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  },
})).json();

  
export const deleteCar = async (id:number): Promise<void> => (
  await fetch(`${path.garage}/${id}`, {method: 'DELETE'})).json();
  
export const updateCar = async (id:number, body:ICarCreate): Promise<void> => 
  (await fetch (`${path.garage}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  },
})).json();

// ----------------ENGINE------------------------
export const startEngine = async (id:number): Promise<ICarSpeed> => 
(await fetch(`${path.engine}?id=${id}&status=started`, { method: "PATCH" })).json();

export const stopEngine = async (id:number):  Promise<ICarSpeed> => 
(await fetch(`${path.engine}?id=${id}&status=stopped`, { method: "PATCH" })).json();


// не понимаю хачем здесь catch и потом вывод 
export const switchCarToDrive = async (id:number) => {
  const res = await fetch(`${path.engine}?id=${id}&status=drive`).catch();
  res.status !== 200 ? { success: false } : { ...(await res.json())}; // вывод
}


// ----------------WINNERS------------------------

const getSortOrder = (sort:string, order:string): string => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
}

//! Непонятно с промис олл
export const getWinners = async ({page, limit = constants.defaultWinnersPage, sort, order}: {page: number;
  limit: number;
  sort: string;
  order: string;
}): Promise<{ items: IWinner[]; count: number }> => {
  const res = await fetch(`${path.winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await res.json();

  return {
    items: await Promise.all(
      items.map(async (winner: { id: number }) => ({ ...winner, car: await getCar(winner.id) }))
    ),
    count: Number(res.headers.get('X-Total-Count')),
  }
}

export const getWinner = async (id: number): Promise<IWinner> =>
(await fetch(`${path.winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> =>
(await fetch(`${path.winners}/${id}`)).status;

export const deleteWinner = async (id:number): Promise<void> => 
(await fetch(`${path.winners}/${id}`, {method: 'DELETE'})).json();
  
export const createWinner = async  (body: { id: number | undefined; wins: number; time: number }): Promise<void> =>
 (await fetch (path.winners, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  },
})).json();

export const updateWinner = async (id:number, body: { id: number | undefined; wins: number; time: number }): Promise<void> =>
(await fetch (`${path.winners}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  },
})).json();

export const saveWinner = async ({id, time }: IRace): Promise<void> => {
  
  const winnerStatus = await getWinnerStatus(id);
  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    })
  } else {
    const winner = await getWinner(id);
    await updateWinner(id,{
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
}