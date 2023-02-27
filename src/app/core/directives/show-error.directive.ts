import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewService } from '../services/view.service';

@Directive({
  selector: '[appShowError]'
})
export class ShowErrorDirective implements OnDestroy {
  subscription!:Subscription;
  constructor(private templateRef:TemplateRef<any>,private viewContainer:ViewContainerRef,private viewService:ViewService) { 
   this.changeState();
  }
  
  ngOnDestroy(): void {
   this.subscription && this.subscription.unsubscribe()
  }

  changeState(){
   this.subscription= this.viewService.showErrorBanner$.subscribe(show=>{
      if(show){
        this.viewContainer.createEmbeddedView(this.templateRef)
      }else{
        this.viewContainer.clear();
      }
    })
  }



}
