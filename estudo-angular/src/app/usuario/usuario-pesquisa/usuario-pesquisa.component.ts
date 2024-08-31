import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from 'src/app/model/user';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioComponent implements OnInit {

  users: User[] = [];
  nome: string = '';
  login: string = '';
  cpf: string = '';
  id: number = 0;
  total: number = 0;
  pageSize: number = 5; // Definido conforme o `rows` do p-table
  pagina: number = 1; // Página inicial

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carregarPagina({ first: 0, rows: this.pageSize }); // Carrega a primeira página ao inicializar
  }

  limparCampos() {
    this.nome = ''; // Limpa o campo de nome
    this.carregarPagina({ first: 0, rows: this.pageSize }); // Recarrega a primeira página
  }

  deletarUsuario(id: number, index: number) {
    this.usuarioService.deletarUsuarioList(id).subscribe(
      () => {
        console.log(`Usuário com ID ${id} excluído com sucesso.`);
        this.carregarPagina({ first: (this.pagina - 1) * this.pageSize, rows: this.pageSize }); // Recarrega a página atual
      },
      error => {
        console.log(`Erro ao excluir usuário com ID ${id}:`, error);
      }
    );
  }

  aplicarFiltros() {
    if (this.nome) {
      this.consutarNome(); // Aplica o filtro pelo nome
    } else {
      this.carregarPagina({ first: 0, rows: this.pageSize }); // Recarrega sem filtro
    }
  }

  consutarNome() {
    this.usuarioService.getNome(this.nome).subscribe(data => {
      this.users = data;
      this.total = data.length; // Atualiza o total conforme a consulta
    });
  }

  carregarPagina(event: TableLazyLoadEvent) {
    const rows = event.rows ?? this.pageSize; // Garantir que 'rows' seja sempre um número
    const pageNumber = (event.first! / rows) + 1; // Calcula o número da página baseado no evento
    this.pageSize = rows; // Atualiza o tamanho da página

    this.usuarioService.getUsuarioListPage(pageNumber - 1).subscribe(
      data => {
        this.pagina = pageNumber; // Atualiza o número da página atual
        this.users = data.content; // Atualiza a lista de usuários
        this.total = data.totalElements; // Atualiza o total de elementos
      },
      error => {
        console.log('Ocorreu um erro ao buscar os usuários:', error);
      }
    );
  }
}
