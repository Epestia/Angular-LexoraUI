import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar'; // 👈 adapte le chemin

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar], // ✅ IMPORTANT
  templateUrl: './main-layout.html',
})
export class MainLayoutComponent {}
