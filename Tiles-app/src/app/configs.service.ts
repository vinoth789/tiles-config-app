import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
//import {HttpClient, Response, Headers, RequestOptions} from '@angular/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  uri = '/configs';
  SERVER_URL: string = "http://localhost:4200";
  userId: number = 1;

  constructor(private http: HttpClient) { }

  public upload(data) {
    let uploadURL = `${this.SERVER_URL}/assets`;

    return this.http.post<Response>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

       switch (event.type) {

       case HttpEventType.UploadProgress:
         const progress = Math.round(100 * event.loaded / event.total);
         return { status: 'progress', message: progress };

         case HttpEventType.Response:
          return event.body;
         default:
           return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  getContentJSON(config_file) {
    return this.http.post(`${this.SERVER_URL}/upload`, config_file);
  }

  addConfig(ConfigName, ConfigText, ConfigImage, ConfigIcon, ConfigData, ConfigUrl) {
    const obj = {
      ConfigName,
      ConfigText,
      ConfigImage,
      ConfigIcon,
      ConfigData,
      ConfigUrl
    };
  }

    createConfig(ConfigNumber, ConfigName){
      const obj = {
        config_number: ConfigNumber,
        config_name: ConfigName
      };
      this.http.post(`${this.uri}/add`, obj)
          .subscribe(res => console.log('Done'));
    }

}
