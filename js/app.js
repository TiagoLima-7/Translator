const apiKey = `a949b07a-5993-7191-efe3-56ba4602817f:fx`
const selectTag = document.querySelectorAll("select");
translateBtn = document.querySelector("#translate");
fromText = document.querySelector(".from-text");
toText = document.querySelector(".to-text");
exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons i");


//Selection des tags select et insertion des otpions
selectTag.forEach((tag, id) => {
    //console.log(id == 1);
    for(const country_code in countries) {
        //console.log(country_code)
        let selected;
        if(id == 0 && country_code == "EN") {
            selected = "selected";
        } else if (id == 1 && country_code == "FR") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});


//Event listener for translating

translateBtn.addEventListener("click", () => {
    let text = fromText.value; // Get user input text to translate
    translateFrom = selectTag[0].value // Getting language to translate from
    translateTo = selectTag[1].value // Getting language to translate to
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");


//DEEPL API
//     let apiUrl = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(text)}&source_lang=${translateFrom}&target_lang=${translateTo}`;

//     //fetching api reponse and returning it with parsing into js obj
//     //and another then method receiving that object
//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/x-www-form-urlencoded',
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         toText.value = data.translations[0].text
//     })
// });


// MyMemory API
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;

    //fetching api reponse and returning it with parsing into js obj
    //and another then method receiving that object
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
    })
});

//Event Listener to change languages
exchangeIcon.addEventListener("click", () => {
    //Exchanging textarea and select tag values 
    let tempText = fromText.value;
    let tempFrom = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempFrom;
})

//Event Listener for Speech
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        // console.log(target);
        if(target.classList.contains('fa-copy')) {
            if(target.classList.contains('from')) {
                navigator.clipboard.writeText(fromText.value);
                console.log('From copy icon clicked');
            } else {
                navigator.clipboard.writeText(toText.value);
                console.log('To copy icon clicked');
            }
        } else {
           let utterance;
           if(target.classList.contains('from')) {
               utterance = new SpeechSynthesisUtterance(fromText.value);
               utterance.lang = selectTag[0].value;
           } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;

           }
           speechSynthesis.speak(utterance);
        }
    })
})

