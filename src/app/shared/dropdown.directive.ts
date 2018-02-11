import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive ({
    selector: '[appDropDown]'
})

export class DropDownDirective {
    @HostBinding('class.open') isOpen = false; // class is the array of  css classes and open is just one of those classes
    @HostListener ('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}