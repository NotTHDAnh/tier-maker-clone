
let colors = ["ff7f7d", "febf7e","fede80","feff7f","befe7e"];
let rankName = ["S","A","B","C","D"];

const container = document.getElementById("tier-container");
console.log(container)
const moveDownImg = document.createElement("img");
moveDownImg.setAttribute("src","imgs/down_arrow.png");

let tierNumber = 5;

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


function getNewTierRow(color, label,index){
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
  upBtn.id = "up"+index;
  upBtn.addEventListener("click", () => {
    changePos("up",tierRow)
  });

  const downBtn = document.createElement("button");
  downBtn.classList.add("move-down", "btn");
  downBtn.setAttribute("type","button");
  downBtn.id = "down"+index;
  downBtn.appendChild(getMoveDownImg());
  downBtn.addEventListener("click", () => {
    changePos("down",tierRow)
  });

  tierRow.id = "row" + index;
  

  move.appendChild(upBtn);
  move.appendChild(downBtn);

  tierSetting.appendChild(setting)
  tierSetting.appendChild(move);

  tierRow.appendChild(tierSetting)
  tierRow.setAttribute("ondrop","dropHandler(event)");
  tierRow.setAttribute("ondragover","dragoverHandler(event)");
  return tierRow;
}

for (let index = 0; index < tierNumber; index++) {
  container.appendChild(getNewTierRow(colors[index], rankName[index],index))
}

var pinList = document.createElement("div");
pinList.classList.add("list-row","row");
const pinText = document.createElement("h2");
pinText.innerText = "Pin Images";
pinList.appendChild(pinText)

const listContainer = document.createElement("div");
listContainer.classList.add("col","list-container");
listContainer.setAttribute("id","list-cont");

listContainer.setAttribute("ondrop","dropHandler(event)");
listContainer.setAttribute("ondragover","dragoverHandler(event)");

const listRow = document.createElement("div");
listRow.classList.add("list-row","row");
const listLabel = document.createElement("label");
listLabel.innerText = "Add additional images to your tier list";
listRow.appendChild(listLabel);
const inputFile = document.createElement("input");
inputFile.setAttribute("type","file");
inputFile.setAttribute("id","uploader");
inputFile.setAttribute("accept","image/png,image/pjp,image/jpeg,image/jpg,image/pjpeg,image/jfif,image/gif,image/webp");
inputFile.setAttribute("multiple","true");

const uploader = inputFile;

uploader.addEventListener('change', function(event) {
 const files = event.target.files;
 Array.from(files).forEach((file, index)=> {
    const imgObjURL = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = imgObjURL;
    img.alt = file.name;
    console.log(img);
    const div = document.createElement("div");
    div.classList.add("card");
    img.classList.add("card");
    img.setAttribute("draggable","true");
    img.setAttribute("ondragstart","dragstartHandler(event)")
    img.id = "drag-card-" + Date.now() + "-" + index;
    listContainer.appendChild(img);
   });
 })
listContainer.setAttribute("id","container-list")
pinList.appendChild(listRow)
listRow.appendChild(listContainer);
listRow.appendChild(inputFile)

container.appendChild(pinList)

function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

// function dropHandler(ev) {
//   ev.preventDefault();
//   const data = ev.dataTransfer.getData("text");
//   console.log(data)
//   ev.target.appendChild(document.getElementById(data));
// }

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  
  const dropZone = (ev.target.closest(".tier-sort") || ev.target.closest(".list-container"));
  console.log(dropZone);
  if(!dropZone) return;
  if (ev.target.tagName === "IMG") {
    ev.target.parentNode.appendChild(draggedElement);
  } else {
    ev.target.appendChild(draggedElement);
  }
}
//
// function changePos(direction,row){
//   const index1 = "row" + index;
//   const index2 = "row" + ((direction === "up")?((index - 1)):((index + 1)));
//
//   // console.log(document.getElementById(index1));
//   // console.log(document.getElementById(index2));
//   // console.log(index2);
//   const div1 = document.getElementById(index1);
//   const div2 = document.getElementById(index2);
//   if(div1 === null || div2 === null){
//     return;
//   }
//   console.log(div1)
//   swapRow(index1,index2,direction);
// }


function changePos(direction,row) {
  if (direction === "up") {
    const prevRow = row.previousElementSibling;
    // Ensure there is a previous row and it's actually a tier-row
    if (prevRow && prevRow.classList.contains("tier-row")) {
      row.parentNode.insertBefore(row, prevRow);
    }
  } else if (direction === "down") {
    const nextRow = row.nextElementSibling;
    // Ensure there is a next row and it's actually a tier-row
    if (nextRow && nextRow.classList.contains("tier-row")) {
      row.parentNode.insertBefore(nextRow, row);
    }
  }
}

function swapRow(index1, index2, direction){
  console.log(direction)
  const div1 = document.getElementById(index1);
  const div2 = document.getElementById(index2);
  let tmp = div1.id;
  div1.id = div2.id;
  div2.id = tmp;

  if (direction === "up") {
    div2.parentNode.insertBefore(div1, div2);
  } else {
    div1.parentNode.insertBefore(div2, div1); 
  }
}
