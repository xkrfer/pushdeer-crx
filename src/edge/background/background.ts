const a  = fetch('https://dog.ceo/api/breeds/image/random')

a.then(res => {
    console.log(res.clone())
})
