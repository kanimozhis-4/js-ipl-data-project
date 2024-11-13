import fs from 'fs';
import {matches} from "./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js'; 
function getBowlerEconomy(totalRunAndBall){
    let minCount=10; 
    let bestBowler={}; 
    let bowlerEconomy = Object.keys(totalRunAndBall).reduce((acc, bowler) => { 
      if(totalRunAndBall[bowler].economy<minCount){
          minCount=totalRunAndBall[bowler].economy; 
          bestBowler={};
          bestBowler[bowler]=totalRunAndBall[bowler].economy;
      }
      acc[bowler] = totalRunAndBall[bowler].economy;  
      return acc;
       }, {}); 
    return bestBowler;
}
export function bestEconomyBowlerSuperOver(){   
    let totalRunAndBall = deliveries.reduce((acc, deliver) => {  
        let run=Number(deliver.total_runs) 
        let bowler=deliver.bowler;
        if(deliver.is_super_over==1){
            if (bowler in acc) {  
                acc[bowler].runs += run;
                acc[bowler].balls += 1; 
            }
            else{
                acc[bowler] = { 
                    runs: run,
                    balls: 1 };
            }
            acc[bowler].economy = acc[bowler].runs / (acc[bowler].balls / 6);  
        }
        return acc; 
      }, {});   
     
   
      return totalRunAndBall
} 
let totalRunAndBall=bestEconomyBowlerSuperOver();
let bestBowler=getBowlerEconomy(totalRunAndBall);
fs.writeFileSync('../public/output/bestEconomyBowlerSuperOver.json', JSON.stringify(bestBowler, null, 2), 'utf-8');
      