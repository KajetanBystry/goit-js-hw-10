export async function fetchCountries(name) {
    const baseURL ="https://restcountries.com/v3.1/name/"
    return fetch (`${baseURL}${name}?fields=name,flags,capital,population,languages`).then(
        (response) => {
            if (!response.ok){
                throw new Error(response.status)
            }
            return response.json()
        }
    )
}