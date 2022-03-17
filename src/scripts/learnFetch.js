const getCountries = async () => {
    const res = await fetch("https://restcountries.com/v2/all");

    if (res.status !== 200){
        throw new Error ('cannot fetch the data');
    }
    const data = await res.json();
    return data;
};


getCountries()
.then(data => console.log('resolved:', data))
 

.catch(err => console.log('rejected:', err))


// fetch()
// .then((res)=> {
//     console.log ('resolved', res)
//     return res.json()
// }).then(data => {
//     console.log(data)
// }).catch((err)=> {
//     console.log('rejected', err)
// })