import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/produto';

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
  searchTerm: string = '';

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutoListPage(0).subscribe(
      data => {
        this.produtos = data.content;
      },
      error => {
        console.log('Ocorreu um erro ao buscar os produtos:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar produtos.' });
      }
    );
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

  removeFromCart(item: Produto) {
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
    this.total = this.cart.reduce((sum, item) => sum * item.cartQuantity, 0);
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
        this.carregarProdutos();
      }
    });
  }
}
