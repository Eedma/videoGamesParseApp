let videoGames = [];
let input = document.getElementById('search');
let selector = document.getElementById('genere');
let loadVideoGameData = (callback) => {
    const VideoGame = Parse.Object.extend("VideoGame");
    // Creates a new Query object to help us fetch MyCustomClass objects
    const query = new Parse.Query(VideoGame);

    // Executes the query, which returns an array of MyCustomClass
    query.find().then(callback);
}

loadVideoGameData((results) => {
    videoGames = results;
    createHtml();
});

let createHtml = () => {
    let container = document.getElementById('container');
    container.innerHTML = '';
    selector.innerHTML = '<option selected="selected">scegli una categoria</option>';

    for (let x = 0; x < videoGames.length; ++x) {
        
        document.getElementById('genere').innerHTML += `<option>${videoGames[x].get('genere')}</option>`;

        if (videoGames[x].get('titolo').toLowerCase().includes(input.value.toLowerCase()) || 
            videoGames[x].get('sviluppatore').toLowerCase().includes(input.value.toLowerCase()) //||
            //videoGames[x].get('genere').includes(selector.value) 
            ) {
            container.innerHTML += `
                        <div class="box" onclick="alertBox(videoGames[${x}])">
                            <div class="title">${videoGames[x].get('titolo')}</div>
                            <div class="publisher">${videoGames[x].get('sviluppatore')}</div>
                            <img class="cover" src="${videoGames[x].get('cover')}">
                            <div class="price">${videoGames[x].get('prezzo')}</div>
                            <div class="review">${videoGames[x].get('recensione')}</div>
                        </div>
                    `;
        }
    }

}

alertBox = (game) => {
    alert('hai selezionato ' + game.get('titolo'))
}

let buttonPrice = () => {
    videoGames.sort((a, b) => a.get('prezzo') - b.get('prezzo'));
    createHtml();
};

let buttonTitle = () => {
    videoGames.sort((a, b) => a.get('titolo').localeCompare(b.get('titolo')));
    createHtml();
};

sendForm = () => {
    const VideoGame = Parse.Object.extend('VideoGame');
    const videoGame = new VideoGame();

    videoGame.set('titolo', document.getElementById('titolo').value);
    videoGame.set('sviluppatore', document.getElementById('sviluppatore').value);
    videoGame.set('recensione', document.getElementById('recensione').value);
    videoGame.set('cover', document.getElementById('cover').value);
    videoGame.set('prezzo', parseFloat(document.getElementById('prezzo').value));

    videoGame.save().then(
        (result) => {
            createHtml();
        },
        (error) => {
            alert('errore!');
        }
    );    
}