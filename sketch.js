let sketch = function(p) { 
    let state;
    let uselessCounter = 0;
    let stateChanged = false; 
        
    p.setup = function() {
      p.createCanvas(400, 400);
      state = 'start';
    }
  
    p.draw = function() {
      p.background(220);
      
      if (state === 'start') {
        start();
      }
      else if(state === 'game') {
        game();
      }
      else if(state === 'over') {
        over();
      }
      
      if (state === 'start' && p.keyIsPressed && p.key === 's') {
        state = 'game';
      }
      if (state === 'over' && p.keyIsPressed && p.key === 'r') {
        document.location.reload(true);
      }
    }
  
    function start() {
      p.text('Press S to start', 40, 50, 50);
    }
  
    function game() {
      // Here goes your game code 
      // ...
      p.background(0, 112, 255);
      
      // this condition is just for holding game state for few seconds
      uselessCounter++;
      if (uselessCounter > 200) { 
        state = 'over'; 
        stateChanged = true; // NEW
      }
    }
  
    function over() {
      p.background(255, 112, 112);
      p.text('GAME OVER', 40, 50, 50);
      p.text('press R to restart', 60, 80, 150);
      
      // NEW
      if (stateChanged) {
        stateChanged = false;
        let body = document.querySelector('body');
        
        let form = document.createElement('form');
        form.setAttribute('class', 'form');
  
        let newBtn = document.createElement('button');
        newBtn.textContent = "Save current User's score";
          
        let allBtn = document.createElement('button');
        allBtn.textContent = "Get TOP3";
        allBtn.setAttribute('class', 'top-btn');
  
        let topDiv = document.createElement('div');
        topDiv.setAttribute('class', 'top-list');
  
        body.appendChild(allBtn);
        body.appendChild(topDiv);
  
        body.appendChild(form);
        form.appendChild(newBtn);
        
        form.addEventListener('submit', (e) => {
          console.log("button pressed");
          
          // send to Firebase
          writeScoreFB(50);

          e.preventDefault();
        });
  
        allBtn.addEventListener('click', (event) => {
          // read from Firebase
          readScoreFB();
        });
      }
    }
  };

 