import Player from "./memoryGamePage/Player.mjs";

const submit = document.querySelector(".submit");
const inputs = document.querySelectorAll(".input-text");
const inputsRadio = document.getElementsByName("size");
const getText = (input) => input.value;
const getSize = (buttons) => {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].checked) {
      return Number(buttons[i].value);
    }
  }
};



// function myPromiseGenerator() {
//   let p = new Promise((resolve, reject) => {



//     const inputsArr = [...inputs];
//     const Player1 = new Player(getText(inputsArr[0]), "player1");
//     const Player2 = new Player(getText(inputsArr[1]), "player2");
//     const size = getSize(inputsRadio);

//     if (Player1.value != null || Player1.value != "" || Player2.value != null || Player2.value != "") {
//       console.log("resolve1")
//       resolve()
//     } else {
//       console.log("reject1")
//       reject()
//     }


//   });

//   p.then(() => {

//     const stoarge = window.localStorage;
//     stoarge.setItem("size", JSON.stringify(size));
//     stoarge.setItem("player1", JSON.stringify(Player1));
//     stoarge.setItem("player2", JSON.stringify(Player2));
//     console.log(Player1);

//     location.href = "../memoryGamePage/game.html";

//   }).catch(() => {

//     var name1 = document.getElementById("name1");
//     var name2 = document.getElementById("name2");

//     if (name1.value == null || name1.value == "") {
//       name1.value = "Player Name Required";
//     }

//     if (name2.value == null || name2.value == "") {
//       name2.value = "Player Name Required";
//     }
//   })

// }


//submit.addEventListener("click", () => {

//   let p = new Promise((resolve, reject) => {
//     const inputsArr = [...inputs];
//     const Player1 = new Player(getText(inputsArr[0]), "player1");
//     const Player2 = new Player(getText(inputsArr[1]), "player2");
//     const size = getSize(inputsRadio);

//     if (Player1.value != null || Player1.value != "" || Player2.value != null || Player2.value != "") {
//       console.log("resolve1")
//       resolve()
//     } else {
//       console.log("reject1")
//       reject()
//     }
//   })


//   p.then(() => {

//     const stoarge = window.localStorage;
//     stoarge.setItem("size", JSON.stringify(size));
//     stoarge.setItem("player1", JSON.stringify(Player1));
//     stoarge.setItem("player2", JSON.stringify(Player2));
//     console.log(Player1);

//     location.href = "../memoryGamePage/game.html";

//   }).catch(() => {

//     var name1 = document.getElementById("name1");
//     var name2 = document.getElementById("name2");

//     if (name1.value == null || name1.value == "") {
//       name1.value = "Player Name Required";
//     }

//     if (name2.value == null || name2.value == "") {
//       name2.value = "Player Name Required";
//     }
//   })

//});


submit.addEventListener("click", () => {
  const inputsArr = [...inputs];
  const Player1 = new Player(getText(inputsArr[0]), "player1");
  const Player2 = new Player(getText(inputsArr[1]), "player2");
  const size = getSize(inputsRadio);


  const stoarge = window.localStorage;
  stoarge.setItem("size", JSON.stringify(size));
  stoarge.setItem("player1", JSON.stringify(Player1));
  stoarge.setItem("player2", JSON.stringify(Player2));
  console.log(Player1);

  location.href = "./memoryGamePage/game.html";
});