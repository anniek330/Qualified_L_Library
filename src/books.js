//function findAuthorById(authors=[], id) {
//const findAuthor = authors.find((authorObj)=>{
//return authorObj.id === id;
//})
//return findAuthor;
//}
function findAuthorById(authors = [], id) {
  const findAuthor = authors.find(authorObj => authorObj.id === id);
  return findAuthor;
}
function findBookById(books = [], id) {
  const findBook = books.find(bookObj => bookObj.id === id);
  return findBook;
}

function partitionBooksByBorrowedStatus(books = []) {
  const available = [];
  const notavailable = [];
  books.filter(bookObj => {
    const { borrows } = bookObj;
    if (borrows[0].returned === true) {
      available.push(bookObj);
    }
    if (borrows[0].returned === false) {
      notavailable.push(bookObj);
    }
  });
  return [notavailable, available];
}

function getBorrowersForBook(book, accounts = []) {
  //place to put matchingAccounts
  let result = [];
  //get the borrows array from the book object
  const { borrows } = book;
  //loop through borrows array
  for (let borrowObj of borrows) {
    //get returned and id from borrowObj
    const { id, returned } = borrowObj;
    //loop through the accounts array and find only the accounts whos id# is included in the given book's borrows array
    const accountMatching = accounts.find(accountObj => accountObj.id === id);
    //add "returned "property to accountMatching
    accountMatching.returned = returned;
    //add accountMatching to result (push)
    result.push(accountMatching);
  }
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
