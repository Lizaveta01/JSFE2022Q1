import { getCars } from "./api";
import { storage } from "./storage";

export async function garageUpdate(): Promise<void> {
  const carInfo = await getCars(storage.garagePage);
  storage.carsCount = carInfo.count;
  storage.cars = carInfo.items;
}