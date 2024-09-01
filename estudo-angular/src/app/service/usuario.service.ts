import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../menu/app.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from './app-constants';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  // busca todos usuários
  getUsuarioList(): Observable<any> {
    return this.http.get<any>(AppConstants.usuariosUrl);
  }

  getUsuarioListPage(pagina: number): Observable<any> {
    return this.http.get<any>(AppConstants.usuariosUrl + '/page/' + pagina);
  }

  getNomePage(nome: String, pagina: number): Observable<any> {
    return this.http.get(AppConstants.baseUrlUsuario + 'buscaPorNome/page/'+ nome +'?pagina=' +pagina);
  }

  getUsuarios() : Observable<any> {
    return this.http.get<any>(AppConstants.usuariosUrl)
}

  // deleta usuário por id
  deletarUsuarioList(id: Number): Observable<any> {
    return this.http.delete(AppConstants.deleteusuariosUrl + id, {
      responseType: 'text',
    });
  }

  // busca por nome
  getNome(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrlUsuario + 'buscaPorNome/' + nome);
  }

  // busca por Login
  getLogin(login: String): Observable<any> {
    return this.http.get(AppConstants.baseUrlUsuario + 'buscaPorLogin/' + login);
  }

  // busca por id
  getId(id: Number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlUsuario + 'buscaPorID/' + id);
  }

  // busca por cpf
  getCpf(cpf: String): Observable<any> {
    return this.http.get(AppConstants.baseUrlUsuario + 'buscaPorCpf/' + cpf);
  }

  saveUsuario(usuario: User): Observable<any> {
    return this.http.post<any>(AppConstants.cadastroUsuarioUrl, usuario);
  }

  // Busca por login e senha
  getLoginAndSenha(login: string, senha: string): Observable<any> {
    return this.http.get(`${AppConstants.baseUrlUsuario}findByLoginAndSenha/${login}/${senha}`);
  }
}
