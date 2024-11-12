import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
import {getId} from './3-extra-run-per-team.js';
export function getTopBowlers(totalRun,n){ 
    totalRun = Object.entries(totalRun);
    totalRun.sort((a, b) => a[1] - b[1]);
    totalRun = totalRun.slice(0, n);
    totalRun = Object.fromEntries(totalRun); 
    return totalRun

}  
export function topEconomicalBowlers(year,n){
    const matchIdArray=getId(matches,year);
    let bowlerEconomy={};
    let totalRun = deliveries.reduce((acc, deliver) => {  
        let run=Number(deliver.total_runs) 
       if(matchIdArray.includes(deliver.match_id)){
        if (!acc[deliver.bowler]) {
            acc[deliver.bowler] = { runs: 0, balls: 0 };
        }

        acc[deliver.bowler].runs += run;
        acc[deliver.bowler].balls += 1;

        acc[deliver.bowler].economy = acc[deliver.bowler].runs / (acc[deliver.bowler].balls / 6); 
        bowlerEconomy[deliver.bowler]=acc[deliver.bowler].economy;
       }
        return acc; 
      }, {});    
   
    bowlerEconomy=getTopBowlers(bowlerEconomy,n);
    fs.writeFileSync('../public/output/topEconomicalBowlers.json', JSON.stringify(bowlerEconomy, null, 2), 'utf-8');
      
  

} 
topEconomicalBowlers(2015,10);