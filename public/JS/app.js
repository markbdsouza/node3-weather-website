console.log('Client side JS file')



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent='asd'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    messageOne.textContent = 'Loading........'

    fetch('/weather?address='+searchElement.value).then((response)=> {
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = '' 
            return console.log(data.error)
            
        }
        messageOne.textContent = data.ActualLocation 
        messageTwo.textContent = data.forecast
        console.log(data.forecast)
        
})})
})