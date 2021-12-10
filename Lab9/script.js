const $list = document.querySelector(".list");
const $queryField = document.querySelector(".query");
const $lister = document.querySelector(".lister");

let arr = ["lorem","dolor","sit","amet","consectetur","adipisicing","elit"];

function templateGenerator(list){
    if(!list.length)
    {
        $list.innerHTML = '<li>Not Found</li>';
    }
    else
    {
        let template = '';
        for(let i = 0; i < list.length; i++)
        {
            template += '<li>' + list[i] + '</li>';
        }
        $list.innerHTML = template;
    }
}

$queryField.addEventListener('input', function(){
    let query = this.value.toLowerCase(); 
    if(query == 0){
        $lister.style.visibility='hidden';
    }else{
        $lister.style.visibility='visible';
    }   
    let buffer = arr.filter(function(el){
        return ~el.toLowerCase().indexOf(query);
    });
    templateGenerator(buffer);
});