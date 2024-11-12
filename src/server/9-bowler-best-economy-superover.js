import fs from 'fs';
import {matches} from "./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js'; 
function getBowlerEconomy(totalRun){
    let minCount=10; 
    let bestBowler={}; 
    let bowlerEconomy = Object.keys(totalRun).reduce((acc, bowler) => { 
      if(totalRun[bowler].economy<minCount){
          minCount=totalRun[bowler].economy; 
          bestBowler={};
          bestBowler[bowler]=totalRun[bowler].economy;
      }
      acc[bowler] = totalRun[bowler].economy;  
      return acc;
       }, {}); 
    return bestBowler;
}
export function bestEconomyBowlerSuperOver(){  
    let totalRun = deliveries.reduce((acc, deliver) => {  
        let run=Number(deliver.total_runs) 
       if(deliver.is_super_over==1){
        if (!acc[deliver.bowler]) {
            acc[deliver.bowler] = { runs: 0, balls: 0 };
        }

        acc[deliver.bowler].runs += run;
        acc[deliver.bowler].balls += 1;

        acc[deliver.bowler].economy = acc[deliver.bowler].runs / (acc[deliver.bowler].balls / 6); 
       }
        return acc; 
      }, {});   
     
      let bestBowler=getBowlerEconomy(totalRun);
     
     
      fs.writeFileSync('../public/output/bestEconomyBowlerSuperOver.json', JSON.stringify(bestBowler, null, 2), 'utf-8');
      
  

} 
bestEconomyBowlerSuperOver();