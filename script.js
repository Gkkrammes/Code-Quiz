// global variables
var score= 0;
// event listeners

document.addEventListener('click', function (event) {
    switch(event.target.id) {
        case 'start-button':
            handleStartButton();
            break;
        
        
    }
});
// functions
function handleStartButton() {
    document.querySelector('.start-menu').classList.add('hidden');
    document.querySelector('.question-container').classList.remove('hidden');
}