import { Component } from "@angular/core";
import { Funcionario } from '../../../../../common/funcionario'
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'


@Component({
    selector: 'dialog-cadastro',
    templateUrl: 'dialog-cadastro.html'
  })
  export class DialogCadastro {

    form: FormGroup;
    funcionario: Funcionario = new Funcionario;

    constructor(
        private FormBuilder: FormBuilder,
        private dialogRef: MatDialogRef<DialogCadastro> ) {}

        ngOnInit() {
            this.form = this.FormBuilder.group({
                nome: ['',
                        Validators.compose([
                            Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(60)
                ])
            ],
                cpf: ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(11),
                    Validators.pattern('^[0-9]*$')
                ])
            ],
                funcao: ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(20)
                ])
            ],
                telefone: ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(11),
                    Validators.pattern('^[0-9]*$')
                ])
            ],
                veiculos: ''
            })
        }
    
        submit(form) {
            this.dialogRef.close(this.form.value);
        }
  }