import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent implements OnInit {
  form: any = {
    email: ''
  }

  constructor(private formBuilder: UntypedFormBuilder, private auth: AuthService, private toast: ToastService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toast.showToast('Please enter a valid email address!', false);
      return;
    }

    this.auth.requestPasswordReset(this.form.value['email']).subscribe(
      {
        next: data => {
          this.toast.showToast('Password reset requested!', true);
          this.form.reset();
        },
        error: error => {
          this.toast.showToast(error.error.message, false);
        }
      }
    );
  }

}
