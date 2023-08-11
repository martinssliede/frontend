import axios from 'axios';

type Character = {
    name: string;
    image: string;
}

const characters = axios.get("https://rickandmortyapi.com/api/character");
const wrapperElement = document.querySelector(".js-wrapper");

characters.then((response) => {
    console.log("response", response.data.results);
    

    response.data.results.forEach((character: Character) => {        
        const characterHTML = `
        <div class="character">
            <img src="${character.image}" class="character__image"/>
            <h3 class="character__name">${character.name}</h3>
        </div>
        `;

        wrapperElement.innerHTML += characterHTML; 
    });
});