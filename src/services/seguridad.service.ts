import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Credenciales, Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
//Código añadido
const jwt = require('jsonwebtoken');


@injectable({ scope: BindingScope.TRANSIENT })
export class SeguridadService {

  constructor(
    @repository(UsuarioRepository) public usuarioRepositorio: UsuarioRepository
  ) { }

  //Validar que un usuario exista

  //Generar un token

  //Validar token
  async ValidarUsuario(credenciales: Credenciales) {

    try {
      const usuarioEncontrado = await this.usuarioRepositorio.findOne(
        {
          where: {
            email: credenciales.email,
            clave: credenciales.clave
          }

        }
      );
      if (usuarioEncontrado) {
        return usuarioEncontrado
      } else {

        return false;

      }

    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async GenerarToken(usuario: Usuario) {
    const token = jwt.sign({
      data: {
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email
      }
    }, '%$%%$hjsdhssd@#');

    return token;
  }


  ValidarToken() {
    
  }
  /*
   * Add service methods here
   */
}
