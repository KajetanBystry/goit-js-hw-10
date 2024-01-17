import { fetchCountries } from "./fetchCountries.js"
import  debounce from "debounce"
import Notiflix from "notiflix"
const select = document.getElementById("displaybox")
const showbox = document.getElementById("loader")
const searchbox = document.querySelector("input")
let searchTest = ""

const performSearch = debounce(() => {
    fetchCountries(searchTest)
    .then((countries) => showCountries(countries))
    .catch((error) => {
        Notiflix.Notify.failure("Oops, there is no country with that name")
    })
})

searchbox.addEventListener("input", (event) =>{
    select.innerHTML = ""
    showbox.innerHTML = "<p>Loading data, please wait...</p>";
    searchTest = event.target.value.trim();
    if (searchTest === ""){
    }else{
        performSearch();
    }
})

function showCountries(countries) {
    showbox.innerHTML = "<p>Loading data, please wait...</p>";
    if (countries.length > 1 && countries.length < 11){
    showAllCountries(countries)
    }
    else if (countries.length > 10){
        select.innerHTML = ""
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    else{
        showOneCountry(countries)
    }
};

function showAllCountries(countries){
    const allCountries = countries
        .map((country) => {
            return `<li class="listelement"><img src="${country.flags.svg}" width="3%">   ${country.name.official}</li>`;
        })
        .join("");
    select.innerHTML = allCountries
}

function showOneCountry(countries){
    const oneCountry = countries
    .map((country) => {
        return `<li class="listelement"><img src="${country.flags.svg}" width="3%">   <b>${country.name.official}</b></li>`;
    })
    select.innerHTML = oneCountry
    const foundCountry = countries
    .map((country) => {
        return `<p style="display: block;"><b>Capital:</b> ${country.capital}</p><p style="display: block;"><b>Population:</b> ${country.population}</p>`
    })

    showbox.innerHTML = foundCountry
    let stringLanguages = ""

    countries.map((country) => {
        return country.languages
    })
    .map((lang, i, array) =>{
        let langArray = []
        for(i=0; i < array.length; i++){
            let l = array[i]
            for (let key in l){
                langArray.push(l[key])
            }
        }
        return langArray
    })
    .forEach((element) => {
        stringLanguages += element.toString()
    })
    let modString = stringLanguages.replace(',', ', ')
    showbox.insertAdjacentHTML("beforeend", `<p id="languagebox" style="display: block;"><b>Languages:</b> ${modString}</p>`)
}