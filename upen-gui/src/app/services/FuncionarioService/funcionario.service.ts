import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Funcionario } from '../../../../../common/funcionario';

@Injectable()
export class FuncionarioService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private servURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    criarFuncionario(func: Funcionario): Observable<Funcionario> {
        return this.http.post<any>(this.servURL + "/funcionarios", func, {headers: this.headers})
                    .pipe(
                        retry(2),
                        map( res => {if (res.success) {return func;} else {return null;}} )
                    )

    }

    getFuncionarios(): Observable<Funcionario[]> {
        return this.http.get<Funcionario[]>(this.servURL + "/funcionarios")
                  .pipe(
                     retry(2)
                   );
    
        }

    deletarFuncionario(func: Funcionario): Observable<any> {
        return this.http.delete<any>(this.servURL + "/funcionarios/" + func.cpf, {headers: this.headers}).pipe(
          retry(2)
        );
      }

}
