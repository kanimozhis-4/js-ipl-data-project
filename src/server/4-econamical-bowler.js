import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
import {getId} from './3-extra-run-per-team.js';
export function getTopBowlers(bowlerEconomy,n){ 
    bowlerEconomy = Object.entries(bowlerEconomy);
    bowlerEconomy.sort((a, b) => a[1] - b[1]);
    bowlerEconomy = bowlerEconomy.slice(0, n);
    bowlerEconomy = Object.fromEntries(bowlerEconomy); 
    return bowlerEconomy

}  
export function topEconomicalBowlers(matchIdSet){
   
    let bowlerEconomy={};
    let totalRun = deliveries.reduce((acc, deliver) => {  
        let run=Number(deliver.total_runs) 
        let bowler=deliver.bowler;
        let matchId=deliver.match_id;
        if(matchIdSet.has(matchId)){  
            if(bowler in acc){
                acc[bowler].runs +=run;
                acc[bowler].balls +=1;
            } 
            else{
                acc[bowler] = { 
                    runs: run, 
                    balls: 1 
                };
            }  
            let totalRuns=acc[bowler].runs
            let totalBalls=acc[bowler].balls
            acc[bowler].economy= totalRuns / ( totalBalls / 6);
            bowlerEconomy[bowler]=acc[bowler].economy;

        }
        return acc; 
      }, {});    
    return bowlerEconomy
} 
const matchIdArray=getId(2015);
const matchIdSet=new Set(matchIdArray)
let bowlerEconomy=topEconomicalBowlers(matchIdSet);
let topBowler=getTopBowlers(bowlerEconomy,10); 
fs.writeFileSync('../public/output/topEconomicalBowlers.json', JSON.stringify(topBowler, null, 2), 'utf-8');
      
  