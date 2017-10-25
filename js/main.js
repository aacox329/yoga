var currentTarget = null; // This is the "pose" that was dragged: drag(ev)

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

//helpers//
function getType(node,type){
    // Search up node parent until type is in the class
    while(!$(node).hasClass(type)) {
        node = node.parentElement;
    }
    return node;
}

//callbacks//
function allowDrop(ev){
    ev.preventDefault();
}; //prevents opening a new page when you drag and element//

function drag(ev){
    currentTarget = getType(ev.target,"pose"); // update currentTarget
};

function remove(ev){
    ev.preventDefault();
    var pose = getType(currentTarget,'pose');
    var dst = getType(ev.target,'dst');
    // Only remove if the parent isn't the destination (e.g. not dragging from pose-container to pose-container)
    if (dst!=pose.parentElement){
        $(pose).remove();
    }
    currentTarget = null;
}

//move images to right section
function drop(ev){
    ev.preventDefault();
    var section = getType(ev.target,'seq');

    // Staying within original section, or new one?
    var element = $(currentTarget);
    if(currentTarget.parentElement!=section){
        // If we are moving out of the original section, then clone
        element = $(currentTarget).clone();
    }

    // Should we interpret this as an attempt to insert before existing pose, or end of section?
    if ($(ev.target).hasClass("dst")) {
        // Create a new id that is section
        element.appendTo(ev.target);  // Insert at end of section
    } else {
        element.insertBefore(getType(ev.target,'pose')); // Insert before destination pose
    }
    currentTarget = null;
};

//search for a pose image
function search(ev){
    // Reset errors first, then reapply if need be
    $(".error").slideUp();
    var searchItem= this.value.trim();  // trim to ignore any trailing spaces or newlines
    this.value = ""; // reset the input
    if (searchItem.length && $("."+searchItem).length){
        // First, make sure we havent already loaded it
        // NOTE: second term in if conditional statement wont execute if first term fails...so it is ok, we will never call $(".")
        $('#alreadyExists').slideDown();
    } else if(imageList.includes(searchItem)){
        // If not, make sure it is a valid option
        var source= "images/StickSanEng/"+searchItem+".jpg";
        $("#base").append("<div class='pose "+searchItem+"' draggable='true' ondragstart='drag(event)'><img src='"+source+"'></div>");
    } else if(searchItem.length) {
        // If not a valid option, and text was entered
        $("#noImg").slideDown();
    }
};

//add a new section of the sequence - the .seq div
//add h2 to .seq div
//add input text to h2
function section(ev){
    var sectionName = this.value;
        $("#section-container").append('<div><h2>' + sectionName + '</h2><div class="seq dst" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>');
//reset input to have no text
    this.value = "";
};

$(document).ready(function (){
    var searchResult = $("#search");
    if (searchResult && searchResult[0]) {
        searchResult[0].addEventListener("change", search);
        //searchResult.autocomplete({source: imageList});
    }
    var addSection = $("#section");
    if (addSection && addSection[0]) {
        addSection[0].addEventListener("change", section);
    }
}
);
