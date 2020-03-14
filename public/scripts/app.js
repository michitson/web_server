const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading ......'
    fetch(`http://webserver-env-1.eba-fxbd3ap2.eu-west-2.elasticbeanstalk.com/weather?address=${location}`).then((response) => {
        response.json().then((data)=> {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''

            } else { 
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                
            }
        })
    })
})