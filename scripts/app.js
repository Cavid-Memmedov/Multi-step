const stepOne = document.querySelector('.step-one');
const stepOneForm = document.querySelector('.step-one form');
//const nextBtn = document.querySelector('.step-one .next-btn');
//const backBtn = document.querySelector('.step-one .back-btn');
const allNextBtn = document.querySelectorAll('.step-buttons > .next-btn');
const allBackBtn = document.querySelectorAll('.step-buttons > .back-btn');
const allSteps = document.querySelectorAll('.content-page');
const allStepsBtn = document.querySelectorAll('.step');
let isCheck = true;
let finishData = {
    planTitle: "",
    planPrice: "",
    itemData: [],
};

//nextBtn.addEventListener('click', stepOneFunc());
allNextBtn.forEach((nextButton, index) => {
    nextButton.addEventListener('click', function () {
        stepOneFunc();
        if (isCheck) {
            allSteps[index].classList.add('hide');
            allSteps[index + 1].classList.remove('hide');
            allStepsBtn[index + 1]?.classList.add('active');
        }
    });
});
allBackBtn.forEach((backButton, index) => {
    backButton.addEventListener('click', function () {
        stepOneFunc();
        if (isCheck) {
            allSteps[index].classList.remove('hide');
            allSteps[index + 1].classList.add('hide');
            allStepsBtn[index + 1]?.classList.remove('active');
        }
    });
});

function stepOneFunc() {
    //* constants erorrs
    const nameError = document.querySelector(".name-label .name-error");
    const emailError = document.querySelector(".email-label .email-error");
    const phoneError = document.querySelector(".phone-label .phone-error");


    //* constants inputs
    const nameInput = document.querySelector(".name-label input");
    const emailInput = document.querySelector(".email-label input");
    const phoneInput = document.querySelector(".phone-label input");

    //* constants Regex 
    const nameRegex = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(nameInput.value) ||
        !emailRegex.test(emailInput.value) ||
        !phoneRegex.test(phoneInput.value)) {
        isCheck = false;
        if (!nameRegex.test(nameInput.value)) {
            nameError.innerHTML = "Please enter a valid name";
        }
        if (!emailRegex.test(emailInput.value)) {
            emailError.innerHTML = "Please enter a valid phone email";
        }
        if (!phoneRegex.test(phoneInput.value)) {
            phoneError.innerHTML = "Please enter a valid phone email";
        }
    }
    else {
        nameError.innerHTML = "";
        emailError.innerHTML = "";
        phoneError.innerHTML = "";
        isCheck = true;
    }
    console.log(isCheck);
}


function selectPlan() {
    let allPlanMain = document.querySelector('.plan');
    let allPlans = document.querySelectorAll('.plan > span');
    let planMonthly = document.querySelector('.plan-monthly');
    let planYearly = document.querySelector('.plan-yearly');
    let switchBtn = document.querySelector('#switch');
    switchBtn.addEventListener('click', function () {
        if (!switchBtn.checked) {
            planMonthly.style.color = 'var(--denim,#022959)';
            planYearly.style.color = 'var(--grey, #9699aa)';
            allPlans[0].textContent = '$9/mo';
            allPlans[1].textContent = '$12/mo';
            allPlans[2].textContent = '$15/mo';
        }
        else {
            planYearly.style.color = 'var(--denim,#022959)';
            planMonthly.style.color = 'var(--grey, #9699aa)';
            allPlans[0].textContent = '$90/yr';
            allPlans[1].textContent = '$120/yr';
            allPlans[2].textContent = '$150/yr';
        }
    });
    allPlanMain.forEach((plan) => {
        plan.addEventListener("click", function () {
            allPlanMain.forEach((plan) => { plan.classList.remove("selected") })
            plan.classList.add("selected");
        });
    });


    pickItem(switchBtn.checked);
}
selectPlan();


// tamamlaa
function pickItem(check) {
    let allPickItems = document.querySelectorAll('.checkbox-content > span');

    if (check) {
        allPickItems[0].textContent = '+$10/yr';
        allPickItems[1].textContent = '+$20/yr';
        allPickItems[2].textContent = '+$20/yr';
        finishData.itemData.map(item => {
            item.itemPrice = item?.itemPrice.replace();
            item.itemPrice = item?.itemPrice.replace("1", "10");
            item.itemPrice = item?.itemPrice.replace("2", "20");
            item.itemPrice = item?.itemPrice.replace("/mo", "/yr");
        })
    }
    else {
        allPickItems[0].textContent = '+$1/mo';
        allPickItems[1].textContent = '+$2/mo';
        allPickItems[2].textContent = '+$2/mo';
        finishData.itemData.map((item) => {
            item.itemPrice = item?.itemPrice.replace("10", "1");
            item.itemPrice = item?.itemPrice.replace("20", "2");
            item.itemPrice = item?.itemPrice.replace("/yr", "/mo");
        });
    }
    pickItemsPrice()
}

function pickItemsPrice() {
    const allPickItems = document.querySelectorAll(".pick-item");
    allPickItems.forEach((pickItem) => {
      pickItem.addEventListener("click", function () {
        let itemTitle = pickItem.querySelector("h4");
        let itemPrice = pickItem.querySelector("span");
        let itemInput = pickItem.querySelector("input");
        if (itemInput.checked) {
          itemInput.checked = false;
          itemTitle.style.color = "var(--grey, #9699aa)";
          itemPrice.style.color = "var(--grey, #9699aa)";
          finishData.itemData = finishData.itemData.filter(
            (item) => item.itemTitle != itemTitle.textContent
          );
        } else {
          itemInput.checked = true;
          itemTitle.style.color = "var(--denim, #022959)";
          itemPrice.style.color = "var(--denim, #022959)";
          finishData.itemData.push({
            itemTitle: itemTitle.textContent,
            itemPrice: itemPrice.textContent,
          });
        }
        console.log(finishData);
      });
    });
  }


  function finishingUp() {
    let totalCount = 0;
    let firstFinishItem = document.querySelectorAll(".finish-item")[0];
    let firstFinishItemPlanPrice = firstFinishItem.querySelector("span");
    let firstFinishItemPlanTitle = firstFinishItem.querySelector("h4");
    let changeText = firstFinishItem.querySelector("p");
    let finishAddOnsCard = document.querySelector(".finish-add-ons");
    let totalSpan = document.querySelector(".total-container > span");
  
    firstFinishItemPlanPrice.innerHTML = finishData.planPrice;
    totalCount += Number(finishData.planPrice.slice(1, -3));
    firstFinishItemPlanTitle.innerHTML = finishData.planTitle;
  
    finishAddOnsCard.innerHTML = "";
    finishData.itemData.forEach((item) => {
      console.log(item);
      totalCount += Number(item.itemPrice.slice(2, -3));
      finishAddOnsCard.innerHTML += `
        <div class="finish-item">
          <p>${item.itemTitle}</p>
          <span>${item.itemPrice.slice(1)}</span>
        </div>
      `;
    });
    totalSpan.innerHTML = `+$${totalCount}`;
  
    changeText.addEventListener("click", function () {
      allContentPages[3].classList.add("hide");
      allContentPages[1].classList.remove("hide");
    });
  }