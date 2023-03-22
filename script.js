let curr_symbol = "O";
function toggle_curr_symbol() {
  curr_symbol = curr_symbol == "O" ? "X" : "O";
}
let game_status;
let winner = 0;
let no_of_clicks = 0;
function check_status() {
  if (winner == 1) {
    game_status = "Player 1 wins";
  } else if (winner == 2) {
    game_status = "Player 2 wins";
  } else if (no_of_clicks == 9) {
    game_status = "Game Ends :No one win";
  }else if(no_of_clicks==0){
    game_status="First move:player 1"
  } 
  else {
    game_status = curr_symbol == "O" ? "Next Move :player 1" : "Next Move:player 2";
  }

  document.querySelector("#game_status").innerHTML = game_status;
}
can_click_box = [true, true, true, true, true, true, true, true, true]; //to not click again
ans_cases = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [1, 5, 9],
];
function highlight_win_con(cond) {
  for (let n of cond) {
    boxes_in_dom[n - 1].style.backgroundColor = "#79ba9d";
  }
  // boxes_in_dom.forEach((box)=>{
  //     // box[cond[0]-1].style
  //     if(box)
  //     box.style.backgroundColor="#79ba9d"
  // })
}
function check_win() {
  boxes = document.querySelectorAll(".box");
  boxes_value = [];
  for (i of boxes) {
    boxes_value.push(i.innerHTML);
  }
  // console.log(boxes_value)
  for (cond of ans_cases) {
    if (
      boxes_value[cond[0] - 1] == "O" &&
      boxes_value[cond[1] - 1] == "O" &&
      boxes_value[cond[2] - 1] == "O"
    ) {
      highlight_win_con(cond);
      winner = 1;
    } else if (
      boxes_value[cond[0] - 1] == "X" &&
      boxes_value[cond[1] - 1] == "X" &&
      boxes_value[cond[2] - 1] == "X"
    ) {
      highlight_win_con(cond);
      winner = 2;
    }

    check_status();
  }
}
window.onload = () => {
    check_status();
  boxes_in_dom = document.querySelectorAll(".box");
  boxes_in_dom.forEach((box) => {
    box.addEventListener("click", (event) => {
      if (event.target.innerHTML == "" && winner == 0) {
        no_of_clicks++;
        event.target.innerHTML = curr_symbol;
        toggle_curr_symbol();
        check_status();
        check_win();
      }
    });
  });
  document.querySelector("#reset").addEventListener("click", () => {
    boxes_in_dom.forEach((box) => {
      box.innerHTML = "";
      box.style.backgroundColor = "white";
    });
    winner = 0;
    curr_symbol = "O";
    no_of_clicks = 0;
    check_status();
  });
};
