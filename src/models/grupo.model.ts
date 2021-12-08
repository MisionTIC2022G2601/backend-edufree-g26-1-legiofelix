import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Asignatura} from './asignatura.model';
import {Usuario} from './usuario.model';
import {UsuarioGrupo} from './usuario-grupo.model';

@model()
export class Grupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  grupo: string;

  @property({
    type: 'string',
    required: true,
  })
  horario: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFinalizacion: string;

  @property({
    type: 'string',
    required: true,
  })
  periodoAcademico: string;

  @belongsTo(() => Asignatura)
  asignaturaId: string;

  @hasMany(() => Usuario, {through: {model: () => UsuarioGrupo}})
  grupoxusuarios: Usuario[];

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
