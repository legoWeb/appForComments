import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from './comment';
import {Observable} from 'rxjs/index';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getConfig() {
    return this.http.get('http://localhost:3000/api/comments');
  }
  postConfig(data: Comment) {
    const body = {name: data.name , text: data.text};
    return this.http.post('http://localhost:3000/api/comments', body);
  }
deleteConfig(data: number) {
    return this.http.delete(`http://localhost:3000/api/comments`);
}
}
