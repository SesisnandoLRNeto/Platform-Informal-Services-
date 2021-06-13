/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Response, Request } from 'express';

import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from "../db/connection";

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string,
}

export default class WorksController {
  async index(req: Request, res: Response) {
    const filters = req.query;

    const type_service = filters.type_service as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.type_service || !filters.time) {
      return res.status(400).json({
        error: 'Missing filters to search works',
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const works = await db('works')
      .whereExists(function () {
        this.select('work_schedule.*')
          .from('work_schedule')
          .whereRaw('`work_schedule`.`work_id`')
          .whereRaw('`work_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`work_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`work_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('works.type_service', '=', type_service)
      .join('informal_workers', 'works.informal_workers_id', '=', 'informal_workers.id')
      .select(['works.*', 'informal_workers.*']);

    return res.json(works);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      address,
      bio,
      type_service,
      cost,
      schedule,
    } = req.body;

    console.log(name, schedule, cost, bio)

    const trx = await db.transaction();

    try {
      const insertedInformalWorkersIds = await trx('informal_workers').insert({
        name,
        avatar,
        whatsapp,
        address,
        bio,
      });
      const informal_workers_id = insertedInformalWorkersIds[0];

      const insertedWorksId = await trx('works').insert({
        type_service,
        cost,
        informal_workers_id,
      });
      const work_id = insertedWorksId[0];

      const workSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
        work_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      }));

      await trx('work_schedule').insert(workSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      await trx.rollback();

      return res.status(400).json({ error: 'Unexpected error while creating new work.' });
    }
  }
}
