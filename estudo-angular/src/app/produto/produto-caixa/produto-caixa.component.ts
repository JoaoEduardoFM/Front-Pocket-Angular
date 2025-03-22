import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/produto';
import { TableLazyLoadEvent } from 'primeng/table';

interface CartItem extends Produto {
  cartQuantity: number;
}

@Component({
  selector: 'app-caixa',
  templateUrl: './produto-caixa.component.html',
  styleUrls: ['./produto-caixa.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProdutoCaixaComponent implements OnInit {
  produtos: Produto[] = [];
  cart: CartItem[] = [];
  total: number = 0;
  produtoSize: number = 0;
  nome: string = '';
  login: string = '';
  cpf: string = '';
  id: number = 0;
  pageSize: number = 5;
  pagina: number = 1;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.carregarPaginaLazy({
      first: 0,
      rows: this.pageSize  
    });
  }
  

  addToCart(produto: Produto) {
    if (produto.quantidade <= 0) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Produto sem estoque!' });
      return;
    }

    const existingItem = this.cart.find(item => item.id === produto.id);
    if (existingItem) {
      existingItem.cartQuantity++;
    } else {
      this.cart.push({ ...produto, cartQuantity: 1 });
    }

    this.updateTotal();
  }

  removeFromCart(item: CartItem) {
    const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
      if (this.cart[index].cartQuantity > 1) {
        this.cart[index].cartQuantity--;
      } else {
        this.cart.splice(index, 1);
      }
      this.updateTotal();
      
    }
  }

  updateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + (item.preco * item.cartQuantity), 0);
   // this.carregarPaginaLazy({first: 0, rows: this.pageSize });
  }

  completeSale() {
    this.confirmationService.confirm({
      message: 'Deseja finalizar a venda?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cart.forEach(item => {
          const updatedProduct = { ...item, quantidade: item.quantidade - item.cartQuantity };
          this.produtoService.saveProduto(updatedProduct).subscribe(
            response => {
              console.log('Produto atualizado:', response);
            },
            error => {
              console.error('Erro ao atualizar produto:', error);
            }
          );
        });

        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda realizada com sucesso!' });
        this.cart = [];
        this.total = 0;
        //this.carregarPaginaLazy({first: 0, rows: this.pageSize});
      }
    });
  }

  aplicarFiltros() {
    if (this.nome) {
      this.consultarNome();
    } else {
      this.carregarPaginaLazy({first: 0, rows: this.pageSize});
    }
  }

  limparCampos() {
    this.nome = '';
    this.carregarPagina();
  }

  consultarNome() {
    this.produtoService.getNome(this.nome).subscribe(data => {
      this.produtos = data;
    });
  }

  carregarPagina() {
    this.produtoService.getProdutos().subscribe(
      (data: Produto[]) => {
        this.produtos = data; 
        this.total = this.cart.reduce((sum, item) => sum + (item.preco * item.cartQuantity), 0);
      },
      error => {
        console.error('Ocorreu um erro ao buscar os produtos:', error);
      }
    );
  }

  carregarPaginaLazy(event: TableLazyLoadEvent) {
    const rows = event.rows ?? this.pageSize;
    const pageNumber = (event.first! / rows) + 1;
    this.pageSize = rows;

    this.produtoService.getProdutoListPage(pageNumber - 1).subscribe(
      data => {
        this.pagina = pageNumber;
        this.produtos = data.content;
        this.produtoSize = data.totalElements;
      },
      error => {
        console.log('Ocorreu um erro ao buscar os usuários:', error);
      }
    );
  }

  
  
  
}
