let canvasInfo = {
  // 켄버스 색
  width: 600,
  height: 600,
  fillColor: "white",
  strokeColor: "black",
  lineWidth: 2.5
};

export class Canvas {
  constructor() {
    this.paint = false; // fill, stroke
    this.canvas = document.getElementById("jsCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.setOpt();
    this.buildUI();
    this.bindEventSocket();
    this.bindEventDefualt();
  }

  // 켄버스의 가로 세로
  // 그리기 색상 지정
  setOpt() {
    this.canvas.width = canvasInfo.width;
    this.canvas.height = canvasInfo.width;
    this.ctx.fillStyle = canvasInfo.fillColor;
    this.ctx.strokeStyle = canvasInfo.strokeColor;
  }

  buildUI() {
    this.colorBox = document.querySelectorAll("#jsColorBox div");
    this.range = document.getElementById("jsRange");
    this.modeButton = document.getElementById("jsMode");
    this.saveButton = document.getElementById("jsSave");
  }

  bindEventDefualt() {
    // 마우스 이동시
    this.canvas.addEventListener("mousemove", event => {
      let x = event.offsetX;
      let y = event.offsetY;
      if (!this.paint) {
        // 그림을 그려준다
        this.beginPath(x, y);
        window.socket.emit(window.global.DRAW_BEGINPOS, { x, y });
      } else {
        this.stroke(x, y);
        window.socket.emit(window.global.DRAW_ENDPOS, {
          x,
          y,
          color: this.ctx.strokeStyle
        });
      }
    });

    // 마우스 클릭시
    this.canvas.addEventListener("mousedown", () => {
      if (this.modeButton.innerText === "FILL") {
        window.socket.emit(window.global.SEND_FILL, {
          color: canvasInfo.fillColor
        });
        this.ctx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
      } else {
        this.paint = true;
      }
    });

    // 마우스가 화면을 떠났을 시
    this.canvas.addEventListener("mouseleave", () => {
      this.paint = false;
    });

    // 마우스가 올라갔을 시
    this.canvas.addEventListener("mouseup", () => {
      this.paint = false;
    });

    this.modeButton.addEventListener("click", () => {
      if (this.modeButton.innerText === "FILL") {
        this.modeButton.innerText = "STROKE";
      } else {
        this.modeButton.innerText = "FILL";
      }
    });

    this.saveButton.addEventListener("click", () => {
      let imgUrl = this.canvas.toDataURL("image/jpg");
      var imgDownTag = document.createElement("a");
      imgDownTag.download = "canvas.jpg";
      imgDownTag.href = imgUrl;
      imgDownTag.click();
    });

    this.range.addEventListener("change", () => {
      this.ctx.lineWidth = canvasInfo.lineWidth = this.range.value;
    });

    this.colorBox.forEach(ele => {
      ele.addEventListener("click", () => {
        this.ctx.strokeStyle = canvasInfo.strokeColor =
          ele.style.backgroundColor;
        this.ctx.fillStyle = canvasInfo.fillColor = ele.style.backgroundColor;
      });
    });
  }

  bindEventSocket() {
    window.socket.on(window.global.SEND_BEGINPOS, ({ x, y }) => {
      this.beginPath(x, y);
    });

    window.socket.on(window.global.SEND_ENDPOS, ({ x, y, color }) => {
      this.stroke(x, y, color);
    });

    window.socket.on(window.global.SEND_FILLED, ({ color }) => {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
      this.ctx.fillStyle = canvasInfo.fillColor;
    });
  }

  beginPath(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  stroke(x, y, color = null) {
    if (color !== null) {
      this.ctx.strokeStyle = color;
    }
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.strokeStyle = canvasInfo.strokeColor;
  }
}
