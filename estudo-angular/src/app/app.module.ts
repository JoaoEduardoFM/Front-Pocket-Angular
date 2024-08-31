import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

// Componentes PrimeNG
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

// Componentes da aplicação
import { AppComponent } from './menu/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario-pesquisa/usuario.component';
import { UsuarioAddComponent } from './usuario/usuario-cadastro/usuarioAdd.component'; 

// Definição das rotas
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'user', component: UsuarioComponent },
  { path: 'usuarioAdd', component: UsuarioAddComponent },
  { path: 'usuarioAdd/:id', component: UsuarioAddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    
    // PrimeNG Modules
    TableModule,
    TerminalModule,
    ToastModule,
    PanelMenuModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
