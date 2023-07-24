import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BottomNavComponent } from '@ikerbede/shared';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BonetaRoutes } from '../shared/enums/boneta-routes.enum';
import { Song } from '../shared/models/song.model';
import { SongsActions } from '../shared/states/songs/songs.actions';
import {
  selectSongsByName,
  selectSongsSortedByAdditionDate,
  selectSongsSortedByNbViews,
} from '../shared/states/songs/songs.selectors';
import { SongsComponent } from '../songs/songs.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MAIN_TABS } from './main.constant';

@Component({
  selector: 'bnt-main',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    BottomNavComponent,
    SongsComponent,
    ToolbarComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  tabs = MAIN_TABS;
  selectedTabIndex = 0;

  songs$: Observable<readonly Song[]> = of([]);

  constructor(private readonly router: Router, private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(SongsActions.loadAll());
    this.activateTab(this.tabs[0].index);
  }

  activateTab(index: number): void {
    if (index === 1) {
      this.songs$ = this.store.select(selectSongsSortedByAdditionDate);
    } else if (index === 2) {
      this.songs$ = this.store.select(selectSongsSortedByNbViews);
    } else if (index === 3) {
      this.songs$ = of([]); // TODO
    }
    this.selectedTabIndex = index;
  }

  filterSongs(input: string): void {
    this.songs$ = this.store.select(selectSongsByName(input));
    this.selectedTabIndex = 0;
  }

  displaySongDetails(songId: number): void {
    this.store.dispatch(SongsActions.viewSong({ songId }));
    this.router.navigate([BonetaRoutes.Songs, songId]);
  }

  addSong(): void {
    this.router.navigate([BonetaRoutes.Songs, BonetaRoutes.New]);
  }
}
