import {getRepository} from 'typeorm/browser';

export class Checklist {
  constructor(id, eid, type, data, timestamp = new Date()) {
    this.id = id;
    this.eid = eid;
    this.type = type;
    this.data = data;
    this.timestamp = timestamp;
  }
}

/**
 * Fetches all saved checklists responses
 */
export const getLocalChecklists = async query => {
  const checklistRepository = getRepository(Checklist);
  let result = await checklistRepository.find(query);
  return result;
};

/**
 *
 * @param {number} eid Equipment id
 * @param {('PRE_CRUISE'|'PRE_DEPLOYMENT'|'DEPLOYMENT'|'POST_RETRIEVAL'|'WEEKLY_SERVICE'|'MONTHLY_SERVICE'|'QUARTERLY_SERVICE'|'YEARLY_SERVICE'|'DRY_DOCK')} type Type of checklist
 * @param {JSON} data JSON data containing responses
 */
export const saveLocalChecklist = async (
  eid,
  type,
  data,
  timestamp = new Date(),
) => {
  const checklistRepository = getRepository(Checklist);
  const newChecklist = new Checklist();
  newChecklist.eid = eid;
  newChecklist.type = type;
  newChecklist.data = JSON.stringify(data);
  newChecklist.timestamp = timestamp;
  await checklistRepository.save(newChecklist);
};

/**
 * Delete local checks
 */
export const deleteLocalChecklists = async () => {
  await checklistRepository.clear();
};
