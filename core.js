export const MUSCLES=['Pecho','Dorsales','Espalda alta','Deltoides anterior','Deltoides lateral','Deltoides posterior','Bíceps','Tríceps','Cuádriceps','Isquios','Glúteos','Pantorrillas','Abdominales'];
export const EQUIPMENT={'body only':'Peso corporal',barbell:'Barra',dumbbell:'Mancuernas',bench:'Banco',rack:'Rack',machine:'Máquinas',cable:'Poleas',pullup:'Barra de dominadas',bands:'Bandas',kettlebells:'Kettlebells',other:'Otro', 'exercise ball':'Fitball','medicine ball':'Balón medicinal','e-z curl bar':'Barra Z','foam roll':'Rodillo'};
export const DAYS=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
export const uid=()=>globalThis.crypto.randomUUID();
export const round=n=>Math.round(n*100)/100;
export const rpeFromRir=n=>10-Number(n);
export function contribution(ex,m){return ex.direct.includes(m)?1:ex.indirect.includes(m)?.5:0}
export function volume(items,lookup,actual=false){const out={};for(const i of items){const e=lookup(i.exercise);if(!e)continue;let n=actual?i.sets.filter(s=>s.done&&s.type==='work').length:Number(i.sets);for(const m of [...e.direct,...e.indirect])out[m]=(out[m]||0)+n*contribution(e,m)}return out}
export function nextLoad(load,step=2.5){if(!(load>0&&step>0))return null;const k=load*1.05/step;const lower=Math.floor(k)*step,upper=Math.ceil(k)*step;const chosen=lower>load&&Math.abs(lower-load*1.05)<=Math.abs(upper-load*1.05)+1e-8?lower:Math.max(upper,Math.floor(load/step+1)*step);return {weight:round(chosen),percent:round((chosen/load-1)*100),manual:(chosen/load-1)>.100001}}
export function eligible(sets){const s=sets.filter(x=>x.done&&x.type==='work');return s.length>0&&sets.filter(x=>x.type==='work').every(x=>x.done&&x.reps>=12&&x.rpe!==null&&x.rpe!==''&&Number(x.rpe)<=9)&&s.every(x=>x.weight===s[0].weight)}
export function estimate1RM(s,mode='total'){return s.done&&s.type!=='warmup'&&s.weight>0&&s.reps>=1&&s.reps<=10&&mode!=='assisted'&&mode!=='body'?round(s.reps===1?s.weight:s.weight*(1+s.reps/30)):null}
export function allowed(ex,p){return !p.excluded.includes(ex.id)&&ex.equipment.every(q=>q==='body only'||p.equipment.includes(q))}
export function targets(p){const low=p.program==='short'?8:12,high=p.program==='short'?10:16;const balanced=p.program==='short'?(p.days.length===3?9:8):12;return Object.fromEntries(MUSCLES.map(m=>[m,p.priority.length?(p.priority.includes(m)?high:low):balanced]))}
function groupMuscles(type){const lower=['Cuádriceps','Isquios','Glúteos','Pantorrillas','Abdominales'];if(type==='Inferior'||type==='Legs')return lower;if(type==='Superior')return MUSCLES.filter(m=>!lower.includes(m));if(type==='Push')return ['Pecho','Deltoides anterior','Deltoides lateral','Tríceps'];if(type==='Pull')return ['Dorsales','Espalda alta','Deltoides posterior','Bíceps'];return MUSCLES}
export function generate(p,exercises){const issues=[],weeks=[],target=targets(p),cap=p.program==='short'?10:16;let patterns=p.split==='upper'?['Superior','Inferior']:p.split==='ppl'?['Push','Pull','Legs']:['Full body'];if(p.reverse)patterns=[...patterns].reverse();const candidates=exercises.filter(e=>e.curated&&allowed(e,p));
 for(let w=0;w<(p.twoWeeks?2:1);w++){
 const days=[...p.days].sort((a,b)=>a-b).map((day,i)=>({id:uid(),day,name:patterns[(i+(p.twoWeeks?w*p.days.length:0))%patterns.length],items:[]}));let totals={};
 // Fixed greedy allocation: one whole set at a time, never exceeding a muscle cap.
 for(let n=0;n<260;n++){let best=null,bestScore=.001;
 for(let di=0;di<days.length;di++){const d=days[di],groups=groupMuscles(d.name);for(const e of candidates){if(!e.direct.some(m=>groups.includes(m)))continue;if(e.direct.some(m=>MUSCLES.includes(m)&&!groups.includes(m)))continue;const existing=d.items.find(x=>x.exercise===e.id);if(!existing&&d.items.some(x=>{const q=exercises.find(z=>z.id===x.exercise);return q.direct.join(',')===e.direct.join(',')}))continue;if(existing?.sets>=6||(!existing&&d.items.length>=12))continue;
 const affected=[...e.direct,...e.indirect].filter(m=>MUSCLES.includes(m));if(affected.some(m=>(totals[m]||0)+contribution(e,m)>cap))continue;
 let score=affected.reduce((v,m)=>v+Math.max(0,(target[m]-(totals[m]||0))/target[m])*contribution(e,m)*(p.priority.includes(m)?1.4:1),0);if(!score)continue;
 const local=volume(d.items,id=>exercises.find(x=>x.id===id));score/=1+e.direct.reduce((s,m)=>s+(local[m]||0),0)*.45+d.items.reduce((s,x)=>s+x.sets,0)*.06;score*=1+e.direct.reduce((s,m)=>s+1/candidates.filter(x=>x.direct.includes(m)).length,0)*.3;
 if(p.favorites.includes(e.id))score*=1.8;const elsewhere=days.some((x,j)=>j!==di&&x.items.some(z=>z.exercise===e.id));if(p.variety&&elsewhere)score*=.65;if(!p.variety&&elsewhere)score*=1.15;
 if(score>bestScore){bestScore=score;best={d,e,existing,affected}}}}
 if(!best)break;const {d,e,existing,affected}=best;if(existing)existing.sets++;else d.items.push({id:uid(),exercise:e.id,sets:1,reps:8,weight:0,step:e.mode==='per-hand'?2:2.5,rest:e.rest,mode:e.mode});for(const m of affected)totals[m]=(totals[m]||0)+contribution(e,m);
 }

 // Repair greedy dead ends by replacing one set with one or two targeted sets.
 const deficit=v=>MUSCLES.reduce((s,m)=>s+Math.max(0,target[m]-(v[m]||0))*(p.priority.includes(m)?1.4:1),0);
 for(let pass=0;pass<40;pass++){
 let win=null,gain=0;const current=deficit(totals);if(current===0)break;
 for(const d of days)for(const remove of d.items){const old=exercises.find(e=>e.id===remove.exercise);
 for(const dest of days)for(const add of candidates){if(!add.direct.some(m=>(totals[m]||0)<target[m]))continue;const groups=groupMuscles(dest.name);if(add.direct.some(m=>MUSCLES.includes(m)&&!groups.includes(m)))continue;
 const existing=dest.items.find(i=>i.exercise===add.id);if(!existing&&dest.items.some(x=>exercises.find(z=>z.id===x.exercise).direct.join(',')===add.direct.join(',')&&x!==remove))continue;
 for(const count of [1,2]){if((existing?.sets||0)+count>6)continue;const v={...totals};for(const m of MUSCLES)v[m]=(v[m]||0)-contribution(old,m)+count*contribution(add,m);if(MUSCLES.some(m=>v[m]>cap))continue;const g=current-deficit(v);if(g>gain){gain=g;win={remove,d,dest,add,existing,count,v}}}
 }}
 if(!win)break;win.remove.sets--;if(!win.remove.sets)win.d.items=win.d.items.filter(x=>x!==win.remove);if(win.existing&&win.dest.items.includes(win.existing))win.existing.sets+=win.count;else win.dest.items.push({id:uid(),exercise:win.add.id,sets:win.count,reps:8,weight:0,step:win.add.mode==='per-hand'?2:2.5,rest:win.add.rest,mode:win.add.mode});totals=win.v;
 }
 for(const d of days)d.items.sort((a,b)=>{const ea=exercises.find(e=>e.id===a.exercise),eb=exercises.find(e=>e.id===b.exercise);return Number(eb.direct.some(m=>p.priority.includes(m)))-Number(ea.direct.some(m=>p.priority.includes(m)))||eb.rest-ea.rest});
 for(const m of MUSCLES)if((totals[m]||0)<target[m])issues.push(`Semana ${w?'B':'A'} · ${m}: ${totals[m]||0}/${target[m]} series. Revisa equipo o añade un ejercicio compatible.`);
 weeks.push(days);
 }
 if(p.split==='full'&&p.days.some(d=>p.days.includes((d+1)%7)))issues.push('Full body en días consecutivos: volumen repartido; revisa recuperación y ajusta si hace falta.');
 return {id:uid(),name:p.name||'Mi bloque',created:new Date().toISOString(),weeks,targets:target,issues,cycle:p.cycle};
}
export function prescription(item,previous,week,cycle){let weight=item.weight,reps=item.reps,note='';const sets=previous?.sets.filter(s=>s.done&&s.type==='work')||[];if(sets.length){weight=sets[0].weight;reps=Math.min(...sets.map(s=>s.reps));}
 const deload=cycle&&week===4;
 if(deload){weight=round(Math.max(0,weight*.9));note='Descarga · mismas series · carga orientativa −10%';}
 else if(sets.length){if((!cycle||week===3)&&(previous.plannedWorkSets??previous.sets.filter(s=>s.type==='work').length)===previous.sets.filter(s=>s.type==='work').length&&eligible(previous.sets)&&item.mode!=='body'&&item.mode!=='assisted'){const next=nextLoad(weight,item.step);if(next&&!next.manual){weight=next.weight;reps=8;note=`Propuesta +${next.percent}% · ajusta a RPE 8–9`;}else note='El salto disponible supera 10%: revisa manualmente.';}else if(!cycle||week===2){reps=Math.min(12,reps+1);note='Objetivo +1 repetición; conserva RPE 8–9.'}}
 if(cycle&&week===1)reps=Math.min(10,reps);
 return {weight,reps:Math.max(6,Math.min(12,reps)),rpe:deload?7:8.5,note};
}
export function validateBackup(d){
 const fail=msg=>{throw Error(msg)},arr=v=>Array.isArray(v),num=(n,min,max)=>Number.isFinite(n)&&n>=min&&n<=max;
 if(!d||d.schema!==1||!arr(d.history)||!arr(d.custom)||!d.settings)fail('Copia incompatible o incompleta');
 if(JSON.stringify(d).length>20_000_000)fail('Copia demasiado grande');
 const inspect=(v,depth=0)=>{if(depth>20)fail('Estructura demasiado profunda');if(v&&typeof v==='object')for(const [k,x]of Object.entries(v)){if(['id','exercise','editingId'].includes(k)&&typeof x==='string'&&!/^[A-Za-z0-9_.()-]+$/.test(x))fail('Identificador inválido');inspect(x,depth+1)}};inspect(d);
 const p=d.settings;for(const k of ['equipment','days','priority','favorites','excluded'])if(!arr(p[k]))fail('Preferencias incompletas');if(p.days.some(x=>!Number.isInteger(x)||x<0||x>6)||p.priority.length>2)fail('Preferencias inválidas');if(!['short','full'].includes(p.program)||!['full','upper','ppl'].includes(p.split)||!['rpe','rir'].includes(p.effort))fail('Preferencias no compatibles');
 for(const h of [...d.history,...(d.active?[d.active]:[])]){if(!h.id||!arr(h.items)||!Number.isFinite(Date.parse(h.date)))fail('Sesión inválida');for(const i of h.items){if(!i.exercise||!arr(i.sets)||!num(i.rest,0,900))fail('Serie inválida');for(const s of i.sets)if(!num(s.weight,0,2000)||!Number.isInteger(s.reps)||!num(s.reps,0,200)||s.rpe!=null&&!num(s.rpe,1,10)||!['work','warmup','test'].includes(s.type))fail('Valores de entrenamiento inválidos')}}
 for(const e of d.custom)if(!e.id||typeof e.name!=='string'||!arr(e.direct)||!arr(e.indirect)||!arr(e.equipment)||!arr(e.instructions)||!num(e.rest,0,900))fail('Ejercicio inválido');
 if(d.plan){if(!arr(d.plan.weeks)||d.plan.weeks.length<1||d.plan.weeks.length>2||!d.plan.targets||Object.values(d.plan.targets).some(x=>!num(x,0,100)))fail('Rutina inválida');for(const w of d.plan.weeks){if(!arr(w))fail('Semana inválida');for(const day of w){if(!day.id||!num(day.day,0,6)||!arr(day.items))fail('Día inválido');for(const i of day.items)if(!i.exercise||!Number.isInteger(i.sets)||!num(i.sets,1,30)||!num(i.weight,0,2000)||!num(i.reps,6,12)||!num(i.rest,0,900)||!num(i.step,.01,100))fail('Ejercicio de rutina inválido')}}d.plan.issues=arr(d.plan.issues)?d.plan.issues:[]}
 if(!Number.isInteger(d.week)||!num(d.week,1,4))d.week=1;return d;
}
