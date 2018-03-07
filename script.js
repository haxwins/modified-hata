//env
//fre
//d
//h1
//h2
window.onload = () =>{
  const data = {
    env: '',
    fre: 0,
    d: 0,
    hb: 0,
    hm: 0,
  }
  let elements = document.querySelector(".results").getElementsByTagName("div");
const caseOne = (data) =>{    //case 1 when d <= 0.4km
  elements[1].innerHTML = "Case 1 d ≤ 0.04km";
  let l = 32.4 +
      20 * Math.log10(data.fre) +
      10 * Math.log10((Math.pow(data.d,2) + Math.pow(data.hm+data.hb,2)  )  /  (Math.pow(10,6)));
  return Math.round(l*1000)/1000;
}
const caseTwoSubCaseOne = ()=>{
  return 3;
}
const caseTwo = (data) =>{    //case 2 when d >= 0.1km
  //a,b and alpha
  let a=(1.1 * Math.log10(data.fre)-7)*Math.min(10,data.hm)-(1.56*Math.log10(data.fre)-0.8) + Math.max(0,20*Math.log10(data.hm/10));
  let b=Math.min(0,20*Math.log10(data.hb/30));
  let alpha;
  let l;
  if(data.d<20){alpha = 1;}
  else if(data.d>=20 && data.d<=100){
    alpha = 1+ (0.14 + 1.87e-4 * data.fre + 1.07e-3*data.hb)*Math.pow(Math.log10(data.d/20),0.9);
  }
  //subcases
  if(data.env == 'urban'){  //subcase 1
    l = caseTwoSubCaseOne(data);
    return Math.round(l*1000)/1000;
  }
  else if(data.env == 'suburban'){  //subcase 2
    l = caseTwoSubCaseOne(data) - 2;
    return Math.round(l*1000)/1000;
  }
  else if(data.env == 'openarea'){  //subcase 3
    l = caseTwoSubCaseOne(data) - 4;
    return Math.round(l*1000)/1000;
  }

  elements[2].innerHTML = "a = " + Math.round(a*1000)/1000;
  elements[3].innerHTML = "b = " + Math.round(b*1000)/1000;
  elements[4].innerHTML = "α = " + Math.round(alpha*1000)/1000;
}

const calculate = ()=>{
  for(let i=0;i<elements.length;i++){
    elements[i].innerHTML = '';
  }
  console.log(elements);
  let l;
  data.env=document.querySelector('#env').value;
  data.fre=document.querySelector('#fre').value;
  data.d=document.querySelector('#d').value;
  data.d = data.d/1000;
  let h1=document.querySelector('#h1').value;
  let h2=document.querySelector('#h2').value;
  data.hm=Math.min(h1,h2);
  if(data.hm<1){data.hm=1;}
  data.hb=Math.max(h1,h2);
  if(data.hb<1){data.hb=1;}
  console.log(data);

  if(data.d<=0.04){   //case 1
    l = caseOne(data);
    console.log(1)
  }
  else if(data.d>=0.1){ //case 2
    l = caseTwo(data);
    console.log(2);
  }
  else{                 //case 3
    console.log(3);
  }
    elements[0].innerHTML = 'L = ' + l + ' dB';
}
  document.querySelector("#calc").addEventListener('click',calculate);
}
