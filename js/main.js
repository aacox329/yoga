var counter = 0

// poses contains a list of pose Objects
// Each pose object contains
// - Pose Name
// - image
// - sequence number

var imageList = ['boat',
'bridge',
'cat',
'chair',
'chaturanga',
'childspose',
'cobra',
'corpse',
'cow',
'crow',
'dancer',
'dolphin',
'downdog',
'eagle',
'firelog',
'fish',
'floorbow',
'forwardfold',
'halfmoon',
'halfsplits',
'handstand',
'happybaby',
'lowlunge',
'malasana',
'plank-guide',
'plow',
'reversewarrior',
'seatedforwardfold',
'standingsplits',
'tree',
'warriorI',
'warriorII',
'warriorIII'];

//callbacks//
function allowDrop(ev){
    ev.preventDefault();
}; //prevents opening a new page when you drag and element//

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
};

//move images to right section
function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var node = ev.target; // Need to get the actual destination node incase user drops on a child of that node
    // while(!node.classList.contains("dst")){node=node.parentElement;}
    if (ev.target.classList.contains("dst")) {
        node.appendChild(document.getElementById(data));
    } else {
        while(!node.classList.contains("pose")) {
            node = node.parentElement;
        }
        $(document.getElementById(data)).insertBefore(node);
    }
}; //data should be the id of whatever we click on (the div)//

//search for a pose image
function search(ev){
    var searchItem= $(this)[0].value;
    if(imageList.includes(searchItem)){
        var source= "images/StickSanEng/"+searchItem+".jpg";
        $("#base").append("<div class='pose' id='"+String(counter)+"' draggable='true' ondragstart='drag(event)'><p>"+String(counter)+"</p><img src='"+source+"'></div>");
        counter++;
        $("#noImg").slideUp();
    } else {
        $("#noImg").slideDown();
    }
};

//add a new section of the sequence - the .seq div
//add h2 to .seq div
//add input text to h2
function section(ev){
    var sectionName = $(this)[0].value;
        $ ('<div class="seq dst" ondrop="drop(event)" ondragover="allowDrop(event)"><h2>' + sectionName + '</h2></div>').appendTo("body");
//reset input to have no text
    $(this)[0].value = "";

};

$(document).ready(function (){
    var searchResult = $("#search");
    if (searchResult && searchResult[0]) {
        searchResult[0].addEventListener("change", search);
    }
    var addSection = $("#section");
    if (addSection && addSection[0]) {
        addSection[0].addEventListener("change", section);
    }
}
);
