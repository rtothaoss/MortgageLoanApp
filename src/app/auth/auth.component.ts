import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      // email : ['', [Validators.required, Validators.email]],
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'blur',
      }),
    });

    this.myForm.valueChanges.subscribe((form) => {
      
    });
  }

  onSubmit() {
    if (!this.myForm.valid) {
      return;
    }
    
    const payload = {
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    };

    this.store.dispatch(new authActions.Login(payload));

    this.myForm.reset();
  }
}
