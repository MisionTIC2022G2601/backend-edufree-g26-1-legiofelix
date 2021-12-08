import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Grupo, GrupoRelations, Asignatura, Usuario, UsuarioGrupo} from '../models';
import {AsignaturaRepository} from './asignatura.repository';
import {UsuarioGrupoRepository} from './usuario-grupo.repository';
import {UsuarioRepository} from './usuario.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly asignatura: BelongsToAccessor<Asignatura, typeof Grupo.prototype.id>;

  public readonly grupoxusuarios: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          UsuarioGrupo,
          typeof Grupo.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>, @repository.getter('UsuarioGrupoRepository') protected usuarioGrupoRepositoryGetter: Getter<UsuarioGrupoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Grupo, dataSource);
    this.grupoxusuarios = this.createHasManyThroughRepositoryFactoryFor('grupoxusuarios', usuarioRepositoryGetter, usuarioGrupoRepositoryGetter,);
    this.registerInclusionResolver('grupoxusuarios', this.grupoxusuarios.inclusionResolver);
    this.asignatura = this.createBelongsToAccessorFor('asignatura', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignatura', this.asignatura.inclusionResolver);
  }
}
