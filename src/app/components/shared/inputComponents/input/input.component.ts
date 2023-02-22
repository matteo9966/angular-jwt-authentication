import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() label = '';
  @Input() id = Math.random().toString(32).split('.')[1]; //potrei generarlo boh
  disabled = false;
  onChange(_value: any) {}
  onTouched() {}
  private touched = false;
  private _value = '';

  constructor() {}
  writeValue(value: any): void {
    this._value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}

  get value() {
    return this._value;
  }

  set value(value: any) {
    this.markTouched();
    this.onChange(value);
    this._value = value;
  }

  markTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }
}
