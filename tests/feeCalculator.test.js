const feeCalculator = require('../src/feeCalculator');

// calculateFeeForCashIn
test('Calculate cash in fee for small amounts', () => {
    expect(feeCalculator.calculateFeeForCashIn(10)).toBe(0.01);
});

test('Calculate cash in fee right at the boundary', () => {
    const boundaryAmount = 140000;
    expect(feeCalculator.calculateFeeForCashIn(boundaryAmount)).toBe(5.00);
});

test('Calculate cash in fee for very low amount', () => {
    expect(feeCalculator.calculateFeeForCashIn(1)).toBe(0.01);
});


// calculateFeeForCashOutNatural
test('Calculate cash out fee for natural person with no fee required', () => {
    expect(feeCalculator.calculateFeeForCashOutNatural(500, 500)).toBe(0);
});

test('Calculate cash out fee for natural person at the boundary of the free limit', () => {
    expect(feeCalculator.calculateFeeForCashOutNatural(1000, 0)).toBe(0);
});

test('Calculate cash out fee for natural person above the free limit', () => {
    expect(feeCalculator.calculateFeeForCashOutNatural(200, 1000)).toBe(0.60);
});


// calculateFeeForCashOutJuridical
test('Calculate cash out fee for legal person below minimum fee', () => {
    expect(feeCalculator.calculateFeeForCashOutJuridical(100)).toBe(0.50);
});

test('Calculate cash out fee for legal person at the minimum fee boundary', () => {
    const minBoundaryAmount = 166.67;
    expect(feeCalculator.calculateFeeForCashOutJuridical(minBoundaryAmount)).toBe(0.51);
});

test('Calculate cash out fee for legal person above minimum fee', () => {
    expect(feeCalculator.calculateFeeForCashOutJuridical(2000)).toBe(6.00);
});
