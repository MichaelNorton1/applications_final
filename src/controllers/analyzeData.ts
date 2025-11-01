import {neon} from '@neondatabase/serverless';
import {Request, Response} from "express";

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);


export const analyzeData = async (req: Request, res: Response) => {


    try {
        const rows = await sql`SELECT * FROM nfl ORDER BY id DESC;`; // optional ORDER BY


// Build HTML
        let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>NFL Correlation Report</title>
  <style>
    body { font-family: Arial, sans-serif; background: #fafafa; padding: 20px; color: #333; }
    h1 { text-align: center; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
    th { background: #f0f0f0; }
    tr:nth-child(even) { background: #f9f9f9; }
    .no-corr { color: red; }
    .corr { color: green; font-weight: bold; }
  </style>
</head>
<body>
  <h1>NFL Team ↔ QB Correlation Report</h1>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Top Teams</th>
        <th>QB Teams</th>
        <th>Correlation</th>
      </tr>
    </thead>
    <tbody>
`;

        for (const row of rows) {
            const [teams, qbs] = row.data;
            const qbTeams = qbs.map(([_, team]:string) => team);
            const correlated = teams.filter((team: any) => qbTeams.includes(team));

            html += `
    <tr>
      <td>${row.id}</td>
      <td>${new Date(row.date).toLocaleDateString()}</td>
      <td>${teams.join(', ')}</td>
      <td>${qbTeams.join(', ')}</td>
      <td class="${correlated.length ? 'corr' : 'no-corr'}">
        ${correlated.length ? correlated.join(', ') : 'None'}
      </td>
    </tr>
  `;
        }

        html += `
    </tbody>
  </table>
</body>
</html>
`;

        console.log(html);


        return html;
    } catch (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send('Internal Server Error');
    }}
