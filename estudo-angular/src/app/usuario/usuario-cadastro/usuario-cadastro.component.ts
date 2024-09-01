import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ActivatedRoute } from '@angular/router';
import { Numero } from 'src/app/model/numero';
import { NumeroService } from 'src/app/service/numero.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UsuarioAddComponent implements OnInit {

  telefones: Numero[] = [];
  numeroTelefone = new Numero();
  usuario = new User();
  successMessage: string = '';
  alertMessage: string = '';
  successTimeout: any;
  alertTimeout: any;
  isLoading: boolean = false;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private routeActive: ActivatedRoute, private usuarioService: UsuarioService, private numeroService: NumeroService) { }

  ngOnInit() {
    let idString = this.routeActive.snapshot.paramMap.get('id');
    let id: number;

    if (idString !== null) {
      id = parseInt(idString, 10);

      if (!isNaN(id)) {
        this.usuarioService.getId(id).subscribe(data => {
          this.usuario = data;
          console.log('usuários:' + data);
        });

        // Carrega os números após carregar o usuário
        this.carregarNumeros(id);
      } else {
        console.error('ID não é um número válido.');
      }
    }
  }

  salvarUser() {
    this.isLoading = true; // Mostra o spinner
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.usuarioService.saveUsuario(this.usuario).subscribe(data => {
        this.showSuccessMessage('Usuário atualizado com sucesso! Verifique seu e-mail.');
        this.isLoading = false;
      });
    } else {
      this.usuarioService.saveUsuario(this.usuario).subscribe(data => {
        this.showSuccessMessage('Usuário salvo com sucesso! Verifique seu e-mail.');
        this.usuario = data;
        this.isLoading = false; 
      });
    }
  }

  confirmDelete(id: number) {

    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir este registro?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.numeroService.deleteNumero(id).subscribe(
          () => {
            this.ngOnInit();
          },
          error => {
            console.log(`Erro ao excluir usuário com ID ${id}:`, error);
          }
        )
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Ação cancelada' });
      }
    });
  }

  carregarNumeros(id: Number) {
    this.numeroService.getId(id).subscribe(
      (data: Numero[]) => {
        this.telefones = data;
        console.log(data);
      },
      error => {
        console.log('Ocorreu um erro ao buscar os usuários:', error);
      }
    );
  }

  novo() {
    this.usuario = new User;
    this.numeroTelefone = new Numero();
  }

  addNumero() {
    if (this.numeroTelefone.numero === '' || this.numeroTelefone.numero === undefined) {
      this.showWarningMessage('O número deve ser inserido!');
      return;
    }
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.numeroTelefone.usuarioPk = this.usuario.id;
      this.numeroService.saveNumero(this.numeroTelefone).subscribe(data => {
        this.showSuccessMessage('Número inserido com sucesso!');
        this.carregarNumeros(this.usuario.id);


      });
    } else {
      this.novo();
      this.showWarningMessage('Cadastre um usuário!');
    }

    this.numeroTelefone.numero = '';
  }

  clearAlertMessage() {
    this.alertMessage = '';

  }

  showSuccessMessage(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: detail, life: 3000 });
  }

  showErrorMessage(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: detail, life: 3000 });
  }

  showWarningMessage(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: detail, life: 3000 });
  }
}



