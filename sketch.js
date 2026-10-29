// 定義全域變數
let stopImages = []; // 儲存停止狀態的圖片陣列
let walkImages = []; // 儲存走路狀態的圖片陣列

let currentFrame = 0; // 目前播放到的影格索引
let animationSpeed = 0.15; // 動畫播放速度 (數字越大越快)

let x = 0; // 角色的 X 座標
let y = 0; // 角色的 Y 座標
let moveSpeed = 4; // 角色移動速度
let isFacingLeft = false; // 是否面向左邊

function preload() {
  // 1. 載入「停止」狀態的圖片（共 9 張，名稱為 0.png ~ 8.png）
  for (let i = 0; i < 9; i++) {
    // 優先讀取 1/停止/ 或是 1/stop/ 目錄下的圖片
    stopImages[i] = loadImage(`1/停止/${i}.png`, 
      () => {}, 
      () => {
        // 備用路徑：若中文目錄讀取失敗，嘗試英文目錄
        stopImages[i] = loadImage(`1/stop/${i}.png`);
      }
    );
  }

  // 2. 載入「走路」狀態的圖片（共 9 張，名稱為 0.png ~ 8.png）
  for (let i = 0; i < 9; i++) {
    walkImages[i] = loadImage(`1/走路/${i}.png`, 
      () => {}, 
      () => {
        // 備用路徑：若中文目錄讀取失敗，嘗試英文目錄
        walkImages[i] = loadImage(`1/walk/${i}.png`);
      }
    );
  }
}

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定圖片繪製基準點為中心點（方便做轉向與定位）
  imageMode(CENTER);

  // 初始化角色的位置在畫面正中央
  x = width / 2;
  y = height / 2;
}

function draw() {
  // 設定背景顏色 (caf0f8)
  background('#caf0f8');

  let isWalking = false; // 紀錄當前是否在走路

  // 檢查鍵盤按鍵狀態
  if (keyIsDown(RIGHT_ARROW)) {
    x += moveSpeed; // 往右移動
    isFacingLeft = false; // 面向右邊
    isWalking = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    x -= moveSpeed; // 往左移動
    isFacingLeft = true; // 面向左邊 (需要轉向)
    isWalking = true;
  }

  // 更新動畫影格索引
  currentFrame += animationSpeed;

  // 繪製角色
  push(); // 儲存當前繪製狀態
  translate(x, y); // 將座標原點移至角色位置

  // 如果面向左邊，利用 scale(-1, 1) 做水平翻轉（轉向動作）
  if (isFacingLeft) {
    scale(-1, 1);
  }

  // 根據角色狀態選擇要顯示的圖片陣列
  let currentArray = isWalking ? walkImages : stopImages;
  
  // 計算當前應該顯示第幾張圖片（循環顯示）
  let frameIndex = floor(currentFrame) % currentArray.length;
  let img = currentArray[frameIndex];

  // 確保圖片已成功載入後繪製
  if (img && img.width > 0) {
    image(img, 0, 0);
  }

  pop(); // 恢復繪製狀態
}

// 當視窗大小改變時自動調整畫布尺寸
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}