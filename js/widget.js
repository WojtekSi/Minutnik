const btnAdditionalInfo = document.querySelector(".top").children[1];
const widget = document.querySelector(".widget");
const btnClose = document.querySelector(".boxClose").children[0];

btnAdditionalInfo.addEventListener("click",()=>{
    console.log("xx")
    widget.classList = 'widgetShow'
})

btnClose.addEventListener("click",()=>{
    console.log("xx")
    widget.classList = 'widgetHidden'
})