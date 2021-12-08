import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UsuarioGrupo} from '../models';
import {UsuarioGrupoRepository} from '../repositories';

export class UsuarioGrupoController {
  constructor(
    @repository(UsuarioGrupoRepository)
    public usuarioGrupoRepository : UsuarioGrupoRepository,
  ) {}

  @post('/usuario-grupos')
  @response(200, {
    description: 'UsuarioGrupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioGrupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioGrupo, {
            title: 'NewUsuarioGrupo',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioGrupo: Omit<UsuarioGrupo, 'id'>,
  ): Promise<UsuarioGrupo> {
    return this.usuarioGrupoRepository.create(usuarioGrupo);
  }

  @get('/usuario-grupos/count')
  @response(200, {
    description: 'UsuarioGrupo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioGrupo) where?: Where<UsuarioGrupo>,
  ): Promise<Count> {
    return this.usuarioGrupoRepository.count(where);
  }

  @get('/usuario-grupos')
  @response(200, {
    description: 'Array of UsuarioGrupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioGrupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioGrupo) filter?: Filter<UsuarioGrupo>,
  ): Promise<UsuarioGrupo[]> {
    return this.usuarioGrupoRepository.find(filter);
  }

  @patch('/usuario-grupos')
  @response(200, {
    description: 'UsuarioGrupo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioGrupo, {partial: true}),
        },
      },
    })
    usuarioGrupo: UsuarioGrupo,
    @param.where(UsuarioGrupo) where?: Where<UsuarioGrupo>,
  ): Promise<Count> {
    return this.usuarioGrupoRepository.updateAll(usuarioGrupo, where);
  }

  @get('/usuario-grupos/{id}')
  @response(200, {
    description: 'UsuarioGrupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioGrupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsuarioGrupo, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuarioGrupo>
  ): Promise<UsuarioGrupo> {
    return this.usuarioGrupoRepository.findById(id, filter);
  }

  @patch('/usuario-grupos/{id}')
  @response(204, {
    description: 'UsuarioGrupo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioGrupo, {partial: true}),
        },
      },
    })
    usuarioGrupo: UsuarioGrupo,
  ): Promise<void> {
    await this.usuarioGrupoRepository.updateById(id, usuarioGrupo);
  }

  @put('/usuario-grupos/{id}')
  @response(204, {
    description: 'UsuarioGrupo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarioGrupo: UsuarioGrupo,
  ): Promise<void> {
    await this.usuarioGrupoRepository.replaceById(id, usuarioGrupo);
  }

  @del('/usuario-grupos/{id}')
  @response(204, {
    description: 'UsuarioGrupo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioGrupoRepository.deleteById(id);
  }
}
