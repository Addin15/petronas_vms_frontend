import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

export const NoAuthGuard = async () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!await authService.hasToken()) {
        return true;
    }

    // Redirect to the login page
    return router.parseUrl('/');
};