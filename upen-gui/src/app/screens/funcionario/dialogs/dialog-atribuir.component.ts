import { Component, Inject } from "@angular/core";
import { Funcionario } from '../../../../../../common/funcionario';
import { Veiculo } from '../../../../../../common/veiculo';
import { FuncionarioService } from '../../../services/FuncionarioService/funcionario.service'
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
    selector: 'dialog-atribuir',
    templateUrl: 'dialog-atribuir.html'
  })
  export class DialogAtribuir {

    listaVeic: Veiculo[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public func: Funcionario,
        private dialogRef: MatDialogRef<DialogAtribuir>, 
        private funcService: FuncionarioService ) {}

        ngOnInit() {
          this.funcService.listarVeiculos().subscribe(
            veiclist => {this.listaVeic = veiclist;}
          )
        }
    
        jaatribuiu(veic: Veiculo) {
          if (this.func.veiculos.find(v => v.placa == veic.placa)) {
            return true;
          } else {
            return false;
          }
        };

        atribuir(veic: Veiculo) {
          console.log("indo")
          this.funcService.atribuirVeiculo(this.func,veic).toPromise()
          
        }
        
    
}