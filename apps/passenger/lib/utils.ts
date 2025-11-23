import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time: string): string {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function calculateEstimatedArrival(departureTime: string, duration: number): string {
  const departure = new Date(`2000-01-01T${departureTime}`);
  departure.setMinutes(departure.getMinutes() + duration);
  return departure.toTimeString().slice(0, 5);
}

export function getBusTypeColor(busType: string): string {
  switch (busType) {
    case 'ANBESSA':
      return 'bg-blue-100 text-blue-800';
    case 'SHEGER':
      return 'bg-green-100 text-green-800';
    case 'VELOCITY':
      return 'bg-purple-100 text-purple-800';
    case 'PRIVATE':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'ON_ROUTE':
      return 'bg-green-100 text-green-800';
    case 'DELAYED':
      return 'bg-yellow-100 text-yellow-800';
    case 'UNDER_MAINTENANCE':
      return 'bg-red-100 text-red-800';
    case 'OUT_OF_SERVICE':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}