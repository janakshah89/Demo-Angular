import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

type IDevice = 'XLarge' | 'Large' | 'Medium' | 'Small' | 'XSmall' | 'Handset' | 'Tablet' | 'Web';
const mediaSizes = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}
@Injectable({
  providedIn: 'root'
})
export class DeviceDetectService {
  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  public getDevice(deviceType: IDevice): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints[deviceType])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
}
