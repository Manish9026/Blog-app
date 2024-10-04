import { log } from "console";

function checkDateStatus(dateString) {
    const days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
        // date declaration
        const [givenDate,today,checkIfDate,yesterday]=[new Date(dateString),new Date(),new Date(),new Date(),new Date()]
        // logic of yesterday date
        yesterday.setDate(today.getDate() - 1);
      //  convert date to local string "DD/MM/YYYY" format
        checkIfDate.setDate(today.getDate()-(  today.getDay()));
        const [givenDateStr,todayStr,yesterdayStr]=[givenDate.toLocaleDateString(),today.toLocaleDateString(),yesterday.toLocaleDateString()];
        // logic of date chickig

        if(checkIfDate<=givenDate){
            if(givenDateStr==todayStr){
                return "today";
            }
            else if(givenDateStr==yesterdayStr){
                return "yesterday"
            }
            else{
            //   console.log ( givenDate.getDay())
                return days.filter((day,indx)=>{if(indx===givenDate.getDay()) return day
                }).toString()
            }
    
        }
        else{
            return givenDate.toLocaleDateString();
        }
    
    
      
    }


console.log(checkDateStatus('2024-10-04T11:05:05.600+00:00'));