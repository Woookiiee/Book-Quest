// Sample array of book names (sorted for binary search)
        const books = [
            { name: "Anna Karenina", price: '$24.99', description: 'Classic novel by Leo Tolstoy.', rating: '4.8/5', image: 'images/anna-karenina.jpg', amazonLink: 'https://www.amazon.com/anna-karenina' },
            { name: "Circe", author: 'Madeline Miller', price: '$24.99', description: 'reimanagint the story of witch Circe, exploring her journey of self-discovery,power and encounters', rating: '4.8/5', genre: 'Mythological Retelling', image: 'images/circe.jpg', amazonLink: 'https://amzn.eu/d/ipC36d0' },
            { name: "Palace of Illusions", author: 'Chitra Banerjee Divakaruni', price: '$19.99', description: 'Retelling of Mahabharata from Draupadi\'s perspective.', rating: '4.5/5 ', genre: 'Mythological Retelling',  image: 'images/palace-of-illusions.jpg', amazonLink: 'https://amzn.eu/d/b9dxbWD' },
            { name: "Pride and Prejudice", price: '$18.99', description: 'Jane Austen\'s romantic novel about love and social class.', rating: '4.7/5 ', image: 'images/pride-and-prejudice.jpg', amazonLink: 'https://amzn.eu/d/43Ywkm6' },
            { name: "The Great Gatsby", price: '$21.99', description: 'F. Scott Fitzgerald\'s portrayal of the Jazz Age in America.', rating: '4.6/5 ', image: 'images/the-great-gatsby.jpg', amazonLink: 'https://www.amazon.com/the-great-gatsby' },
            { name: "The Song of Achillies", author: 'Madeline Miller', price: '$21.99', description: 'retelling of Iliad,focusing on deep and complex relationship between Achillies and Patroclus', rating: '4.6/5 ', genre: 'Mythological Retelling', image: 'images/the-song-of-achillies.jpg', amazonLink: 'https://amzn.eu/d/g9iBtXF' },
            { name: "To Kill a Mockingbird", price: '$22.99', description: 'Harper Lee\'s exploration of racism and morality in the American South.', rating: '4.9/5 ', image: 'images/to-kill-a-mockingbird.jpg', amazonLink: 'https://www.amazon.com/to-kill-a-mockingbird' }
        ];

        function updateSuggestions() {
           
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();

           
            const filteredBooks = searchTerm.length > 0 ? binarySearch(books, searchTerm) : [];

            
            displaySuggestions(filteredBooks);
        }

        function binarySearch(arr, target) {
            let start = 0;
            let end = arr.length - 1;
            let result = [];

            while (start <= end) {
                const mid = Math.floor((start + end) / 2);
                const currentBook = arr[mid].name.toLowerCase();

                if (currentBook.startsWith(target)) {
                    // Include the current book and expand the search to the left and right
                    result.push(arr[mid]);

                    // Expand left
                    let left = mid - 1;
                    while (left >= 0 && arr[left].name.toLowerCase().startsWith(target)) {
                        result.unshift(arr[left]);
                        left--;
                    }

                    // Expand right
                    let right = mid + 1;
                    while (right < arr.length && arr[right].name.toLowerCase().startsWith(target)) {
                        result.push(arr[right]);
                        right++;
                    }

                    break;
                } else if (currentBook < target) {
                    start = mid + 1;
                } else {
                    end = mid - 1;
                }
            }

            return result;
        }

        function displaySuggestions(suggestions) {
            const suggestionsList = document.getElementById('suggestionsList');

          
            suggestionsList.innerHTML = "";

           
            suggestions.forEach(book => {
                const listItem = document.createElement('li');
                listItem.textContent = book.name;
                suggestionsList.appendChild(listItem);
            });
        }

        function selectBook(event) {
            const clickedItem = event.target;
            if (clickedItem.tagName === 'LI') {
                
                document.getElementById('searchInput').value = clickedItem.textContent;
            }
        }
        let bin=[]
        function searchBook() {
            const selectedBookName = document.getElementById('searchInput').value;
            const selectedBook = getBookData(selectedBookName);

          
            const relatedBooks = books.filter(book => 
                book.genre === selectedBook.genre && book.name !== selectedBook.name
            );
            bin=relatedBooks

            displayBookInfo(selectedBook);

           
            displayRelatedBooks(relatedBooks);
        }

        function getBookData(bookName) {
            
            return books.find(book => book.name.toLowerCase() === bookName.toLowerCase()) || {};
        }

        function displayBookInfo(bookData) {
           
            const bookInfoContainer = document.getElementById('bookInfo');
            bookInfoContainer.innerHTML = `
                <h2 style="position: relative; left: 50px;">${bookData.name}</h2>
                <img src="${bookData.image}" alt="${bookData.name}" align= "left" style="position: relative; right: 230px; height: 350px; bottom: 40px;">
                <div style=" position: relative; right:170px">
                <p>Author: ${bookData.author}</p>
                <p style="color: red;">Price: ${bookData.price}</p>
                <p>Rating: ${bookData.rating}</p>
                <p>Genre: ${bookData.genre}</p>
                <p>Description: ${bookData.description}</p>
                <p><a href="${bookData.amazonLink}" target="_blank">Amazon Link</a></p> </div>
                <h1 style='font-size: 40px; position: relative; top: 30vh; right: 20vw; color:#482342;'>Books related to this genre</h1>
                <div>
      <select name="filter" id="filter" value="Sort by:" onchange="sortRelatedBooks() " style="padding:5px; font-size:large; width:20vw; border: solid; position: relative; right:40vw; top:35vh;">
      <option value="low-high"><b>Price: low to high</b></option>
      <option value="high-low"><b>Price: high to low</b></option>
      <option value="rating-low-high"><b>Rating: low to high</b></option>
      <option value="rating-high-low"><b>Rating: high to low</b></option>
      </select>
    </div>
            `;
        }

        function displayRelatedBooks(relatedBooks) {
            const bookInfoContainer = document.getElementById('bookInfo');

            // Remove previously displayed related books, if any
            const previousRelatedBooks = document.querySelector('.related-books');
            if (previousRelatedBooks) {
                previousRelatedBooks.remove();
            }

            // Create a container for related books
            const relatedBooksContainer = document.createElement('div');
            relatedBooksContainer.classList.add('related-books');

            // Display related books information
            relatedBooks.forEach(book => {
                const relatedBookContainer = document.createElement('div');
                relatedBookContainer.classList.add('related-book');

                relatedBookContainer.innerHTML = `
                    <h2 style="position: relative; top:35vh; left:-10vw;">${book.name}</h2>
                    <div style=" display:flex;">
                    <div style="position:relative; top:30vh; right:25vw;">
                    <img src="${book.image}" alt="${book.name}></div>
                    <div style="position:relative; top:10vh; left:20vw;">
                    <p >Author: ${book.author}</p>
                    <p style="color: red;">Price: ${book.price}</p>
                    <p>Rating: ${book.rating}</p>
                    <p>Genre: ${book.genre}</p>
                    <p>Description: ${book.description}</p>
                    <p><a href="${book.amazonLink}" target="_blank">Amazon Link</a></p></div>
                    </div>
                `;

                relatedBooksContainer.appendChild(relatedBookContainer);
            });

            // Append the related books container to the book information container
            bookInfoContainer.appendChild(relatedBooksContainer);

            function sortRelatedBooks(){
                const filterOption = document.getElementById('filter').value;
                var sortedRelatedBooks;

            switch (filterOption) {
                case 'low-high':
                    sortedRelatedBooks = quickSort(bin.slice(), 'price');
                    break;
                case 'high-low':
                    sortedRelatedBooks = quickSort(bin.slice(), 'price', true);
                    break;
                case 'rating-low-high':
                    sortedRelatedBooks = quickSort(bin.slice(), 'rating');
                    break;
                case 'rating-high-low':
                    sortedRelatedBooks = quickSort(bin.slice(), 'rating', true);
                    break;
                default:
                    sortedRelatedBooks = bin;
            }

            displayRelatedBooks(sortedRelatedBooks);
}
        }

        function quickSort(arr, property, descending = false) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0][property];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if ((descending && arr[i][property] > pivot) || (!descending && arr[i][property] < pivot)) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left, property, descending), arr[0], ...quickSort(right, property, descending)];
}


  