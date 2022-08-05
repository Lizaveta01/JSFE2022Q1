import { startEngine, stopEngine, switchCarToDrive } from "./api";
import { IStartDrive, IRace } from "./interfaces";
import { storage } from "./storage";

export async function startDrive(id:number): Promise<IStartDrive>{
  const stopBtn = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  const startBtn = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  stopBtn.disabled = false;
  startBtn.disabled = true;
  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);
  car.style.animationName = 'animation-car';
  car.style.animationDuration = `${time.toString()}ms`;
  const {success} = await switchCarToDrive(id);
  if (!success){
    car.style.animationPlayState = 'paused';
  }
  console.log({success, id, time});
  return {success, id, time}
}

export async function stopDrive(id:number): Promise<void> {
  const stopBtn = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  const startBtn = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  stopBtn.disabled = true;
  startBtn.disabled = false;
  await stopEngine(id);
  car.style.animationName = "none";
  car.style.animationPlayState = "initial";
}

export async function race(): Promise<IRace>  {
  const promise = storage.cars.map(({id}) => startDrive(id));
  const cars = await Promise.all(promise);
  const carsSuccess = cars.filter(el => el.success).sort((a,b) => a.time - b.time);
  const [id , time] = [carsSuccess[0].id, carsSuccess[0].time]; 
  return {id , time: +(time / 1000).toFixed(2)}
}