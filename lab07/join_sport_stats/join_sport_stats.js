function makeTeamList(teamData, namesData, teamsData) {
    var teamList = [];
    for (n in teamsData) {
        if (teamData.team.id == teamsData[n].id) {
            var team = teamsData[n].team
			team = team.concat(", coached by ");    
        }
    }
	var teamAndCoach = team.concat(teamData.team.coach)
    teamList.push(teamAndCoach);
    var players = [];
    for (x in namesData) {
        players.push({"names": namesData[x].name, 
                           "matches": teamData.players[x].matches});
    }
    players.sort(function(m, n){return n.matches - m.matches;});
    for (x in players) {
		var counter = parseInt(x) + 1
        var str = (counter).toString()
		str = str.concat(". ");
		str = str.concat(players[x].names)
        teamList.push(str);
    }
    return teamList;
}

const teamJson = process.argv[2];
const namesJson = process.argv[3];
const teamsJson = process.argv[4];
if (teamJson === undefined || namesJson === undefined || teamsJson === undefined) {
  throw new Error(`input not supplied`);
}

// some sample data
const team  = require(`./${teamJson}`);
const names  = require(`./${namesJson}`);
const teams  = require(`./${teamsJson}`);
console.log(makeTeamList(team, names.names, teams.teams));
