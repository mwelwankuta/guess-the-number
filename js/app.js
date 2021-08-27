"use strict";
const app = new UIApp({
  root: "#root",
  data: {
    guess: null,
    random: 0,
    message: "",
    won: false,
    started: false,
  },
  view: ({ Button, Spacer, Input, Group, TextView, Stack }) => {
    const { data, changeData } = app;
    const start = () => {
      const random = Math.floor(Math.random() * 20);
      changeData({ random, started: true });
    };

    const calculate = () => {
      if (data.guess == data.random) {
        alert("You Won!!");
        start();
      } else if (data.guess < data.random) {
        changeData({ message: "too low" });
      } else if (data.guess > data.random) {
        changeData({ message: "too high" });
      }
    };

    data.started == true
      ? Group([
          TextView("Guess The Number", {
            classes: "text-xl font-semibold text-center",
          }),
          TextView(data.message, {
            classes: `text-center "text-red-500 font-mono font-semibold mt-8 text-3xl`,
          }),
        ])
      : Spacer();

    Stack("column", {
      value: [
        Button(data.started ? "re-shuffle" : "start", {
          onclick: () => start(),
          classes: "bg-blue-500 text-white mx-2 rounded",
        }),
        data.started == true
          ? Stack("row", {
              value: [
                Input(data.guess, {
                  type: "number",
                  setvalue: (value) => {
                    changeData({ guess: value });
                  },
                  classes:
                    "border rounded mx-2 px-1 py-0.5 focus:border-blue-500 flex-1",
                }),
                Button(`Submit ${typeof data.guess == "number" ? "" : "->"}`, {
                  onclick: () => calculate(),
                  classes: `rounded-sm font-semibold bg-blue-600 text-white text-sm m-2 px-2 py-1`,
                }),
              ],
              classes: "items-center",
            })
          : TextView("Click start to start the game", {
              classes: "text-center text-gray-500 text-xs mt-1",
            }),
        Button("Exit", {
          onclick: () => window.close(),
          classes:
            "rounded-sm font-semibold bg-gray-300 text-gray-800 text-sm m-2 px-2 py-1",
        }),
      ],
    });

    // adds spacing at bottom
    data.started == false && Spacer();
  },
});
app.render();
