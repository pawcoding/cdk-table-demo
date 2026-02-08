import { Component } from '@angular/core';
import { Table } from './components/table/table';

@Component({
  selector: 'app-root',
  imports: [Table],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
