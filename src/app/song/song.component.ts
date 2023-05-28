import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { BonetaRoutes } from '../shared/enums/boneta-routes.enum';
import { Song } from '../shared/models/song.model';
import { selectSong } from '../shared/states/songs/songs.selectors';

@Component({
  selector: 'bnt-song',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent {
  song$: Observable<Song>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.song$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.store.select(selectSong(+(params.get('songId') as string)))
      )
    ) as Observable<Song>;
  }

  goBack(): void {
    this.router.navigate([BonetaRoutes.Songs]);
  }

  editSong(): void {
    this.router.navigate([BonetaRoutes.Edit], { relativeTo: this.route });
  }
}
