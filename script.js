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
  //elements[1].innerHTML = "Case 1 d ≤ 0.04km";
  let l = 32.4 +
      20 * Math.log10(data.fre) +
      10 * Math.log10((Math.pow(data.d,2) + Math.pow(data.hm+data.hb,2)  )  /  (Math.pow(10,6)));
  return Math.round(l*1000)/1000;
}
const caseTwoSubCaseOne = (data,alpha,a,b)=>{
  let endeq=13.82 *  Math.log10(Math.max(30,data.hb)) + (44.0-6.55*Math.log10(Math.max(30,data.hb)))*Math.log10(Math.pow(data.d,alpha))-a-b;
  if(data.fre<=150){
    console.log(69.6 + 26.2 * Math.log10(150) - 20 * Math.log10(150/data.fre) -  endeq)
    return 69.6 + 26.2 * Math.log10(150) - 20 * Math.log10(150/data.fre) -  endeq;
  }
  else if(data.fre<=1500){
    return 69.6 + 26.2 * Math.log10(data.fre) - endeq;
  }
  else if(data.fre<=2000){
    return 46.3 + 33.9 * Math.log10(data.fre) - endeq;
  }
  else{
    return 46.3 + 33.9 * Math.log10(2000) + 10 * Math.log10(data.fre/2000) - endeq;
  }
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
    l = caseTwoSubCaseOne(data,alpha,a,b);
    return Math.round(l*1000)/1000;
  }
  else if(data.env == 'suburban'){  //subcase 2
    let temp = caseTwoSubCaseOne(data,alpha,a,b);
    l = temp - 2 * Math.pow(Math.log10(Math.min(Math.max(150,data.fre),2000)/28),2) - 5.4;
    return Math.round(l*1000)/1000;
  }
  else if(data.env == 'openarea'){  //subcase 3
    let temp = caseTwoSubCaseOne(data,alpha,a,b);
    l = temp - (4.78 * Math.pow(Math.log10(Math.min(Math.max(150,data.fre),2000)/28),2) + 18.33 * Math.log10(Math.min(Math.max(150,data.fre),2000)) - 40.94);
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
  if(data.d<=0.04){   //case 1
    l = caseOne(data);
  }
  else if(data.d>=0.1){ //case 2
    l = caseTwo(data);
  }
  else{
    let d = data.d;
    data.d = 0.04;               //case 3
    let x = caseOne(data);
    data.d = 0.1;
    let y = caseTwo(data);
    l = x + ((Math.log10(d)-Math.log10(0.04)))/((Math.log10(0.1)-Math.log10(0.04))) * (y-x);
    l = Math.round(l*1000)/1000;
  }
  if(isNaN(l)){
    elements[0].innerHTML = 'Something went wrong!';
  }
  else{
    elements[0].innerHTML = 'L = ' + l + ' dB';
  }
}
  document.querySelector("#calc").addEventListener('click',calculate);
}
