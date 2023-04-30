import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyComponent } from '../key/key.component';

@Component({
  selector: 'app-keys',
  standalone: true,
  imports: [CommonModule, KeyComponent],
  templateUrl: './keys.component.html',
  styles: [
  ]
})
export class KeysComponent {
  roomKeyModalState: boolean = false;

  constructor() { }

  openRoomKeyModal() {
    this.roomKeyModalState = true;
  }

  closeRoomKeyModal() {
    this.roomKeyModalState = false;
  }
}
