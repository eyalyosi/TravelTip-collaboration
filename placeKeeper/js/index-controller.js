'use strict'

function onInitIndex() {
    setUserColors()
    calcHoursLeft()
}

function calcHoursLeft() {
    var timeNow = Date.now()
    console.log(timeNow);
    //TODO calc how mush hours left for user Bday
    const userData = loadFromStorage(USER_DATA_STORAGE_KEY)
    var userBDayDate = userData.dob
    var userBDaytime = userData.birthTime

    console.log('userBDayDate', userBDayDate);
    console.log('userBDaytime', userBDaytime);
    const userDate = new Date(userBDayDate)
    var userBdayDay = userDate.getDate()
    var userBdayMonth = userDate.getMonth()

    var userNextBday = ''

    // const date1 = new Date('7/13/2010');
    // const date2 = new Date('12/15/2010');
    // const diffTime = Math.abs(date2 - date1);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // console.log(diffTime + " milliseconds");
    // console.log(diffDays + " days");

}


