import {EntitySchema} from 'typeorm';
import {Checklist} from './Checklist.model';

export const ChecklistEntity = new EntitySchema({
  name: 'Checklist',
  target: Checklist,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    eid: {
      type: 'int',
      nullable: false,
    },
    type: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    data: {
      type: 'varchar',
      length: 10000,
      nullable: false,
    },
    timestamp: {
      type: 'date',
      nullable: false,
    },
  },
});
