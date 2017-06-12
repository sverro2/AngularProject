import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appCursor]'
})
export class CursorDirective {
  @HostBinding('style.cursor') pointerStyle = 'pointer';
}
