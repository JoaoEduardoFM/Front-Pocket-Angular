import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../menu/app.component";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { AppConstants } from "./app-constants";
import { User } from "../model/user";
import { Numero } from "../model/numero";
import { Produto } from "../model/produto";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    constructor(private http: HttpClient) {

    }

    // busca todos usuários
    getProdutoList(): Observable<any> {
        return this.http.get<any>(AppConstants.buscaProdutos);
    }

    getProdutoListPage(pagina: number): Observable<any> {
        return this.http.get<any>(AppConstants.buscaProdutos + '/page/' + pagina);
    }

    // busca todos produtos
    getProdutos(): Observable<any> {
        return this.http.get<any>(AppConstants.buscaProdutos)
    }

    // deleta por id
    deleteProduto(id: Number): Observable<any> {
        return this.http.delete(AppConstants.deleteProdutoUrl + id, { responseType: 'text' });
    }

    // busca por id produto
    getId(id: Number): Observable<any> {
        return this.http.get<any>(AppConstants.baseUrlProduto + 'buscaPorID/' + id);
    }

    // cadastra produto
    saveProduto(produto: Produto): Observable<any> {
        return this.http.post<any>(AppConstants.cadastroProdutoUrl, produto);
    }
}
