export async function getCountries(url) {
    const response = await fetch(`https://restcountries.com/v3.1/${url}?fields=cca2,flags,name,capital,continents,borders,subregion,currencies,languages,maps,population`)
        .then((response) => response.json())
        .then((data) => data);
    return response
}