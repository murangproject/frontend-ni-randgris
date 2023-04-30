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
  @Output() handleClick = new EventEmitter<number>();
  @Input() roomStatus: RoomStatus = RoomStatus.BORROWED;
  @Input() roomId: number = -1;
  @Input() roomName: string = '';

  status: RoomStatus = RoomStatus.AVAILABLE;
  id: number = -1;
  room: string = '';

  constructor() { }

  ngOnInit(): void {
    this.status = this.roomStatus;
    this.room = this.roomName;
    this.id = this.roomId;
  }

  onClick() {
    this.handleClick.emit(this.id);
  }

}
