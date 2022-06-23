"use strict";

const account1 = {
  name: "Stephen",
  lastName: "Hawking",
  movements: [2500, -800, 1500, -150, 450],
  loanMovements: [],
  people: ["James", "Michelson", "James", "Michelson", "Michelson"],
  dates: ["3/6/2022", "14/6/2022", "16/6/2022", "18/6/2022", "20/6/2022"],
  password: "sh12",
  createUsername() {
    this.username = this.name
      .concat(" " + this.lastName)
      .split(" ")
      .map((value) => value[0])
      .join("")
      .toLowerCase();
  },
  calcBalance() {
    return (this.balance =
      this.movements.length > 0
        ? this.movements.reduce((acc, value) => acc + value)
        : 0);
  },
  calcReduceLoanMovements() {
    return this.loanMovements.reduce((acc, value) => acc + value);
  },
};

const account2 = {
  name: "James",
  lastName: "Maxwell",
  movements: [1500, 750, -1000, 500, 700],
  loanMovements: [],
  people: ["Stephen", "Stephen", "Michelson", "Stephen", "Stephen"],
  dates: ["4/6/2022", "12/6/2022", "13/6/2022", "19/6/2022", "21/6/2022"],
  password: "jm45",
  createUsername() {
    this.username = this.name
      .concat(" " + this.lastName)
      .split(" ")
      .map((value) => value[0])
      .join("")
      .toLowerCase();
  },
  calcBalance() {
    return (this.balance =
      this.movements.length > 0
        ? this.movements.reduce((acc, value) => acc + value)
        : 0);
  },
  calcReduceLoanMovements() {
    return this.loanMovements.reduce((acc, value) => acc + value);
  },
};

const account3 = {
  name: "Michelson",
  lastName: "Morley",
  movements: [1450, -300, 900, -450, 200],
  loanMovements: [],
  people: ["Stephen", "James", "James", "Stephen", "Stephen"],
  dates: ["2/6/2022", "9/6/2022", "11/6/2022", "17/6/2022", "18/6/2022"],
  password: "mm13",
  createUsername() {
    this.username = this.name
      .concat(" " + this.lastName)
      .split(" ")
      .map((value) => value[0])
      .join("")
      .toLowerCase();
  },
  calcBalance() {
    return (this.balance =
      this.movements.length > 0
        ? this.movements.reduce((acc, value) => acc + value)
        : 0);
  },
  calcReduceLoanMovements() {
    return this.loanMovements.reduce((acc, value) => acc + value);
  },
};

const accounts = [account1, account2, account3];

const inputLoginUsername = document.querySelector("#input-login-username");
const inputLoginPassword = document.querySelector("#input-login-password");
const main = document.querySelector("main");
const labelWelcome = document.querySelector("#label-welcome");
const btnLogin = document.querySelector("#btn-login");
const labelBalance = document.querySelector("#label-balance");
const labelDate = document.querySelector("#label-date");
const listGroup = document.querySelector(".list-group");
const income = document.querySelector("#income");
const outcome = document.querySelector("#outcome");
const inputTransferUsername = document.querySelector(
  "#input-transfer-username"
);
const inputTransferAmount = document.querySelector("#input-transfer-amount");
const btnTransfer = document.querySelector("#btn-transfer");
const inputLoanAmount = document.querySelector("#input-loan-amount");
const btnLoan = document.querySelector("#btn-loan");
const inputDeletePassword = document.querySelector("#input-delete-password");
const btnDelete = document.querySelector("#btn-delete");
const inputRegisterName = document.querySelector("#input-register-name");
const inputRegisterLastname = document.querySelector(
  "#input-register-lastname"
);
const inputRegisterPassword = document.querySelector(
  "#input-register-password"
);
const inputRegisterConfirmPassword = document.querySelector(
  "#input-register-confirm-password"
);
const btnRegister = document.querySelector("#btn-register");
const modalTextWarning = document.querySelector("#modal-text-warning");
const modalTitleConfirm = document.querySelector("#modal-title-confirm");
const modalTextConfirm = document.querySelector("#modal-text-confirm");
const btnConfirmYes = document.querySelector("#btn-confirm-yes");

const getDate = () =>
  `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;

(function () {
  labelDate.textContent = getDate();
  accounts.forEach((value) => {
    value.createUsername();
    value.calcBalance();
  });
})();

function showError(error) {
  modalTextWarning.textContent = error;
  $("#modal-warning").modal("show");
}

function showConfirm(confirmTitle, confirmText) {
  [modalTitleConfirm.textContent, modalTextConfirm.textContent] = [
    confirmTitle,
    confirmText,
  ];
  $("#modal-confirm").modal("show");
}

const clearInputs = (inputs) => inputs.forEach((value) => (value.value = ""));

const displaySplash = (currentAccount) =>
  (labelWelcome.textContent = `Welcome ${currentAccount.name} ${currentAccount.lastName}!`);

const displayBalance = (currentAccount) =>
  (labelBalance.textContent = `${currentAccount.calcBalance()} $`);

const editNewRegisterName = (names) =>
  names.map(
    (value) =>
      `${value.slice(0, 1).toUpperCase()}${value.slice(1).toLowerCase()}`
  );

btnRegister.addEventListener("click", function (e) {
  e.preventDefault();

  const registerInputs = [
    inputRegisterName,
    inputRegisterLastname,
    inputRegisterPassword,
    inputRegisterConfirmPassword,
  ];

  if (!registerInputs.some((value) => value.value === "")) {
    if (inputRegisterPassword.value !== inputRegisterConfirmPassword.value)
      showError("Passwords don't match.");
    else {
      let names = editNewRegisterName([
        registerInputs[0].value,
        registerInputs[1].value,
      ]);

      const newAccount = {
        name: names[0],
        lastName: names[1],
        movements: [],
        loanMovements: [],
        people: [],
        receiver: [],
        dates: [],
        password: inputRegisterPassword.value,
        createUsername() {
          this.username = this.name
            .concat(" " + this.lastName)
            .split(" ")
            .map((value) => value[0])
            .join("")
            .toLowerCase();
        },
        calcBalance() {
          return (this.balance =
            this.movements.length > 0
              ? this.movements.reduce((acc, value) => acc + value)
              : 0);
        },
        calcReduceLoanMovements() {
          return this.loanMovements.reduce((acc, value) => acc + value);
        },
      };

      newAccount.createUsername();
      newAccount.calcBalance();
      accounts.push(newAccount);
      clearInputs(registerInputs);
      $("#modal-register").modal("hide");
    }
  } else showError("Name, lastname and password cannot be empty.");
});

function displayMovements(account) {
  listGroup.innerHTML = "";
  account.movements.forEach((value, key) => {
    const type = value > 0 ? "success" : "danger";
    const html = `
      <li
        class="list-group-item border-bottom border-0 p-4"
        data-bs-toggle="collapse"
        data-bs-target="#movements-info-${key}"
      >
        <div class="d-flex align-items-center">
          <span class="badge bg-${type} rounded-pill">
            ${key + 1} ${value > 0 ? "deposit" : "withdrawal"}
          </span>
          <span class="text-muted movement-amount fw-bold ms-auto fs-4">
            ${value} $
          </span>
        </div>
        <div class="collapse" id="movements-info-${key}">
          <div class="d-flex align-items-center text-muted fs-6">
            <div class="mt-3">
              <span>${value > 0 ? "Sender: " : "Receiver: "}</span>
              <span>${account.people[key]}</span>
            </div>
            <div class="mt-3 ms-2">
              <span>${account.dates[key]}</span>
            </div>
          </div>
        </div>
      </li>
        `;
    listGroup.insertAdjacentHTML("afterbegin", html);
  });
}

document.addEventListener("click", function (e) {
  if (e.target.closest(".list-group-item")) {
    const listGroupItem = e.target.closest(".list-group-item");
    listGroupItem.classList.toggle("active");
  }
});

function displaySummary(account) {
  income.textContent = `${
    account.movements.length > 0
      ? `${account.movements
          .filter((value) => value > 0)
          .reduce((acc, value) => acc + value)} $`
      : `${0} $`
  }`;
  if (account.movements.some((value) => value < 0)) {
    outcome.textContent = `${account.movements
      .filter((value) => value < 0)
      .reduce((acc, value) => acc + value)} $`;
  } else outcome.textContent = `${0} $`;
}

function updateUI(account) {
  displaySplash(account);
  displayBalance(account);
  displayMovements(account);
  displaySummary(account);
}

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (value) => inputLoginUsername.value === value.username
  );

  if (currentAccount === undefined) showError("This user not found.");
  else {
    if (currentAccount.password !== inputLoginPassword.value)
      showError("Invalid password.");
    else {
      updateUI(currentAccount);
      clearInputs([inputLoginUsername, inputLoginPassword]);

      main.style.opacity = 1;

      currentAccount.movements.length < 1
        ? (btnTransfer.disabled = true)
        : (btnTransfer.disabled = false);
    }
  }
});

const getNames = (username) =>
  accounts.find((value) => value.username === username).name;

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const receiverAccount = accounts.find(
    (value) => value.username === inputTransferUsername.value
  );

  if (receiverAccount === undefined) showError("This user not found.");
  else {
    if (receiverAccount.username === currentAccount.username)
      showError("You can't send money to yourself");
    else {
      const amount = Math.abs(Number(inputTransferAmount.value));

      if (amount > currentAccount.balance) showError("Insufficient balance.");
      else {
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);

        currentAccount.people.push(getNames(inputTransferUsername.value));
        receiverAccount.people.push(getNames(currentAccount.username));

        currentAccount.dates.push(getDate());
        receiverAccount.dates.push(getDate());

        updateUI(currentAccount);
        clearInputs([inputTransferUsername, inputTransferAmount]);
      }
    }
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.abs(Number(inputLoanAmount.value));

  if (amount > 5000) showError("You can't borrow over 5000$");
  else {
    currentAccount.loanMovements.push(amount);

    let reduceLoanMovements = currentAccount.calcReduceLoanMovements();

    if (reduceLoanMovements > 5000) {
      currentAccount.loanMovements.pop();
      reduceLoanMovements = currentAccount.calcReduceLoanMovements();
      showError(
        `${
          reduceLoanMovements < 5000
            ? `You can borrow only ${5000 - reduceLoanMovements}$`
            : "You can't borrow anymore."
        }`
      );
    } else {
      currentAccount.movements.push(amount);
      currentAccount.people.push("No One (Loan)");
      currentAccount.dates.push(getDate());

      updateUI(currentAccount);
      clearInputs([inputLoanAmount]);

      btnTransfer.disabled = false;
    }
  }
});

btnDelete.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputDeletePassword.value !== currentAccount.password)
    showError("Passwords don't match.");
  else
    showConfirm(
      "Do you want to delete this account?",
      "You will lose your all data."
    );
});

btnConfirmYes.addEventListener("click", function (e) {
  e.preventDefault();

  const index = accounts.findIndex(
    (value) => value.username === currentAccount.username
  );

  accounts.splice(index, 1);
  main.style.opacity = 0;

  clearInputs([inputDeletePassword]);
});
