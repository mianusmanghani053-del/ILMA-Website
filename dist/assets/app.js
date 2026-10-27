
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* ---- DATA: 65 modules in 11 suites ---- */
/* ---- helpers ---- */
let sel=new Set();
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2800)}
/* ---- routing ---- */
function route(){const h=(location.hash||(location.pathname.replace(/\/$/,'')==='/signup'?'#/signup':'#/home')).replace('#/','')||'home',p=['home','features','solutions','contact','admin','signup'].includes(h.split('/')[0])?h.split('/')[0]:'home';
 $$('.pg').forEach(x=>x.classList.toggle('on',x.id==='p-'+p));$$('.links a').forEach(a=>a.classList.toggle('on',a.dataset.p===p));
 closeSolutions();if(p==='solutions')renderSolutions(h.split('/')[1]);
 $('#links').classList.remove('on');$('#burger').setAttribute('aria-expanded','false');
 document.title={home:'ILMA - The whole school in one calm place',features:'Features - ILMA',solutions:'Solutions - ILMA',contact:'Contact - ILMA',admin:'Lead inbox - ILMA',signup:'Referral Signup - ILMA'}[p];
 window.scrollTo(0,0);if(p==='home')startFeed();else stopFeed();if(p==='features')renderF();tray()}
addEventListener('hashchange',route);
$('#burger').onclick=()=>{closeSolutions();const o=$('#links').classList.toggle('on');$('#burger').setAttribute('aria-expanded',o)};
/* ---- solutions navigation ---- */
const solutionsToggle=$('#solutions-toggle'),solutionsMenu=$('#solutions-menu');
function closeSolutions(){solutionsMenu.hidden=true;solutionsToggle.setAttribute('aria-expanded','false')}
function openSolutions(){solutionsMenu.hidden=false;solutionsToggle.setAttribute('aria-expanded','true')}
solutionsToggle.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')openSolutions()});
$('.nav').addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')closeSolutions()});
$$('.nav .links>a').forEach(link=>link.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')closeSolutions()}));
solutionsToggle.addEventListener('click',e=>{if(e.detail>0&&matchMedia('(hover: hover) and (pointer: fine)').matches)openSolutions();else if(solutionsMenu.hidden)openSolutions();else closeSolutions()});
$('.nav').addEventListener('focusout',e=>{if(!$('.nav').contains(e.relatedTarget))closeSolutions()});
document.addEventListener('click',e=>{if(!e.target.closest('.nav'))closeSolutions();if(e.target.closest('#solutions-menu a')){closeSolutions();$('#links').classList.remove('on');$('#burger').setAttribute('aria-expanded','false')}if(e.target.closest('[data-start-free]')){closeSolutions();$('#c-msg').value='I would like to explore getting started with ILMA. Please let me know whether a free option is available.'}const link=e.target.closest('[data-solution-search]');if(link){fs='All';fq=link.dataset.solutionSearch;$('#q').value=fq;if(location.hash==='#/features')renderF()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!solutionsMenu.hidden){closeSolutions();solutionsToggle.focus()}});
/* ---- hero feed ---- */
const FEED=[['7:52','Attendance','Ayesha was marked present in 7-B.'],['9:40','Results','Class test, Urdu: Ayesha scored 17 out of 20.'],['11:15','Fees','November fee of Rs 8,500 is due on the 10th. Pay with Raast or JazzCash.'],['12:30','Transport','Bus 4 has left school. About 12 minutes to the Gulberg stop.'],['14:05','Homework','Class 7-B: 2 new questions on Chapter 6, due tomorrow.'],['15:30','Notice','Parent-teacher meeting on Saturday. Book a 10-minute slot.']];
let fi=0,ft=null;
const fitem=f=>`<div class="fi"><small>${f[1]}<i>${f[0]}</i></small>${E(f[2])}</div>`;
function startFeed(){stopFeed();const el=$('#feed');if(!el)return;el.innerHTML='';fi=0;
 if(RM){el.innerHTML=FEED.slice(0,4).map(fitem).join('');$('#clock').textContent='3:30';return}
 const step=()=>{if(fi>=FEED.length){ft=setTimeout(()=>{el.innerHTML='';fi=0;step()},3800);return}
  el.insertAdjacentHTML('afterbegin',fitem(FEED[fi]));$('#clock').textContent=FEED[fi][0];while(el.children.length>4)el.lastChild.remove();fi++;ft=setTimeout(step,2300)};step()}
function stopFeed(){clearTimeout(ft)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopFeed();else if($('#p-home').classList.contains('on'))startFeed()});
/* ---- roles ---- */
const ROLES=[
['Principal','Today\'s numbers across every class',()=>`<div class="kg"><div class="kp"><small>Present today</small><b>96%</b></div><div class="kp"><small>Fees this month</small><b>Rs 4.2M</b></div><div class="kp"><small>Waiting for you</small><b>3</b></div></div><div class="rw"><span>Mid Term schedule<span class="m">Grade 7 to 8 · sent by the exam office</span></span><span class="pill pk">Approve</span></div><div class="rw"><span>Leave: Mr. Imran, 2 days<span class="m">Substitute already suggested</span></span><span class="pill pk">Approve</span></div><div class="rw"><span>New admissions this week<span class="m">14 applications, 9 reviewed</span></span><span class="pill">Open</span></div>`],
['Teacher','Classes, marks and the exam clash check',()=>`<div class="kg"><div class="kp"><small>Classes today</small><b>5</b></div><div class="kp"><small>Marks to enter</small><b>1 test</b></div><div class="kp"><small>Homework to mark</small><b>18</b></div></div><div class="rw"><span>Mid Term · Grade 7-C Urdu<span class="m">Marks 11 of 14 entered</span></span><div class="bar"><i style="width:79%"></i></div></div><div class="rw"><span>Unit Test 4 · 3 Nov, 9:00<span class="m">Room 12 is free, no clashes</span></span><span class="pill ok">Scheduled</span></div><div class="rw"><span>Mark attendance, 7-B<span class="m">Period 1 · 8:00</span></span><span class="pill pk">Start</span></div>`],
['Parent','What happened to my child today',()=>`<div class="kg"><div class="kp"><small>Attendance</small><b>97%</b></div><div class="kp"><small>Last result</small><b>17/20</b></div><div class="kp"><small>Fee due</small><b>Rs 8,500</b></div></div><div class="rw"><span>Class test, Urdu<span class="m">Published today · Teacher remark added</span></span><span class="pill ok">New</span></div><div class="rw"><span>November fee<span class="m">Pay with Raast, JazzCash, Easypaisa or card</span></span><span class="pill pk">Pay now</span></div><div class="rw"><span>Request leave for Monday<span class="m">Teacher replies in the app</span></span><span class="pill">Request</span></div>`],
['Accounts','Who has paid, who has not',()=>`<div class="kg"><div class="kp"><small>Collected</small><b>82%</b></div><div class="kp"><small>Overdue families</small><b>38</b></div><div class="kp"><small>Paid today</small><b>Rs 410K</b></div></div><div class="rw"><span>Fee collection, November<span class="m">Rs 4.2M of Rs 5.1M</span></span><div class="bar"><i style="width:82%"></i></div></div><div class="rw"><span>Send reminder to 38 families<span class="m">WhatsApp with payment link</span></span><span class="pill pk">Send</span></div><div class="rw"><span>Bank deposit reconciliation<span class="m">6 payments matched automatically</span></span><span class="pill ok">Done</span></div>`]];
let rsel=0;
function renderR(){$('#rtabs').innerHTML=ROLES.map((r,i)=>`<button class="tab ${i===rsel?'on':''}" role="tab" aria-selected="${i===rsel}" data-r="${i}"><b>${r[0]}</b><span>${r[1]}</span></button>`).join('');$('#rpanel').innerHTML=`<h3>${ROLES[rsel][0]}</h3><p class="ps">${ROLES[rsel][1]}. Sample data.</p>`+ROLES[rsel][2]()}
$('#rtabs').addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(b){rsel=+b.dataset.r;renderR();$(`[data-r="${rsel}"]`).focus()}});
/* ---- suite index ---- */
function renderIx(){const mx=Math.max(...SUITES.map(s=>s[3].length));$('#ix').innerHTML=SUITES.map((s,i)=>`<a class="ir" href="#/features" data-s="${E(s[0])}"><span class="mono" style="background:${HUES[i]}">${s[1]}</span><b>${s[0]}</b><span class="d">${s[2]}</span><span class="cnt"><span class="bar"><i style="width:${s[3].length/mx*100}%"></i></span>${s[3].length}</span><span class="ar" aria-hidden="true">›</span></a>`).join('')}
/* ---- AI scan demo ---- */
$('#scanbtn').onclick=()=>{const rows=[['1','Ahmed Bilal','17','98%'],['2','Sara Iqbal','16','96%'],['3','Bilal Tariq','15','94%'],['4','Nida Farooq','14','71%'],['5','Zainab Rauf','12','97%']],rd=$('#rd'),btn=$('#scanbtn');rd.innerHTML='';btn.disabled=true;btn.textContent='Reading…';
 $('#scanl').classList.remove('on');void $('#scanl').offsetWidth;if(!RM)$('#scanl').classList.add('on');
 rows.forEach((r,i)=>setTimeout(()=>{rd.insertAdjacentHTML('beforeend',`<div class="r ${i===3?'lo':''}" style="animation-delay:0s"><span>${r[0]}</span><span>${r[1]}</span><b>${r[2]}</b><span class="cf">${r[3]}</span></div>`);if(i===4){rd.insertAdjacentHTML('beforeend','<div class="sub" style="font-size:14px;margin:6px 0 0">Nida Farooq is highlighted because the handwriting was unclear. The teacher checks it before anything is saved.</div>');btn.disabled=false;btn.textContent='Read again'}},RM?0:260+i*380)) };
/* ---- features page ---- */
let fq='',fs='All';
function renderF(){const chips=$('#chips');chips.innerHTML=['All',...SUITES.map(s=>s[0])].map(s=>`<button class="ch ${fs===s?'on':''}" data-f="${E(s)}" aria-pressed="${fs===s}">${s}${s==='All'?'':' '+SUITES.find(x=>x[0]===s)[3].length}</button>`).join('');
 const q=fq.trim().toLowerCase(),L=MODS.filter(m=>(fs==='All'||m.s===fs)&&(!q||(m.n+' '+m.d+' '+m.c.join(' ')+' '+m.s).toLowerCase().includes(q)));
 $('#fcount').textContent=`${L.length} of ${total} modules`;
 const g=$('#fgrid');if(!L.length){g.innerHTML=`<div class="empty"><h3 style="font-size:24px;color:var(--ink)">No module matches "${E(fq)}"</h3><p style="margin:8px 0 18px">Try a shorter word, or clear the filter.</p><button class="btn g" data-clear>Show all modules</button></div>`;return}
 g.innerHTML=SUITES.map((s,si)=>{const ms=L.filter(m=>m.si===si);if(!ms.length)return'';return`<div class="fs" id="su${si}"><h2><span class="mono" style="background:${HUES[si]}">${s[1]}</span>${s[0]}</h2><p class="sd">${s[2]}</p><div class="mg">${ms.map(m=>`<div class="mc ${sel.has(m.id)?'sel':''}"><button class="open" data-m="${E(m.id)}"><h3>${m.n}${m.soon?' <span class="pill pk" style="font-size:11.5px;vertical-align:middle">Coming soon</span>':''}</h3><p>${m.d}</p></button><label class="pick"><input type="checkbox" data-pick="${E(m.id)}" ${sel.has(m.id)?'checked':''}>Show me in the demo</label></div>`).join('')}</div></div>`}).join('')}
$('#q').addEventListener('input',e=>{fq=e.target.value;renderF()});
function tray(){const t=$('#tray'),on=sel.size>0&&$('#p-features').classList.contains('on');t.classList.toggle('on',on);$('#tcount').textContent=`${sel.size} module${sel.size>1?'s':''} selected`}
function openMod(id){const m=MODS.find(x=>x.id===id);openDrawer(`<div style="display:flex;justify-content:space-between;align-items:center"><span class="pill pk">${m.s}${m.soon?' · Coming soon':''}</span><button class="x" data-close aria-label="Close">✕</button></div><h2 id="mt">${m.n}</h2><p class="sub" style="margin-top:6px">${m.d}</p><h4 style="font-size:17px;margin-top:26px">What it does</h4><ul>${m.c.map(c=>`<li>${E(c)}</li>`).join('')}</ul><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:auto"><button class="btn p" data-pickd="${E(m.id)}">${sel.has(m.id)?'Remove from demo':'Show me in the demo'}</button><button class="btn g" data-close>Close</button></div>`)}
/* ---- modal infra ---- */
let lastF=null;
function openModal(h){lastF=document.activeElement;$('#md').innerHTML=h;$('#scrim').classList.add('on');document.body.style.overflow='hidden';const f=$('#md').querySelector('input,select,button:not(.x)');setTimeout(()=>f&&f.focus(),30)}
function openDrawer(h){lastF=document.activeElement;$('#dr').innerHTML=h;$('#dr').style.display='flex';$('#dr').style.flexDirection='column';$('#scrim2').classList.add('on');document.body.style.overflow='hidden';setTimeout(()=>$('#dr').querySelector('.x').focus(),30)}
function closeAll(){$('#scrim').classList.remove('on');$('#scrim2').classList.remove('on');document.body.style.overflow='';if(lastF&&lastF.focus)lastF.focus()}
addEventListener('keydown',e=>{if(e.key==='Escape')closeAll();if(e.key==='Tab'&&$('#scrim').classList.contains('on')){const f=[...$('#md').querySelectorAll('input,select,textarea,button:not(:disabled)')];if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
/* ---- demo flow ---- */
const DAYS=[...Array(5)].map((_,i)=>{const d=new Date(new Date().toLocaleDateString('en-US',{timeZone:'Asia/Karachi'}));d.setDate(d.getDate()+i+1);return{iso:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,w:d.toLocaleDateString('en-GB',{weekday:'short'}),n:d.getDate(),m:d.toLocaleDateString('en-GB',{month:'short'}),dt:d}});
const SLOTS=['10:00','11:30','14:00','16:00'];
const taken=(di,si)=>(di*3+si*5)%7===0||(di===2&&si===1);
let D={};
function demo(){D={step:1,name:'',school:'',role:'Owner or director',phone:'',email:'',size:'300 to 800',city:'',consent:false,day:null,slot:null,err:{},requestError:'',sending:false};demoUI()}
const sSteps=n=>`<div class="steps" aria-hidden="true">${[1,2,3].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</div>`;
function demoUI(){const d=D,e=d.err;
 if(d.step===1)return openModal(`<div class="mh"><h2 id="mt">Book a demo</h2><button class="x" data-close aria-label="Close">✕</button></div>${sSteps(1)}<form class="mb" id="dform" novalidate><p class="sub" style="margin:0 0 4px;font-size:16px">30 minutes on video. We show the modules that matter to your school.</p>
 <div class="g2"><div><label class="fl" for="d-name">Your name</label><input class="fi2 ${e.name?'bad':''}" id="d-name" value="${E(d.name)}" autocomplete="name">${e.name?`<div class="er">${e.name}</div>`:''}</div><div><label class="fl" for="d-role">Your role</label><select class="fi2" id="d-role">${['Owner or director','Principal','Administrator','Accountant','Teacher','Other'].map(r=>`<option ${r===d.role?'selected':''}>${r}</option>`).join('')}</select></div></div>
 <label class="fl" for="d-school">School name</label><input class="fi2 ${e.school?'bad':''}" id="d-school" value="${E(d.school)}" autocomplete="organization">${e.school?`<div class="er">${e.school}</div>`:''}
 <div class="g2"><div><label class="fl" for="d-phone">Mobile number</label><input class="fi2 ${e.phone?'bad':''}" id="d-phone" value="${E(d.phone)}" inputmode="tel" placeholder="0300 1234567" autocomplete="tel">${e.phone?`<div class="er">${e.phone}</div>`:''}</div><div><label class="fl" for="d-email">Email</label><input class="fi2 ${e.email?'bad':''}" id="d-email" type="email" value="${E(d.email)}" autocomplete="email">${e.email?`<div class="er">${e.email}</div>`:''}</div></div>
 <div class="g2"><div><label class="fl" for="d-size">Number of students</label><select class="fi2" id="d-size">${['Under 300','300 to 800','800 to 2,000','2,000 or more'].map(r=>`<option ${r===d.size?'selected':''}>${r}</option>`).join('')}</select></div><div><label class="fl" for="d-city">City</label><input class="fi2" id="d-city" value="${E(d.city)}" autocomplete="address-level2"></div></div>
 <label class="consent"><input id="d-consent" type="checkbox" ${d.consent?'checked':''}><span>I agree ILMA may use these details to respond to my demo request.</span></label>${e.consent?`<div class="er">${e.consent}</div>`:''}
 ${sel.size?`<div class="tip">You picked ${sel.size} module${sel.size>1?'s':''} to see: ${[...sel].slice(0,3).map(E).join(', ')}${sel.size>3?' and '+(sel.size-3)+' more':''}.</div>`:''}
 <div class="mf"><button class="btn g" type="button" data-close>Cancel</button><button class="btn p" type="submit">Choose a time</button></div></form>`);
 if(d.step===2)return openModal(`<div class="mh"><h2 id="mt">Choose a time</h2><button class="x" data-close aria-label="Close">✕</button></div>${sSteps(2)}<div class="mb"><p class="sub" style="margin:0 0 14px;font-size:16px">Pakistan time (UTC+5). Pick a day, then a slot.</p>
 <div class="days" role="group" aria-label="Day">${DAYS.map((x,i)=>`<button class="day ${d.day===i?'on':''}" data-day="${i}" aria-pressed="${d.day===i}"><small>${x.w}</small>${x.n}<small>${x.m}</small></button>`).join('')}</div>
 ${d.day==null?'<p class="sub" style="font-size:15px;margin-top:14px">Choose a day to see open slots.</p>':`<div class="slots" role="group" aria-label="Time">${SLOTS.map((t,i)=>`<button class="slot ${d.slot===i?'on':''}" data-slot="${i}" ${taken(d.day,i)?'disabled aria-label="'+t+' taken"':''}>${t}</button>`).join('')}</div>`}
 ${e.slot?`<div class="er">${e.slot}</div>`:''}${d.requestError?`<div class="er" role="alert">${E(d.requestError)}</div>`:''}
 <div class="mf"><button class="btn g" data-back ${d.sending?'disabled':''}>Back</button><button class="btn p" data-confirm ${d.sending?'disabled':''}>${d.sending?'Sending…':'Send demo request'}</button></div></div>`);
 const x=DAYS[d.day];openModal(`<div class="mh"><h2 id="mt">Demo request sent</h2><button class="x" data-close aria-label="Close">✕</button></div>${sSteps(3)}<div class="mb"><div class="done" aria-hidden="true">✓</div><p>Thank you, ${E(d.name.split(' ')[0])}. Your demo request has been recorded. The time below is your preference only; it is not reserved. The ILMA team can follow up using your contact details.</p>
 <div class="sum"><div><span>Preferred time</span><b>${x.w} ${x.n} ${x.m} ${x.dt.getFullYear()}, ${SLOTS[d.slot]}</b></div><div><span>Length</span><b>30 minutes, video call</b></div><div><span>School</span><b>${E(d.school)}</b></div><div><span>Modules to see</span><b>${sel.size?sel.size+' picked by you':'Overview of all suites'}</b></div></div>
 <div class="tip">This is a request, not a confirmed booking. You can download a tentative calendar reminder.</div>
 <div class="mf"><button class="btn g" data-ics>Add to calendar</button><button class="btn p" data-close>Done</button></div></div>`)}
function demoNext(){const d=D,v=s=>$('#'+s).value.trim();d.name=v('d-name');d.role=$('#d-role').value;d.school=v('d-school');d.phone=v('d-phone');d.email=v('d-email');d.size=$('#d-size').value;d.city=v('d-city');d.consent=$('#d-consent').checked;
 const e={};if(d.name.length<3)e.name='Enter your full name.';if(d.school.length<3)e.school='Enter your school name.';if(!/^(\+92|0)3\d{2}[- ]?\d{7}$/.test(d.phone))e.phone='Enter a mobile number like 0300 1234567.';if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email))e.email='Enter an email like name@school.com.';if(!d.consent)e.consent='Please agree before sending your demo request.';
 d.err=e;if(Object.keys(e).length)return demoUI();d.step=2;demoUI()}
async function confirmDemoRequest(){if(D.day==null||D.slot==null){D.err={slot:'Choose a day and a time.'};return demoUI()}D.sending=true;D.requestError='';demoUI();
 try{await window.ilmaBackend.submitLead({kind:'demo',name:D.name,role:D.role,school:D.school,phone:D.phone,email:D.email,student_range:D.size,city:D.city,message:'',preferred_date:DAYS[D.day].iso,preferred_time:SLOTS[D.slot],selected_modules:[...sel],consent:true});D.step=3;D.sending=false;demoUI()}
 catch(error){D.sending=false;D.requestError=error.message;demoUI()}}
function ics(){const x=DAYS[D.day],t=SLOTS[D.slot].replace(':',''),p=n=>String(n).padStart(2,'0'),dt=`${x.dt.getFullYear()}${p(x.dt.getMonth()+1)}${p(x.dt.getDate())}`,h=+SLOTS[D.slot].slice(0,2),mi=+SLOTS[D.slot].slice(3),em=h*60+mi+30,end=`${dt}T${p(Math.floor(em/60))}${p(em%60)}00`;
 const c=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ILMA//Demo//EN','BEGIN:VEVENT','UID:ilma-demo-'+Date.now()+'@ilma.example','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z/,'Z')+'',`DTSTART;TZID=Asia/Karachi:${dt}T${t}00`,`DTEND;TZID=Asia/Karachi:${end}`,'STATUS:TENTATIVE' , 'SUMMARY:ILMA demo request (unconfirmed)','DESCRIPTION:30-minute video demo of ILMA for '+D.school,'END:VEVENT','END:VCALENDAR'].join('\r\n'),u=URL.createObjectURL(new Blob([c],{type:'text/calendar'})),a=document.createElement('a');a.href=u;a.download='ILMA-demo.ics';a.click();setTimeout(()=>URL.revokeObjectURL(u),500);toast('Calendar file downloaded')}
/* ---- contact form ---- */
$('#cform').addEventListener('submit',async e=>{e.preventDefault();const v=s=>$('#'+s).value.trim(),er={};
 if(v('c-name').length<3)er.name='Enter your full name.';if(v('c-school').length<3)er.school='Enter your school name.';if(!/^(\+92|0)3\d{2}[- ]?\d{7}$/.test(v('c-phone')))er.phone='Enter a mobile number like 0300 1234567.';if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('c-email')))er.email='Enter an email like name@school.com.';if(v('c-msg').length<10)er.msg='Write a sentence about what you need.';
 $$('#cform [data-e]').forEach(x=>x.textContent=er[x.dataset.e]||'');['name','school','phone','email'].forEach(k=>$('#c-'+k).classList.toggle('bad',!!er[k]));$('#c-msg').classList.toggle('bad',!!er.msg);
 if(Object.keys(er).length){const f=$('#cform .bad');f&&f.focus();return}
 if(!$('#c-consent').checked){$('[data-e="consent"]').textContent='Please agree before sending your enquiry.';$('#c-consent').focus();return}
 if(v('c-website'))return;
 const submit=$('#cform button[type="submit"]');submit.disabled=true;$('#c-submit-error').textContent='';
 try{await window.ilmaBackend.submitLead({kind:'contact',name:v('c-name'),role:$('#c-role').value,school:v('c-school'),phone:v('c-phone'),email:v('c-email'),student_range:$('#c-size').value,city:v('c-city'),message:v('c-msg'),preferred_date:null,preferred_time:null,selected_modules:[],consent:true});
  $('#cf-body').innerHTML=`<div style="padding:30px 6px"><div class="done" aria-hidden="true">✓</div><h2 style="font-size:30px">Enquiry received</h2><p class="sub">Thank you, ${E(v('c-name').split(' ')[0])}. Your enquiry has been saved for the ILMA team to follow up. We will respond using the contact details you provided.</p><div class="mf" style="justify-content:flex-start"><button class="btn p" type="button" data-demo>Book a demo</button></div></div>`;
 }catch(error){$('#c-submit-error').textContent=error.message;submit.disabled=false}});
/* ---- global clicks ---- */
document.addEventListener('click',e=>{const t=e.target;
 if(t.closest('[data-demo]')){e.preventDefault();demo();return}
 if(t.closest('[data-close]')){closeAll();return}
 if(t.id==='scrim'||t.id==='scrim2'){closeAll();return}
 const enquiry=t.closest('[data-enquiry]');
 if(enquiry){const message=$('#c-msg');if(message){message.value=enquiry.dataset.enquiry;setTimeout(()=>message.focus(),0)}}
 if(t.closest('[data-all-modules]')){fs='All';fq='';$('#q').value='';if(location.hash==='#/features')renderF()}
 let b;
 if(b=t.closest('[data-day]')){D.day=+b.dataset.day;D.slot=null;D.err={};demoUI();return}
 if(b=t.closest('[data-slot]')){D.slot=+b.dataset.slot;D.err={};demoUI();return}
 if(t.closest('[data-back]')){D.step=1;demoUI();return}
 if(t.closest('[data-confirm]')){void confirmDemoRequest();return}
 if(t.closest('[data-ics]')){ics();return}
 if(b=t.closest('[data-m]')){openMod(b.dataset.m);return}
 if(b=t.closest('[data-pickd]')){pick(b.dataset.pickd);closeAll();return}
 if(b=t.closest('[data-f]')){fs=b.dataset.f;renderF();return}
 if(t.closest('[data-clear]')){fq='';$('#q').value='';fs='All';renderF();return}
 if(t.closest('#tclr')){sel.clear();renderF();tray();return}
 if(b=t.closest('a[data-s]')){fs=b.dataset.s;fq='';$('#q').value='';if(location.hash==='#/features')renderF()}
 if(b=t.closest('a[data-t]')){e.preventDefault();toast(b.dataset.t)}
});
document.addEventListener('submit',e=>{if(e.target.id==='dform'){e.preventDefault();demoNext()}});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset&&t.dataset.pick){pick(t.dataset.pick,true)}});
function pick(id,fromBox){if(sel.has(id))sel.delete(id);else sel.add(id);if(!fromBox)renderF();else{const c=$(`[data-pick="${CSS.escape(id)}"]`);c&&c.closest('.mc').classList.toggle('sel',sel.has(id))}tray()}
/* ---- init ---- */
renderR();renderIx();route();
