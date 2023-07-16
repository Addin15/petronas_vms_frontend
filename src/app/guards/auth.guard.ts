import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

export const AuthGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.hasToken()) {
        return true;
    }

    console.log('sini');

    // Redirect to the login page
    return router.parseUrl('/auth');
};