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

      this.http.get(
        `${apiHost}/auth/user/`,
        {
          headers: headerWithToken(token),
          observe: 'response'
        }
      ).subscribe((response: HttpResponse<any>) => {
        if (response.status == 200) {
          const user = response.body;

          this.user = new User({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            google_token: user.google_token,
            is_staff: user.is_staff
          });

          this._isLoggedIn.next(true);
        }
      });

    }

    this.isGettingUserData = false;
  }

  public hasToken(): boolean {
    const token = localStorage.getItem('token');    // Check whether the token is expired and return
    // true or false
    if (token) return true; else return false;
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
    await firstValueFrom(
      this.http.post(
        `${apiHost}/auth/google-authorize/`,
        {},
        {
          headers: headerWithToken(this.token!),
          observe: 'response'
        }
      )
    );

    this.getUser();
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
