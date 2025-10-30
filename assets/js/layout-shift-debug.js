// Highlight sources of layout shift (run in DevTools or include temporarily)
new PerformanceObserver(list=>{
  for(const e of list.getEntries()){
    if(e.hadRecentInput) continue;
    (e.sources||[]).forEach(s=>{
      const el=s.node; if(el){ el.style.outline='2px solid red'; console.log('Layout shift source:', el, 'shift:', e.value); }
    });
  }
}).observe({type:'layout-shift', buffered:true});
