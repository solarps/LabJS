document.querySelector('#elastic').oninput = function(){
    let val = this.value.trim();
    let listItems = document.querySelectorAll('.elastic li');
    if(val!=''){
        listItems.forEach(function(elem){
            if(elem.innerText.search(val)== -1){
                elem.classList.add('hide');
            }else{
                elem.classList.remove('hide');
            }
        });
    }else{
        listItems.forEach(function(elem){
            elem.classList.remove('hide');
        })
    }
}

function insertMark(){
    
}