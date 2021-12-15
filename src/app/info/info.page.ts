import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../api/user.service';

interface WikiContent{
  imgUrl:String,
  title:String,
  content:String
}

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  wikiContent: WikiContent = {
    imgUrl:"/assets/256px-No-Image-Placeholder.svg.png",
    title:null,
    content:null
  };

  pageid = "";
  constructor(private route: ActivatedRoute, private wikiApi: UserService) {  
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageid = params.pageid;
    });
    this.wikiApi.getArticleImages(this.pageid).subscribe(data => {
      console.log(data.query.pages[this.pageid.toString()]);
      if(data.query.pages[this.pageid.toString()].original.source != undefined)
        this.wikiContent.imgUrl = data.query.pages[this.pageid.toString()].original.source;
    });
    this.wikiApi.getArticleContent(this.pageid).subscribe(data => {
      this.wikiContent.title = data.query.pages[this.pageid.toString()].title;
      this.wikiContent.content = data.query.pages[this.pageid.toString()].extract;
    })
  }
}
