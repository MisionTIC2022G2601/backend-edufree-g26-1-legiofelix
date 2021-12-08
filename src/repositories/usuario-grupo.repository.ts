import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuarioGrupo, UsuarioGrupoRelations} from '../models';

export class UsuarioGrupoRepository extends DefaultCrudRepository<
  UsuarioGrupo,
  typeof UsuarioGrupo.prototype.id,
  UsuarioGrupoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UsuarioGrupo, dataSource);
  }
}
