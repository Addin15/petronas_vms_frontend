import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject, firstValueFrom } from 'rxjs';
import { apiHost, headerWithToken, headerWithoutToken } from './configs';
import { User } from './models/user';

@Injectable()
export class AuthService {

  user: User | null = null;
  token: string | null = null;
  private _isLoggedIn = new Subject<boolean>();
  isLoggedIn = this._isLoggedIn.asObservable();

  isGettingUserData: boolean = true;

  constructor(private http: HttpClient) {
    this.getUser();
  }


  private getUser(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.token = token;

      this.http.get<User>(
        `${apiHost}/auth/user/`,
        {
          headers: headerWithToken(token),
          observe: 'response'
        }
      ).subscribe((response) => {
        if (response.ok) {
          const user = response.body!;

          this.user = new User({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            google_token: user.google_token,
            is_staff: user.is_staff
          });

          this._isLoggedIn.next(true);
        } else {
          this.logout();
          this._isLoggedIn.next(false);
        }
      }, err => {
        this.logout();
        this._isLoggedIn.next(false);
      });

    }

    this.isGettingUserData = false;
  }

  public async hasToken(): Promise<boolean> {
    const token = localStorage.getItem('token');    // Check whether the token is expired and return
    // true or false
    if (token) {
      const response = await firstValueFrom(
        this.http.get<User>(
          `${apiHost}/auth/user/`,
          {
            headers: headerWithToken(token),
            observe: 'response'
          }
        )
      );

      if (response.ok) {
        this.user = response.body;

        return true;

      }
      return false;
    } else return false;
  }

  // Call Register API
  async register(email: string, name: string, phone: string, password: string): Promise<string | null> {

    const response = await firstValueFrom(
      this.http.post(
        `${apiHost}/auth/register/`,
        {
          name,
          email,
          phone,
          password
        },
        {
          headers: headerWithoutToken(),
          observe: 'response'
        }
      )
    );

    // If success register
    if (response.status == 201) {
      const data: any = response.body;

      this.user = new User({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        google_token: data.user.google_token,
        is_staff: data.user.is_staff
      });

      this.token = data.token;

      localStorage.setItem('token', data.token);
      this._isLoggedIn.next(true);

      return null;
    } else {
      return 'Email may already registered!';
    }

  }

  async authorizeGoogle(): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<any>(
        `${apiHost}/auth/google-authorize/`,
        {},
        {
          headers: headerWithToken(this.token!),
          observe: 'response'
        }
      )
    );

    if (response.ok) {
      const win = window.open(response.body.auth_url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
      const timer = setInterval(() => {
        if (win!.closed) {
          clearInterval(timer);
          this.getUser();
        }
      }, 500);
    }
  }

  async redirect(code: string): Promise<boolean> {
    const response = await firstValueFrom(
      this.http.post(
        `${apiHost}/auth/redirect/`,
        {
          code
        },
        {
          headers: headerWithToken(this.token!),
          observe: 'response'
        }
      )
    );

    if (response.ok) {
      return true;
    }

    return false;
  }

  // Call Login API
  async login(email: string, password: string): Promise<string | null> {

    const response = await firstValueFrom(
      this.http.post(
        `${apiHost}/auth/login/`,
        {
          email,
          password
        },
        {
          headers: headerWithoutToken(),
          observe: 'response'
        }
      )
    );

    // If success login
    if (response.status == 200) {
      const data: any = response.body;

      this.user = new User({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        google_token: data.user.google_token,
        is_staff: data.user.is_staff
      });

      this.token = data.token;

      localStorage.setItem('token', data.token);
      this._isLoggedIn.next(true);

      return null;
    } else {
      return 'Email or password is invalid!';
    }
  }

  logout(): void {
    this.user = null;
    this.token = null;

    localStorage.removeItem('token');
    this._isLoggedIn.next(false);
  }
}
