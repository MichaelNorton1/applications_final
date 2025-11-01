import {neon} from '@neondatabase/serverless';
import {Request, Response} from "express";

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);


export const analyzeData = async (req: Request, res: Response) => {


    try {
        const rows = await sql`SELECT * FROM nfl ORDER BY id DESC;`; // optional ORDER BY
        return res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send('Internal Server Error');
    }}
