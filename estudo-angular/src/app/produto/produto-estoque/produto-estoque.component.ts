import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/produto';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-produto-estoque',
  templateUrl: './produto-estoque.component.html',
  styleUrls: ['./produto-estoque.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProdutoEstoqueComponent implements OnInit {
  items: Produto[] = [];
  produto: Produto = new Produto();
  total: number = 0;
  pageSize: number = 5;
  pagina: number = 1;
  quantity: { [key: number]: number } = {};
  isLoading: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.carregarPagina({ first: 0, rows: this.pageSize });
  }

  handleQuantityChange(item: Produto, change: number) {
    if (change === 0) return;

    this.confirmationService.confirm({
      message: `Você está ${change > 0 ? 'adicionando' : 'removendo'} ${Math.abs(change)} ${change > 0 ? 'a' : 'de'} ${item.nome}.`,
      header: 'Confirmar Alteração de Quantidade',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateItemQuantity(item, change);
      }
    });
  }

  updateItemQuantity(item: Produto, change: number) {
    const novaQuantidade = item.quantidade + change;

    if (novaQuantidade < 0) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'A quantidade não pode ser negativa!' });
      return;
    }

    item.quantidade = item.quantidade + change;

    // Chama o serviço para atualizar o produto no backend
    this.produtoService.saveProduto(item).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Quantidade de ${item.nome} atualizada!` });
      },
      error => {
        console.error('Erro ao atualizar a quantidade:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar a quantidade do produto.' });
      }
    );
  }

  carregarPagina(event: TableLazyLoadEvent) {
    const rows = event.rows ?? this.pageSize;
    const pageNumber = (event.first! / rows) + 1;
    this.pageSize = rows;

    this.produtoService.getProdutoListPage(pageNumber - 1).subscribe(
      data => {
        this.pagina = pageNumber;
        this.items = data.content; 
        this.total = data.totalElements;
      },
      error => {
        console.log('Ocorreu um erro ao buscar os produtos:', error);
      }
    );
  }

  cadastroProduto() {
    if (!this.produto || !this.produto.nome || !this.produto.quantidade) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos para adicionar um produto!' });
      return;
    }
  
    // Adiciona o produto à lista
    this.items.push({ ...this.produto }); // Usa spread para evitar mutação
  
    // Chama o serviço para salvar o produto no backend
    this.produtoService.saveProduto(this.produto).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto cadastrado com sucesso!' });
        this.novo(); // Limpa o formulário após o cadastro
        this.carregarPagina({ first: 0, rows: this.pageSize }); // Atualiza a lista de produtos
      },
      error => {
        console.log('Erro ao cadastrar produto:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao cadastrar o produto!' });
      }
    );
  }
  

  novo() {
    this.produto = new Produto(); // Limpa o objeto produto para um novo cadastro
  }
}
