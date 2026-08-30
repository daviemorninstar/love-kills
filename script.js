const $=s=>document.querySelector(s);
const intro=$("#intro"), game=$("#game"), start=$("#start"), next=$("#next"), again=$("#again");
const luc=$("#lucifer"), mike=$("#michael"), dialogue=$("#dialogue"), speaker=$("#speaker"), line=$("#line"), chapter=$("#chapter"), hint=$("#hint");
const scenes=[
["NIGHT I","LUCIFER","I felt a star fall. I did not expect to find you beneath it."],
["NIGHT I","MICHAEL","..."],
["NIGHT II","LUCIFER","There you are. You always were better at hiding than leaving."],
["NIGHT II","MICHAEL","Why are you following me?"],
["NIGHT III","LUCIFER","Perhaps I am not following you. Perhaps I am simply going where you are."],
["NIGHT III","MICHAEL","You should be afraid of me."],
["NIGHT IV","LUCIFER","I have met worse things than a man with a knife."],
["NIGHT IV","MICHAEL","And yet you keep looking at me."],
["NIGHT V","LUCIFER","You are difficult to find."],
["NIGHT V","MICHAEL","Maybe I wanted you to find me."],
["NIGHT VI","LUCIFER","Then stop running."],
["NIGHT VI","MICHAEL","Make me."],
["NIGHT VII","LUCIFER","Gladly."],
["NIGHT VII","LUCIFER","Somewhere between the chase and the silence, the night became ours."],
["NIGHT VIII","MICHAEL","..."],
["NIGHT VIII","LUCIFER","You do not have to say anything."],
["NIGHT IX","LUCIFER","Just stay."],
["NIGHT IX","MICHAEL","...I will."]
];
let i=0, started=false;

function moveCharacters(n){
  const paths=[
    ["10%","33%","8%","40%"],
    ["34%","42%","70%","30%"],
    ["56%","28%","18%","50%"],
    ["24%","48%","58%","43%"],
    ["62%","45%","6%","32%"],
    ["42%","27%","76%","48%"],
    ["15%","44%","48%","35%"],
    ["52%","35%","24%","44%"]
  ];
  const p=paths[n%paths.length];
  luc.style.left=p[0]; luc.style.top=p[1];
  mike.style.right=p[2]; mike.style.top=p[3];
  luc.style.transform=`scale(.72) ${n%2?"scaleX(-1)":""}`;
  mike.style.transform=`scale(.70) scaleX(${n%2?"1":"-1"})`;
}
function show(){
  if(i>=scenes.length){end();return}
  const [ch,sp,tx]=scenes[i];
  chapter.textContent=ch; speaker.textContent=sp; line.textContent=tx;
  dialogue.classList.remove("hidden"); hint.textContent="TAP CONTINUE";
  moveCharacters(i);
}
function end(){dialogue.classList.add("hidden");$("#ending").classList.remove("hidden");}
start.onclick=()=>{
  intro.style.opacity="0"; intro.style.transition="opacity 1.5s";
  setTimeout(()=>{intro.classList.add("hidden");game.classList.remove("hidden");started=true;show()},1400);
};
next.onclick=()=>{i++;show()};
again.onclick=()=>{i=0;$("#ending").classList.add("hidden");show()};
game.addEventListener("click",e=>{
  if(!started || e.target.closest("button") || e.target.closest(".dialogue")) return;
  // ambient tap: move the two sprites when the player taps the world
  moveCharacters(i+1);
});
