
import fs from 'fs';
const data = fs.readFileSync('../data/matches.json', 'utf-8'); 
export const matches = JSON.parse(data);  
const deliveriesData = fs.readFileSync('../data/deliveries.json', 'utf-8');
export const deliveries = JSON.parse(deliveriesData);   
export function matchesPerYear(){
    const countByYear = matches.reduce((acc, match) => { 
        if(match.season in acc){
            acc[match.season]+=1;
        } 
        else{
            acc[match.season]=1;
        } 
        return acc; 
      }, {});  
      return countByYear;
     
  

}  
const countByYear= matchesPerYear();
fs.writeFileSync('../public/output/matchesPerYear.json', JSON.stringify(countByYear, null, 2), 'utf-8');
      