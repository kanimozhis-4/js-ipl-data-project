import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
export function getId(year){
    const matchIdArray=matches.reduce((acc,match)=>{  
        if(match.season==year){ 
            acc.push(match.id)
        } 
        return acc;
    },[]) 
    return matchIdArray;
}
export function extraRunPerTeam(matchIdSet){  
    
    const extraRun = deliveries.reduce((acc, deliver) => {  
        let run=Number(deliver.extra_runs)
        let bowlingTeam=deliver.bowling_team;
        let matchId=deliver.match_id;
        
        if(matchIdSet.has(matchId)){
            if((bowlingTeam in acc) ){   
                acc[bowlingTeam] +=run;
            } 
            else{
                acc[bowlingTeam]=run;
            } 
        }
        return acc; 
    }, {}); 
    return extraRun;  
}  
const matchIdArray=getId(2016);
const matchIdSet=new Set(matchIdArray);
let extraRun=extraRunPerTeam(matchIdSet);
fs.writeFileSync('../public/output/extraRunPerTeam.json', JSON.stringify(extraRun, null, 2), 'utf-8');
      
  