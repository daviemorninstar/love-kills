const sky=document.getElementById('sky');
for(let i=0;i<150;i++){
  const s=document.createElement('i');
  s.className='star';
  s.style.left=Math.random()*100+'%';
  s.style.top=Math.random()*100+'%';
  s.style.animationDuration=(4+Math.random()*13)+'s';
  s.style.animationDelay=(-Math.random()*15)+'s';
  s.style.opacity=.15+Math.random()*.75;
  sky.appendChild(s);
}

const intro=document.getElementById('intro');
const loading=document.getElementById('loading');
const game=document.getElementById('game');
const ending=document.getElementById('ending');
const meteor=document.getElementById('meteor');
const lucifer=document.getElementById('lucifer');
const michael=document.getElementById('michael');
const dialogue=document.getElementById('dialogue');
const objective=document.getElementById('objective');

function show(el){
  [intro,loading,game,ending].forEach(x=>x.classList.remove('active'));
  el.classList.add('active');
}

document.getElementById('start').onclick=()=>{
  show(loading);
  setTimeout(()=>{
    meteor.style.display='block';
    meteor.animate(
      [{left:'-15%',top:'12%',opacity:0},{left:'20%',top:'30%',opacity:1},{left:'115%',top:'85%',opacity:1}],
      {duration:1500,easing:'linear',fill:'forwards'}
    );
  },500);
  setTimeout(()=>show(game),3200);
  setTimeout(()=>startStory(),3900);
};

const lines=[
  ['Lucifer','Well... this is an unusually quiet night.'],
  ['Michael','...'],
  ['Lucifer','I know you are hiding somewhere.'],
  ['Michael','...'],
  ['Lucifer','You could at least say hello.'],
  ['Michael','No.'],
  ['Lucifer','That is rather rude.'],
  ['Michael','...'],
  ['Lucifer','You know, I came all this way because I thought I might find you.'],
  ['Michael','Then you should have looked somewhere else.'],
  ['Lucifer','Oh, I intend to look everywhere.'],
  ['Lucifer','And besides... I rather like finding you.'],
  ['Michael','...'],
  ['Lucifer','There you are.'],
  ['Michael','Not for long.']
];

let step=0;
let running=false;

function say(text){
  dialogue.textContent=text;
  dialogue.classList.remove('show');
  void dialogue.offsetWidth;
  dialogue.classList.add('show');
}

function move(el,x,y){
  el.style.left=x+'%';
  el.style.top=y+'%';
}

const luciferPos=[[10,65],[28,28],[65,60],[78,20],[50,70],[18,40],[72,72],[42,18],[82,48],[25,76]];
const michaelPos=[[78,30],[83,62],[30,16],[8,68],[62,18],[80,76],[15,25],[55,76],[70,42],[15,58]];

function startStory(){
  if(running)return;
  running=true;
  objective.textContent='TAP TO SEE WHAT HAPPENS';
  say(lines[0][1]);
  move(lucifer,10,65);
  move(michael,78,30);
}

function advance(){
  if(!running)return;
  step++;
  if(step>=lines.length){
    setTimeout(()=>{
      say('Maybe some nights are meant to be shared.');
      objective.textContent='TAP ONCE MORE';
      running=false;
    },300);
    return;
  }
  const [who,text]=lines[step];
  say(text);

  const idx=Math.min(step,luciferPos.length-1);
  if(who==='Lucifer'){
    move(lucifer,luciferPos[idx][0],luciferPos[idx][1]);
  }else{
    move(michael,michaelPos[idx][0],michaelPos[idx][1]);
  }

  if(step===8) objective.textContent='HE IS GETTING CLOSER.';
  if(step===11) objective.textContent='SOME THINGS ARE WORTH CHASING.';
  if(step===13) objective.textContent='ONE LAST RUN.';
}

game.addEventListener('pointerdown',(e)=>{
  if(e.target.closest('.character'))return;
  advance();
});

lucifer.addEventListener('pointerdown',(e)=>{
  e.stopPropagation();
  say('Lucifer almost caught him.');
});
michael.addEventListener('pointerdown',(e)=>{
  e.stopPropagation();
  say('Michael slipped away again.');
});

setTimeout(()=>{},0);

document.getElementById('again').onclick=()=>{
  step=0;running=false;
  lucifer.style.left='12%';lucifer.style.top='64%';
  michael.style.left='77%';michael.style.top='30%';
  show(intro);
};
