/**
 * @class Person
 * Contiene los datos del formulario para registrar una persona
 */
export class Usuario {

    constructor(
        public username: string,
        public surname: string,
        public email: string,
        public contra: string
    )   {  }

}