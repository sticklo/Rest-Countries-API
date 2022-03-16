const getCountries = async () => {
    const res = await fetch("https://restcountries.com/v2/all");
    const data = await res.json();
    return data;
};


getCountries().then(data => console.log('resolved:', data));


// fetch()
// .then((res)=> {
//     console.log ('resolved', res)
//     return res.json()
// }).then(data => {
//     console.log(data)
// }).catch((err)=> {
//     console.log('rejected', err)
// })