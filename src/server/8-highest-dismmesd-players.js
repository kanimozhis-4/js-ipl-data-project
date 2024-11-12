import fs from 'fs';
import {matches} from"./1-matches-per-year.js";
import { deliveries } from './1-matches-per-year.js';
export function highestDismissedPlayer(){    
    let maxCount = 0;
    let result = {}; 
    const dismissedResult = deliveries.reduce((acc, deliver) => {  
        if (deliver.dismissal_kind!=="" && deliver.dismissal_kind !== "run out") {
            const batsman = deliver.batsman;
            const bowler = deliver.bowler;

            if (!acc[batsman]) {
                acc[batsman] = {};
            }
            if (!acc[batsman][bowler]) { 
                acc[batsman][bowler] = 1;
            } else { 
                acc[batsman][bowler] += 1; 
            }

            if (acc[batsman][bowler] > maxCount) {
                maxCount = acc[batsman][bowler];
                result = { batsman, bowler, dismissals: maxCount };
            }
        } 
        return acc;
    }, {});  
    fs.writeFileSync('../public/output/highestDismissedPlayer.json', JSON.stringify(result, null, 2), 'utf-8'); 


} 
highestDismissedPlayer();
