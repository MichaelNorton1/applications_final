import {Request, Response} from "express";

import jsdom from "jsdom";

export const statController = async (req: Request, res: Response) => {

    try {
        const getStats = await fetch('https://www.espn.com/nfl/stats/player/_/table/passing/sort/passingTouchdowns/dir/desc')
        let text = await getStats.text()
        let dom = new jsdom.JSDOM(text);
        const names = []

        let players = Array.from(dom.window.document.querySelectorAll('tr a'));
        let teams =Array.from(dom.window.document.querySelectorAll('tr span'));

        players.forEach((row:any,index) => {

            names.push([row.textContent,teams[index +2].textContent]);
        });



        let callStandings= await fetch("https://www.espn.com/nfl/standings/_/group/league")
        let standingsText = await callStandings.text()
        let standdingsDom= new jsdom.JSDOM(standingsText);
        let final=Array.from(standdingsDom.window.document.querySelectorAll('tr a abbr'));
        let standins = final.map((team,index) => {return team.innerHTML

        })

        return res.status(200).send([standins.slice(0,5),names.slice(0,5)] )

    } catch (err) {
        console.error(err)
    }

};
