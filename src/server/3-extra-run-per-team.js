import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
export function extraRunPerTeam(year){  
    const matchIdArray=matches.reduce((acc,match)=>{  
        if(match.season==year){ 
            acc.push(match.id)
        } 
        return acc;
    },[])
    const extraRun = deliveries.reduce((acc, deliver) => {  
        let run=Number(deliver.extra_runs)
        
       if(matchIdArray.includes(deliver.match_id)){
            if((deliver.bowling_team in acc) ){ 
               
                acc[deliver.bowling_team] +=Number(deliver.extra_runs);

            } 
            else{
                acc[deliver.bowling_team]=Number(deliver.extra_runs);
            } 
       }
        return acc; 
      }, {});  
     
      fs.writeFileSync('../public/output/extraRunPerTeam.json', JSON.stringify(extraRun, null, 2), 'utf-8');
      
  

} 
extraRunPerTeam(2016);