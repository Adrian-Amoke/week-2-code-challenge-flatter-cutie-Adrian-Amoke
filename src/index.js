// Your code here
document.addEventListener('DOMContentLoaded', () => {
    const characterBar = document.getElementById('character-bar');
    const detailedInfo = document.getElementById('detailed-info');
    const voteForm = document.getElementById('detailed-info');
    const voteInput = document.getElementById('votes');
    const voteCount = document.getElementById('vote-count');
    const resetBtn = document.getElementById('reset-btn');

    let currentCharacter = null;

    //This will fetch characters and fill the character bar
    fetch('http://localhost:3000/characters')
        .then((res) => res.json())
        .then((characters) => {
            characters.forEach((character) => {
                const span = document.createElement('span');
                span.textContent = character.name;
                span.addEventListener('click', () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        });
    //This displays the character details
    function displayCharacter(character) {
        currentCharacter = character;
        detailedInfo.querySelector('#name').textContent = character.name;
        detailedInfo.querySelector('#image').src = character.image;
        voteCount.textContent = character.votes;
    }
    //Handles vote submission
    voteForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const votesAdd = parseInt(voteInput.value) || 0;
        if (currentCharacter) {
            currentCharacter.votes += votesAdd;
            voteCount.textContent = currentCharacter.votes;
            voteInput.value = '';
        }
    });
    // Handles reset votes
    resetBtn.addEventListener('click', () => {
        if (currentCharacter) {
            currentCharacter.votes = 0;
            voteCount.textContent = 0;
        }
    });
});