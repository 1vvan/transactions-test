const feeCalculator = require('../src/feeCalculator');

// Tests for the function that calculates fees for cashing in money
// calculateFeeForCashIn
test('Calculate cash in fee for small amounts', () => {
    // Expect the fee for cashing in $10 to be $0.01
    expect(feeCalculator.calculateFeeForCashIn(10)).toBe(0.01);
});

test('Calculate cash in fee right at the boundary', () => {
    // Testing the calculation at the maximum boundary where the fee caps out
    const boundaryAmount = 140000;
    expect(feeCalculator.calculateFeeForCashIn(boundaryAmount)).toBe(5.00);
});

test('Calculate cash in fee for very low amount', () => {
    // A very low amount should also incur a minimum possible fee, confirming the calculation applies correctly for very small transactions
    expect(feeCalculator.calculateFeeForCashIn(1)).toBe(0.01);
});

// Tests for the function that calculates fees for cashing out money by natural persons
// calculateFeeForCashOutNatural
test('Calculate cash out fee for natural person with no fee required', () => {
    // Testing with accumulated amount already at the free limit, no additional fee should apply
    expect(feeCalculator.calculateFeeForCashOutNatural(500, 500)).toBe(0);
});

test('Calculate cash out fee for natural person at the boundary of the free limit', () => {
    // Testing right at the boundary where no fee should be charged yet
    expect(feeCalculator.calculateFeeForCashOutNatural(1000, 0)).toBe(0);
});

test('Calculate cash out fee for natural person above the free limit', () => {
    // Testing with an amount that exceeds the free limit to ensure the correct fee is applied
    expect(feeCalculator.calculateFeeForCashOutNatural(200, 1000)).toBe(0.60);
});

// Tests for the function that calculates fees for cashing out money by juridical (legal) persons
// calculateFeeForCashOutJuridical
test('Calculate cash out fee for legal person below minimum fee', () => {
    // Testing with an amount below the minimum fee to ensure the minimum fee is applied
    expect(feeCalculator.calculateFeeForCashOutJuridical(100)).toBe(0.50);
});

test('Calculate cash out fee for legal person at the minimum fee boundary', () => {
    // Testing right at the boundary to ensure rounding and minimum fee calculations are correct
    const minBoundaryAmount = 166.67;
    expect(feeCalculator.calculateFeeForCashOutJuridical(minBoundaryAmount)).toBe(0.51);
});

test('Calculate cash out fee for legal person above minimum fee', () => {
    // Testing with an amount that is well above the minimum fee to confirm the correct fee calculation
    expect(feeCalculator.calculateFeeForCashOutJuridical(2000)).toBe(6.00);
});
