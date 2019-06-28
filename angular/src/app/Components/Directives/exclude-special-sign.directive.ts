import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'input[NoSpecial]'
})
export class ExcludeSpecialSignDirective {
  prevEl:ElementRef;
  constructor(private el: ElementRef) { this.prevEl = el; }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.el.nativeElement.value;
    const initalplaceholder = this.el.nativeElement.placeholder;
    switch (initalplaceholder) {
      case 'Real':
        this.el.nativeElement.value = initalValue.replace(/[^0-9|.|\-]*/g, '');
        if (this.el.nativeElement.value.indexOf('-') > -1) {
          this.el.nativeElement.value = '-' + initalValue.replace(/[^0-9|.|]*/g, '');
        }
        if (this.el.nativeElement.value.split('.').length - 1 > 1) {
          const str =  this.el.nativeElement.value;
          const index = this.el.nativeElement.selectionStart;
          this.el.nativeElement.value = str.slice(0, index - 1) + str.slice(index);
        }
        break;
      case 'Integer':
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        break;
      case 'Special':
        this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z0-9]*/g, '');
        break;
    }
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
    this.prevEl = this.el;
  }
}
