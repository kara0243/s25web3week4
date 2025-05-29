

//create global variables
let colourPool = ["red", "red", "orange", "orange", "yellow", "yellow", "green", "green", "blue", "blue", "purple", "purple"];
//when the user clicks on a card for the first time, we'll pick a random colour from this array and assign it to that card

//clickedCards will store the cards the user is currently clicking on, by ID - when two cards are in the array, we'll check if there is a matching ID, and if there is, then there is a match.  However, if the IDs do not match, then we'll flip the two cards back over
let clickedCards = [];

//these two globals are to keep track of the user's progress - one for their score, and one for the number of moves
let score=0, moves=0;
//you can declare multiple variables with one 'let' keyword, by separating them with commas

/********************************
 * 	Scripts added in class
********************************/
// add the element fisrt and add it to the page last

//use a loop to add multiple cards
// a for loop has 3 parts: 1.set the counter variable (let i=0;) and start it at a number
//2.give the loop condition to keep counting (keep going as as long as i is less than 12)
//3. tell the counter to increment each time the loop run(i++ = add 1 to i) i+=2 add 2 cards

for(let i=0; i<12; i++){

//create the new card (a div element), we try to create another card
    const card = document.createElement("div");

    //add the class "card" to the new element
    card.classList.add("card");

    //add a paragraph element
    const para = document.createElement("p");

    //add the question mark
    para.textContent = "?";

    //add the new paragraph to the card
    card.appendChild(para);

    // for when the user clicks on the card we add eventlisterner 
    //when the user clicks on a card, run the function "flipcard"
    card.addEventListener("click", flipCard);

    //add the card to the page
    document.querySelector("main").appendChild(card);}

    //when the user clicks on the card...
    function flipCard(){
        //we need to add a condition to tell not to change more than once when clicked
        //!= checks if something is not equal to
        if(this.className != "cardFlipped"){ 
            //change the card's class
            this.className = "cardFlipped";

            //get a random number between 0 and 11 (because the first position of an array is 0)
            //Math.random() gets you a random decimal between 0 and 1 (like 0.45, 0.87) when you add *12, it gives you number between 0-12
            //Math.floor() rounds a number down, Math.ceil() rounds uo, Math.round() do both based on the number
            // we subtract a tiny amout from 12 to don't hit 12 
            let ran = Math.floor(Math.random()*12-0.001);

            //based on the random number, assign the card id (from the colourPool array)
            this.id = colourPool[ran];
        
            //since the card has been clicked, add it to the array that holds which cards are clicked
            clickedCards.push(this);
            
            //check to see if there are two cards in the array, then check to see if there is a match
            if(clickedCards.length == 2){
                //check to see if the two cards have the same id
                if(clickedCards[0].id == clickedCards[1].id){
                    //call the function to craete an overlay message
                    createOverlay("match");
                }else{
                    //call the function to create an overlay message
                    //send it the value "match"
                    createOverlay("nomatch");


                    //if it's not a match, flip the cards back over
                    //the forEach loop looks at an array and does something to each thing in that array
                    //you have to pass it a temporary variable(we're using thisCard) to store each item in the array
                    clickedCards.forEach(function(thisCard){
                        thisCard.className = "card";
                    });

                }
                //make the array an empty array, regardless of wether there's a match or not 
                clickedCards = [];
            }
        }
    }

//this function creates an overlay to display a message to the user
//meesageType is a variable to store the information sent to the function (when we called it)
function createOverlay(messageType){
    //create a div for the overlay background, give it an id, add it to the body element(outside of the rest of your HTML)
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    //add event listener to remove the overlay when clicked
    overlay.addEventListener("click", totalExistanceFalilure);

    //add a message to the overlay
    const para = document.createElement("p");
    //check which type of overlay this is, use the switch statement for multiple options
    switch(messageType) {
        case "nomatch":
            para.textContent = "No Match!";
            break; //stop the switch statement from running
    
        case "match":
            para.textContent = "Match!";
            break;
    }
    overlay.appendChild(para);

    document.querySelector("body").appendChild(overlay);

}

function totalExistanceFalilure(){
    // we have to get the element's parent to remove the element
    this.parentNode.removeChild(this);
}