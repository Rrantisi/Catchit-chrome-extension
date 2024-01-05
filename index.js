const ideaContainer = document.getElementById('ideaContainer');
const ideaCatcher = document.getElementById('ideaCatcher');
const button = document.getElementById('button');
const resultContainer = document.createElement('ul');

let allIdeas = [];

// Handle fetching existing ideas and call displayIdeas function to display them
const fetchExistingIdeas = async() => {
  const data = await chrome.storage.local.get("allIdeas");
  allIdeas = data.allIdeas || [];
  displayIdeas();
}

// Handle saving new ideas in allIdeas array
const saveIdea = () => {
  allIdeas.push(ideaCatcher.value);
  chrome.storage.local.set({ allIdeas }, displayIdeas)
}

// Handle DOM manipulation to display ideas
const displayIdeas = async () => {
  document.body.appendChild(resultContainer);
  resultContainer.className = 'resultContainer'
  resultContainer.innerHTML = '';

  const data = await chrome.storage.local.get("allIdeas");
  
  data.allIdeas.map((idea, index)=> {
    // Creates div element for each list item and button
    const listItemContainer = document.createElement('div');
    listItemContainer.className = 'listItemContainer';

    // Creates list item element
    const listItem = document.createElement('li');
    listItem.className = 'listItem';
    listItem.innerHTML = idea;

    // Creates delete button element for each list item
    const delButton = document.createElement('button');
    delButton.innerHTML = 'X';
    delButton.className = 'deleteBtn';
    delButton.addEventListener('click', () => deleteIdea(idea, index));

    // Append listItem element and delButton element to listItemContainer
    listItemContainer.appendChild(listItem)
    listItemContainer.appendChild(delButton)

    // Append listItemContainer to resultContainer
    resultContainer.appendChild(listItemContainer);
  })
}

// Handle delete idea
const deleteIdea = (idea, index) => {
  if(allIdeas.includes(idea)){
    allIdeas.splice(index, 1);
  }
  chrome.storage.local.set({ allIdeas }, displayIdeas)
}

fetchExistingIdeas();

button.addEventListener('click', saveIdea);
