import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BonetaRoutes } from '../shared/enums/boneta-routes.enum';
import { SongsActions } from '../shared/states/songs/songs.actions';

@Component({
  selector: 'bnt-add-song',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
  ],
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
})
export class AddSongComponent {
  songGroup = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    author: new FormControl(''),
    lyrics: new FormControl(''),
  });

  constructor(private readonly router: Router, private readonly store: Store) {}

  onSubmit(): void {
    this.store.dispatch(
      SongsActions.addSong({
        song: {
          title: this.songGroup.value.title,
          author: this.songGroup.value.author ?? undefined,
          lyrics: this.songGroup.value.lyrics ?? undefined,
        },
      })
    );
    this.songGroup.reset();
  }

  goBack(): void {
    this.router.navigate([BonetaRoutes.Songs]);
  }
}
