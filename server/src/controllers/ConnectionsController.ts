/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import db from '../db/connection';

export default class ConnectionsController {
  // eslint-disable-next-line class-methods-use-this
  async index(_req: Request, res: Response) {
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];

    return res.json({ total });
  }

  // eslint-disable-next-line class-methods-use-this
  async create(req: Request, res: Response) {
    // eslint-disable-next-line camelcase
    const { user_id } = req.body;

    await db('connections').insert({
      user_id,
    });

    return res.status(201).send();
  }
}
