import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService, User } from '../shared/auth.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-profile.component.html',
  styles: [
  ]
})
export class ManageProfileComponent implements OnInit {
  profileForm = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    middle_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  passwordForm = this.formBuilder.group({
    old_password: ['', [Validators.required, Validators.minLength(8)]],
    new_password: ['', [Validators.required, Validators.minLength(8)]],
    new_password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private auth: AuthService, private toast: ToastService) { }

  user: User = {};

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.profileForm.setValue({
      first_name: this.user.first_name,
      middle_name: this.user.middle_name,
      last_name: this.user.last_name,
      email: this.user.email,
    });

  }

  onSubmitUpdateProfile(): void {
    if (this.profileForm.invalid) {
      this.toast.showToast('Please fill up all fields!', false);
      return;
    }

    this.auth.updateProfile(this.user?.id ?? -1, this.profileForm.value).subscribe(
      {
        next: data => {
          this.toast.showToast('Profile updated!', true);
          this.router.navigate(['/logout']);
        },
        error: error => {
          this.toast.showToast(error.error.message, false);
        }
      }
    );
  }

  onSubmitChangePassword(): void {
    if(this.passwordForm.invalid) {
      this.toast.showToast('Please fill up all fields!', false);
      return;
    }

    this.auth.updatePassword(this.user?.id ?? -1, this.passwordForm.value).subscribe(
      {
        next: data => {
          this.toast.showToast('Password updated!', true);
          this.router.navigate(['/logout']);
        },
        error: error => {
          this.toast.showToast(error.error.message, false);
        }
      });
  }
}
