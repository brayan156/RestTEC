export class LoginComunication {
  correoElectronico: string;
  password: string;
  tipo: string;
  cedula: string;

  public constructor(correo, password) {
    this.correoElectronico = correo;
    this.password = password;
  }

  public setTipo(dato: string): void {
    this.tipo = dato;
  }
  public setCedula(dato: string): void{
    this.cedula = dato;
  }
}
