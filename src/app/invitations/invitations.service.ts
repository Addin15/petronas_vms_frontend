import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { apiHost } from '../configs/api';
import { headerWithoutToken } from '../configs/headers';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {

  constructor(private http: HttpClient) { }

  async getInvitation(id: string): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.get(`${apiHost}/api/invitations/${id}/`,
        {
          headers: headerWithoutToken(),
          observe: 'response'
        }
      )
    );
  }

  async preRegister(id: string, nric: string): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.post(`${apiHost}/api/invitations/${id}/`,
        {
          'visitor_nric': nric
        },
        {
          headers: headerWithoutToken(),
          observe: 'response'
        }
      )
    );
  }
}
