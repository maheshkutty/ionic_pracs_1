import { Component, Injectable } from '@angular/core';
import { UserService } from '../api/user.service';

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  query = 'Hello'
  searchList = null;
  listdisplay = {
    "display":"none"
  };

  constructor(private wikiApi: UserService) {
    this.listdisplay.display = "none";
  }

  ngOnInit(){
    this.listdisplay.display = "none";
  }

  checkQuery() {
    this.wikiApi.getListArticle(this.query).subscribe(res => {
      console.log(res.query.search);
      this.searchList = res.query.search;
      console.log(this.searchList);
      this.listdisplay.display = "flex";
    })
  }
}
