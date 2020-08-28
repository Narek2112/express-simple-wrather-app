console.log('Client side js')



// const url = window.location.href + 'weather?address=Yerevan';

// fetch(url).then( (res)=>{
//     res.json().then( (data)=>{
//         console.log(data)
//     } )
// } )

const $weatherForm = document.querySelector('form')
const $search      = document.querySelector('input')
const $messageOne  = document.querySelector('#message-1')
const $messageTwo  = document.querySelector('#message-2')


$weatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault()

    $messageOne.textContent = 'Loading...'
    $messageTwo.textContent = ''
    
    const location = $search.value
   
    const url = window.location.href + `weather?address=${location}`;
   
    fetch(url).then( (res)=>{
        res.json().then( (data)=>{

            console.log(data)

            if(data.error){
                $messageOne.textContent = data.error
            }else{
                $messageOne.textContent = data.location
                $messageTwo.textContent = `Temperature: ${data.forecastData.current.temperature} 
                Wind speed : ${data.forecastData.current.wind_speed}`
            }
            
            
            console.log(data)
        } )
    } )
})