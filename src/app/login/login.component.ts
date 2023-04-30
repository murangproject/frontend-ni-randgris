import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
  constructor(private formBuilder: UntypedFormBuilder, private auth: AuthService, private router: Router) { }

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
            this.router.navigate(['/init']);
          } else {
            this.router.navigate(['/']);
          }
        }
      }
    );
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe();
  }
}
