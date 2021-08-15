/* eslint-disable quotes */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
import { Response, Request } from 'express';

// eslint-disable-next-line import/extensions
import convertHourToMinutes from '../utils/convertHourToMinutes';
import db from '../db/connection';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
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
      .whereExists(function() {
        this.select('work_schedule.*')
          .from('work_schedule')
          .whereRaw('`work_schedule`.`work_id`')
          .whereRaw('`work_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`work_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`work_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('works.type_service', '=', type_service)
      .join(
        'informal_workers',
        'works.informal_workers_id',
        '=',
        'informal_workers.id',
      )
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

    console.log(name, schedule, cost, bio);

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

      return res
        .status(400)
        .json({ error: 'Unexpected error while creating new work.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id }  = req.params;

    const find =  await db('works').where('id', id)

    if(find.length > 0) {
      try{
        const deleted = await db('works').where('id', id).delete();
        res.status(200).json({
          deleted,
          message: 'Delete has successful',
        })
      }
      catch(error) {
        res.status(405).json({ error, message: 'Error: Not delete'})
      }
      
    } else res.status(404).json({ error, message: 'Error: Not found'})
    
  }
  
  async update(req: Request, res: Response) {
    const { id }  = req.params;
    const { name, whatsapp, address, bio, type_service, schedule, avatar } = req.body

    const find: any = await db('works')
    .whereExists(function() {
      this.select('work_schedule.*')
        .from('work_schedule')
        .whereRaw('`work_schedule`.`work_id`')
    })
    .where('works.type_service', '=', type_service)
    .join(
      'informal_workers',
      'works.informal_workers_id',
      '=',
      'informal_workers.id',
    )
    .select(['works.*', 'informal_workers.*']);

    console.log(find)

    if(find.length > 0) {
     
      try{
       const { cost, type_service } = find
       const updated = await db('informal_workers')
        .where('id', id)
        .update({ name, whatsapp, address, cost, bio, type_service, schedule, avatar } )
       
         if(updated) res.status(200).json({ message: `Rows has updated ${updated}`, name, whatsapp, address, cost, bio, type_service, schedule, avatar } ) 
          else res.status(404).json({message: "Record not found"})
        
      }
      catch(error) {
        res.status(405).json({ error, message: 'Error: Not update'})
      }   
    } else {
      res.status(404).json({ error: 'Error: Not found'})
    }
  }
    
}
