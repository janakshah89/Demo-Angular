import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ApiResponce } from '../../../core/interfaces/general.interface';
import { IFact, ISunriseSunsetPayload } from './dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public sunriseDataSubject = new BehaviorSubject<{response: any, form: any} | null>(null);

  constructor(
    private _api: ApiService,
  ) { }

  public getCats(
    payload?: any
  ): Observable<ApiResponce<IFact>> {
    return this._api.get(
      'https://catfact.ninja/fact',
      {
        params: payload
      }
    )
  }

  public getSunriseSunsetDetail(
    payload: ISunriseSunsetPayload
  ): Observable<ApiResponce<IFact>> {
    return this._api.get(
      'https://api.sunrise-sunset.org/json',
      {
        params: payload
      }
    )
  }

  public getSunriseData = () => {
    return this.sunriseDataSubject.asObservable()
  }
  public setSunriseData = (data: any) => {
    return this.sunriseDataSubject.next(data);
  }

}
