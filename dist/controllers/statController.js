export const statController = async (req, res) => {
    try {
        const getStats = await fetch('https://www.espn.com/nfl/stats/player');
        console.log(await getStats.text());
        let data = await getStats.json();
        // const nfl=data.leagues.find((league: { id: number; })=>league.id==28)
        return res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
    }
};
