import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  listUsers: any[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _UsuarioService : UsuarioService )
  {
    this.form = this.fb.group({
    nombres:['', Validators.required],
    apellidos:['', Validators.required],
    fechaDeNacimiento:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    fotosDeUsuario:['',],
    estadoCivil:[''],
    tieneHermanos:['']
  })
  }
 ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.
   this.ObtenerUsuario();
 }

  ObtenerUsuario ()
  {
    this._UsuarioService.getListUsuarios().subscribe(data => 
      {
        console.log(data);
        this.listUsers = data;
      },error => {
        console.log(error);
      })
  }

  agregarUsuario(){
    const usuario: any = 
    {
      nombres : this.form.get('nombres')?.value,
      apellidos : this.form.get('apellidos')?.value,
      fechaDeNacimiento : this.form.get('fechaDeNacimiento')?.value,
      fotosDeUsuario: this.form.get('fotosDeUsuario')?.value,
      estadoCivil: this.form.get('estadoCivil')?.value,
      tieneHermanos: this.form.get('estadoCivil')?.value
    }
  this.listUsers.push(usuario);
  this.toastr.success('El usuario fue registrado con exito!', 'Usuario agregado!');
  this.form.reset();
  }

  eliminarusuario(index : number){
   this.listUsers.splice(index,1);
   this.toastr.error('El usuario fue eliminado con exito!', 'Usuario eliminado!');
  }
}
