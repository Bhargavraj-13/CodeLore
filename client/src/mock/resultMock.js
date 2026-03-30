export const mockResultPass = {
  contentKey: 'arrays',
  quiz: {
    score: 8,
    total: 10,
    percent: 80,
  },
  coding: {
    score: 7,
    total: 8,
    percent: 88,
  },
  overall: {
    percent: 84,
    passed: true,
  },
};

export const mockResultFail = {
  contentKey: 'arrays',
  quiz: {
    score: 2,
    total: 10,
    percent: 20,
  },
  coding: {
    score: 8,
    total: 8,
    percent: 100,
  },
  overall: {
    percent: 60,
    passed: false,
  },
};