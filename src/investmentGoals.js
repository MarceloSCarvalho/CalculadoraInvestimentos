function convertToMonthlyReturnRate(yearRerturnRate) {
  return yearRerturnRate ** (1 / 12);
}
export function generateReturnsArray(
  startingAmount = 0,
  timeHorize = 0,
  timePeriod = "monthly",
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  if (!timeHorize || !startingAmount) {
    throw new Error("Please provide a time horize and starting amount.");
  }

  const finalReturnRate = returnTimeFrame === "monthly" ? 1 + returnRate / 100 : convertToMonthlyReturnRate(1 + returnRate / 100);
  const finalTimeHorize = timePeriod === "monthly" ? timeHorize : timeHorize * 12;
  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenceInvestmentObject];

  for (let timeReference = 1; timeReference <= finalTimeHorize; timeReference++) {
    const totalAmount = returnsArray[timeReference - 1].totalAmount * finalReturnRate + monthlyContribution;
    const interestReturns = returnsArray[timeReference - 1].totalAmount * (finalReturnRate - 1);
    const investedAmount = startingAmount + monthlyContribution * timeReference;
    const totalInterestReturns = totalAmount - investedAmount;

    returnsArray.push({
      investedAmount: investedAmount,
      interestReturns: interestReturns,
      totalInterestReturns: totalInterestReturns,
      month: timeReference,
      totalAmount: totalAmount,
    });
  }
  return returnsArray;
}
