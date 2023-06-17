window.onload = function () {
  ui.init();
  //ui.salaryChange(); //just for test
};

// employee salary deductions
class MonthlyEmployeeIncome {
  // Gross Amount
  grossAmount;

  //Accumulated income since the beginning of the year
  accumulatedYearlyIncomeSum;

  //Retimerent contribution 9,76%:
  retirementContribution;

  //Pension contribution 1,50%
  pensionContribution;

  //Sickness contribution 2.45%
  sicknessContribution;

  //Sum of insurance contributions financed by the employee:
  workerSocialContributionsSum;

  //Basis for the assessment of health insurance contribution
  baseForHealthContribution;

  //Health insurance contribution 9%
  healthContribution;

  //Tax advance
  advanceTax;

  //health insurance contribution at a rate of 7.75%
  healthAmountToExclude;

  //Net amount
  finalWorkerNetMoney;

  //Income that results from deducting the costs of earning revenue
  income;

  calculate(grossAmount, monthNum, accumulatedYearlyIncomeSum) {
    if (!accumulatedYearlyIncomeSum) accumulatedYearlyIncomeSum = 0;

    this.grossAmount = grossAmount;
    this.monthNum = monthNum;
    this.accumulatedYearlyIncomeSum = accumulatedYearlyIncomeSum;

    //Retimerent contribution 9,76%:
    this.retirementContribution = grossAmount * 0.0976;

    //Pension contribution 1,50%
    this.pensionContribution = grossAmount * 0.015;

    //Sickness contribution 2.45%
    this.sicknessContribution = grossAmount * 0.0245;

    //Sum of insurance contributions financed by the employee:
    this.workerSocialContributionsSum =
      this.retirementContribution +
      this.pensionContribution +
      this.sicknessContribution;

    //Basis for the assessment of health insurance contribution
    this.baseForHealthContribution =
      grossAmount - this.workerSocialContributionsSum;

    //Health insurance contribution 9%
    this.healthContribution = this.baseForHealthContribution * 0.09;

    this.income = this.baseForHealthContribution - 250;
    this.accumulatedYearlyIncomeSum += this.income;

    //Tax advance
    this.income = this.baseForHealthContribution - 250;
    let futureYearlyIncome = this.accumulatedYearlyIncomeSum + this.income;

    if (
      this.accumulatedYearlyIncomeSum < 85528 &&
      futureYearlyIncome >= 85528
    ) {
      // pierwszy miesiąc gdzie przekroczony jest próg 17% do 85k, 32% ponad 85k
      let taxableAt17 = 85528 - this.accumulatedYearlyIncomeSum;
      let taxableAt32 = futureYearlyIncome - 85528;

      this.advanceTax = taxableAt17 * 0.17 + taxableAt32 * 0.32;
      console.log('podatek: mieszany', this.advanceTax);
    } else if (futureYearlyIncome >= 85528) {
      this.advanceTax = this.income * 0.32;
      console.log('podatek: 32%', this.advanceTax);
    } else {
      this.advanceTax = this.income * 0.17;
      console.log('podatek: 17%', this.advanceTax);
      if (this.advanceTax > 43.76) {
        this.advanceTax -= 43.76;
      } else {
        this.advanceTax = 0;
      }
    }

    this.accumulatedYearlyIncomeSum = futureYearlyIncome;

    //health insurance contribution at a rate of 7.75%
    this.healthAmountToExclude = this.baseForHealthContribution * 0.0775;

    //final advance on income tax
    this.advanceTax = this.advanceTax - this.healthAmountToExclude;
    if (this.advanceTax < 0) {
      this.advanceTax = 0;
    }

    //Net amount
    this.finalWorkerNetMoney =
      grossAmount -
      this.workerSocialContributionsSum -
      this.healthContribution -
      this.advanceTax;
  }
}

const monthlyIncome = new MonthlyEmployeeIncome();

// Składki na pracownika płacone przez pracodawcę
class MonthlyEmloyerCost {
  grossAmount;
  monthNum;
  accumulatedYearlyIncomeSum;

  // Retirement contribution 9.76%
  employerRetirementContribution;

  //Pension contribution 6.50%
  employerPensionContribution;

  // Accident insurance contribution 1.67%:
  employerAccidentInsurance;

  // Work fund contribution 2.45%
  employerWorkFundContribution;

  // Guaranteed employee work fund contribution 0.10%
  employerGwarantedWorkFundContributions;

  // Total employer contributions
  employerContributionSum;

  calculate(grossAmount, monthNum, accumulatedYearlyIncomeSum) {
    this.grossAmount = grossAmount;
    this.monthNum = monthNum;
    this.accumulatedYearlyIncomeSum = accumulatedYearlyIncomeSum;

    // Retirement contribution 9.76%
    this.employerRetirementContribution = grossAmount * 0.0976;

    //Pension contribution 6.50%
    this.employerPensionContribution = grossAmount * 0.065;

    // Accident insurance contribution 1.67%:
    this.employerAccidentInsurance = grossAmount * 0.0167;

    // Work fund contribution 2.45%
    this.employerWorkFundContribution = grossAmount * 0.0245;

    // Guaranteed employee work fund contribution 0.10%
    this.employerGwarantedWorkFundContributions = grossAmount * 0.001;

    // Total employer contributions
    this.employerContributionSum =
      this.employerRetirementContribution +
      this.employerPensionContribution +
      this.employerAccidentInsurance +
      this.employerWorkFundContribution +
      this.employerGwarantedWorkFundContributions;
  }
}

const monthlyEmployerCost = new MonthlyEmloyerCost();

// Interfejs użytkownika
class Ui {
  salaryInput;
  salaryGross; // kwota brutto
  init() {
    this.salaryInput = document.getElementById('salary');
    this.salaryInput.addEventListener('input', this.salaryChange);
  }

  salaryChange = (e) => {
    if (e) this.salaryGross = e.target.value;

    //this.salaryGross = 2600; // just for test

    if (!this.salaryGross || isNaN(this.salaryGross)) this.salaryGross = 0;

    monthlyIncome.calculate(this.salaryGross, 1, 0);
    monthlyEmployerCost.calculate(this.salaryGross, 1, 0);

    this.updateDom();
  };

  updateDom = () => {
    //Retimerent contribution 9,76%:
    this.setValueById(
      'retirementContribution',
      monthlyIncome.retirementContribution.toFixed(2),
    );

    //Pension contribution 1,50%
    this.setValueById(
      'pensionContribution',
      monthlyIncome.pensionContribution.toFixed(2),
    );

    //Sickness contribution 2.45%
    this.setValueById(
      'sicknessContribution',
      monthlyIncome.sicknessContribution.toFixed(2),
    );

    //Sum of insurance contributions financed by the employee:
    this.setValueById(
      'workerSocialContributionsSum',
      monthlyIncome.workerSocialContributionsSum.toFixed(2),
    );

    //Basis for the assessment of health insurance contribution
    this.setValueById(
      'baseForHealthContribution',
      monthlyIncome.baseForHealthContribution.toFixed(2),
    );

    //Health insurance contribution 9%
    this.setValueById(
      'healthContribution',
      monthlyIncome.healthContribution.toFixed(2),
    );

    //Tax advance
    this.setValueById('advanceTax', monthlyIncome.advanceTax.toFixed(2));

    //health insurance contribution at a rate of 7.75%
    this.setValueById(
      'healthAmountToExclude',
      monthlyIncome.healthAmountToExclude.toFixed(2),
    );

    //Net amount
    this.setValueById(
      'finalWorkerNetMoney',
      monthlyIncome.finalWorkerNetMoney.toFixed(2),
    );

    /*
      @@@@@@@@@@  employer contributions  @@@@@@@@@@
    */

    // Retirement contribution 9.76%
    this.setValueById(
      'employerRetirementContribution',
      monthlyEmployerCost.employerRetirementContribution.toFixed(2),
    );

    //Pension contribution 6.50%
    this.setValueById(
      'employerPensionContribution',
      monthlyEmployerCost.employerPensionContribution.toFixed(2),
    );

    // Accident insurance contribution 1.67%:
    this.setValueById(
      'employerAccidentInsurance',
      monthlyEmployerCost.employerAccidentInsurance.toFixed(2),
    );

    // Work fund contribution 2.45%
    this.setValueById(
      'employerWorkFundContribution',
      monthlyEmployerCost.employerWorkFundContribution.toFixed(2),
    );

    // Guaranteed employee work fund contribution 0.10%
    this.setValueById(
      'employerGwarantedWorkFundContributions',
      monthlyEmployerCost.employerGwarantedWorkFundContributions.toFixed(2),
    );

    // Total employer contributions
    this.setValueById(
      'employerContributionSum',
      monthlyEmployerCost.employerContributionSum.toFixed(2),
    );
  };
  setValueById(id, v) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = v;
    }
  }
}

const ui = new Ui();
