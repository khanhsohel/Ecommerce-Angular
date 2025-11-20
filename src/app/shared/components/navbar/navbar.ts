import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { authsignLogin } from "../../../Auth/auth.routes";

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, authsignLogin],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
