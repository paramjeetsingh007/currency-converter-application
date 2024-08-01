const Base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"

let dropdown=document.querySelectorAll('.dropdown select')
let btn=document.querySelector('button')
const fromcurr=document.querySelector('.from select')
const tocurr=document.querySelector('.To select')

let msg=document.querySelector('.msg')


 for (const select of dropdown) {
    for (const code in countryList) {
        let newOption=document.createElement('option')
        newOption.innerText=code
        newOption.value=code
        if(select.name==='from' && code==='USD')
        {
            newOption.selected='selected'
        }else if(select.name==='To' && code==='INR'){
            newOption.selected='selected' 
        }
        select.append(newOption)
    }
  select.addEventListener('change',(evt)=>{
    updateflag(evt.target)
  })
 }

 const updateflag=(element)=>{
    const code= element.value
    const countrycode=countryList[code]
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img=element.parentElement.querySelector('img')
    img.src=newsrc

 }

 btn.addEventListener('click',async(evt)=>{
    evt.preventDefault()

    let amount=document.querySelector('.amount input')
    let amtval=amount.value
    console.log(amtval);
    if(amtval==="" || amtval<1){
        amtval=1
        amount.value=1
    }
    console.log(fromcurr.value,tocurr.value);

    const url=`${Base_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`

    let response=await fetch(url)
    let data= await response.json()

    let rate=data[tocurr.value.toLowerCase()]
    console.log(rate);
    let finalamount=amtval*rate
    
    msg.innerText=`${amtval}${fromcurr.value}=${finalamount} ${tocurr.value}`
 })