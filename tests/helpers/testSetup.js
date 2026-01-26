const { initializeStore } = require("../../src/data/store");

function setupTestStore() {
  initializeStore();
}

function setupTestTime() {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2026-01-26T09:00:00"));
}

function teardownTestTime() {
  jest.useRealTimers();
}

module.exports = {
  setupTestStore,
  setupTestTime,
  teardownTestTime
};
