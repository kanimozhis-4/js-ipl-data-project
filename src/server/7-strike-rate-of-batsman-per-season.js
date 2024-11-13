import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
export function getSeason(){ 
    let seasonAndId=matches.reduce((acc,match)=>{ 
        acc[match.id]=match.season;
        return acc;
    },{}) 
    return seasonAndId;

}
export function strikeRateOfBatsmanPerSeason(seasonAndId){ 
    let runAndBall={};
    let strikeRateData=deliveries.reduce((playerStrike,deliver)=>{  
        let batsman=deliver.batsman;
        let run= Number(deliver.total_runs);
        let id=deliver.match_id;
        const season=seasonAndId[id];
       
        if(season in playerStrike){
            if(batsman in runAndBall[season]){
                runAndBall[season][batsman].runs +=run;
                runAndBall[season][batsman].balls += 1;
            } 
            else{
                runAndBall[season][batsman] = { runs: run, balls: 1 };
            }
        }  
        else{
            playerStrike[season] = {};
            runAndBall[season] = {};
            runAndBall[season][batsman] = { runs: run, balls: 1 };
        } 
        let totalRun=runAndBall[season][batsman].runs;
        let totalBall=runAndBall[season][batsman].balls;
        let strike=(totalRun/totalBall)*100;
        playerStrike[season][batsman]=strike;

        return playerStrike;
       
    },{} )   
    return  strikeRateData; 
   
}  
let seasonAndId=getSeason();   
let strikeRateData=strikeRateOfBatsmanPerSeason(seasonAndId);
fs.writeFileSync('../public/output/strikeRateOfBatsmanPerSeason.json', JSON.stringify(strikeRateData, null, 2), 'utf-8'); 
   







 