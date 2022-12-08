import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[singleDoubleClick]'
})
export class SingleDoubleClickDirective {

  @Output()
  public doSingleClick: EventEmitter<void>;

  @Output()
  public doDoubleClick: EventEmitter<void>;

  private _singleClickTimeout: any;
  private _isDoubleClick: boolean;

  constructor() {
    this._isDoubleClick = false;
    this.doSingleClick = new EventEmitter<void>();
    this.doDoubleClick = new EventEmitter<void>();
  }

  @HostListener('click', ['$event'])
  private processClick(event: any) {
    event.stopPropagation();
    if (this._isDoubleClick === true) {
      clearTimeout(this._singleClickTimeout);
      this._isDoubleClick = false;
      this.doDoubleClick.next();
    } else {
      this._isDoubleClick = true;
      this._singleClickTimeout = setTimeout(() => {
        this.doSingleClick.next();
        this._isDoubleClick = false;
      }, 250);
    }
  }
}
