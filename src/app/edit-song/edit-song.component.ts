import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, switchMap } from 'rxjs';
import { BonetaRoutes } from '../shared/enums/boneta-routes.enum';
import { Song } from '../shared/models/song.model';
import { SongsActions } from '../shared/states/songs/songs.actions';
import { selectSong } from '../shared/states/songs/songs.selectors';

@Component({
  selector: 'bnt-edit-song',
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
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss'],
})
export class EditSongComponent implements OnInit, OnDestroy {
  songGroup = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    author: new FormControl(''),
    lyrics: new FormControl(''),
  });

  private song: Song | undefined;
  private destroyed = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.store.select(selectSong(+(params.get('songId') as string)))
        )
      )
      .subscribe((song: Song | undefined) => {
        this.songGroup.controls.title.setValue(song?.title ?? '');
        this.songGroup.controls.author.setValue(song?.author ?? '');
        this.songGroup.controls.lyrics.setValue(song?.lyrics ?? '');
        this.song = song;
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onSubmit(): void {
    this.store.dispatch(
      SongsActions.editSong({
        song: {
          id: this.song?.id ?? 0,
          title: this.songGroup.controls.title.value,
          author: this.songGroup.controls.author.value || undefined,
          lyrics: this.songGroup.controls.lyrics.value || undefined,
        },
      })
    );
    this.songGroup.reset();
  }

  goBack(): void {
    this.router.navigate([BonetaRoutes.Songs]);
  }
}
