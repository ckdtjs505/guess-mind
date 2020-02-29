let canvasInfo = {
  // 켄버스 색
  color: "#2c2c2c",
  width: 600,
  height: 600,
  lineWidth: 2.5
};

export class Canvas {
  constructor(width, height) {
    this.paint = false;

    this.canvas = document.getElementById("jsCanvas");

    this.colorBox = document.querySelectorAll("#jsColorBox div");
    this.range = document.getElementById("jsRange");
    this.modeButton = document.getElementById("jsMode");
    this.saveButton = document.getElementById("jsSave");
    this.ctx = this.canvas.getContext("2d");

    this.setOpt(width, height);
    this.bindEventDefualt();

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  bindEventDefualt() {
    // 마우스 이동시

    this.canvas.addEventListener("mousemove", event => {
      let x = event.offsetX;
      let y = event.offsetY;
      if (!this.paint) {
        // 그림을 그려준다
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }
    });
    // 마우스 클릭시
    this.canvas.addEventListener("mousedown", () => {
      this.paint = true;
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
      this.ctx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
    });

    this.saveButton.addEventListener("click", () => {
      let imgUrl = this.canvas.toDataURL("image/jpg");
      var imgDownTag = document.createElement("a");
      imgDownTag.download = "canvas.jpg";
      imgDownTag.href = imgUrl;
      imgDownTag.click();
    });

    this.range.addEventListener("change", () => {
      this.ctx.lineWidth = this.range.value;
    });

    this.colorBox.forEach(ele => {
      ele.addEventListener("click", () => {
        this.ctx.strokeStyle = ele.style.backgroundColor;
        this.ctx.fillStyle = ele.style.backgroundColor;
      });
    });
  }

  setOpt(width, height) {
    if (width === undefined) this.canvas.width = width = canvasInfo.width;
    if (height === undefined) this.canvas.height = height = canvasInfo.height;
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
  }
}
