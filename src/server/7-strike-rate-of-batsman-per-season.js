import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
export function getSeason(id,matches){
    let value=0;
    const season=matches.reduce((acc,match)=>{ 
        if(match.id===id){
            return match.season;
        } 
        return acc;
    },0) 
    return season;

}
export function strikeRateOfBatsmanPerSeason(){ 
    
    let strikeRateData=deliveries.reduce((playerStrikeRate,deliver)=>{  
        const season=getSeason(deliver.match_id,matches);   
       
         if (!playerStrikeRate.playerStrike[season]) {
            playerStrikeRate.playerStrike[season] = {};
            playerStrikeRate.runAndBall[season] = {};
        }

        if (!playerStrikeRate.runAndBall[season][deliver.batsman]) {
            playerStrikeRate.runAndBall[season][deliver.batsman] = { run: 0, balls: 0 };
            playerStrikeRate.playerStrike[season][deliver.batsman]=0;
        }

        playerStrikeRate.runAndBall[season][deliver.batsman].run += Number(deliver.total_runs);
        playerStrikeRate.runAndBall[season][deliver.batsman].balls += 1;
        let strike=(playerStrikeRate.runAndBall[season][deliver.batsman].run/playerStrikeRate.runAndBall[season][deliver.batsman].balls)*100;
        playerStrikeRate.playerStrike[season][deliver.batsman]=strike;

        return playerStrikeRate;
       
    },{ playerStrike: {}, runAndBall: {} })    

    fs.writeFileSync('../public/output/strikeRateOfBatsmanPerSeason.json', JSON.stringify(strikeRateData.playerStrike, null, 2), 'utf-8'); 
   

}  
strikeRateOfBatsmanPerSeason('../data/matches.json','../data/deliveries.json');






 