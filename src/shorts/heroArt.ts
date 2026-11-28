// Deterministic, frame-driven vector layers. No text, fabricated statistics or external requests.
import type { HeroSpec } from "./topicTypes";
type Colors = {primary:string; secondary:string; alert:string; border:string; panel:string; background:string; text:string; muted:string};
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
export const reveal=(t:number,start:number,duration:number)=>1-Math.pow(1-clamp((t-start)/duration),3);
const point=(cx:number,cy:number,r:number,a:number)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];
const arc=(cx:number,cy:number,r:number,a:number,b:number)=>{
  const [x,y]=point(cx,cy,r,a),[ex,ey]=point(cx,cy,r,b);
  return 'M '+x+' '+y+' A '+r+' '+r+' 0 '+(b-a>Math.PI?1:0)+' 1 '+ex+' '+ey;
};
const line=(x:number,y:number,ex:number,ey:number,c:string,w=2,o=1)=>'<line x1="'+x+'" y1="'+y+'" x2="'+ex+'" y2="'+ey+'" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round" opacity="'+o+'"/>';
const circle=(x:number,y:number,r:number,fill:string,stroke="none",w=1,o=1)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+w+'" opacity="'+o+'"/>';
const path=(d:string,c:string,w=2,o=1)=>'<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round" opacity="'+o+'"/>';
const flag=(code:string|null,x:number,y:number,r:number,opacity:number,flags:Record<string,string>,p:Colors,id:string)=>{
  const image=code && flags[code];
  // Circular artwork already fits its own square view; no cropping or stretch.
  return '<g opacity="'+opacity+'">'+circle(x,y,r+5,p.panel,p.border,2)+
    (image?'<image href="'+image+'" x="'+(x-r)+'" y="'+(y-r)+'" width="'+2*r+'" height="'+2*r+'" preserveAspectRatio="xMidYMid meet"/>':circle(x,y,r,p.panel,p.muted,1,.42)+circle(x,y,3,p.muted,"none",1,.6))+
    circle(x,y,r+1,"none",p.muted,1,.35)+'</g>';
};
export function heroArt(spec:HeroSpec,t:number,p:Colors,flags:Record<string,string>):string {
  const a=p.primary,b=p.secondary,c=p.alert;
  const layers:string[]=[];
  if(spec.kind==="partner-hub"){
    const cx=410,cy=410,R=295,n=spec.partners.length;
    const core=reveal(t,0,15),ring=reveal(t,5,24);
    layers.push(circle(cx,cy,320,"none",p.border,1,ring*.8));
    layers.push(path(arc(cx,cy,R,-Math.PI/2,-Math.PI/2+Math.PI*1.999*ring),a,3,.58));
    layers.push(circle(cx,cy,126,"none",a,2,core*.4),circle(cx,cy,115,"none",b,1,core*.35));
    spec.partners.forEach((code,i)=>{
      const angle=-Math.PI/2+i*2*Math.PI/n,[x,y]=point(cx,cy,R,angle);
      const start=13+i*5,k=reveal(t,start,14),dock=reveal(t,start+10,13);
      const [sx,sy]=point(cx,cy,112,angle);
      const ex=sx+(x-sx)*k,ey=sy+(y-sy)*k;
      layers.push(line(sx,sy,ex,ey,a,3,.75*k));
      if(k>0 && k<1) layers.push(circle(ex,ey,5,a));
      if(dock>0){
        const pulse=((t-start+1200)%72)/72;
        const px=sx+(x-sx)*pulse,py=sy+(y-sy)*pulse;
        layers.push(circle(px,py,3,b,"none",1,.65*dock*Math.sin(Math.PI*pulse)));
        layers.push(flag(code,x,y,48*(.7+.3*dock),dock,flags,p,"partner-"+i));
      }
    });
    layers.push(flag(spec.center,cx,cy,105*(.78+.22*core),core,flags,p,"center"));
  } else if(spec.kind==="radar"){
    const cx=410,cy=410,rr=340,k=reveal(t,0,18),sweep=(Math.max(0,t-10)*3-90)*Math.PI/180;
    layers.push(circle(cx,cy,rr+14,"none",p.border,2,k));
    [105,195,275,340].forEach((r,i)=>layers.push(path(arc(cx,cy,r,-Math.PI/2,-Math.PI/2+Math.PI*1.999*reveal(t,i*3,19)),a,i===3?5:3,.43)));
    for(let i=0;i<48;i++){const v=i*Math.PI/24,[x,y]=point(cx,cy,rr+5,v),[ex,ey]=point(cx,cy,rr+(i%4===0?23:12),v);layers.push(line(x,y,ex,ey,p.muted,i%4===0?2:1,k*.48));}
    layers.push(line(cx-rr,cy,cx+rr,cy,b,1,k*.17),line(cx,cy-rr,cx,cy+rr,b,1,k*.17));
    const [ex,ey]=point(cx,cy,rr,sweep);
    for(let i=1;i<=16;i++){const [x,y]=point(cx,cy,rr,sweep-i*.035);layers.push(line(cx,cy,x,y,a,4,k*.13*(1-i/17)));}
    layers.push(line(cx,cy,ex,ey,a,4,k),circle(ex,ey,5,a,"none",1,k));
    [[180,40,0],[258,130,1],[140,210,0],[225,290,1],[285,330,0],[95,90,1]].forEach(([r,deg,alert])=>{
      const angle=deg*Math.PI/180,[x,y]=point(cx,cy,r,angle);
      const age=((sweep-angle)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);
      const lit=Math.max(.12,1-age/1.6)*k, col=alert?c:a;
      layers.push(circle(x,y,9,col,"none",1,lit),circle(x,y,13+18*Math.min(1,age/1.6),"none",col,2,lit*.55));
    });
    layers.push(circle(cx,cy,10,a,"none",1,k));
  } else if(spec.kind==="rate-dial"){
    const cx=410,cy=535,R=300,start=Math.PI,end=2*Math.PI,k=reveal(t,0,20);
    const theta=Math.PI+Math.PI*(.5+.39*Math.sin(Math.max(0,t-8)/15));
    layers.push(path(arc(cx,cy,R,start,start+Math.PI*k),p.border,30,1),path(arc(cx,cy,R+29,start,start+Math.PI*k),b,2,.35));
    for(let i=0;i<=20;i++){const angle=start+i*Math.PI/20,[x,y]=point(cx,cy,R-24,angle),[ex,ey]=point(cx,cy,R-(i%5===0?54:39),angle);layers.push(line(x,y,ex,ey,p.muted,i%5===0?4:2,reveal(t,i*.55,9)*.65));}
    layers.push(path(arc(cx,cy,R,start,theta),a,12,k*.9));
    const [ex,ey]=point(cx,cy,R-65,theta);
    const needle=reveal(t,8,15);
    layers.push(line(cx,cy,cx+(ex-cx)*needle,cy+(ey-cy)*needle,a,8,needle),circle(ex,ey,8,a,"none",1,needle),circle(cx,cy,27,p.panel,b,2,k),circle(cx,cy,12,a,"none",1,k));
    layers.push(line(cx-105,cy+72,cx+105,cy+72,p.border,2,k));
  } else if(spec.kind==="connection"){
    const cy=164,left=131,right=689,r=123,k=reveal(t,0,16),j=reveal(t,5,16),draw=reveal(t,10,18);
    const sx=left+r,ex=right-r,mid=(sx+ex)/2;
    const flicker=t>=50?1:Math.floor(Math.max(0,t-12)/5)%2;
    const col=flicker?c:a;
    layers.push(line(sx,cy,sx+(ex-sx)*draw,cy,col,8,draw),line(sx,cy-18,sx+(ex-sx)*draw,cy-18,p.border,2,draw*.75),line(sx,cy+18,sx+(ex-sx)*draw,cy+18,p.border,2,draw*.75));
    if(draw>0 && draw<1)layers.push(circle(sx+(ex-sx)*draw,cy,7,col));
    if(draw===1){const q=((t-28)%60+60)%60/60;layers.push(circle(sx+(ex-sx)*q,cy,5,p.text,"none",1,.75*Math.sin(Math.PI*q)),circle(mid,cy,18+12*(1-q),"none",col,2,.3*(1-q)));}
    layers.push(flag(spec.left,left,cy,r*(.8+.2*k),k,flags,p,"left"),flag(spec.right,right,cy,r*(.8+.2*j),j,flags,p,"right"));
  }
  return layers.join("");
}
