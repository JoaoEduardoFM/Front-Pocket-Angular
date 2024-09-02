import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

// PrimeNG Components
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TerminalModule } from 'primeng/terminal';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Services
import { ConfirmationService } from 'primeng/api';

// Ngx Mask
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

// Application Components
import { AppComponent } from './menu/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioAddComponent } from './usuario/usuario-cadastro/usuario-cadastro.component';
import { ProdutoCadastroComponent } from './produto/produto-cadastro/produto-cadastro.component';
import { ProdutoPesquisaComponent } from './produto/produto-pesquisa/produto-pesquisa.component';
import { ProdutoEstoqueComponent } from './produto/produto-estoque/produto-estoque.component';
import { ProdutoCaixaComponent } from './produto/produto-caixa/produto-caixa.component';

// Application Routes
export const appRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'usuario-pesquisa', component: UsuarioComponent },
  { path: 'usuario-cadastro', component: UsuarioAddComponent },
  { path: 'usuario-cadastro/:id', component: UsuarioAddComponent },
  { path: 'produto-pesquisa', component: ProdutoPesquisaComponent },
  { path: 'produto-cadastro', component: ProdutoCadastroComponent },
  { path: 'produto-cadastro/:id', component: ProdutoCadastroComponent },
  { path: 'produto-estoque', component: ProdutoEstoqueComponent },
  { path: 'produto-caixa', component: ProdutoCaixaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    ProdutoPesquisaComponent,
    ProdutoCadastroComponent,
    ProdutoEstoqueComponent,
    ProdutoCaixaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,

    // PrimeNG Modules
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    PanelMenuModule,
    TerminalModule,
    TableModule,
    InputMaskModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    InputNumberModule,

    // Ngx Mask
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
