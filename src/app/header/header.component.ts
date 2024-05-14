import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownDirective } from '../directives/dropdown.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, DropdownDirective, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
