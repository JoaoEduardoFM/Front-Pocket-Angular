import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ActivatedRoute } from '@angular/router';
import { Numero } from 'src/app/model/numero';
import { NumeroService } from 'src/app/service/numero.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProdutoCadastroComponent implements OnInit {

  produtos: Produto[] = [];
  produto = new Produto();
  successMessage: string = '';
  alertMessage: string = '';
  successTimeout: any;
  alertTimeout: any;
  isLoading: boolean = false;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private routeActive: ActivatedRoute, private produtoService: ProdutoService, private numeroService: NumeroService) { }

  ngOnInit() {
    let idString = this.routeActive.snapshot.paramMap.get('id');
    let id: number;

    if (idString !== null) {
      id = parseInt(idString, 10);

      if (!isNaN(id)) {
        this.produtoService.getId(id).subscribe(data => {
          this.produto = data;
          console.log('produto:' + data);
        });
      } else {
        console.error('ID não é um número válido.');
      }
    }
  }

  cadastroProduto() {
    this.isLoading = true; // Mostra o spinner
    if (this.produto.id != null && this.produto.id.toString().trim() != null) {
      this.produtoService.saveProduto(this.produto).subscribe(data => {
        this.showSuccessMessage('Produto atualizado com sucesso!');
        this.isLoading = false;
      });
    } else {
      this.produtoService.saveProduto(this.produto).subscribe(data => {
        this.showSuccessMessage('Produto salvo com sucesso!');
        this.produto = data;
        this.isLoading = false; 
      });
    }
  }

  novo() {
    this.produto = new Produto;
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



