import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RepositoryService<T> {
    private http = inject(HttpClient);
    
    /**
     * Fetches all items of type T from a given URL.
     * @param url The API endpoint to fetch from.
     * @returns An Observable stream of an array of T.
     */
    getAll(url: string): Observable<T[]> {
        return this.http.get<T[]>(url);
    }

    /**
     * Creates a new item of type T.
     * @param url The API endpoint to post to.
     * @param item The item to be created.
     * @returns An Observable of the newly created item.
     */
    post(url: string, item: T): Observable<T> {
        return this.http.post<T>(url, item);
    }

    /**
     * Updates an existing item of type T.
     * @param url The API endpoint for the specific item (e.g., 'api/products/1').
     * @param item The updated item data.
     * @returns An Observable of the updated item.
     */
    put(url: string, item: T): Observable<T> {
        return this.http.put<T>(url, item);
    }

    /**
     * Deletes an item.
     * @param url The API endpoint for the specific item to delete.
     * @returns An empty Observable, as delete operations often return no content.
     */
    delete(url: string): Observable<void> {
        return this.http.delete<void>(url);
    }
}