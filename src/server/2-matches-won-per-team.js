import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
export function matchesWonPerTeam(){  
    const winnerCountByYear = matches.reduce((acc, match) => { 
        let season=match.season;
        let winner=match.winner;
        if(winner===''){
            return acc;
        }
        if(season in acc){  
            if(winner in acc[season]){ 
                acc[season][winner]+=1; 
            } 
            else{
                acc[season][winner]=1;
            }
        } 
        else{ 
            let team={} 
            team[winner]=1;
            acc[season]=team;

        }
        return acc; 
    }, {});  
    return winnerCountByYear;
     
} 
let winnerCountByYear= matchesWonPerTeam();
fs.writeFileSync('../public/output/matchesWonPerTeam.json', JSON.stringify(winnerCountByYear, null, 2), 'utf-8');
      