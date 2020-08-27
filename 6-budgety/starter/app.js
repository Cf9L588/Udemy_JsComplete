// Budget Controller
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1,
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: function (type, description, value) {
            var newItem, ID;
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id;
            } else {
                ID = 0;
            }

            if (type === "inc") {
                newItem = new Income(ID, description, value);
            } else if (type === "exp") {
                newItem = new Expense(ID, description, value);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        calculateBudget: function () {
            // calcuate total income and expenses
            calculateTotal("exp");
            calculateTotal("inc");
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // Calculate the percentage of income that we spend
            if (data.totals.inc > 0) {
                data.percentage = Math.round(
                    (data.totals.exp / data.totals.inc) * 100
                );
            } else {
                data.percentage = -1;
            }
        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            };
        },
        testing: function () {
            console.log(data);
        },
    };
})();

var UIController = (function () {
    var DOMStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list",
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription)
                    .value,
                value: parseFloat(
                    document.querySelector(DOMStrings.inputValue).value
                ),
            };
        },
        addListItem: function (object, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if (type === "inc") {
                element = DOMStrings.incomeContainer;
                html =
                    '<div class="item clearfix" id="income-%id%">\
                        <div class="item__description">%description%</div>\
                        <div class="right clearfix">\
                            <div class="item__value">%value%</div>\
                            <div class="item__delete">\
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\
                            </div>\
                        </div>\
                    </div>';
            } else if (type === "exp") {
                element = DOMStrings.expenseContainer;
                html =
                    '<div class="item clearfix" id="expense-%id%">\
                        <div class="item__description">%description%</div>\
                        <div class="right clearfix">\
                            <div class="item__value">%value%</div>\
                            <div class="item__percentage">21%</div>\
                            <div class="item__delete">\
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\
                            </div>\
                        </div>\
                    </div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html
                .replace("%id%", object.id)
                .replace("%description%", object.description)
                .replace("%value%", object.value);

            // Insert the HTML into the DOM
            document
                .querySelector(element)
                .insertAdjacentHTML("beforeend", newHtml);
        },
        clearFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(
                `${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`
            );
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },
        displayBudget: function (obj) {},
        getDOMStrings: function () {
            return DOMStrings;
        },
    };
})();

var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();
        document
            .querySelector(DOM.inputBtn)
            .addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 /* enter */ || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        console.log(budget);
    };

    var ctrlAddItem = function () {
        // 1. Get the filed input data
        var input = UICtrl.getInput();
        if (
            input.description !== "" &&
            !isNaN(input.value) &&
            input.value > 0
        ) {
            // 2. Add the item to the budget controller
            var item = budgetCtrl.addItem(
                input.type,
                input.description,
                input.value
            );
            // 3. Add the item to the UI
            UICtrl.addListItem(item, input.type);
            // 4. Clear the fields
            UICtrl.clearFields();
            // 5. Calculate and update the budget
            updateBudget();
        }
    };

    return {
        init: function () {
            setupEventListeners();
        },
    };
})(budgetController, UIController);

controller.init();
