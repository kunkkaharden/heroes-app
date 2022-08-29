import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { map, tap } from 'rxjs/operators';
import { Observable , of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: Usuario | undefined;
  constructor(private http: HttpClient) {}
  login() {
    return this.http.get<Usuario>('http://localhost:3000/usuarios/1').pipe(
      tap((r) => {
        this._auth = r;
        localStorage.setItem('token', r.id);
      })
    );
  }
  logout() {
    this._auth = undefined;
    localStorage.removeItem('token');
  }

  get auth() {
    return { ...this._auth };
  }

  verificarAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Usuario>('http://localhost:3000/usuarios/1').pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }
}
