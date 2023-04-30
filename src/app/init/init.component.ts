import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './init.component.html',
})
export class InitComponent implements OnInit {
  form: any = {
    password: '',
    password_confirmation: ''
  }
  constructor(private formBuilder: UntypedFormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.auth.initialize(this.form.value['password'], this.form.value['password_confirmation']).subscribe(
      data => {
        this.router.navigate(['/logout']);
      }
    );
  }
}
