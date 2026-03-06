import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewToggleService {
  private storageKey = 'viewMode';

  private viewModeSubject = new BehaviorSubject<string>(
    this.normalizeMode(localStorage.getItem(this.storageKey))
  );

  viewMode$ = this.viewModeSubject.asObservable();

  getCurrentViewMode(): string {
    return this.viewModeSubject.value;
  }

  private normalizeMode(mode: string | null): string {
    if (mode === 'list' || mode === 'list-layout' || mode == null) return 'list-layout';
    if (mode === 'card' || mode === 'card-layout') return 'card-layout';
    return 'list-layout';
  }

  changeViewMode(mode: string) {
    const normalized = this.normalizeMode(mode);
    this.viewModeSubject.next(normalized);
    localStorage.setItem(this.storageKey, normalized);
  }
}
