//? Selection
const word = document.querySelector("input")
const btn = document.querySelector(".btn")
const defination = document.querySelector(".defination")
const audio = document.querySelector(".audio")
const wordName = document.querySelector(".name")
const extraWords = document.querySelector(".extraWords")

//? Api
const apiKey = "1f31f0dc-4573-4264-9202-3caacd907914" //?lagate hoina nije laga bsdk.
const URL = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word.value}?key=${apiKey}`

//? Input Part
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    search(word.value)
    wordName.innerHTML=word.value
    //?clear area
    word.value=""
    defination.innerHTML=""
    extraWords.innerHTML=""
    audio.innerHTML=""
    
})
const search = async (wordText)=>{
    //? AJAX Call
    try {
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${wordText}?key=${apiKey}`)
        const data = await response.json()
        if(!data.length){
            //? no defination
            defination.innerHTML="No results found"
        }else if(typeof data[0]=="string"){
            //? did You mean type word
            defination.innerHTML="Did You Mean?"
            data.forEach((e) => {
                console.log(e);
                const didYouMean = document.createElement("span")
                didYouMean.classList.add("didYouMean")
                didYouMean.innerText=e
                extraWords.appendChild(didYouMean)
                return
            });
        }else{
            //? defination
            defination.innerHTML=data[0].shortdef[0]
        }
        //?sound
        const soundName=data[0].hwi.prs[0].sound.audio
        const renderSound=()=>{
            const subfolder = soundName.charAt(0);
            const soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;
            const sound = document.createElement("audio")
            sound.classList.add("sound")
            sound.controls=true
            sound.src=soundSrc
            sound.autoplay=true
            audio.appendChild(sound)
        }
        if(soundName){
            renderSound(soundName)
        }
    } catch (error) {
        console.log(error);
    }
}
