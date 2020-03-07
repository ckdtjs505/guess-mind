let canvasInfo = {
  // 켄버스 색
  mode: "STROKE", // FILL
  width: 600,
  height: 600,
  fillColor: "black",
  strokeColor: "black",
  lineWidth: 2.5
};

export class Canvas {
  constructor() {
    this.paint = false;
    this.canvas = document.getElementById("jsCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.setOpt();
    this.buildUI();
    this.bindEventSocket();

    // 리더일 경우에만 이벤트를 바인드한다.
    // this.bindEventDefualt();
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
    this.canvas.addEventListener("mousemove", event => {
      // 마우스가 움직인 x,y 좌표를 기억한다.
      let x = event.offsetX;
      let y = event.offsetY;

      if (!this.paint) {
        // 보이지 않지만 시작점을 계속해서 찍는다.
        this.beginPath(x, y);
        window.socket.emit(window.global.DRAW_BEGINPOS, { x, y });
      } else {
        // this paint === true
        // 마우스가 눌리면 paint값이 true가 되므로
        this.stroke(x, y);
        window.socket.emit(window.global.DRAW_ENDPOS, {
          x,
          y,
          color: this.ctx.strokeStyle
        });
      }
    });

    // 켄버스에서 마우스 클릭시
    this.canvas.addEventListener("mousedown", () => {
      // 캔버스 모드가 fill일 시
      if (canvasInfo.mode === "FILL") {
        window.socket.emit(window.global.SEND_FILL, {
          color: canvasInfo.fillColor
        });
        this.ctx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
      }

      // 켄버스 모드기 stroke 일시
      if (canvasInfo.mode === "STROKE") {
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

    // 모드 변경 버튼
    this.modeButton.addEventListener("click", () => {
      switch (canvasInfo.mode) {
        // 채우기 일때
        case "FILL":
          this.modeButton.innerText = "STROKE";
          canvasInfo.mode = "STROKE";
          break;
        // 그리기 일때
        case "STROKE":
          this.modeButton.innerText = "FILL";
          canvasInfo.mode = "FILL";
          break;
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
      this.fill(color);
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

  fill(color = null) {
    if (color !== null) {
      this.ctx.fillStyle = color;
    }
    this.ctx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
    this.ctx.fillStyle = canvasInfo.fillColor;
  }
}
