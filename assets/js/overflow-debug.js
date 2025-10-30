(function(){
  const vw=document.documentElement.clientWidth, bad=[];
  document.querySelectorAll('*').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.width>vw+1) bad.push(el);
  });
  console.log('Overflow offenders:', bad);
  bad.forEach(el=>el.style.outline='2px solid red');
})();
