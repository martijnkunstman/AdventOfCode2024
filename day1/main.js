fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    let left = [], right = [], ans1 = 0, ans2 = 0;
    textData.trim().split("\n").map((l) => {
        const [v1, v2] = l.split(/\s+/).map(Number);
        left.push(v1);
        right.push(v2);
      });
    right.sort();
    left.sort().map((l, i) => {
      let c = 0;
      right.map((r) => (l == r ? c++ : null));
      ans1 += Math.abs(l - right[i]);
      ans2 += c * l;
    });
    console.log(ans1); //2066446
    console.log(ans2); //24931009
  });

/*

  fetch("data.txt").then(t=>t.text()).then(t=>{let l=[],p=[],s=0,a=0;
    t.trim().split("\n").map(t=>{let[s,a]=t.split(/\s+/).map(Number);
      l.push(s),p.push(a)}),p.sort(),l.sort().map((t,l)=>{let e=0;
        p.map(l=>t==l?e++:null),s+=Math.abs(t-p[l]),a+=e*t}),console.log(s),console.log(a)});
        
*/