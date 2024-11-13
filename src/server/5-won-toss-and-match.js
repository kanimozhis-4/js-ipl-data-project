import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
export function teamWonTossAndMatch(){
    const teams = matches.reduce((acc, match) => {  
        let winner=match.winner;
        let tossWinner=match.toss_winner;
        if(winner==tossWinner){
            if(winner in acc){
                acc[winner]+=1;
            }  
            else{
                acc[winner]=1;
            } 
        } 
        return acc; 
    },{});  
    return teams;
} 
let teams=teamWonTossAndMatch();
fs.writeFileSync('../public/output/teamWonTossAndMatch.json', JSON.stringify(teams, null, 2), 'utf-8');
      
  