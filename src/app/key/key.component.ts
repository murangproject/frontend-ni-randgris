import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomStatus } from './key.model';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './key.component.html',
  styles: [
  ]
})
export class KeyComponent implements OnInit{
  @Output() handleClick = new EventEmitter<string>();
  @Input() statusInput: RoomStatus = RoomStatus.AVAILABLE;
  @Input() roomId: string = '';
  @Input() roomName: string = '';
  status: RoomStatus = RoomStatus.AVAILABLE;
  id: string = '';
  room: string = '';

  constructor() { }

  ngOnInit(): void {
    this.status = this.statusInput;
    this.room = this.roomName;
    this.id = this.roomId;
  }

  onClick() {
    this.handleClick.emit(this.id);
  }

}
