const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
synonyms = wrapper.querySelector(".synonyms .list"),
infoText = wrapper.querySelector(".info-text"),
volumeIcon = wrapper.querySelector(".word i"),
removeIcon = wrapper.querySelector(".search span");

let audio;

function data(result, word){
    if(result.title){ //if api return the message of can-t find word
        infoText.innerHTML =`searching the meaning of <span>"${word}"</span>. please try to search`;
    } else{  
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0];
    phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text} /`;

    //lets pass particular  response data to each particular element
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions.definition;
    document.querySelector(".example span").innerText = definitions.example;
    audio = new Audio("https:" + result[0].phonetics[0].audio); //creating new audio obj and passignaudio src

    if(definitions.synonyms[i] == undefined){
        synonyms.parentElement.display = "none";
    }else{
        synonyms.parentElement.display = "block";
        synonyms.innerHTML = "";
         for (let i = 0; i < 5; i++) {//getting only 5 synonyms out of many
             let tag = `<span onclick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag); //passing all 5 synonyms inside synonyms div
         }
      }    
    } 
}
//search synonymes function
function search(word){
   searchInput.value = word;
   fetchApi(word);
   wrapper.classList.remove("active");
}

//fetch api function
function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML =`searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e =>{
    if(e.key === "Enter" &&  e.target.value){
    fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener("click", () => {
    audio.play();
});

removeIcon.addEventListener("click", () =>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9a9a9a";
    infoText.innerHTML = "type a word and press enter to get meaning example, pronunciation and synonms of that typed word  ";
});