import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

export const NoAuthGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.hasToken()) {
        return true;
    }

    // Redirect to the login page
    return router.parseUrl('/');
};