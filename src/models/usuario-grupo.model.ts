import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioGrupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  calificacion?: number;

  @property({
    type: 'string',
    required: true,
  })
  rolProceso: string;

  @property({
    type: 'string',
  })
  grupoId?: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  constructor(data?: Partial<UsuarioGrupo>) {
    super(data);
  }
}

export interface UsuarioGrupoRelations {
  // describe navigational properties here
}

export type UsuarioGrupoWithRelations = UsuarioGrupo & UsuarioGrupoRelations;
