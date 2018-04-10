"use strict";
{
  const forbidden = new Set(["Facebook", "Zuckerberg", "Trump", "alt-left", "Syria", "Trump's", "racist", "liberal", "alt-right"]);
  
  process();
  const overlay = document.querySelector('rdctdoverlay');
  if ( !!overlay ) {
    overlay.remove();
  }

  let scrollHeight = document.scrollingElement.scrollHeight;
  document.addEventListener('scroll', () => {
    if ( document.scrollingElement.scrollHeight > scrollHeight ) {
      scrollHeight = document.scrollingElement.scrollHeight;
      process();
    }
  });
  
  function process() {
    const tw = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT); const actions = [];
    while( tw.nextNode() ) {
      const text = tw.currentNode;
      if ( text.parentElement.tagName !== 'SCRIPT' && text.parentElement.tagName !== 'STYLE' ) {
        actions.push( () => redact( text, forbidden )); 
      }
    }; 
    actions.forEach( a => a() );
  }

  function redact( t, e ) {
    const p = t.parentElement;
    if ( ! p || p.classList.contains('rdctd') ) {
      return;
    }
    const converted = t.textContent.split(/\s/g).map( word => {
      if ( e.has(word) ) {
        const s = document.createElement('span');
        s.classList.add('rdctd');
        s.style = "color:black;background:black;";
        s.innerText = word + " ";
        return s;
      } else return word + " ";
    });
    t.replaceWith( ...converted );
    p.normalize();
  }
}
