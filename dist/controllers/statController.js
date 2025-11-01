import jsdom from "jsdom";
export const statController = async (req, res) => {
    try {
        const getStats = await fetch('https://www.espn.com/nfl/stats/player/_/table/passing/sort/passingTouchdowns/dir/desc');
        let text = await getStats.text();
        let dom = new jsdom.JSDOM(text);
        const names = [];
        let players = Array.from(dom.window.document.querySelectorAll('tr a'));
        let teams = Array.from(dom.window.document.querySelectorAll('tr span'));
        players.forEach((row, index) => {
            names.push([row.textContent, teams[index + 2].textContent]);
        });
        let callStandings = await fetch("https://www.espn.com/nfl/standings/_/group/league");
        let standingsText = await callStandings.text();
        let standdingsDom = new jsdom.JSDOM(standingsText);
        let final = Array.from(standdingsDom.window.document.querySelectorAll('tr'));
        return res.status(200).send(final[1].textContent);
    }
    catch (err) {
        console.error(err);
    }
};
