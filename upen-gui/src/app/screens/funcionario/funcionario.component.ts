import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../../../common/funcionario'
import { FuncionarioService } from '../../services/FuncionarioService/funcionario.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCadastro } from './dialogs/dialog-cadastro.component';
import { DialogAtribuir } from './dialogs/dialog-atribuir.component';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionario: Funcionario = new Funcionario;
  funcL: Funcionario[] = [];
  cpfduplicado: boolean = false;

  constructor(private funcService: FuncionarioService, public dialog: MatDialog) { }

  criarFuncionario(func: Funcionario) {
      this.funcService.criarFuncionario(func).subscribe (
        afterCheck => {
          if (afterCheck) {
            this.funcL.push(afterCheck);
            this.funcionario = new Funcionario;
          } else {
            this.cpfduplicado = true;
          }
        }
      )
  }

  deletarFuncionario(func: Funcionario) {
    this.funcService.deletarFuncionario(func).subscribe(

      () => alert("Funcionario deletado"));
      var index = this.funcL.findIndex(f => f.cpf == func.cpf);
      this.funcL.splice(index,1);
    
}

  ngOnInit(): void {
    this.funcService.getFuncionarios().subscribe(
      funlist => {this.funcL = funlist;}
    )
  }

  CadastroDialogRef: MatDialogRef<DialogCadastro>
  AtribDialogRef: MatDialogRef<DialogAtribuir>

  openDialogCadastro() {
    this.CadastroDialogRef = this.dialog.open(DialogCadastro);

    this.CadastroDialogRef.afterClosed().subscribe(
      result => 
       {
          if (result != null) { this.criarFuncionario(result) }
      }
      )
                     
  }

  openDialogAtrib(func: Funcionario) {
    
    this.AtribDialogRef = this.dialog.open(DialogAtribuir, {data: func, height:"400px",width:"400px"});

    /*this.AtribDialogRef.afterClosed().subscribe*/
  }
  

}