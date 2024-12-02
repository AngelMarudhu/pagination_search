//// processing buddy don't write code blindly first mind map
/// getting data
/// mapping the data to ui
/// then adding search feature but note one thing just getting  the input text and what's the source of searching
/// utilize the two pointer or includes the input value in your source if that's the case we need to clear previous html element then as usual looping the filterd  data then mapping
/// then adding pagination first we have to check the  pagination  works or not in hard coded then change to  dynamically adding button blah blahhhhh

const API_LINK = "https://jsonplaceholder.typicode.com/posts";

const container_div = document.getElementById("card_container");
const pagination_div = document.getElementById("pagination_control");
const not_found = document.getElementById("not_found");

// console.log(pagination_div);

let globaData = [];

let ItemsPerPage = 10;
let currentPage = 1;

async function fetchingData() {
  try {
    const resp = await fetch(API_LINK);
    globaData = await resp.json();

    // globaData = ours.slice(0, 20);
    // // loopingData(globaData);
    displayPerPage(currentPage);
  } catch (error) {
    console.log(`fetching error ${error}`);
  }
}

// *********************** pagination ***********************

function displayPerPage(page) {
  //// small logic here buddy current page = 1 which means 1 - 1 = 0 * 10 = start = 10 end we just addition with itemperpage 0 + 10 = 10 items
  //// if we passed 2 here 2 - 1 = 1 so 1 * 10 = start 10 end 10 + 10 = 20 that's all
  let start = (page - 1) * ItemsPerPage;
  let end = start + ItemsPerPage;

  let pageData = globaData.slice(start, end);

  loopingData(pageData);
  updatePage();
}

// *********************** core passing the data one by one and creating the div ***********************

function loopingData(posts) {
  // let data = [];
  // for (let i = 0; i < posts.length; i++) {
  //   data.push(posts[i]);
  // }

  container_div.innerHTML = "";

  posts.forEach((element) => {
    cardCreation(element);
  });
}

// *********************** inside of card element this one we can easily alter the ui depend on the user ***********************

function cardCreation(posts) {
  let card_creation = document.createElement("div");
  card_creation.className = "card";

  card_creation.innerHTML = `
  <h2>${posts.title}</h2>
  <p>${posts.body}</p>
  <p>${posts.userId}</p>
  `;

  container_div.appendChild(card_creation);
}

////////////////// searching events //////////////////

function filteration() {
  let filteredData = [];

  const input_div = document.getElementById("search_input").value;

  if (input_div === "") {
    not_found.innerHTML = "";
    displayPerPage(currentPage);
    //// i've just forgot to put return here buddy return plays main role here
    return;
  }

  for (let i = 0; i < globaData.length; i++) {
    let post = globaData[i];
    let extractedText = post.title.toLowerCase();
    ////// when we write into input once a point we don't have match that when we press backspace that time we neeed find any matches that time we don't show the not found that's why buddy nothing else
    if (filteredData.length !== 0) {
      not_found.innerHTML = "";
    }

    if (subStringData(extractedText, input_div)) {
      filteredData.push(post);
    }
  }

  // console.log(filteredData, "filtered data");

  container_div.innerHTML = "";

  if (filteredData.length === 0) {
    not_found.innerHTML = `
    <h1>${"post not found "}</h1>
    `;
    ///// if there is no post we don't want pagination
    pagination_div.innerHTML = "";
  }

  filteredData.forEach((element) => {
    cardCreation(element);
  });
}

// *********************** this one filterarion i've used custom  code substring method with two pointer you can use just include that's all ***********************

function subStringData(text, query) {
  ///// check the substring is there buddy
  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (text[i] === query[j]) {
      j++;

      if (j === query.length) {
        return true;
      }
    } else {
      i -= j;
      j = 0;
    }
    i++;
  }
  return false;
}

document.getElementById("search_input").addEventListener("input", filteration);

// *********************** adding button dynamically and  passing the which page we are passing through currentpage variable ***********************

function updatePage() {
  pagination_div.innerHTML = "";
  //// first we need to find how many button pagination we need then we adding the button to inner html
  // console.log(globaData);
  const totalPage = Math.ceil(globaData.length / ItemsPerPage);

  for (let i = 1; i <= totalPage; i++) {
    const buttons = document.createElement("button");
    buttons.innerText = i;

    buttons.className = i === currentPage ? "active" : "";

    buttons.addEventListener("click", () => {
      currentPage = i;
      displayPerPage(currentPage);
    });

    pagination_div.appendChild(buttons);
  }
}

fetchingData();
