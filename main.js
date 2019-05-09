//WELCOME TO COURSE SEARCHER 2.0.0
//This script can be ran by chrome extension: https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija
//also knon as chrome extension Custom JavaScript for websites
//TO RUN
//-Navigate to https://one.uf.edu/soc/registration-search/20178
//-Make sure you are on registration search, not course search!
//-Copy this script into CJS(chrome extension) 
//-Enter in course code or section number in normal boxes
//-Hit autofind button down below.
//Notes
//You can run multiple scripts in parallel just having new tabs
//The Robustness has not been fully tested, and Note, it DOES NOT auto Add the class yet! It simply alerts you if its available 
//The delays are quite hefty (1-5s randomized) to avoid the risk of detection, but if you feel daring quicken the time
//enjoy!

text=`
<button id="autoFindBtn" type="button" style="position:absolute; bottom:9%; left:100px;"class="md-button md-ink-ripple"  onclick="query()">
Auto Find :)</button>`
document.getElementsByClassName("schedule-title")[0].innerHTML+=text;
var i=1;
var errorCount=1;
//query();
function query(){
    try {
        var courseCode ="";
        var classNum="";
        courseCode = document.getElementById("courseCode").value;
        classNum = document.getElementById("classNum").value;
        let url = "https://one.uf.edu/api/myschedule/course-search/?category=CWSP&class-num="+ classNum +
      "&course-code=" + courseCode+
      "&course-title=&cred-srch=&credits=&day-f=&day-m=&day-r=&day-s=&day-t=&day-w=&days=false&dept=+&eep=&fitsSchedule=false&ge=&ge-b=&ge-c=&ge-d=&ge-h=&ge-m=&ge-n=&ge-p=&ge-s=&instructor=&last-control-number=0&level-max=--&level-min=--&no-open-seats=false&online-a=&online-c=&online-h=&online-p=&period-b=&period-e=&prog-level=+&term=2191&wr-2000=&wr-4000=&wr-6000=&writing=";
        
        //url ="https://one.uf.edu/api/myschedule/course-search/?category=RES&course-code="+course+"&section="+section+"&course-title=&cred-srch=&credits=&day-f=&day-m=&day-r=&day-s=&day-t=&day-w=&days=false&dept=+&eep=&fitsSchedule=false&ge=&ge-b=&ge-c=&ge-d=&ge-h=&ge-m=&ge-n=&ge-p=&ge-s=&instructor=&last-row=0&level-max=--&level-min=--&no-open-seats=false&online-a=&online-c=&online-h=&online-p=&period-b=&period-e=&prog-level=UGRD&term=20181&var-cred=true&writing=";
        //https://one.uf.edu/api/myschedule/course-search/?category=CWSP&class-num=&course-code=cop3502&course-title=&cred-srch=&credits=&day-f=&day-m=&day-r=&day-s=&day-t=&day-w=&days=false&dept=+&eep=&fitsSchedule=false&ge=&ge-b=&ge-c=&ge-d=&ge-h=&ge-m=&ge-n=&ge-p=&ge-s=&hons=false&instructor=&last-control-number=0&level-max=--&level-min=--&no-open-seats=false&online-a=&online-c=&online-h=&online-p=&period-b=&period-e=&prog-level=+&term=2191&wr-2000=&wr-4000=&wr-6000=&writing=
        if(courseCode.length == 0 && classNum.length == 0){
            alert("Please enter something");
            return;
        }
        console.log(url);
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send();
        //console.log(xhttp.responseText);
        var obj = JSON.parse(xhttp.responseText) 
        console.log(obj)
        if(obj.hasOwnProperty("error"))
        {
            alert("Session expired, please login");
        }
        else if(obj[0].COURSES[0].openSeats>0){
            alert ("Found Course " + courseCode+classNum+ "!");
        }
        else{
            document.getElementById("autoFindBtn").innerHTML="Auto Find :) ("+i+")";
            i++;
            setTimeout(function(){//delays to avoid bot detection
                   query();
            },1000+4000*Math.random());
        }
    }
    catch(err){
        document.getElementById("autoFindBtn").innerHTML="Auto Find :( Broken (" + errorCount + ")";
        errorCount++;
        if(errorCount > 10)
        {
            alert("Something weird broke, refresh webpage and try again");
        }
        else{
            setTimeout(function(){//delays to avoid bot detection
                   query();
            },1000+4000*Math.random());
        }
    }
    
}
