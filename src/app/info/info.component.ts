import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: false,

  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  isDarkMode: boolean = false;
  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'enabled';
  }

}
