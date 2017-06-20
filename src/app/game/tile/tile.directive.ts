import { Directive, HostBinding, Input, OnChanges, HostListener } from '@angular/core';

@Directive({
  selector: '[appTileActions]'
})
export class TileDirective implements OnChanges {
  @HostBinding('style.top') @Input() positionTop = '0px';
  @HostBinding('style.left') @Input()  positionLeft = '0px';
  @HostBinding('style.z-index') @Input() zIndex = 1;
  @HostBinding('style.transform') rotation = 'rotate(0deg)';

  //if an item is selected
  @Input() selected;
  @HostBinding('style.opacity') opacity = 1.0;

  //if the tile has already been used to create a match
  @Input() hidden;
  @HostBinding('style.display') visibilty = 'block';

  constructor() {
  }

  ngOnChanges() {
    if (this.selected) {
      this.opacity = 0.8;
    }else{
      this.opacity = 1.0;
    }

    if (this.hidden) {
      this.visibilty = 'none';
    }else {
      this.visibilty = 'block';
    }
  }

  @HostListener('mouseenter') onMouseVisit() {
    this.rotation = 'rotate(5deg)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.rotation = 'rotate(0deg)';
  }

}
