import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getListArticle(query) {
    return this.http.get<any>("https://en.wikipedia.org/w/api.php", {
      params: {
        "action": "query",
        "list": "search",
        "srsearch": query,
        "format": "json",
        "origin": "*"
      },
      responseType: 'json'
    })
  }

  getArticleContent(pageids) {
    return this.http.get<any>("http://en.wikipedia.org/w/api.php", {
      params: {
        "action": "query",
        "pageids": pageids,
        "format": "json",
        "origin": "*",
        "prop": "extracts",
        "exsectionformat": "plain",
        "explaintext": true
      },
      responseType: 'json'
    })
  }

  getArticleImages(pageids) {
    return this.http.get<any>("http://en.wikipedia.org/w/api.php", {
      params: {
        "action": "query",
        "pageids": pageids,
        "format": "json",
        "origin": "*",
        "prop": "pageimages",
        "piprop":"original"
      },
      responseType: 'json'
    })
  }
}
