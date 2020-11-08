import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../../../common/funcionario'
import { FuncionarioService } from '../../services/FuncionarioService/funcionario.service'

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  funcionario: Funcionario = new Funcionario;
  funcL: Funcionario[] = [];
  cpfduplicado: boolean = false;

  constructor(private funcService: FuncionarioService) { }

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


}
