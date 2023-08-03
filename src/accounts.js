//function findAccountById(accounts=[], id) {
//const findAccount = accounts.find((accountObj)=>{
//return accountObj.id === id
//})
//return findAccount
//}
function findAccountById(accounts = [], id) {
  const findAccount = accounts.find(accountObj => accountObj.id === id);
  return findAccount;
}
function sortAccountsByLastName(accounts = []) {
  accounts.sort((accountA, accountB) => accountA.name.last < accountB.name.last ? -1 : 1);
  return accounts;
}

function getTotalNumberOfBorrows(account={}, books = []) {
  //   //variable for id from account
  const { id } = account;
  let count = books.reduce((acc, bookObj) => {
    const { borrows } = bookObj;
    const filter = borrows.filter((borrowObj) => borrowObj.id === id);
    acc += filter.length;
    return acc;
  }, 0);
  return count;
}

const {
  partitionBooksByBorrowedStatus,
  findAuthorById,
} = require("./books.js");

function getBooksPossessedByAccount(account={}, books = [], authors = []) {
  const result = [];
  //get id of account
  const { id } = account;
  //get array of books currently checked out
  const [notavailableBooks] = partitionBooksByBorrowedStatus(books); //[notavailable]
  //loop through notavail array to access borrows.id
  for (let notavailableBookObj of notavailableBooks) {
    const { borrows } = notavailableBookObj; //declare borrows
    //loop through borrows to get id
    if (borrows[0].id == id) {
      const { authorId } = notavailableBookObj;
      //loop through authors to find match
      const findAuthor = findAuthorById(authors, Number(authorId));
      //add author to notavailbookobj
      notavailableBookObj.author = findAuthor;
      result.push(notavailableBookObj);
    }
  }
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
