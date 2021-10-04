/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
  }
  if(form.name.value == "") {alert("Please enter a name for your Kitten")}
  else {
    kittens.push(kitten)
    saveKittens()
    form.reset()
    drawKittens()
  }
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens" , JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if(storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 * Grabs the moody-kittens element
 * Creates kittenTemplate variable as an empty string
 * For each kitten in local storage appends the template with all the required HTML
 */
function drawKittens() {
  loadKittens()
  let kittenElement = document.getElementById("moody-kittens")
  let kittenTemplate = ""

  kittens.forEach(kitten => {
    kittenTemplate += `
    <div class="cat-border bg-dark kitten m-1 ${kitten.mood} text-light">
    <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4&size=150x150">
    <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
    <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
    <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
    <div class="d-flex space-between"></div>
    <button class="btn-cancel m-3 ce center" onclick="pet('${kitten.id}')">Pet</button>
    <button class="m-3" onclick="feed('${kitten.id}')">Feed Cat</button>
    </div>
  </div>
  `
  })
  kittenElement.innerHTML = kittenTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */

/*Increases kittens affection and mood if number is greater than .7 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let randomInt = Math.random()
  if(randomInt > .7) {
    currentKitten.affection ++;
    setKittenMood(currentKitten)
    saveKittens()

    /* lowers kittens affection and mood if number is lower than .7 */
  } else {
    currentKitten.affection --;
    setKittenMood(currentKitten)
    saveKittens()
  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function feed(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "tolerant"
  currentKitten.affection = 5;
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * Get's the moody-kittens element and removes the mood class then depending on the value re-adds the correct mood
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById("moody-kittens").classList.remove(kitten.mood)
  if (kitten.affection > 6) {kitten.mood = "happy"}
  if (kitten.affection <= 5) {kitten.mood = "tolerant"}
  if (kitten.affection <= 3) {kitten.mood = "angry"}
  if (kitten.affection <= 0) {kitten.mood = "gone"}

  document.getElementById("moody-kittens").classList.add(kitten.mood)
  saveKittens()
    
  
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
/* Clears local storage (storedKittens) if you hit OK on the confirmation window */
function removeKittens() {
  let clr = confirm("Are you sure you want to delete your kittens")
    if(clr == true) {
      localStorage.clear()
    } else {
      return false
    }
  }


