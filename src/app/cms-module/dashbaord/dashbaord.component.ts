import { Component, OnDestroy } from '@angular/core';
import { DashboardService } from './shared/dashboard.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { IFact } from './shared/dashboard.interface';
import { ApiResponce } from '../../core/interfaces/general.interface';
import { MatIconModule } from '@angular/material/icon';
import { SubSink } from 'subsink';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ]
})
export class DashbaordComponent implements OnDestroy {
  public factResponse!: ApiResponce<IFact>;
  public sunsineResponse!: ApiResponce<any>;
  public subsink = new SubSink();
  public formGroup: FormGroup;
  constructor(
    public dashboardService: DashboardService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.getCats();
    this.formGroup = this.formBuilder.group({
      lat: ['', Validators.compose([Validators.required])],
      lan: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])]
    });

    this.subsink.sink = this.dashboardService.getSunriseData().subscribe((data) => {
      if (data && data.form) {
        this.formGroup.setValue({
          lat: data.form.lat,
          lan: data.form.lan,
          date: data.form.date
        })
      }
      if (data && data.response) {
        this.sunsineResponse = data.response;
      }
    });
  }

  public getCats = () => {
    this.subsink.unsubscribe();
    this.subsink.sink = this.dashboardService.getCats().subscribe((factResponse: ApiResponce) =>  this.factResponse = factResponse);
  }


  public refreshFact = () => {
    this.getCats();
  }

  public formSubmit = () => {
    if (!this.formGroup.valid) return;
    const date = moment(this.formGroup.value.date).format('YYYY-MM-DD')
    this.dashboardService.getSunriseSunsetDetail({
      ...this.formGroup.value,
      date
    }).subscribe((response) => {
      this.dashboardService.setSunriseData({
        response,
        form: {...this.formGroup.value, date}
      });
      this.router.navigateByUrl('contact')
    })
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
