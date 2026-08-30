
let colors = ["ff7f7d", "febf7e","fede80","feff7f","befe7e"];
let rankName = ["S","A","B","C","D"];

const container = document.getElementById("tier-container");
console.log(container)
const moveDownImg = document.createElement("img");
moveDownImg.setAttribute("src","imgs/down_arrow.png");


function getSettingImg(){
  const settingImg = document.createElement("img");
  settingImg.setAttribute("src","imgs/setting.png");
  return settingImg;
}

function getMoveUpImg(){
  const moveUpImg = document.createElement("img");
  moveUpImg.setAttribute("src","imgs/up_arrow.png");
  return moveUpImg;
}

function getMoveDownImg(){
  const moveDownImg = document.createElement("img");
  moveDownImg.setAttribute("src","imgs/down_arrow.png");
  return moveDownImg;
}


function addTierRow(color, label){
  const tierRow = document.createElement("div");
  tierRow.classList.add("tier-row","row");

  const labelHolder = document.createElement("div");
  labelHolder.classList.add("label-holder","col-2");
  labelHolder.style.backgroundColor = '#' + color;
  tierRow.appendChild(labelHolder)
  const labelText = document.createElement("input");
  labelText.setAttribute("type","text");
  labelText.setAttribute("value",label);
  labelHolder.appendChild(labelText);

  const tierSort = document.createElement("div");
  tierSort.classList.add("tier-sort", "col-8");
  tierRow.appendChild(tierSort)
  const tierSetting = document.createElement("div");
  tierSetting.classList.add("tier-setting","col-2");

  const setting = document.createElement("div");
  setting.classList.add("setting")
  const settingBtn = document.createElement("button");
  settingBtn.classList.add("setting","btn");
  settingBtn.setAttribute("type","button");

  settingBtn.appendChild(getSettingImg());
  setting.appendChild(settingBtn);


  const move = document.createElement("div");
  move.classList.add("move", "btn-group");

  const upBtn = document.createElement("button");
  upBtn.classList.add("move-up", "btn");
  upBtn.setAttribute("type","button");
  upBtn.appendChild(getMoveUpImg());

  const downBtn = document.createElement("button");
  downBtn.classList.add("move-down", "btn");
  downBtn.setAttribute("type","button");
  downBtn.appendChild(getMoveDownImg());

  move.appendChild(upBtn);
  move.appendChild(downBtn);

  tierSetting.appendChild(setting)
  tierSetting.appendChild(move);

  tierRow.appendChild(tierSetting)
  container.appendChild(tierRow)
}

for (let index = 0; index < colors.length; index++) {
  addTierRow(colors[index], rankName[index])
}

var pinList = document.createElement("div");
pinList.classList.add("list-pin","row");
const pinText = document.createElement("h2");
pinText.innerText = "Pin List";
pinList.appendChild(pinText)
container.appendChild(pinList)
