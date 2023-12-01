import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, RouterModule]
})
export class SidebarComponent {
  @HostBinding('class')
  public hostClass = "app-sidebar";

  @ViewChild('drawer')
  public drawerRef!: MatDrawer;

  constructor(
    private _authService: AuthService
  ) {

  }
  public getUserName = () => {
    return this._authService.getUserName()
  }
}
