import { Component } from '@angular/core';
import { getCurrentYear } from '../../../../core/utils/common.util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true
})
export class FooterComponent {
  public currentYear = getCurrentYear();
}
