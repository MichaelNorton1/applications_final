import {neon} from '@neondatabase/serverless';
import {Request, Response} from "express";

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;
import EventEmitter from 'events';
export const appEvents = new EventEmitter();
const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);

export async function getPgVersion(req: Request, res: Response) {


    try {

        const authHeader = req.get('Authorization'); // ✅ Express-safe
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return res.status(401).end('Unauthorized');
        }

        const getTop5 = await fetch('https://applications-final.vercel.app/api/nfl')

        const top5 = await getTop5.json();


        await sql`
            INSERT INTO nfl (data, date)
            VALUES (${JSON.stringify(top5)}::json, CURRENT_DATE);
        `;
        appEvents.emit('nfl:inserted', { id: new Date(), date: new Date() });
        console.log('teams logged successfully.');


        return res.status(200).send(top5)
    } catch (e) {
        console.error(e);

    }


}


