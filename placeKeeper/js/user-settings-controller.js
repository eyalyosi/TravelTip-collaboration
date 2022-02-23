'use strict'

const USER_DATA_STORAGE_KEY = 'userdateDB'

function onInitUserSettings(){
    setUserColors()
}


function onSetForm(ev) {
    ev.preventDefault()

    const userData = {
        name: ev.target.elements.name.value,
        email: ev.target.elements.email.value,
        age: ev.target.elements.age.value,
        gender: ev.target.elements.gender.value,
        backgroundColor: ev.target.elements.backgroundColor.value,
        textColor: ev.target.elements.textColor.value,
        dob: ev.target.elements.dob.value,
        birthTime: ev.target.elements.birthTime.value,
    }

    saveToStorage(USER_DATA_STORAGE_KEY, userData)
    setUserColors()
    console.log('dob',userData.dob);
    console.log('birthTime',userData.birthTime);
}

function setUserColors() {
    const userData = loadFromStorage(USER_DATA_STORAGE_KEY)
var textColor = userData.textColor
var bgColor = userData.backgroundColor

document.body.style.backgroundColor = bgColor;
document.body.style.color = textColor

}

function onAgeChange(value){
    document.querySelector('.age-display').innerText = value
}

