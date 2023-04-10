import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 private appUrl = 'https://localhost:7178/';
 private  myApiUrl = 'api/Usuarios/';

  constructor(private http: HttpClient ) { }

  getListUsuarios():Observable<any>
  {
    return this.http.get(this.appUrl + this.myApiUrl + "ConsultarUsuarios") 
  }
}
