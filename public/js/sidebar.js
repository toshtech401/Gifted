var arrow = document.querySelector('.arrow')
        var every = document.querySelectorAll('#main')
        arrow.addEventListener('click', ()=>{
         every.forEach(function(all){
                if(all.style.width === '5vw' || all.style.width === ''  ){
                    all.style.width = '13vw'
                }else{
                    all.style.width = '5vw'
                }
            })
            
        })