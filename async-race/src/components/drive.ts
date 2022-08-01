import { startEngine, stopEngine, switchCarToDrive } from "./api";

export async function startDrive(id:number){
  const stopBtn = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  const startBtn = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  stopBtn.disabled = false;
  startBtn.disabled = true;
  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);
  console.log(time);
  car.style.animationName = 'animation-car';
  car.style.animationDuration = `${time.toString()}ms`;
  const {success} = await switchCarToDrive(id);
  console.log (success);
  if (!success){
    car.style.animationPlayState = 'paused';
  }
}

export async function stopDrive(id:number){
  const stopBtn = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  const startBtn = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  stopBtn.disabled = true;
  startBtn.disabled = false;
  await stopEngine(id);
  car.style.animationName = "none";
  car.style.animationPlayState = "initial";
}