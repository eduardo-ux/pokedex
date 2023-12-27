const pokemonName = document.getElementById('pokemon_name')

const pokemonNumber = document.getElementById('pokemon_number')

const pokemonImage = document.getElementById('pokemon_image')

const form = document.querySelector(".form")
const input = document.querySelector('.input_search')


const btnPrev = document.querySelector(".btn-prev")
const btnNext = document.querySelector(".btn-next")

let searchPokemon = 5

    //essa variavel abaixo determina uma função assincrona
const fetchPokemon = async (pokemon) => {
    //essa variavel abaixo cria uma conexão com o endpoint da api
    const apiResponse =   await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
   if (apiResponse.status === 200){
    //aqui o codigo é convertido para .json, pois ele retorna uma promisse e nao um objeto. que é oq eu quero
    const data = await apiResponse.json()

    return data
   }
}

const renderPokemon = async (pokemon) => {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = 'Carregando...'

    const data = await fetchPokemon(pokemon)
    if(data){
    pokemonName.innerHTML = data.name;

    pokemonNumber.innerHTML = data.id;

    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 

    input.value =''
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Não encontrado'
        pokemonNumber.innerHTML = ''
       }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    
});
btnPrev.addEventListener('click', () => {
   
   searchPokemon-=1
   renderPokemon(searchPokemon);
   
});
btnNext.addEventListener('click', () => {
    searchPokemon+=1;
    renderPokemon(searchPokemon);
    
});
renderPokemon(searchPokemon)
