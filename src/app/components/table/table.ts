import { Component, computed, inject, input, signal } from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import { RepositoryService } from '../../services/repository.service';
import { IEntity } from '../../domain/interface';
import { DataUpdate } from './data-update.component';


@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table<T extends IEntity & object> {
  repositoryService = inject(RepositoryService<T>);
  dialog = inject(Dialog);
  
  url = input<string>("");
  rows = signal<T[]>([]);
  columnNames = computed(() => {
    const currentRows = this.rows();
    if (currentRows.length === 0) {
      return [];
    }
    return Object.keys(currentRows[0]);
  });

  ngOnInit() {
    this.repositoryService
      .getAll(this.url())
      .subscribe(fetchedRows => this.rows.set(fetchedRows));
  }

  handleDblClick(row: T, column: string){
    alert(row.key);
  }

  getValue(item: T, key: string): any {
    return item[key as keyof T];
  }

  openDialog(item: T) {
    this.dialog.open(DataUpdate<T>, {
      data: {
        url: this.url(),
        row: item,
        service: this.repositoryService
      }
    });    
  }
}
