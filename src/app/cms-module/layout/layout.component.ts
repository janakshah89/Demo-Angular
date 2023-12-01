import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DeviceDetectService } from '../../core/services/device-detect.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, MatSidenavModule, SidebarComponent, FooterComponent]
})
export class LayoutComponent {
  showSidebar = true;
  sidebarMode: MatDrawerMode = 'side'
  constructor(
    private deviceDetectService: DeviceDetectService,
  ) {
    this.deviceDetectService.getDevice('Small').subscribe((d) => {
      if (d) {
        this.showSidebar = false;
        this.sidebarMode = 'over'
      };
    })
    this.deviceDetectService.getDevice('XSmall').subscribe((d) => {
      if (d) {
        this.showSidebar = false;
        this.sidebarMode = 'over'
      };
    })
  }
}
