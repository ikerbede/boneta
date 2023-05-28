import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Song } from '../shared/models/song.model';

@Component({
  selector: 'bnt-songs',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsComponent {
  @Input() songs: readonly Song[] = [];
  @Output() songSelected = new EventEmitter<number>();

  selectSong(songId: number): void {
    this.songSelected.emit(songId);
  }
}
