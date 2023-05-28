import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconService } from '@ikerbede/shared';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'bnt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly iconService: IconService) {
    this.iconService.addIcons([
      'add',
      'arrow_back',
      'close',
      'edit',
      'favorite',
      'history',
      'search',
      'star',
    ]);
  }
}
