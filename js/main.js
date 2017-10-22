
//callbacks//
function allowDrop(ev){
    ev.preventDefualt();
}; //prevents opening a new page when you drag and element//

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
};

function drop(ev){
    ev.preventDefualt();
    var data= ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElememntById(data));
}; //data should be the id of whatever we click on (the div)//
