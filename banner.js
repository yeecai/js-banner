export function main(text, nodeName = "text", orientation = "width") {
  // 偏移值
  let offset = 0;
  //声明定时器
  let timer = null;
  // 文字
  let textWords = "";
  if (orientation === "height") {
    text = text.replaceAll(",", "</br>");
  }
  textWords = Array.isArray(text) ? text.join() : text;

  const app = document.querySelector("#app");
  const out = document.createElement("div");
  out.className = "text-container";
  out.innerHTML = `
    <div class="text-wrapper">
      <div id="${nodeName}-innerwrap">
          <div class="text" id="${nodeName}">${textWords}</div>
      </div>
      </div>
    `;

  app.appendChild(out);
  const inner = document.querySelector(`#${nodeName}-innerwrap`);
  const textNode = document.querySelector(`#${nodeName}`);

  init();
  setupEvent();
  setupStyle();

  // 初始化
  function init(config = {}) {
    // 开启定时器之前最好先清除一下定时器
    clearInterval(timer);
    //开始定时器
    const speed = config?.speed ?? 10;

    timer = setInterval(move, speed);
  }

  function setupStyle() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .text-container{
        height: 100px;
        margin: 20px;
        width: 100%;
      }
      .text-wrapper{
        width: 100%;
        max-height: 100%;
        height: 100px;
        position: absolute;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: #000;
        border-radius: 8px;
        /* 阴影 */
        box-shadow: rgba(0, 0, 0, 0.4) 5px 5px, rgba(0, 0, 0, 0.3) 10px 10px, rgba(0, 0, 0, 0.2) 15px 15px, rgba(0, 0, 0, 0.1) 20px 20px, rgba(0, 0, 0, 0.05) 25px 25px;
      }
      #${nodeName}-innerwrap {
          padding: 12px 12px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
      }
      .text{
          height: auto; // not working hmm
          white-space:nowrap;
          box-sizing: border-box;
          color: #fff;
          font-size: 48px;
          font-weight:bold;
          /* 文字一定要立体 */
          text-shadow:0px 0px 0 rgb(230,230,230),1px 1px 0 rgb(215,215,215),2px 2px 0 rgb(199,199,199),3px 3px 0 rgb(184,184,184),4px 4px 0 rgb(169,169,169), 5px 5px 0 rgb(154,154,154),6px 6px 5px rgba(0,0,0,1),6px 6px 1px rgba(0,0,0,0.5),0px 0px 5px rgba(0,0,0,.2);
      }
      `;
    document.head.appendChild(styleTag);
  }

  function setupEvent() {
    const speed = 10;

    document.onkeydown = function (e) {
      var keyNum = window.event ? e.keyCode : e.which; //获取被按下的键值
      if (keyNum == 32) {
        if (timer) {
          clearInterval(timer);
          timer = null;
        } else {
          timer = setInterval(move, speed);
        }
      }
    };
  }

  //封装移动函数
  function move() {
    const offsetOrt = orientation === "width" ? "offsetWidth" : "offsetHeight";
    const ort = orientation === "width" ? "left" : "top";
    if (offset >= textNode[offsetOrt]) {
      offset = 0;
    } else {
      offset++;
    }
    inner.style[ort] = `${-offset}px`;
  }
}
