class Timer {
    constructor(){
        this.clock__minutes=document.getElementById("clock__minutes");
        this.clock__seconds=document.getElementById("clock__seconds");
        this.clockContainer=document.getElementById("clockContainer");
        this.buttonPlay=document.getElementById('buttonPlay');
        this.buttonPreviousLevel=document.getElementById('button-backward');
        this.buttonNextLevel=document.getElementById('button-forward');
        this.buttonPlus10=document.getElementById('button-+10');
        this.buttonMinus10=document.getElementById('button--10');
        this.childLevelsMarker=[...document.getElementById('levelsMarker').children];
        
        this.currentTime = 0;
        this.currentTime_minutes = 0;
        this.currentTime_seconds = 0;
        this.currentLevel = 1;
        this.interval = null;

        this.isRun = false;

        this.howManyTimeInLevel = [7,7,5,5,3,3];
        this.withColorInLevel = ["blue","blue","green","green","black","black"];
        this.ElementWhoChangeTheme = null;//["clockContainer", "buttonPlay", "button-backward", "button-forward", "button-+10", "button--10"];

        // this.idElementWhoChangeColor=["clockContainer", "buttonPlay", "button-backward", "button-forward", "button-+10", "button--10"];
    }

    initialTimer(){
        this.currentTime=60*this.howManyTimeInLevel[this.currentLevel-1];
        this.addEventListeners();
        this.ElementWhoChangeTheme=[this.clockContainer, this.buttonPlay, this.buttonPreviousLevel, this.buttonNextLevel, this.buttonPlus10, this.buttonMinus10]
    }

    addEventListeners() {
        this.buttonPlay.addEventListener('click', ()=> this.clickButtonPlay());
        this.buttonPreviousLevel.addEventListener('click', ()=> this.clickButtonPreviousLevel());
        this.buttonNextLevel.addEventListener('click', ()=> this.clickButtonNextLevel());
        this.buttonPlus10.addEventListener('click', ()=> this.clickButtonPlus10());
        this.buttonMinus10.addEventListener('click', ()=> this.clickButtonminus10());
    }

    clickButtonPlay(){
        this.isRun = !this.isRun;
        if(this.isRun){
            this.interval=setInterval(()=>this.nextSecond(), 1000);
        }else{
            clearInterval(this.interval);
            this.showTimeOnScreen();
        }

        this.switchButtonPlay();
    }

    countTime(){
        this.currentTime_seconds=this.currentTime % 60 ;
        this.currentTime_minutes= (this.currentTime - this.currentTime_seconds ) / 60;
    }

    showTimeOnScreen(){
        this.countTime();
        this.clock__minutes.innerHTML = "0" + this.currentTime_minutes;
        if(this.currentTime_seconds > 9){
            this.clock__seconds.innerHTML = this.currentTime_seconds
        } else{
            this.clock__seconds.innerHTML = "0" + this.currentTime_seconds
        }
    ;
    }  


    nextSecond(){
        if(this.currentTime > 0){
            this.currentTime --;
            this.showTimeOnScreen();
        }else{
            this.currentTime = 0;
            this.isRun = !this.isRun
            clearInterval(this.interval);
            this.showTimeOnScreen();
            this.switchButtonPlay();
        }

    }

    switchButtonPlay(){
        if(this.isRun){
            this.buttonPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        else{
            this.buttonPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        };
    }

    alarm(){
        console.log('end time current level');
        
    }

    clickButtonPlus10(){
        this.currentTime = this.currentTime + 10;
        if(!this.isRun)this.showTimeOnScreen();
    }

    clickButtonminus10(){
        if(this.currentTime > 10){
            this.currentTime = this.currentTime - 10;
            this.showTimeOnScreen();
        }else{
            this.currentTime = 0;
            this.showTimeOnScreen();
        };
    }


    clickButtonNextLevel(){
        if(this.currentLevel < 6){
            this.currentLevel++;
            this.isRun = false;
            this.currentTime=this.howManyTimeInLevel[this.currentLevel - 1]*60;
            this.countTime();
            this.showTimeOnScreen();
            this.levelIndicator();
            this.switchButtonPlay();
            this.changeTheme();
            clearInterval(this.interval);
        }
    }

    clickButtonPreviousLevel(){
        if(this.currentLevel > 1){
            this.currentLevel--;
            this.isRun = false;
            this.currentTime=this.howManyTimeInLevel[this.currentLevel - 1]*60;
            this.countTime();
            this.showTimeOnScreen();
            this.levelIndicator();
            this.switchButtonPlay();
            this.changeTheme();
            clearInterval(this.interval);

        }
    }

    levelIndicator(){
        for(let i in this.childLevelsMarker ){
            this.childLevelsMarker[i].innerHTML='<i class="fa-sharp fa-solid fa-circle-dot"></i>';
            this.childLevelsMarker[i].classList.remove("level_dot--active");
        };
        for(let i=1; i<this.currentLevel; i++){
            this.childLevelsMarker[i - 1].innerHTML ='<i class="fa-solid fa-circle">';
        };
        this.childLevelsMarker[this.currentLevel - 1].innerHTML ='<i class="fa-solid fa-location-dot"></i>';
        this.childLevelsMarker[this.currentLevel - 1].classList.add("level_dot--active");
    }

    changeTheme(){
        for(let i in this.ElementWhoChangeTheme){
            this.ElementWhoChangeTheme[i].classList.remove("level-green-button");
            this.ElementWhoChangeTheme[i].classList.remove("level-blue-button");
            this.ElementWhoChangeTheme[i].classList.remove("level-black-button");
            this.ElementWhoChangeTheme[i].classList.add(`level-${this.withColorInLevel[this.currentLevel - 1]}-button`);
        }

        document.body.classList.remove("level-blue");
        document.body.classList.remove("level-green");
        document.body.classList.remove("level-black");

        document.body.classList.add(`level-${this.withColorInLevel[this.currentLevel - 1]}`);
    }

}
