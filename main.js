let countSpan = document.querySelector(".Count span")
let bullets = document.querySelector(".bullets ") 
let bulletsSpanContainer = document.querySelector(".bullets .spans") 
let theQuestion = document.querySelector(".quiz-area h2")
let quizArea = document.querySelector(".quiz-area");
let quizApp = document.querySelector(".quiz-app");
let answersArea = document.querySelector(".answers-area");
let result = document.querySelector(".results")
let countDownEle = document.querySelector(".count-down")

let answerDiv = document.querySelector(".answer")
// مش هتبقي صح بسبب الـ dataset
// let aQ = document.querySelector(".answer label[for = A]")
// let bQ = document.querySelector(".answer label[for = B]")
// let cQ = document.querySelector(".answer label[for = C]")
// let dQ = document.querySelector(".answer label[for = D]")
let submitButton = document.querySelector(".submit")

//Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval


//    let dd = document.querySelector("input")
//    dd.style.boxShadow

function getqObject(){
    let myreq = new XMLHttpRequest()

    myreq.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){   
          let qObject = JSON.parse(this.responseText)
          let qCount = qObject.length
          console.log(qCount)

          //Create Bullets + Set qObject Count
         CreateBullets(qCount)

         //Count Down 
         countDown(60,qCount)

         //Add qObject Data
         addQuestionData(qObject[currentIndex],qCount)
         


         //Click On Submit
        submitButton.onclick = () => {
            //get Right Answer
            let theRightAnswer = qObject[currentIndex]["right_answer"]
    
            //increase Index
            currentIndex++

            
            //Check the Answer
            checkAnswer(theRightAnswer,qCount)
            
            //Remove Previous Question
            quizArea.innerHTML =""
            answersArea.innerHTML =""
            
            addQuestionData(qObject[currentIndex],qCount)
            
            handleBullets()

            //Count Down 
       clearInterval(countdownInterval)
        countDown(60,qCount)
            
            showResults(qCount)
        }

        }
    }

    myreq.open("GET","quesion.json")
    myreq.send()
}
getqObject()


function CreateBullets(num){
    countSpan.innerHTML = num
    
    for(let i=0; i < num; i++){
        let theBullet = document.createElement("span")

        // Check Span

        if(i === 0){
            theBullet.className ="active"
        }

        //Append Bullets To Main Bullet span Container

       bulletsSpanContainer.appendChild(theBullet)
    }
}

// مش هتبقي صح بسبب الـ dataset
// function addqObjectData(obj, count){
//     theQuestion.textContent =  obj["title"]
//     aQ.textContent = obj.answer_1
//     bQ.textContent = obj.answer_2
//     cQ.textContent = obj.answer_3
//     dQ.textContent = obj.answer_3
// }

let mainDiv;

function addQuestionData(obj, count) {
    if (currentIndex < count) {
      // Create H2 Question Title
      let questionTitle = document.createElement("h2");
  
      // Create Question Text
      let questionText = document.createTextNode(obj["title"]);
  
      // Append Text To H2
      questionTitle.appendChild(questionText);
  
      // Append The H2 To The Quiz Area
      quizArea.appendChild(questionTitle);
  
      // Create The Answers
      for (let i = 1; i <= 4; i++) {
        // Create Main Answer Div
        mainDiv = document.createElement("div");
  
        // Add Class To Main Div
        mainDiv.className = "answer";
  
        // Create Radio Input
        let radioInput = document.createElement("input");
  
        // Add Type + Name + Id + Data-Attribute
        radioInput.name = "question";
        radioInput.type = "radio";
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];
  
        // Make First Option Selected
        if (i === 1) {
          radioInput.checked = true;
        }
  
        // Create Label
        let theLabel = document.createElement("label");
  
        // Add For Attribute
        theLabel.htmlFor = `answer_${i}`;
  
        // Create Label Text
        let theLabelText = document.createTextNode(obj[`answer_${i}`]);
  
        // Add The Text To Label
        theLabel.appendChild(theLabelText);
  
        // Add Input + Label To Main Div
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);
  
        // Append All Divs To Answers Area
        answersArea.appendChild(mainDiv);    
      }
    }
  }
  

function checkAnswer(rAnswer, count){
    let answers = document.getElementsByName("question")
    let theChossenAnswer;

    for(let i = 0 ; i<4; i++){
        if (answers[i].checked) {
            theChossenAnswer = answers[i].dataset.answer;
            
        }
    }
    if(rAnswer === theChossenAnswer ){
    rightAnswers++
    console.log("good")
    }
}

function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span")
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span,index)=>{
        if(currentIndex === index){
            span.className =  "active"
        }
    })
}

function showResults(count){
 if(currentIndex === count){
    console.log("Finsish")
    quizArea.remove()
    answersArea.remove()
    bullets.remove()
    submitButton.remove()
    result.classList.add("finish")
    quizApp.classList.add("finish")

    if(rightAnswers >= (count/2) && rightAnswers < count){
    theResults = `<span class = "good">عاااش</span>, جبت ${rightAnswers} من ${count} عااش متزعلش`
    }else if (rightAnswers === count){
    theResults = `<span class = "perfect">أجمد من اجمد جامد في المادة</span>, جبت ${rightAnswers} من ${count} ياخي كم انت عظيم`
    }else{
    theResults= `<span class = "bad">لسه عندك فرص</span>, جبت ${rightAnswers} من ${count} <span class="bad">لأ تيأس يا صديفي &lt3</span>`
    }

    result.innerHTML = theResults
    result.style.padding = "10px;"
    result.style.marginTop = "10px;"
    result.style.backGroundColor = "white"
    result.style.boxShadow = " black 0 0 10px 10px;"
 }
}

function countDown(duration , count){
    if(currentIndex < count){
        let seconds , minutes;
        countdownInterval = setInterval(() => {
            minutes = parseInt(duration/60);
            seconds = parseInt(duration%60);

            minutes = minutes < 10 ?`0${minutes}` :minutes
            seconds = seconds < 10 ?`0${seconds}` :seconds

            countDownEle.innerHTML = `${minutes}:${seconds}`

            if(--duration < 0){
                clearInterval(countdownInterval);
                submitButton.click();
            }
        }, 1000);
    }

}
