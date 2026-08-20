import { Directive } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
})
export class NumberOnly {
  constructor() {}
}
