import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
export function playerOfMatchPerSeason(){ 
    let topPlayers={}; 
    let playerOfMatchCount={};
    const playerOfMatch=matches.reduce((acc,match)=>{ 
        if(match.season in acc){ 
            if(match.player_of_match in acc[match.season]){  
                acc[match.season][match.player_of_match]+=1; 
                if(playerOfMatchCount[match.season]<acc[match.season][match.player_of_match]){
                    playerOfMatchCount[match.season]=acc[match.season][match.player_of_match];
                    topPlayers[match.season]=match.player_of_match;
                }
            } 
            else{  

                acc[match.season][match.player_of_match]=1;
                
            }
        } 
        else{ 
            let obj={};
            obj[match.player_of_match]=1
            acc[match.season]=obj; 
            topPlayers[match.season]=match.player_of_match; 
            playerOfMatchCount[match.season]=1;
        } 
        return acc

    },{})    
    return topPlayers;
   
  

}  
let topPlayers=playerOfMatchPerSeason();
fs.writeFileSync('../public/output/playerOfMatchPerSeason.json', JSON.stringify(topPlayers, null, 2), 'utf-8');
