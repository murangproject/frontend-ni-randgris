import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  auth$ = this.auth.getAuthStatus();

  form: any = {
    email: null,
    password: null
  }
  constructor(private formBuilder: UntypedFormBuilder, private auth: AuthService, private router: Router, private toast:ToastService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.auth$.subscribe(
      data => {
        if (data) {
          const init = JSON.parse(localStorage.getItem('initialize') || 'false');
          if(init) {
            this.toast.showToast('Welcome to the system! Initialize your account to continue!', true);
            this.router.navigate(['/init']);
          } else {
            this.router.navigate(['/']);
          }
        }
      }
    );
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe({
      next: data => {
        this.toast.showToast('Login successful!', true);
      },
      error: error => {
        this.toast.showToast(error.error.message, false);
      }
    });
  }
}
