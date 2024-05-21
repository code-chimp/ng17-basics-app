import { Directive, HostBinding, HostListener } from '@angular/core';

/**
 * DropdownDirective is a directive that manages the open state of a dropdown.
 * It provides a method to toggle the open state when the dropdown is clicked.
 * It also provides a HostBinding to bind the open state to the 'open' class of the host element.
 */
@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdown',
  standalone: true,
})
export class DropdownDirective {
  /**
   * A HostBinding that binds the 'open' class of the host element to the 'isOpen' property.
   */
  @HostBinding('class.open') isOpen = false;

  /**
   * A HostListener that listens for click events on the host element and toggles the 'isOpen' property.
   */
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
