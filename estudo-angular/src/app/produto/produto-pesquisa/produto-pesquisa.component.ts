import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from 'src/app/model/user';
import { TableLazyLoadEvent } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-produto-pesquisa',
  templateUrl: './produto-pesquisa.component.html',
  styleUrls: ['./produto-pesquisa.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProdutoPesquisaComponent implements OnInit {

  users: User[] = [];
  nome: string = '';
  login: string = '';
  cpf: string = '';
  id: number = 0;
  total: number = 0;
  pageSize: number = 5;
  pagina: number = 1;

  constructor(private usuarioService: UsuarioService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.carregarPagina({ first: 0, rows: this.pageSize });
  }

  limparCampos() {
    this.nome = '';
    this.carregarPagina({ first: 0, rows: this.pageSize });
  }

  deletarUsuario(id: number, index: number) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir este registro?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.usuarioService.deletarUsuarioList(id).subscribe(
          () => {
            console.log(`Usuário com ID ${id} excluído com sucesso.`);
            this.carregarPagina({ first: (this.pagina - 1) * this.pageSize, rows: this.pageSize });
          },
          error => {
            console.log(`Erro ao excluir usuário com ID ${id}:`, error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso' });
      }, reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Ação cancelada' });
      }
    });
  }

  aplicarFiltros() {
    if (this.nome) {
      this.consutarNome();
    } else {
      this.carregarPagina({ first: 0, rows: this.pageSize });
    }
  }

  consutarNome() {
    this.usuarioService.getNome(this.nome).subscribe(data => {
      this.users = data;
      this.total = data.length;
    });
  }

  carregarPagina(event: TableLazyLoadEvent) {
    const rows = event.rows ?? this.pageSize;
    const pageNumber = (event.first! / rows) + 1;
    this.pageSize = rows;

    this.usuarioService.getUsuarioListPage(pageNumber - 1).subscribe(
      data => {
        this.pagina = pageNumber;
        this.users = data.content;
        this.total = data.totalElements;
      },
      error => {
        console.log('Ocorreu um erro ao buscar os usuários:', error);
      }
    );
  }
}
