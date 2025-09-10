import { Component} from '@angular/core';
import { Table } from './components/table/table';

@Component({
  selector: 'app-root',
  imports: [Table],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly url = "http://127.0.0.1:5145/api/Students";
}
