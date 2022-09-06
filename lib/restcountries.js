export async function getCountries() {
    const response = await fetch(`https://restcountries.com/v3.1/all`)
        .then((response) => response.json())
        .then((data) => data);
    return response
}