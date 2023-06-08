//heading
let header = document.createElement("div");
header.innerHTML = "DOM-PAGINATION";
header.className = "h1 text-center bg-dark text-warning mt-5 mx-5 p-3";

//table made using XMLHttpRequest,called json inside table.
let main = document.createElement("div");
main.className="m-5 p-5";

function CreateDataTable(start, end) {
  main.innerHTML = " ";
  let request = new XMLHttpRequest();
  let url = "https://restcountries.com/v3.1/all";

  request.open("GET", url, true);
  request.send();

  request.onload = function () {
    let data = JSON.parse(this.response);
    console.log(data);

    let table = document.createElement("table");
    table.className =
      "table align-middle text-center table-bordered border-dark table-success";
    table.id = "table";

    let thead = document.createElement("thead");

    let tbody = document.createElement("tbody");

    let tr1 = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.innerHTML = "COUNTRY";

    let th2 = document.createElement("th");
    th2.innerHTML = "CAPITAL";

    let th3 = document.createElement("th");
    th3.innerHTML = "FLAG";

    main.append(table);
    table.append(thead, tbody);
    thead.append(tr1);
    tr1.append(th1, th2, th3);

    for (let i = start; i < end; i++) {
      let tr2 = document.createElement("tr");

      let td1 = document.createElement("td");
      td1.innerHTML = data[i].name.common;
      let td2 = document.createElement("td");
      td2.innerHTML = data[i].capital;
      let img = document.createElement("img");
      img.className = "img-thumbnail";
      img.src = data[i].flags.png;
      let td3 = document.createElement("td");
      td3.append(img);
      tr2.append(td1, td2, td3);
      tbody.append(tr2);
    }

    console.log(cur_page);
  };
}

//Pagination
//declaring current page, no. of record per page and calculating total pages.
let cur_page = 0;
let records_per_page = 10;
let max_pages = Math.ceil(250 / records_per_page);

//defining page flow like previous,next,directing no.s
function prevPage() {
  if (cur_page > 1) {
    changePage(cur_page - 1);
  }
}

function nextPage() {
  if (cur_page < max_pages) {
    changePage(cur_page + 1);
  }
}

function changePage(num) {
  //here we are using logic for spliting of table,where we get page split-up of 1-10,11-20,21-30,........
  if (num < 1) num = 1;
  if (num > max_pages) num = max_pages;

  let startPoint = (num - 1) * records_per_page;
  let endPoint = num * records_per_page;

  cur_page = num;
  CreateDataTable(startPoint, endPoint);

  if (num === 1) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }

  if (num === max_pages) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
}

//calling next,prev and change page ,to work as a button,inside anchor tag
let footer = document.createElement("div");
footer.className="anchorlist";

let prev = document.createElement("a");
prev.href = `javascript:prevPage()`;
prev.id = "prev";
prev.innerHTML = "<<";

let next = document.createElement("a");
next.href = `javascript:nextPage()`;
next.id = "next";
next.innerHTML = ">>";

let arr = createAnchorList();

function createAnchorList() {
  var ar = [];
  for (let i = 1; i <= 25; i++) {
    let a = document.createElement("a");
    a.href = `javascript:changePage(${i})`;
    a.innerHTML = i;
    ar.push(a);
  }
  return ar;
}

document.body.append(header, main, footer);
footer.append(
  prev,
  arr[0],
  arr[1],
  arr[2],
  arr[3],
  arr[4],
  arr[5],
  arr[6],
  arr[7],
  arr[8],
  arr[9],
  arr[10],
  arr[11],
  arr[12],
  arr[13],
  arr[14],
  arr[15],
  arr[16],
  arr[17],
  arr[18],
  arr[19],
  arr[20],
  arr[21],
  arr[22],
  arr[23],
  arr[24],
  next
);

changePage(1); // current page start num=1