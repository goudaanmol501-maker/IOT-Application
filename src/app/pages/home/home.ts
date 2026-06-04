import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { Nav } from '../../component/nav/nav';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [Nav, NgFor, NgClass, NgIf],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  
    stats = [
    { label: 'Total Devices', value: 12, icon: '📱', color: 'bg-blue-500' },
    { label: 'Online',        value: 8,  icon: '🟢', color: 'bg-green-500' },
    { label: 'Offline',       value: 3,  icon: '🔴', color: 'bg-red-500' },
    { label: 'Alerts',        value: 1,  icon: '⚠️', color: 'bg-yellow-500' },
  ];
  devices = [
    { id: 1, name: 'Living Room Light',  type: 'Light',       status: 'online',  icon: '💡', location: 'Living Room', temp: null },
    { id: 2, name: 'AC Unit',            type: 'Thermostat',  status: 'online',  icon: '❄️', location: 'Bedroom',     temp: '22°C' },
    { id: 3, name: 'Front Door Lock',    type: 'Security',    status: 'online',  icon: '🔒', location: 'Entrance',    temp: null },
    { id: 4, name: 'Kitchen Sensor',     type: 'Sensor',      status: 'offline', icon: '🌡️', location: 'Kitchen',     temp: null },
    { id: 5, name: 'Garden Sprinkler',   type: 'Sprinkler',   status: 'offline', icon: '💧', location: 'Garden',      temp: null },
    { id: 6, name: 'Security Camera',   type: 'Camera',      status: 'online',  icon: '📷', location: 'Garage',      temp: null },
  ];

  toggleDevice(device: any) {
    device.status = device.status === 'online' ? 'offline' : 'online';
  }
}
