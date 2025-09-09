import { Component, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { IEntity } from '../../domain/interface';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table<T extends IEntity> {
  repositoryService = inject(RepositoryService<T>)
  
  url = input<string>("");
  columnNames = input<(keyof T)[]>([]);
  rows = signal<T[]>([]);

  ngOnInit() {
    this.repositoryService
      .getAll(this.url())
      .subscribe(fetchedRows => this.rows.set(fetchedRows));
  }

  handleDblClick(row: T, column: keyof T){
    alert(row.key);
  }

  getValue(item: T, key: keyof T): any {
    return item[key];
  }
}
