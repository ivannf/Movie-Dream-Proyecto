/**
 * @class Usuario
 * Contiene los datos del formulario para registrar un usuario.
 */
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public confirmPassword: string
    )   {  }

}