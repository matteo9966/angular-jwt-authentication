import { Component, OnInit } from '@angular/core';
import { ViewService } from '../core/services/view.service';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrls: ['./error-banner.component.scss']
})
export class ErrorBannerComponent implements OnInit {

  constructor(private viewService:ViewService) { }

  ngOnInit(): void {
  }

 get message$(){
  return this.viewService.bannerErrorMessage$
 }

}
