// Figma web-wireframe converter (Ridy 2.0, page "🧩 Wireframes · Web" 373:37).
// Paste into use_figma with a JOBS header, e.g.:
//   const JOBS=[['3:77',0,30,true]];   // [source page id, from, to, clear section first]
// Heavy pages: split into chunks (clear only on the first chunk).
// Simplification rules: maps / photos / illustrations / app mockups -> X boxes (no pins or chips on maps),
// big colored panels -> light #f4f4f5 cards, route and decoration lines dropped, text -> pill bars, icons -> squares.
const wp=await figma.getNodeByIdAsync('373:37'); await figma.setCurrentPageAsync(wp);
const C={dark:'52525b',light:'c4c4cc',icon:'a1a1aa',prim:'71717a',fill:'f4f4f5',line:'e4e4e7',stroke:'d4d4d8',white:'ffffff',img:'f4f4f5',x:'d4d4d8'};
const rgb=h=>({r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255});
const lum=c=>0.2126*c.r+0.7152*c.g+0.0722*c.b; const sat=c=>Math.max(c.r,c.g,c.b)-Math.min(c.r,c.g,c.b);
function convert(F){
  const fb=F.absoluteBoundingBox; const specs=[];
  let off=0; const bt=F.findOne(n=>n.type==='TEXT' && /^(ridy|rdy)\.app/.test(n.characters) && (n.absoluteBoundingBox.y-fb.y)<56);
  const bbInst=F.findOne(n=>n.type==='INSTANCE' && n.mainComponent?.name==='Web / Browser bar');
  if(bt||bbInst) off=bbInst?Math.round(bbInst.height):56;
  const W=fb.width, H=fb.height-off, area=W*H; const maps=[];
  const inter=(a,b)=>{const x=Math.max(a.x,b.x),y=Math.max(a.y,b.y),r=Math.min(a.x+a.w,b.x+b.w),btm=Math.min(a.y+a.h,b.y+b.h); return r>x&&btm>y?{x,y,w:r-x,h:btm-y}:null;};
  const rel=b=>({x:b.x-fb.x,y:b.y-fb.y-off,w:b.width,h:b.height});
  function solid(n){ if(!('fills' in n) || !Array.isArray(n.fills)) return null; const vf=n.fills.filter(f=>f.visible!==false && (f.opacity??1)>0.05); if(!vf.length) return null; const img=vf.find(f=>f.type==='IMAGE'); if(img) return {img:true}; const s=[...vf].reverse().find(f=>f.type==='SOLID'); if(s) return {c:s.color,a:(s.opacity??1)*(n.opacity??1)}; const g=vf.find(f=>f.type.startsWith('GRADIENT')); if(g) return {grad:true}; return null; }
  function strokeInfo(n){ if(!('strokes' in n) || !Array.isArray(n.strokes) || !n.strokes.some(s=>s.visible!==false)) return null; if(typeof n.strokeWeight==='number') return n.strokeWeight>0?{all:true}:null; const t=n.strokeTopWeight||0,b=n.strokeBottomWeight||0,l=n.strokeLeftWeight||0,r=n.strokeRightWeight||0; if(!(t||b||l||r)) return null; return {t,b,l,r}; }
  function radius(n,r){ let cr=typeof n.cornerRadius==='number'?n.cornerRadius:(n.topLeftRadius||0); if(n.type==='VECTOR'||n.type==='BOOLEAN_OPERATION'){ cr = (r.h<=60 && r.w>r.h*1.6)? r.h/2 : Math.min(16,r.h/2); } if(n.type==='ELLIPSE') return -1; return Math.min(cr, r.h/2, r.w/2); }
  function isIcon(n,r){ if(n.type==='INSTANCE' && /^Icon \//.test(n.mainComponent?.name||'')) return true; if(r.w<=28 && r.h<=28 && r.w>=8 && r.h>=8 && (n.type==='GROUP'||n.type==='INSTANCE'||n.type==='FRAME'||n.type==='BOOLEAN_OPERATION') && !n.findOne?.(x=>x.type==='TEXT')) { const f=solid(n); if(f&&f.img) return false; return true; } return false; }
  function sideLines(si,r){ if(!si||si.all) return; if(si.t) specs.push({k:'rect',x:r.x,y:r.y,w:r.w,h:1,c:C.line}); if(si.b) specs.push({k:'rect',x:r.x,y:r.y+r.h-1,w:r.w,h:1,c:C.line}); if(si.l) specs.push({k:'rect',x:r.x,y:r.y,w:1,h:r.h,c:C.line}); if(si.r) specs.push({k:'rect',x:r.x+r.w-1,y:r.y,w:1,h:r.h,c:C.line}); }
  function walk(n,clip,bgL){
    if(n.visible===false || (n.opacity??1)<0.02) return;
    if(n.type==='INSTANCE' && n.mainComponent?.name==='Web / Browser bar') return;
    const b=n.absoluteBoundingBox; if(!b) return; const r=rel(b); const vis=inter(r,clip); if(!vis) return;
    if(off && r.y+r.h<=0) return;
    const nm=n.type==='INSTANCE'?(n.mainComponent?.parent?.type==='COMPONENT_SET'?n.mainComponent.parent.name:n.mainComponent?.name)||'':n.name;
    if(r.w<8&&r.h<8) return;
    if(n.rotation && Math.abs(n.rotation)>0.5 && r.w*r.h>2000 && n.type!=='TEXT') return;
    if(maps.some(m=>r.x>=m.x-2&&r.y>=m.y-2&&r.x+r.w<=m.x+m.w+2&&r.y+r.h<=m.y+m.h+2 && r.y>m.y+72 && r.w<m.w*0.45)) return;
    if(/^Web \/ App mockup/.test(nm)) { specs.push({k:'rect',...r,c:C.white,r:Math.min(32,r.w*0.12),stroke:C.stroke}); specs.push({k:'img',x:r.x+r.w*0.08,y:r.y+r.h*0.06,w:r.w*0.84,h:r.h*0.88,r:Math.min(24,r.w*0.09)}); return; }
    if(/^Logo \//.test(nm) || /^logo_/.test(n.name)) { const s=Math.min(r.w,r.h); specs.push({k:'rect',x:r.x,y:r.y,w:s,h:s,c:C.prim,r:s*0.25}); if(r.w>r.h*1.6) specs.push({k:'rect',x:r.x+s+6,y:r.y+s/2-4.5,w:Math.min(60,r.w-s-6),h:9,c:C.dark,r:4.5}); return; }
    if(/^(Map \/|Web \/ Map image)/.test(nm)) { specs.push({k:'img',...vis}); maps.push(vis); return; }
    if(/^Avatar \//.test(nm)) { specs.push({k:'ell',x:r.x,y:r.y,w:r.w,h:r.h,c:C.line}); return; }
    if(/^Illustration \//.test(nm)) { specs.push({k:'img',...vis,r:16}); return; }
    if((n.type==='GROUP'||n.type==='FRAME') && r.w*r.h>40000 && r.w*r.h<area*0.85){ const tc=n.findAllWithCriteria({types:['TEXT']}).length; const vc=n.findAllWithCriteria({types:['VECTOR']}).length; if(vc>=60 && (tc<=12 || vc>=tc*30)){ specs.push({k:'img',...vis,r:16}); maps.push(vis); return; } }
    if((n.type==='GROUP'||n.type==='FRAME') && r.w>64 && r.h>64 && r.w*r.h<area*0.4 && r.w/r.h<3 && r.h/r.w<3 && !(n.type==='FRAME'&&n.layoutMode&&n.layoutMode!=='NONE')){ const tc2=n.findAllWithCriteria({types:['TEXT']}).length; if(tc2<=2){ const sh=n.findAllWithCriteria({types:['VECTOR','ELLIPSE','RECTANGLE','STAR','POLYGON']}); const colorful=sh.some(x=>{ const bb=x.absoluteBoundingBox; if(!bb||bb.width<12||bb.height<12) return false; const fl=Array.isArray(x.fills)?x.fills.find(p=>p.type==='SOLID'&&p.visible!==false):null; return fl && sat(fl.color)>0.25; }); const imgd=sh.some(x=>Array.isArray(x.fills)&&x.fills.some(p=>p.type==='IMAGE')); if(colorful && !imgd && sh.length>=3){ specs.push({k:'img',...vis,r:12}); return; } } }
    if(n.type==='GROUP' && /^svg\d*$/i.test(n.name) && r.w>48 && r.h>48 && r.w*r.h<area*0.4) { specs.push({k:'img',...vis,r:12}); return; }
    if(isIcon(n,r)) { const s=Math.max(10,Math.min(21,Math.min(r.w,r.h)*0.8)); specs.push({k:'rect',x:r.x+(r.w-s)/2,y:r.y+(r.h-s)/2,w:s,h:s,c:C.icon,r:4}); return; }
    if(n.type==='TEXT') { const fs=typeof n.fontSize==='number'?n.fontSize:16; const st=typeof n.fontName==='object'&&n.fontName.style?n.fontName.style:'Medium'; const bold=/Bold|Black|Semi/.test(st);
      let fc=null; if(Array.isArray(n.fills)){ const s=n.fills.find(f=>f.type==='SOLID'&&f.visible!==false); if(s) fc=s.color; }
      const white=fc && lum(fc)>0.85 && bgL<0.6; const colr=white?C.white:((fs>=17||(bold&&fs>=15))?C.dark:C.light);
      const bh=fs>=40?14:fs>=24?11:fs>=17?9:(fs>=14?7:5);
      const lh=(n.lineHeight&&n.lineHeight.unit==='PIXELS')?n.lineHeight.value:fs*1.3; const lines=Math.min(3,Math.max(1,Math.round(r.h/lh)));
      const est=Math.min(r.w, n.characters.length*fs*0.52/lines*1.05);
      const al=n.textAlignHorizontal;
      for(let i=0;i<lines;i++){ const w=(i===lines-1&&lines>1)?est*0.6:est; const ly=r.y+lh*i+(lh-bh)/2; const lx=al==='CENTER'?r.x+(r.w-w)/2:(al==='RIGHT'?r.x+r.w-w:r.x); if(ly>clip.y+clip.h||ly+bh<clip.y) continue; specs.push({k:'rect',x:lx,y:ly,w:Math.max(w,6),h:bh,c:colr,r:bh/2}); }
      return; }
    let myBg=bgL; const f=solid(n); const big=(r.w*r.h)>area*0.9; const si=strokeInfo(n);
    if((n.type==='ELLIPSE'||n.type==='VECTOR') && r.w>140 && Math.abs(r.w-r.h)<r.w*0.15 && !(f&&f.img)) return;
    if(f && !big){
      if(f.img){ const round=n.type==='ELLIPSE' || (Math.abs(r.w-r.h)<4 && r.w<=96) ; if(round) specs.push({k:'ell',...r,c:C.line}); else specs.push({k:'img',...vis,r:Math.min(Math.max(0,radius(n,r)),24)}); }
      else if(f.grad){ if(r.w*r.h<area*0.5) specs.push({k:'rect',...vis,c:C.fill,r:Math.max(0,radius(n,r))}); }
      else { let L=lum(f.c); const S=sat(f.c), a=f.a; let c,stroke=null;
        if(r.h<=2||r.w<=2){ c=C.line; }
        else if(a<0.6 && L<0.5){ specs.push({k:'rect',...vis,c:'18181b',r:0,op:0.18}); c=null; }
        else if(L>0.97 && S<0.03){ c=C.white; if((si&&si.all) || (n.effects&&n.effects.some(e=>e.visible!==false)) || bgL<0.97) stroke=C.stroke; }
        else if(L>0.8){ c=C.fill; }
        else if(r.w<=16&&r.h<=16){ c=C.icon; }
        else if(r.w>=200 && r.h>=100){ c=C.fill; L=0.95; }
        else c=C.prim;
        if(c){ const rr=radius(n,r); specs.push({k:rr<0?'ell':'rect',...r,c,r:Math.max(rr,0),stroke}); myBg=L; }
      }
      sideLines(si,r);
    } else if(f && big && !f.img && !f.grad){ myBg=lum(f.c); sideLines(si,r); }
    else if(!f && si && (n.type==='VECTOR'||n.type==='LINE')){ if(r.w<=28&&r.h<=28&&r.w>=8&&r.h>=8) specs.push({k:'rect',x:r.x+(r.w-14)/2,y:r.y+(r.h-14)/2,w:14,h:14,c:C.icon,r:4}); return; }
    else if(!f && si && !big){ if(si.all){ if(r.w>20 && r.h>20) specs.push({k:n.type==='ELLIPSE'?'ell':'rect',...r,c:null,r:Math.max(0,radius(n,r)),stroke:C.stroke}); } else sideLines(si,r); }
    if(!('children' in n)) return;
    let cclip=clip; if((n.type==='FRAME'||n.type==='COMPONENT'||n.type==='INSTANCE') && n.clipsContent) cclip=inter(clip,r)||{x:0,y:0,w:0,h:0};
    for (const ch of n.children){ if(ch.isMask){ const m=inter(cclip,rel(ch.absoluteBoundingBox)); cclip=m||{x:0,y:0,w:0,h:0}; continue; } walk(ch,cclip,myBg); }
  }
  let fL=1; const ff=solid(F); if(ff&&ff.c) fL=lum(ff.c);
  for (const ch of F.children) walk(ch,{x:0,y:0,w:W,h:H},fL);
  return {specs,W,H};
}
function build(name,data,isMobile){
  const Wf=figma.createFrame(); Wf.name=name; Wf.resize(data.W,data.H); Wf.fills=[{type:'SOLID',color:rgb(C.white)}]; Wf.strokes=[{type:'SOLID',color:rgb(C.stroke)}]; Wf.strokeWeight=1; Wf.cornerRadius=isMobile?32:(data.W<900?28:20); Wf.clipsContent=true;
  for (const s of data.specs){
    if(s.w<1||s.h<1) continue;
    if(s.k==='img'){ const g=figma.createRectangle(); g.resize(s.w,s.h); g.x=s.x; g.y=s.y; g.fills=[{type:'SOLID',color:rgb(C.img)}]; g.strokes=[{type:'SOLID',color:rgb(C.x)}]; g.strokeWeight=1; g.cornerRadius=s.r||0; g.name='Image'; Wf.appendChild(g);
      for (const [x1,y1,x2,y2] of [[0,0,s.w,s.h],[0,s.h,s.w,0]]){ const l=figma.createVector(); l.vectorPaths=[{windingRule:'NONE',data:`M ${x1} ${y1} L ${x2} ${y2}`}]; l.strokes=[{type:'SOLID',color:rgb(C.x)}]; l.strokeWeight=1; l.x=s.x; l.y=s.y; l.name='X'; Wf.appendChild(l); } continue; }
    const n=s.k==='ell'?figma.createEllipse():figma.createRectangle(); n.resize(Math.max(s.w,1),Math.max(s.h,1)); n.x=s.x; n.y=s.y;
    n.fills=s.c?[{type:'SOLID',color:rgb(s.c)}]:[]; if(s.stroke){ n.strokes=[{type:'SOLID',color:rgb(s.stroke)}]; n.strokeWeight=1; n.strokeAlign='INSIDE'; }
    if(s.k!=='ell') n.cornerRadius=s.r||0; if(s.op) n.opacity=s.op; n.name=s.k==='ell'?'Ellipse':'Rectangle'; Wf.appendChild(n);
  }
  return Wf;
}
const res=[];
for (const [PID,FROM,TO,CLEAR] of JOBS){
const sp=await figma.getNodeByIdAsync(PID); await sp.loadAsync();
if(CLEAR){ const s0=wp.children.find(n=>n.type==='SECTION' && n.name===sp.name); if(s0) for(const c of [...s0.children]) c.remove(); }
let sec=wp.children.find(n=>n.type==='SECTION' && n.name===sp.name);
if(!sec){ sec=figma.createSection(); sec.name=sp.name; sec.fills=[{type:'SOLID',color:rgb('fafafa')}]; wp.appendChild(sec); const others=wp.children.filter(n=>n.type==='SECTION'&&n!==sec); sec.x=0; sec.y=others.length?Math.max(...others.map(o=>o.y+o.height))+160:0; sec.resizeWithoutConstraints(2000,1000); }
const all=sp.children.filter(f=>f.type==='FRAME' && !/components/i.test(f.name)); const out=[];
for (const F of all.slice(FROM,TO)){ if(sec.children.some(c=>c.name===F.name)) { out.push('exists '+F.name); continue; }
  const d=convert(F); const Wf=build(F.name,d,F.width<500); sec.appendChild(Wf); const n=sec.children.length; Wf.x=60+(n-1)*60; Wf.y=80; out.push(F.name); }
res.push(`${sp.name}: ${out.length}/${all.length}`);
}
return res;
