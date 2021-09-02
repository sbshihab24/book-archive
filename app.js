const searchBook = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs))
        .catch(err => displayErrorMessage('Something went wrong,please try again'));
    document.getElementById('search-field').value = '';

}
const displayBook = docs => {
    const searchResults = docs.length;
    const resultDiv = document.getElementById('search-result');
    const showResults = document.createElement('h2');
    showResults.innerHTML = `Total found${searchResults} result`;
    resultDiv.appendChild(showResults);

    //books data
    const container = document.getElementById('book');
    container.innerHTML = ''
    docs?.forEach(doc => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
            <img style="height:150px" src="https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg" class="img-thumbnail" alt="...">
            <div class="card-body">
              <h5 class="card-title">Book-Name: ${doc.title}</h5>
              <p class="card-text">Publisher: ${doc.publisher ? doc.publisher : ''}</p>
              <p class="card-text">Author-Name: ${doc.author_name ? doc.author_name : ''}
              </p>
              <p class="card-text">First-Publish: ${doc.first_publish_year ? doc.first_publish_year : ''}</p>

            </div>
          </div>
                `
        container.appendChild(div)
    })
}
// error message
const displayErrorMessage = err => {
    const errMessage = document.getElementById('error-message')
    errMessage.innerText = err
}