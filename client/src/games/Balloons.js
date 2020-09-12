import React, { Fragment, useEffect } from 'react';

import gun from '../style/balloons/gun.png'
import bullet1 from '../style/balloons/bullet1.png'
import smoke from "../style/balloons/smoke.png"
import { Link } from 'react-router-dom';

const Balloons = () => {

        
        useEffect(() => {

            var cells = []
            var width = 10
            var gridCellCount = width * width
            var shootPoint = 90
            var score = 0
            var time = 0
            var timerId
            var baloonsId
            
            const grid = document.querySelector('.grid')
            let frontPage = document.createElement('div')
    
            frontPage.className = 'frontPage'
            grid.appendChild(frontPage)
        
            const startBtn = document.createElement('button')
            startBtn.addEventListener('click', function(e){
                frontPage.remove()
                createGrid()
            })
            startBtn.innerHTML = '<b> START </b>'
            startBtn.className = 'startBtn'
            frontPage.appendChild(startBtn)
            
            const p1 = document.createElement('p')
            p1.className = 'p1'
          
            p1.innerHTML = 'Hit the balloons that float be the screen.'
            frontPage.appendChild(p1)
            const p2 = document.createElement('p')
            p2.className = 'p2'
            p2.innerHTML = 'Pop 10 balloons in 30 secs to win.'
            
            frontPage.appendChild(p2)
            const p3 = document.createElement('p')
            p3.className = 'p3'
            p3.innerHTML = "Watch out for the toxic balloons. You'll lose - 1."
          
            frontPage.appendChild(p3)
            
            const spaceKey = document.createElement('img')
            spaceKey.className = 'space'
            spaceKey.src = require("../style/balloons/space.png")
        
            frontPage.appendChild(spaceKey)
        
            const spaceSpan = document.createElement('span')
            spaceSpan.className = 'spaceSpan'
            spaceSpan.innerHTML = 'Press space button to release the bullet.'
            frontPage.appendChild(spaceSpan)
        
            const moveSpan = document.createElement('span')
            moveSpan.className = 'moveSpan'
            moveSpan.innerHTML = 'Operate the movement with buttons up and down.'
            frontPage.appendChild(moveSpan)
        
            const upKey = document.createElement('img')
            upKey.className = 'keyUp'
            upKey.src = require("../style/balloons/keyUp.png")
            
        
            frontPage.appendChild(upKey)
        
            const downKey = document.createElement('img')
            downKey.className = 'keyDown'
            downKey.src = require("../style/balloons/keyDown.png")
        
            frontPage.appendChild(downKey)

            var endAudio = document.querySelector('#endAudio')
        function balloonPop() {
            const balloonAudio = document.querySelector('#balloonPop')
            balloonAudio.src = require('../style/balloons/pop.wav')
            balloonAudio.volume = 0.2
            balloonAudio.play()
          }
          function toxicPop() {
            const toxicAudio = document.querySelector('#balloonPop')
            toxicAudio.src = require('../style/balloons/cut.wav')
            toxicAudio.volume = 0.2
            toxicAudio.play()
          }
          function shooterShot() {
            const shooterAudio = document.querySelector('#shooterShot')
            shooterAudio.src = require('../style/balloons/shooting.wav')
            shooterAudio.volume = 0.1
            shooterAudio.play()
          }

            document.addEventListener('keyup', function(e){
        
                if (e.keyCode === 32 || e.keyCode === 13){ 
                    if(!cells[shootPoint]) {
                        return
                    }
                  shoot(shootPoint + 1, shootPoint + 9)   
                }
                if (e.keyCode === 38){
                  if (shootPoint == 0){
                    return shootPoint
                  }
                  if(!cells[shootPoint]) {
                      return
                  }
                  cells[shootPoint].innerText=''
                  shootPoint -= 10
          
                  let shooter = document.createElement('div')
                  shooter.innerHTML = `<img src=${gun} width="30px"/>`
                  // shooter.innerText = "<img src='./style/shooter.gif' />"
                  shooter.classList.add('shooter')
                  cells[shootPoint].appendChild(shooter)
                }
                if (e.keyCode === 40){
                  if (shootPoint == 90){
                    return shootPoint
                  }
                  if(!cells[shootPoint]) {
                    return
                  }
                  cells[shootPoint].innerText=''
                  shootPoint += 10
                  let shooter = document.createElement('div')
                  shooter.innerHTML = `<img src=${gun} width="30px"/>`
                  // shooter.innerText = "<img src='./style/shooter.gif' />"
                  shooter.classList.add('shooter')
                  cells[shootPoint].appendChild(shooter)
                }     
          })

            function createGrid() {
                for (let i = 1; i <= gridCellCount; i++) {
                  const cell = document.createElement('div')
                  cell.classList.add(`box-${i}`)
                    
            
                  cells.push(cell)
                  grid.appendChild(cell)
                  
                }
                createShooter(shootPoint)
                baloonsId = setInterval(()=> {
                  createBaloon()
                }, 1000)
                timerId = setInterval(()=> {
                  time += 1
                  updateTime(time)
                }, 1000)
                createResult(score)
                    
              }

              function shoot(position, endPoint){
                setTimeout(() => {
                  if(!cells[position - 1].querySelector('.shot') && position > endPoint - 8){
                        return
                      }      
                  if(position == endPoint + 1){
                    let bulletIndex = cells[endPoint - 8].querySelector('.bullet')
                    bulletIndex.remove()
                  }  
                    
                  if (position > endPoint){
                    let prevIndex = cells[position - 1].querySelector('.shot')
                    prevIndex.remove()
            
                    
                    return
                  }
                  
                    
                  if (position > endPoint - 8){
                      
                        let prevIndex = cells[position - 1].querySelector('.shot')
                        prevIndex.remove()
                      
                  }
                  if (position == endPoint - 8){
                      let shadow = document.createElement('div')
                      shadow.className = 'smoke'
                      shadow.innerHTML = `<img src=${smoke} heigth="40px"/>`
                      cells[position].appendChild(shadow)
                      setTimeout(()=>{
                          shadow.remove()
                      }, 200)
                  }
                  if (position == endPoint - 8){
                      
                      shooterShot()
                      let bullet = document.createElement('div')
                      bullet.className = 'bullet'
                      bullet.innerHTML = `<img src=${bullet1} height="20px" width="45px"/>`
                      cells[position].appendChild(bullet)
                  }
            
                  let fire = document.createElement('div')
                  fire.className = 'shot'
                  cells[position].appendChild(fire)
                  
                  if (cells[position].querySelector('.baloon') && cells[position].querySelector('.shot')){       
                    score += 1
                    updateScore(score, endPoint - 8)
                    
          
                    let bulletIndex = cells[endPoint - 8].querySelector('.bullet')
                    bulletIndex.remove()
            
                    cells[position].querySelector('.baloon').remove()
                    cells[position].querySelector('.shot').remove()
                    balloonPop()
                    
                    return
                  }
                  else if (cells[position].querySelector('.toxic') && cells[position].querySelector('.shot')){
                        
                   
                      let bulletIndex = cells[endPoint - 8].querySelector('.bullet')
                      bulletIndex.remove()
          
          
                    score -= 1
                    updateScore(score)
                    toxicPop()
            
                    cells[position].querySelector('.toxic').remove()
                    cells[position].querySelector('.shot').remove()
                              
                    return
                  } else if (position <= endPoint){
                    shoot(position + 1, endPoint)
                  }
                }, 200)
              }

              function updateScore(score){

                let result = document.querySelector('.score')
                if(result) result.innerHTML = `<b style="color: #000; font-size:40.5px">${score}</b>/10`
                setTimeout(() => {
                if(result) result.textContent = `${score}/10`
                }, 200)
                if(score === 7){
                  endAudio.src= require("../style/balloons/UEFA.mp3")
                  endAudio.volume= 0.2;
                  endAudio.play()
                }
                if(score === 8){
                  endAudio.volume= 0.5;
                }
                if(score === 10){
                  endAudio.volume= 0.8;
                }
            
                if (score === 10){
                        
                  clearInterval(baloonsId)
                  clearInterval(timerId)
                  grid.textContent = ''
                  const victoryResult = document.createElement('button')
                  victoryResult.innerHTML = '<b>Victory, well done</b>'
                  victoryResult.className = 'victory'
                  victoryResult.addEventListener('click', () => location.reload())
                  grid.appendChild(victoryResult)
                }
                
              }

              function createResult(score){
                let result = document.createElement('div')
                result.className = 'score'
                result.textContent = `${score}/10`
                
                grid.appendChild(result)
            
                let timer = document.createElement('div')
                timer.className = 'timer'
            
                timer.textContent = `${time}/30`
                grid.appendChild(timer)
              }

              function moveBaloon(position, endPoint, toxic = false, createImage){
                setTimeout(() => {
                    if(!cells[position + 10].querySelector('.baloon') && !cells[position + 10].querySelector('.toxic')){
                        return
                      }
                    if (position < endPoint && position !== endPoint){
                    let prevIndex = cells[position + 10].querySelector('.baloon') || cells[position + 10].querySelector('.toxic')
                    prevIndex.remove()
                    return
                  }
                  if(!cells[position + 10].querySelector('.baloon') && !cells[position + 10].querySelector('.toxic')){
                    return
                  }
                   
                        const prevIndex = cells[position + 10].querySelector('.baloon') || cells[position + 10].querySelector('.toxic')
                        prevIndex.remove()
                    
                    
                  
          
                  const baloon = document.createElement('div')
                  console.log('createImage', createImage)
                  if (toxic) {
                    baloon.className = 'toxic'
                    const image = document.createElement('img')
                    image.src = createImage
                    image.style.width = '20px'
                    baloon.appendChild(image)
                  } else {
                    baloon.className = 'baloon'
                    const image = document.createElement('img')
                    image.src = createImage
                    image.style.width = '20px'
                    baloon.appendChild(image)
                    // baloon.innerText = `<img src=${createImage} />`
                  }
            
                  cells[position].appendChild(baloon)
            
                  if (cells[position].querySelector('.shot') && cells[position].querySelector('.baloon')){
                    cells[position].querySelector('.shot').remove()
                    cells[position].querySelector('.baloon').remove()
          
                    score += 1
                    balloonPop()
                    
                    cells[Math.ceil(position / 10) * 10 - 1 - 8].querySelector('.bullet').remove()
          
                    return updateScore(score)
            
                    
                  }
                  else if (cells[position].querySelector('.shot') && cells[position].querySelector('.toxic')){
                    cells[position].querySelector('.shot').remove()
                    cells[position].querySelector('.toxic').remove()
                    score -= 1
            
                    cells[Math.ceil(position / 10) * 10 - 1 - 8].querySelector('.bullet').remove()
                    
                    return updateScore(score)
            
                    
                  }
                        
                  if (position >= endPoint){
                    moveBaloon(position - 10, endPoint, toxic, createImage)
                  }
            }, 700)
              }

              function createBaloon(){
          
                let baloon = document.createElement('div')
            
                let baloonPosition = Math.floor(Math.random() * (99 - 91 + 1)) + 91
                let baloonImages = new Array()
                    
                baloonImages[1] = require('../style/balloons/yellow.png')
                baloonImages[2] = require('../style/balloons/blue.png')
                baloonImages[3] = require('../style/balloons/red.png')
                let toxicImages = new Array()
                
                toxicImages[1] = require('../style/balloons/toxic2.png')
                toxicImages[2] = require('../style/balloons/toxic1.png')
            
                let toxic = Math.random() < 0.2
                let createImage
                if (toxic){
                  createImage = toxicImages[Math.floor(Math.random() * 2) + 1]
                  baloon.className = 'toxic'
                  //baloon.style.backgroundImage = baloonImages[1]
                  baloon.innerHTML = `<img src=${createImage} width="20px"/>`
                } else { 
                  createImage = baloonImages[Math.floor(Math.random() * 3) + 1]
                  baloon.className = 'baloon'
                  //baloon.style.backgroundImage = baloonImages[1]
                  baloon.innerHTML = `<img src=${createImage} width="20px"/>`
                }
            
                cells[baloonPosition].appendChild(baloon)
                moveBaloon(baloonPosition -10, baloonPosition - 90, toxic, createImage)
              }

              function updateTime(time){
                
                let timer = document.querySelector('.timer')
                
                if (!timer) return

                  timer.innerText = `${time}/30`
          
                if (time === 30){
                  endAudio.src=require("../style/balloons/defeat.wav");
                  endAudio.volume = 0.2
                  endAudio.play()
                  clearInterval(baloonsId)
                  clearInterval(timerId)
                  grid.textContent = ''
                  let defaultResult = document.createElement('button')
                  defaultResult.innerHTML = '<b>Try again</b>'
                  defaultResult.className = 'defeat'
                  defaultResult.addEventListener('click', () => location.reload())
                  grid.appendChild(defaultResult)
                        
                }
              }

              function createShooter(shootPoint) {
                let shooter = document.createElement('div')
                shooter.classList.add('shooter')
                shooter.innerHTML = `<img src=${gun} width="30px"/>`
                cells[shootPoint].appendChild(shooter)
              }
        }, []);

        

    return (
    <Fragment>
        <Link to="/games" className="back-arrow">{"<-"} Go to the other games</Link>
        <div className="grid-wrapper">
        <div className="grid"></div>
        </div>
        <audio id="balloonPop"></audio>
        <audio id="shooterShot"></audio>
        <audio id="endAudio"></audio>
        <audio id="toxicPop"></audio>
    </Fragment>
    );
}
export default Balloons;

