function timing()
{
    let dzisiaj = new Date();

    let sec = dzisiaj.getSeconds();
        if(sec<10) sec = "0"+sec;

    let min = dzisiaj.getMinutes();
        if(min<10) min = "0"+min;

    let hour = dzisiaj.getHours();
        if(hour<10) hour = "0"+hour;

    let day = dzisiaj.getDate();
    let month = dzisiaj.getMonth()+1;
    let year = dzisiaj.getFullYear();

    document.getElementById("zegar").innerHTML = 
    day+"/"+month+"/"+year+"   "+hour+":"+min+":"+sec;

    setTimeout("timing()",1000);
}