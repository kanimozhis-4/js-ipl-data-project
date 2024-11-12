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
export function topEconomicalBowlers(year,n){
    const matchIdArray=getId(matches,year);
    const matchIdSet=new Set(matchIdArray)
    let bowlerEconomy={};
    let totalRun = deliveries.reduce((acc, deliver) => {  
        let run=Number(deliver.total_runs) 
       if(matchIdSet.has(deliver.match_id)){
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
    return bowlerEconomy
   

} 
let bowlerEconomy=topEconomicalBowlers(2015,10);
fs.writeFileSync('../public/output/topEconomicalBowlers.json', JSON.stringify(bowlerEconomy, null, 2), 'utf-8');
      
  