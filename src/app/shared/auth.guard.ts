import { inject } from "@angular/core"
import { AuthService } from "./auth.service"


export const authGuard = () => {
  const auth = inject(AuthService);
  const user = localStorage.getItem('user');
  if(user) {
    const init = JSON.parse(localStorage.getItem('initialize') || 'false');
    if(init) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}
