import {neon} from '@neondatabase/serverless';
import {Request, Response} from "express";
const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);

export async function getPgVersion( req: Request, res: Response ) {


try {

    const getTop5= await fetch('/api/nfl')

    const top5 = await getTop5.json();

    return res.status(200).send(top5)
}catch (e) {
    console.error(e);

}



}


