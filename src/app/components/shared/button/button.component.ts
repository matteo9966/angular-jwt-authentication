import { Component, HostBinding, HostListener, Input, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  @Input() text:string="";
  @Output() click:EventEmitter<any> = new EventEmitter()
  @HostListener('click')
  onClick(event:Event){
    this.click.emit(event as any);
  }
  ngOnInit(): void {
  }

}
