export class LoginComunication {
  correoElectronico: string;
  password: string;
  tipo: string;
  cedula: string;

  public constructor(correo, password, tipo) {
    this.correoElectronico = correo;
    this.password = password;
    this.tipo = tipo;
  }

  public setTipo(dato: string): void {
    this.tipo = dato;
  }
  public setCedula(dato: string): void{
    this.cedula = dato;
  }
}
