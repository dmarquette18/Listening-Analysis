let myWord = "cat"
let myVec = [0,0,0,0,0]
let dictionary;

function preload() {
  raw_words = loadJSON("words.json");
  font = loadFont('Avenir.otf');
}

function setup() {
  totWordInfo = {}
  createDictionary()
  g = findMaxMin()
  minS = g[0]
  maxS = g[1]
  minW = g[2]
  maxW = g[3]
  print(minS)
  setWord("cat")
  createCanvas(windowWidth, windowHeight);
  hopCnt = 100
  cnt = 200
  cnt2 = 400
  x=width/4
  y = height/4
  newWord = false
  myRec = new p5.SpeechRec('en-US'); // new P5.SpeechRec object
  myRec.continuous = true; // do continuous recognition
  myRec.interimResults = false
  myRec.onResult=parseResult;
  myRec.start();
  myRec.onResult=parseResult;
  test = new wordBox(font.textBounds(
    'test', 0, 0, 200), font.textToPoints(
    'test', 0,0, 200, {
      sampleFactor: 1,
      simplifyThreshold: 0
    }));
  boxes = [test];
  wordInfo = {}
  minWords = []
  cursor(CROSS);
  fill(255, 127);
  noStroke();
  let particleSum = 10000
  allParticles = []
  for (let i = 0; i < particleSum; i++) {
    allParticles.push(new particle());
  }
  

}

function setWord(word) {
  print(word)
  myWord = word.toUpperCase()
  //wordData = dictionary[myWord]
  //print(wordData)
}

function findMaxMin(){
  maxS = -10000000000
  minS = 10000000000
  maxW = -10000000000
  minW = 10000000000
  for(let w in dictionary){
    wordData = dictionary[w]
    if(wordData.freqS>maxS){
      maxS = wordData.freqS
    }
    if(wordData.freqS<minS){
      minS = wordData.freqS
    }
    if(wordData.freqW>maxW){
      maxW = wordData.freqW
    }
    if(wordData.freqW<minW){
      minW = wordData.freqW
    }
  }
  return [minS, maxS, minW, maxW]
}


function findCloseWords(word) {
  
}

function findMinimums(allVals){
  totMins = []
  if(allVals.length<10){
    return allVals
  }
  while(totMins.length<10){
    //console.log(allVals)
    minimum = Math.min.apply(null, allVals)
    //console.log(min)
    ind = allVals.indexOf(minimum)
    allVals.splice(ind, 1)
    totMins.push(minimum)
  }
  print(totMins)
  return totMins
  


}

function draw() {


  background(220);
  background(0);
  fill(255,0,0)
  x=width/8
  y=height/8
  minWords = []
  minimum = 100000000
  minWord = "NULL"
  for (let k in wordInfo){
    totWordInfo[k] = wordInfo[k]
  }
  allVals = []
  for (let k in totWordInfo){
    allVals.push(totWordInfo[k]['diff'])
  }
  minNums = findMinimums(allVals)
  print(minNums)
  for (let k in totWordInfo){
    diff = totWordInfo[k]['diff']
    if(minNums.includes(diff)){
      minWords.push(k)
    }
  }

  /*
  for (let k in totWordInfo){
    if(minWords.length<10){
      minWords.push(k)
    }
    else{
      max = 0
      for(i=0;i<minWords.length;i++){
        if(totWordInfo[minWords[i]]['S Frequency'] > max){
          max = totWordInfo[minWords[i]]['S Frequency']
          maxWord = minWords[i]
        }
      }
      for (let k in wordInfo){
        if(wordInfo[k]['S Frequency'] < max
      }
    }
  }
  if(minWord != "NULL"){
    minWords.push(minWord)
  }
  */
  
  
  for (let k in totWordInfo){
    if(y>height-(height/8)){
      y = height/8
      x += 150
    }
    if(minWords.includes(k)){
      fill(0,255,0)
    }
    else{
      fill(255,0,0)
    }
    text(k,x,y)
    y += 10
    for (let i in totWordInfo[k]){
      text(i,x,y)
      y+= 10
      text(totWordInfo[k][i],x,y)
      y+= 10
    }
    y+= 20
    
  }

  /*
  stroke(51);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
  noStroke();
  
  let centerDist = dist(mouseX, mouseY, width / 2, height / 2);

  let transparency = map(centerDist, 0, width / 2, 200, 50);
  transparency = constrain(transparency, 50, 200);
	fill(255, transparency);
  let jiggle = map(centerDist, 0, width, 1, 300);
  
  if(hopCnt>-1000){
    for(i=0;i<allParticles.length;i++){
      allParticles[i].move()
      allParticles[i].display()
    }
    hopCnt -= 1
  }
  else{
    for(i=0;i<allParticles.length;i++){
      allParticles[i].display()
    }
  }
  */
  
  
}

function draw2() {
  background(220);
  background(0);
  
  stroke(51);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
  noStroke();
  
  let centerDist = dist(mouseX, mouseY, width / 2, height / 2);

  let transparency = map(centerDist, 0, width / 2, 200, 50);
  transparency = constrain(transparency, 50, 200);
	fill(255, transparency);
  
  let jiggle = map(centerDist, 0, width, 1, 300);
  
  
  
// 	stroke(255, 0, 0);
//   rect(bounds.x, bounds.y, bounds.w, bounds.h);
  
//   console.log("x: " + bounds.x 
//               + ", y: " + bounds.y
//               + ", w: " + bounds.w
//               + ", h: " + bounds.h);
  
  for (let i = 0; i<boxes.length; i++){
    bounds = boxes[i].bounds
    
    for (let j = 0; j < boxes[i].points.length; j++) {
      let p = boxes[i].points[j];
      r = random(255); // r is a random number between 0 - 255
      g = random(0,255); // g is a random number betwen 100 - 200
      b = random(0,255); // b is a random number between 0 - 100
      a = random(0,255); // a is a random number between 200 - 255
  
      noStroke();
      fill(r, g, b, a);
    
      ellipse(p.x + cnt * randomGaussian(), 
        p.y + cnt * randomGaussian(), 5, 5);
    }
  }
  
  
  if(cnt < 0 && cnt2 > 0){
    cnt2 = cnt2 - 2
  }
  else if(newWord) {
    cnt = cnt-2
  }
  if(cnt <= -200){
    cnt = 200
    cnt2 = 400
    newWord = false
  }
}

function createDictionary() {
//   Oh no, p5 mangles the dictionary
  dictionary = {}
  allWords = []
  for (var index in raw_words) {
    w = raw_words[index]
    
    word = {
      word:w[0],
      freqS:w[1],
      freqW:w[2],
      syllables:w[3].split(" "),
      vecP:w[4].split(" ").map(s => float(s)),
      vecM:w[5].split(" ").map(s => float(s)),
    }
    dictionary[w[0]] = word
    allWords.push(word)
  }
 
}

function parseResult(){
  mostrecentword = myRec.resultString;
  chunk = mostrecentword.split(" ")

  minWord = ""
  minNum = 10000000
  freqDict = {}
  for(i=0;i<chunk.length; i++){
    myWord = chunk[i].toUpperCase().split(".").join("")
    try{
      wordData = dictionary[myWord]
      freqDict[wordData.word] = [wordData.freqS, wordData.vecM, wordData.freqW]
      
    }
    catch{
      print("No result for " + chunk[i])
    }
  }

  newWord = true
  tot = []
  wordInfo = {}
  for (let k in freqDict){
    sFreq = map(freqDict[k][0], 56864, maxS, 0, 1, true)
    wFreq = map(freqDict[k][2], minW, maxW, 0, 1, true)
    diff = (sFreq) + (3*wFreq)
    wordInfo[k] = {'S Frequency': freqDict[k][0], 'W Frequency':freqDict[k][2], 'diff':diff}

  }

  
  
  

}

class wordBox{
  constructor(bounds, points){
    this.bounds = bounds
    this.points = points
  }
  
}

class particle{
  constructor(loc){
    this.pos = createVector(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
    this.direction = createVector(Math.random() * 1.5, Math.random() * 1.5);
    this.r = random(255); // r is a random number between 0 - 255
    this.g = random(0,255); // g is a random number betwen 100 - 200
    this.b = random(0,255); // b is a random number between 0 - 100
    this.a = random(0,255); // a is a random number between 200 - 255
  }
  
  move() {
    this.pos = this.pos.add(this.direction);
    if (this.pos.x <= 0) this.direction.x *= -1;
    if (this.pos.x > width) this.direction.x *= -1;
    if (this.pos.y <= 0) this.direction.y *= -1;
    if (this.pos.y > height) this.direction.y *= -1;
  }
  display() {
    noStroke();
    
    fill(this.r, this.g, this.b, this.a);
    ellipse(this.pos.x, this.pos.y, 7)
  }
}
  