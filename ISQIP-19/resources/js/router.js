// OPTIONS //

//  id of updation tag //
let update_id = 'main';

////////////



/**********
set paths like this
window.onload = ()=> Route({
    '/path1': 'pathname1.html',
    '/path2': 'pathname2.html',
    '': index.html
});

we can define title of each page like this
<page-title>TITLE</page-title>

define pageScript() function for providing scripts for the rendered contents(pages)

***********/
///////////

// MADE BY AKHIL RAVINDRAN - https://github.com/ghostjson

//store path and its corresponding target //
let page_mapper = class {

    register(pages){
        this.registered = pages;
    }

    get registeredPages(){
        return this.registered;
    }

};

//Route function
let Route = function(paths){
    // initiate page_mapper to pages
    let pages = new page_mapper();

    // create ajax object and ready state change function
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            preScirpt();
            document.getElementById(update_id).innerHTML = this.responseText;
            pageScript();
        }
    }

    // register all paths in pages
    pages.register(paths);

    let content = document.getElementById('main');

    // pageLoader function get url and render data
    let pageLoader = function(firstLoad){

        let currentPath = window.location.hash.substring(1);
        let target = pages.registeredPages[currentPath];
        if(target != undefined){
            xhttp.open("GET", target, true);
            preRequestScript(firstLoad, ()=>xhttp.send());
        }
        else{
            content.innerHTML = 'undefined';
        }
    }

    pageLoader(true); //render page on load
    window.onhashchange = ()=> pageLoader(false); //render page on every url change

};

// <page-title> tag definition
class PageTitle extends HTMLElement{
    constructor(){super();
        this.style.display = 'none';
    }
    connectedCallback() {
        document.title = this.innerHTML;
    }
}
window.customElements.define('page-title', PageTitle);
