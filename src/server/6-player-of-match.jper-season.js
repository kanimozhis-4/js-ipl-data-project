import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
export function playerOfMatchPerSeason(){ 
    let topPlayers={}; 
    let playerOfMatchCount={};
    const playerOfMatch=matches.reduce((acc,match)=>{ 
        let season=match.season; 
        let player=match.player_of_match;
        if(season in acc){ 
            if(player in acc[season]){  
                acc[season][player]+=1; 
                if(playerOfMatchCount[season]<acc[season][player]){
                    playerOfMatchCount[season]=acc[season][player];
                    topPlayers[season]=player;
                }
            } 
            else{  
                acc[season][player]=1;
            }
        } 
        else{ 
            acc[season]={};
            acc[season][player]=1 
            topPlayers[season]=player; 
            playerOfMatchCount[season]=1;
        } 
        return acc

    },{})    
    return topPlayers;
}  
let topPlayers=playerOfMatchPerSeason();
fs.writeFileSync('../public/output/playerOfMatchPerSeason.json', JSON.stringify(topPlayers, null, 2), 'utf-8');
