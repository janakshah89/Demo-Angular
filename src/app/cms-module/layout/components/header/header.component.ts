import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeviceDetectService } from '../../../../core/services/device-detect.service';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule, MatInputModule,
    MatDialogModule
  ]
})
export class HeaderComponent {
  @HostBinding('class')
  public hostClass = "app-header";

  public isMobileMenuShow = false
  @Input()
  public isSidebarOpen = false
  @Output()
  public menuClick = new EventEmitter(this.isSidebarOpen);

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private deviceDetectService: DeviceDetectService,
  ) {
    this.deviceDetectService.getDevice('Small').subscribe((d) => {
      if (d) {
        this.isMobileMenuShow = d;
      }

    })
    this.deviceDetectService.getDevice('XSmall').subscribe((d) => {
      if (d) {
        this.isMobileMenuShow = d;
      }
    })
  }

  public toggleSlidebar = () => {
    this.menuClick.emit(!this.isSidebarOpen);
  }

  public logout = () => {
    this._authService.lobout();
    this._router.navigate(['/auth'])
  }

  public getUserName = () => {
    return this._authService.getUserName()
  }
}
