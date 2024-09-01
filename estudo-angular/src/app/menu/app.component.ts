import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api'; // Importação para tipagem de itens de menu

export interface Usuario {
  username: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[]; // Tipagem com MenuItem

  constructor(private router: Router) { }

  ngOnInit(): void {
    const randomValue = Math.floor(Math.random() * 1000);
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home/' + randomValue]
      },
      {
        label: 'Usuários',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Listar Usuários',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/usuario-pesquisa']
          },
          {
            label: 'Cadastrar Usuário',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: ['/usuario-cadastro']
          }
        ]
      },
      {
        label: 'Estoque',
        icon: 'pi pi-box text-color-secondary',
        items: [
          {
            label: 'Listar Produtos',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/produto-pesquisa']
          },
          {
            label: 'Cadastrar Produtos',
            icon: 'pi pi-cart-plus',
            routerLink: ['/produto-cadastro']
          },
          {
            label: 'Gerenciar Estoque',
            icon: 'pi pi-cart-plus',
            routerLink: ['/produto-estoque']
          }
        ]
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.sair() 
      }
    ];
  }

  public sair() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public esconderMenu(): boolean {
    return this.router.url === '/login' || this.router.url === '/';
  }
  
}
