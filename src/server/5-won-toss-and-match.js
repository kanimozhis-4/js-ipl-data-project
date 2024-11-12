import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
export function teamWonTossAndMatch(){
    const teams = matches.reduce((acc, match) => {  
        if(match.winner==match.toss_winner){
            if(match.winner in acc){
                acc[match.winner]+=1;
            }  
            else{
                acc[match.winner]=1;
            } 
        }
        
        return acc; 
      },{});  
      console.log(teams);
     
      fs.writeFileSync('../public/output/teamWonTossAndMatch.json', JSON.stringify(teams, null, 2), 'utf-8');
      
  

} 
teamWonTossAndMatch();