import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { apiHost } from '../configs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private http: HttpClient, private datePipe: DatePipe) {

  }

  get_all_meetings(): Promise<HttpResponse<any>> {

    const token: string = localStorage.getItem('token')!;

    return firstValueFrom(
      this.http.get(
        `${apiHost}/api/meetings/`,
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
          observe: 'response'
        }
      )
    );
  }

  add_meeting(summary: any, description: any, visitor_emails: any, start_date: any, end_date: any, purpose: any, venue: any): Promise<HttpResponse<any>> {
    const token: string = localStorage.getItem('token')!;

    start_date = this.datePipe.transform(start_date, 'yyyy-MM-dd H:mm:ss');
    end_date = this.datePipe.transform(end_date, 'yyyy-MM-dd H:mm:ss');

    return firstValueFrom(
      this.http.post(
        `${apiHost}/api/meetings/`,
        {
          summary,
          description,
          visitor_emails,
          start_date,
          end_date,
          purpose,
          venue
        },
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
          observe: 'response'
        }
      )
    );
  }
}
