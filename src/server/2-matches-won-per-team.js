import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
export function matchesWonPerTeam(){  
    const countByYear = matches.reduce((acc, match) => { 
        if(match.winner===''){
            return acc;
        }
    
        if(! (match.season in acc)){
            let team={} 
            team[match.winner]=1;
            acc[match.season]=team;
            
        }  
        else if(match.winner in acc[match.season]){ 
            acc[match.season][match.winner]+=1;
        }
        else{ 
           
            acc[match.season][match.winner]=1;
        } 
        return acc; 
      }, {}); 
      fs.writeFileSync('../public/output/matchesWonPerTeam.json', JSON.stringify(countByYear, null, 2), 'utf-8');
      
  

} 
matchesWonPerTeam();