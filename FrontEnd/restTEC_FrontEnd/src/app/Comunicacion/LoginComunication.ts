export class LoginComunication {
  Email: string;
  Password: string;
  Rol: string;
  Cedula: number;



  public constructor(correo, Password, Rol) {
    this.Email = correo;
    this.Password = Password;
    this.Rol = Rol;
  }

  public setTipo(dato: string): void {
    this.Rol = dato;
  }
  public setCedula(dato: number): void{
    this.Cedula = dato;
  }


}
