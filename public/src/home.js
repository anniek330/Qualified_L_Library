function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}
const { partitionBooksByBorrowedStatus, findAuthorById } = require("./books");

function getBooksBorrowedCount(books = []) {
  const [notavailable] = partitionBooksByBorrowedStatus(books); //[[notavailable],[available]]
  return notavailable.length;
}

function getMostCommonGenres(books = []) {
  const lookup = {};
  //loop through books array
  books.forEach((bookObj) => {
    //get the genre
    const { genre } = bookObj;
    //check if the genre is in the lookup. If not in lookup then:
    if (lookup[genre] === undefined) {
      //create a key for that genre and set the value to be 1
      lookup[genre] = 1;
    } else {
      //if it is in lookup, then increment lookup[genre] by 1
      lookup[genre]++;
    }
  });
  //changing order of items in object (name: genre count:#)
  const result = [];
  for (let key in lookup) {
    const obj = { name: key, count: lookup[key] };
    result.push(obj);
  }
  ///sorting each COUNT (key) in lookup to get high-low (B-A)
  result.sort((elemA, elemB) => elemB.count - elemA.count);
  //only getting first two (second number indicated amt of returned things)
  return result.slice(0, 5);
}

function getMostPopularBooks(books = []) {
  books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
  const result = books.map((bookObj) => {
    let obj = { name: bookObj.title, count: bookObj.borrows.length };
    return obj;
  });
  return result.slice(0, 5);
}

function getMostPopularAuthors(books = [], authors = []) {
  const lookup = {};
  //loop through books array
  books.forEach((bookObj) => {
    const { authorId, borrows } = bookObj;
    if (lookup[authorId] === undefined) {
      //create a key for that author
      lookup[authorId] = borrows.length;
    } else {
      //if it is in lookup,
      lookup[authorId] += borrows.length;
    }
  });
  //loop through object to find author that matches
  const result = [];
  for (let key in lookup) {
    const foundAuthor = findAuthorById(authors, Number(key));
    //create an object with the information about author
    const fullName = joinFirstAndLastNames(
      foundAuthor.name.first,
      foundAuthor.name.last
    );
    const nameAndCountObj = { name: fullName, count: lookup[key] };
    //put that object into a result array
    result.push(nameAndCountObj);
    if (result.length === 5) break;
  }
  result.sort((resultObjA, resultObjB) => resultObjB.count - resultObjA.count);
  return result;
}

function joinFirstAndLastNames(first, last) {
  return `${first} ${last}`;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
