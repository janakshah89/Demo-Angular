import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public formGroup!: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.compose([ Validators.required ])]
    })
  }

  public login = () => {
    if (!this.formGroup.valid) return;
    this._authService.login(this.formGroup.value.username);
    this._router.navigate(['/dashboard'])
  }
  public isValidHasError = (field: string, error: string) => {
    return this.formGroup.get(field)?.errors?.[error]
  }
  public isFieldErrorMsgShow = (field: string) => {
    return this.formGroup.get(field)?.touched && this.formGroup.status === 'INVALID';
  }
}
