const Globals = {
    getAccountData: () => {
      const data = localStorage.getItem('accountData');
      return data ? JSON.parse(data) : [];
    },
    setAccountData: (array) => {
      localStorage.setItem('accountData', JSON.stringify(array));
    },
    addAccountItem: (item) => {
      const array = Globals.getAccountData();
      array.push(item);
      Globals.setAccountData(array);
    },
    removeAccountItem: (index) => {
      const array = Globals.getAccountData();
      array.splice(index, 1);
      Globals.setAccountData(array);
    },
    clearAccountData: () => {
      localStorage.removeItem('accountData');
    },
    };
    export default Globals;
  