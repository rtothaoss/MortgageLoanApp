import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      // email : ['', [Validators.required, Validators.email]],
      email : new FormControl('', {validators: [Validators.required, Validators.email], updateOn: 'blur'}),
      password : new FormControl('', {validators: [Validators.required, Validators.minLength(5)], updateOn: 'blur'})
    })

    this.myForm.valueChanges.subscribe((form) => {
      console.log(form)
    })

  }

}
