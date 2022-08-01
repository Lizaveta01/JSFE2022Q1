import { startEngine, stopEngine, switchCarToDrive } from "./api";

export async function startDrive(id:number){
  const stopBtn = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  const startBtn = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  stopBtn.disabled = false;
  startBtn.disabled = true;
  const { velocity, distance } = await startEngine(id);
  const time = distance / velocity;
  
}

export async function stopDrive(id:number){
  await stopEngine(id);

}