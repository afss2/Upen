import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../../../common/funcionario'
import { FuncionarioService } from '../../services/FuncionarioService/funcionario.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCadastro } from './dialog-cadastro.component';

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


  ngOnInit(): void {
    this.funcService.getFuncionarios().subscribe(
      funlist => {this.funcL = funlist;}
    )
  }

  CadastroDialogRef: MatDialogRef<DialogCadastro>

  openDialog() {
    this.CadastroDialogRef = this.dialog.open(DialogCadastro);

    this.CadastroDialogRef.afterClosed().subscribe(result => this.criarFuncionario(result))
                     
  }
  

}