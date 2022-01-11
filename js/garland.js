const led = document.createElement("span");
const garland = document.getElementById("garland");
const colors =["red", "green", "blue"];
let random =0;
let defaultValues = {
    denisty: 0.3,
    mode: 0,
    timer: 700,
    rowCount: 1,
    darkmode: 0
}

let denisty = {
    value: localStorage.getItem("denisty"),
    set foo(value){
        denisty.value = value;
        destroy();
        init();
    }
}

let mode= {
    value: localStorage.getItem("mode") ,
    set foo(value){
        mode.value=value;
        modeSelect();
        }
}

let timer = {
    value: localStorage.getItem("timer") ,
    set foo(value){
        timer.value = value;
        destroy();
        init();
    }
}

let timerId= setInterval(function(){destroy();init()},timer.value);
clearTimeout(timerId);

let rowCount = {
    value: localStorage.getItem("size") ,
    set foo(value){
        rowCount.value = value;
        destroy();
        init();
    }
}

let darkmode= {
    value:localStorage.getItem("darkmode"),
    set foo(value){
        if (value == 0){
            darkmode.value=0;
            garland.classList.remove("dark");
            settings.classList.remove("dark");
            document.body.classList.remove("dark");
        }
        else{
            darkmode.value=1;
            garland.classList.add("dark");
            settings.classList.add("dark");
            document.body.classList.add("dark");
        }
        
    }
}

function modeSelect(){
    if (mode.value == 0){
        clearTimeout(timerId);
        let ledArray = document.querySelectorAll(".led");
        for (let i=0; i<ledArray.length; i++){
            ledArray[i].style.setProperty("animation-duration",(timer.value)+"ms");
        }
    }
    if (mode.value == 1){
    timerId= setInterval(function(){destroy();init()},timer.value);
    }
    if (mode.value == 2){
        clearTimeout(timerId);
        blink();
    }  
}

function calcAmount() {
led.classList.add("led");
garland.appendChild(led);
let amount = garland.offsetWidth/led.offsetWidth*denisty.value;
if (amount === Infinity){
        amount=0;
    }   
garland.removeChild(led);
return amount;
}

function addRows(count){
    for(let i=0; i<count; i++){
        const row = document.createElement("div");
        row.className="garland__row";
        if (i % 2 == 0)
        {
            row.style.justifyContent="space-evenly";
        }
        garland.appendChild(row);
    }
}

function randomColor(){
    let a=random;
    random=Math.floor(Math.random()*3);
    if (random == a){
        randomColor();
    }
    else{
        return;
    }
}

function addLed(parent){
    {
       const led=document.createElement("span");
        parent.appendChild(led);
        led.classList.add("led");
        led.classList.add(colors[random]);
        led.style.setProperty("animation-duration",timer.value+"ms");
        randomColor();
    }
}

function init(){
    if (localStorage.getItem("size") == null){
        rowCount.value = defaultValues.rowCount;
    }
    if (localStorage.getItem("denisty") == null){
        denisty.value = defaultValues.denisty;
    }
    if (localStorage.getItem("mode") == null){
        mode.value = defaultValues.mode;
    }
    if (localStorage.getItem("timer") == null){
        timer.value = defaultValues.timer;
    }
    if (localStorage.getItem("darkmode") == null){
        darkmode.value = defaultValues.darkmode;
    }

    addRows(rowCount.value);
    let row=document.querySelectorAll(".garland__row");
        for (let j=0; j<rowCount.value; j++){
                for (let i=0; i<calcAmount(); i++){
                    addLed(row[j]);
                }
        }
}

function destroy(){
    let rowArray = document.querySelectorAll(".garland__row");
    for (let i=0; i<rowArray.length; i++){
        rowArray[i].remove();
    }
}

function blink(){
    let ledArray = document.querySelectorAll(".led");
    for (let i=0; i<ledArray.length; i++){
        if(ledArray[i].classList.contains(colors[1])){
            ledArray[i].style.setProperty("animation-duration",(timer.value*2)+"ms");
        }
        if(ledArray[i].classList.contains(colors[2])){
            ledArray[i].style.setProperty("animation-duration",(timer.value*3)+"ms");
        }
    }
}

function control(){
    modeSelect();
    if (mode.value == 0){
        document.getElementById("radioButton0").checked=true;
    }
    if (mode.value == 1){
        document.getElementById("radioButton1").checked=true;
    }
    if (mode.value == 2){
        document.getElementById("radioButton2").checked=true;
    }  

    document.getElementById("denisty").value=denisty.value;
    document.getElementById("timer").value=timer.value;
    document.getElementById("size").value=rowCount.value;

    if (darkmode.value == 1){
        garland.classList.add("dark");
        settings.classList.add("dark");
        document.body.classList.add("dark");
    }

    let toggle = document.getElementsByName("darkmode");
    for (let i = 0; i<toggle.length; i++){
        toggle[i].onchange = function(){
           darkmode.foo=this.value;
    }
    if (darkmode.value == 0){
        toggle[0].checked = true;
    }   
    else{
        toggle[1].checked = true;
    }
 }
    
    let radio = document.getElementsByName("mode");
    for (let i = 0; i<radio.length; i++){
        radio[i].onchange = function(){
            mode.foo=this.value;
        }
    }

   document.getElementById("denisty").onchange = function(){
       denisty.foo=this.value;
   }

   document.getElementById("timer").onchange = function(){
       timer.foo=this.value;
    }

    document.getElementById("size").onchange = function(){
        rowCount.foo=this.value;
    }
}

garland.onclick = function(){
    document.getElementById("settings").classList.toggle("no-display");
}

document.getElementById("saveButton").onclick = function(){
    localStorage.setItem("denisty", document.getElementById("denisty").value);
    localStorage.setItem("timer", document.getElementById("timer").value);
    localStorage.setItem("size", document.getElementById("size").value);
    localStorage.setItem("darkmode",darkmode.value);
    localStorage.setItem("mode",mode.value);
    document.getElementById("settings").classList.toggle("no-display");
}

init();
control();