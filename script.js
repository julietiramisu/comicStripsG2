
// waits for the full page to load before running the code 


document.addEventListener("DOMContentLoaded", () => {
  // all buttons share same class. .choice-btn so js searches for the button first. 

  const buttons = document.querySelectorAll(".choice-btn");

  // looks for the story text. there are two buttons so searches for both.
  const sceneText =
    document.querySelector(".scene-text") ||
    document.querySelector(".scene-textCave");




  //ANIMAL HAVEN (all buttons related) //

  //looks for all the buttons in the animal forest. there are 4 so finds all 4 
  const drinkButton = document.querySelector(".drinkWater-btn");
  const eatButton = document.querySelector(".eatFood-btn");
  const talkAnimalsButton = document.querySelector(".talk-animals");
  const goHomeButton = document.querySelector(".talk-btn");

  // Tracks if the user has clickedthese buttons or not.
  let hasDrunk = false;
  let hasEaten = false;

  // CAVE ELEMENTS //
    //looks for all the buttons in the cave.

  const sneakButton = document.querySelector(".sneak-btn"); 
  const runButton = document.querySelector(".run-btn");   

  // Find fight button (same group but NOT sneak)
  const fightButton = document.querySelector(".cave-choice:not(.sneak-btn)");

  // Continue button for bad ending
  const continueBadButton = document.querySelector(".continue-bad-btn");

  // CLICK HANDLER //

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // for switching pages
      const nextPage = btn.dataset.next;
      //changing background
      const newBg = btn.dataset.bg;
      //changing text
      const newText = btn.dataset.text;
      const groupName = btn.dataset.group;

      // BACKGROUND N TEXT //

//if there is a background switch the background
      if (newBg) {
        document.body.style.backgroundImage = `url(${newBg})`;
      }
//change text if needed
      if (newText && sceneText) {
        sceneText.innerText = newText;
      }

    // ANIMAL HAVEN LOGIC (orders of clicking the buttons)//
//if the button is clicked than becomes true instead of false 
      if (btn === drinkButton) {
        hasDrunk = true;
        btn.classList.add("used");
      }
//if the button is clicked than becomes true instead of false. 
      if (btn === eatButton) {
        hasEaten = true;
        btn.classList.add("used");
      }

//once both buttons are clicked and true reveal talk to animal button
      if (hasDrunk && hasEaten && talkAnimalsButton) {
        talkAnimalsButton.classList.remove("hidden");
      }

// once talk to animal button is clicked then reveal go home button and hide talk to animals button
      if (btn === talkAnimalsButton && goHomeButton) {
        btn.classList.add("used");
        goHomeButton.classList.remove("hidden");
      }

      // CAVE LOGIC //

      // have both cave buttons after choosing one
      if (groupName) {
        const groupButtons = document.querySelectorAll(
          `.choice-btn[data-group="${groupName}"]`
        );
        groupButtons.forEach((b) => b.classList.add("used"));
      }

      // sneak reveal "Make a run for it!"
      if (btn === sneakButton && runButton) {
        runButton.classList.remove("hidden");
      }

      // if fight reveal continue button (bad ending)
      if (btn === fightButton && continueBadButton) {
        continueBadButton.classList.remove("hidden");
      }
      




      // PAGE SWITCHES //

// wait a bit and send page to the new page identified in each html file
      if (nextPage) {
        setTimeout(() => {
          window.location.href = nextPage;
        }, 800);
      }
    });
  });
});
