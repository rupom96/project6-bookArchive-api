//fetching search input
const searchClick = () => {
    const keyword = document.getElementById('input').value;
    document.getElementById('input').value = '';
    loadData(keyword);

    //clearing prev data
    toogleResultAmount('none');
    const cardHolder = document.getElementById('card-holder');
    cardHolder.innerHTML = '';
    toogleSpinner('block');
}

//loading data
const loadData = (keyword) => {
    const url = `https://openlibrary.org/search.json?q=${keyword}`
    fetch(url)
        .then(res => res.json())
        .then(data => checkData(data))
}

//input validation
const checkData = data => {
    toogleSpinner('none');

    if (data.docs.length === 0) {
        const resultAmount = document.getElementById('result-amount');

        resultAmount.innerHTML = `
    <h5 style="color: red">No result found. Please try again.....</h5>`;
        toogleResultAmount('block');
    }

    else {
        resultShow(data);
    }

}

//result show
const resultShow = data => {
    const cardHolder = document.getElementById('card-holder');

    data.docs.forEach(book => {


        const div = document.createElement('div');
        div.classList.add("col");

        const imgUrl = 'https://covers.openlibrary.org/b/id/';
        const noImg = 'images/no_img2.jpg'

        div.innerHTML = `
        <div class="card h-100">
            <div class="card-header">
            <img style="height: 400px" 
            src="${book.cover_i ? `${imgUrl + book.cover_i}-M.jpg` : `${noImg}`}"
            class="card-img-top container" alt="...">
            </div>

            <div class="card-body">
            <h5 class="card-title">Book's Name: ${book.title} </h5>
            <p class="card-title">Author: ${book.author_name ? book.author_name[0] : "unknown"}</p>
            <p class="card-title">Publisher: ${book.publisher ? book.publisher[0] : "unknown"}</p>
            <p class="card-title">First published: ${book.first_publish_year ? book.first_publish_year : "unknown"}</p>
            </div>

        </div>
        `;

        cardHolder.appendChild(div);
    })
    //result amount show
    const resultAmount = document.getElementById('result-amount');
    resultAmount.innerHTML = `
    <h5>Total results found: <span style="color: green;"> ${data.numFound} </span></h5>
    <p> Showing first <span style="color: Blue;"> ${data.docs.length} </span> results:</p> 
    `;
    toogleResultAmount('block');

}

//result amount toogle func
const toogleResultAmount = displayStyle => {
    document.getElementById('result-amount').style.display = displayStyle;
}
//spinner toogle func
const toogleSpinner = displayStyle => {
    document.getElementById('spinner-circle').style.display = displayStyle;
}

