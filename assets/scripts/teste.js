async function buscar(){
    const url = 'https://lingua-robot.p.rapidapi.com/language/v1/entries/en/example';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'cf0af6dabfmshb44ebe3bcb9f2c6p12abbajsn76545684719f',
            'x-rapidapi-host': 'lingua-robot.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
buscar()