import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';  // Import do Router
import { User } from '../model/user';

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
  error: boolean;
  Usuario: Usuario = { username: '', password: '' };
  user: User;

  constructor(
    private messageService: MessageService, 
    private usuarioService: UsuarioService, 
    private router: Router  // Injeção do Router
  ) { }

  public login() {
    this.error = false;
    this.messages = [];

    if (this.Usuario.username == '') {
      this.error = true;
      this.showWarningMessage('O login deve ser informado.');
    }

    if (this.Usuario.password == '') {
      this.error = true;
      this.showWarningMessage('A senha deve ser informada.');
    }

    if (this.error) {
      return;
    }

    this.usuarioService.getLoginAndSenha(this.Usuario.username, this.Usuario.password).subscribe(
      (data) => {
        if (!data || data.length === 0) {
          console.log(data);
          this.user = data;
          this.showWarningMessage('Credenciais inválidas.');
          return;
        }
        console.log(data);
        
        const randomValue = Math.floor(Math.random() * 1000);
        this.router.navigate(['/home/' + randomValue]);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  showWarningMessage(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: detail, life: 3000 });
  }
}
