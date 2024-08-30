import { Component } from '@angular/core';
import { LoginServiceService } from '../service/login-service-service';
import { Message, MessageService } from 'primeng/api';

export interface Usuario {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  messages: Message[];

  Usuario: Usuario = { username: '', password: '' };

  constructor(private messageService: MessageService, private loginservice: LoginServiceService) { }

  public login() {
    this.messages= [];
    if (this.Usuario.username != 'adm' && this.Usuario.password != 'adm') {
      this.showWarningMessage('Credenciais inválidas');
    } else {
      this.loginservice.login(this.Usuario);
    }

  }
  showWarningMessage(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: detail, life: 3000 });
  }
}
