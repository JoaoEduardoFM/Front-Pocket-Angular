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
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ConfirmationService } from 'primeng/api';
import { NgxMaskDirective, NgxMaskPipe, } from 'ngx-mask';
 
// Componentes da aplicação
import { AppComponent } from './menu/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioAddComponent } from './usuario/usuario-cadastro/usuario-cadastro.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';  

// Definição das rotas
export const appRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'usuario-pesquisa', component: UsuarioComponent },
  { path: 'usuario-cadastro', component: UsuarioAddComponent },
  { path: 'usuario-cadastro/:id', component: UsuarioAddComponent }
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
    ConfirmDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    InputMaskModule,
    ProgressSpinnerModule,
    NgxMaskPipe,
    NgxMaskDirective,
    
    
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
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
