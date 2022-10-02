class Timer {
    constructor(){
        this.buttonPlay=document.getElementById('buttonPlay');
        this.buttonPreviousLevel=document.getElementById('button-backward');
        this.buttonNextLevel=document.getElementById('button-forward');
        this.buttonplus10=document.getElementById('button-+10');
        this.buttonminus10=document.getElementById('button--10');
        
        this.currentTime = 60 * 7;
        this.currentTime_minutes = 0;
        this.currentTime_seconds = 0;
        this.currentLevel = 1;

        this.isRun = false;
        this.iAgreeToAllarm = true;
    }

    initialTimer(){
        this.addEventListeners();
    }

    addEventListeners() {
        this.buttonPlay.addEventListener('click', ()=> this.clickButtonPlay());
        this.buttonPreviousLevel.addEventListener('click', ()=> this.clickButtonPreviousLevel());
        this.buttonNextLevel.addEventListener('click', ()=> this.clickButtonNextLevel());
        this.buttonplus10.addEventListener('click', ()=> this.clickButtonplus10());
        this.buttonminus10.addEventListener('click', ()=> this.clickButtonminus10());
    }

    clickButtonPlay(){
        this.isRun = !this.isRun;
        this.iAgreeToAllarm = true;
        if(this.isRun){
            this.runTime();
        }

        this.switchButtonPlay();
    }

    countTime(){
        this.currentTime_seconds=this.currentTime % 60 ;
        this.currentTime_minutes= (this.currentTime - this.currentTime_seconds ) / 60;
    }

    showTimeOnScreen(){
        this.countTime();
        document.getElementById("clock__minutes").innerHTML = "0" + this.currentTime_minutes;
        if(this.currentTime_seconds > 9){
            document.getElementById("clock__seconds").innerHTML = this.currentTime_seconds
        } else{
            document.getElementById("clock__seconds").innerHTML = "0" + this.currentTime_seconds
        }
    ;
    }

    runTime(){
        this.showTimeOnScreen();
        if(this.currentTime > 0 && this.isRun){
            console.log(this.currentTime);
            console.log(this.isRun);
            this.currentTime = this.currentTime - 1;

        setTimeout(()=>this.runTime(), 1000);
        }else{
        this.showTimeOnScreen();
        this.alarm();
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
        console.log('alarm');
    }

    clickButtonplus10(){
        this.currentTime = this.currentTime + 10;
        this.showTimeOnScreen();
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

    modeTime(e){
        switch(e){
            case 1:
                this.currentTime = 60 * 7;
                break;
            case 2:
                this.currentTime = 60 * 7;
                break;
            case 3:
                this.currentTime = 60 * 5;
                break;
            case 4:
                this.currentTime = 60 * 5;
                break;
            case 5:
                this.currentTime = 60 * 3;
                break;
            case 6:
                this.currentTime = 60 * 3;
                break;
        }
    }

    clickButtonNextLevel(){
        if(this.currentLevel < 6){
            this.currentLevel++;
            this.isRun = false;
            this.iAgreeToAllarm = false;
            this.modeTime(this.currentLevel);
            this.countTime();
            this.showTimeOnScreen();
            this.levelIndicator();
        }
    }

    clickButtonPreviousLevel(){
        if(this.currentLevel > 1){
            this.currentLevel--;
            this.isRun = false;
            this.iAgreeToAllarm = false;
            this.modeTime(this.currentLevel);
            this.countTime();
            this.showTimeOnScreen();
            this.levelIndicator();

        }
    }

    levelIndicator(){
        for(let i=1; i<=6; i++){
            document.getElementById('level-' + i).innerHTML='<i class="fa-sharp fa-solid fa-circle-dot"></i>';
        };
        for(let i=1; i<this.currentLevel; i++){
            document.getElementById('level-'+i).innerHTML ='<i class="fa-solid fa-circle">';
        };
        document.getElementById('level-'+this.currentLevel).innerHTML ='<i class="fa-solid fa-location-dot"></i>';
    }


}   