---

## 🐞 MERN Bug Tracker – Testing & Debugging Documentation

### Project Overview
This is a full-stack MERN Bug Tracker application. Users can report, update, and delete bugs. The project demonstrates comprehensive testing and debugging best practices for both backend and frontend.

---

### Testing Strategy

#### Tools Used
- **Backend:** Jest, Supertest, jest-mock
- **Frontend:** React Testing Library, Jest, @testing-library/jest-dom

#### Test Types
- **Unit Tests**
  - Backend: Helper functions (e.g., validation)
  - Frontend: React components (form, list, item)
- **Integration Tests**
  - Backend: API endpoints (create, update, delete bugs)
  - Frontend: App-level tests (mocking fetch, simulating user actions)
- **(Optional) E2E Tests**
  - Not included in this version, but Cypress/Playwright can be added.

#### How to Run the Tests

**Backend:**
```bash
cd server
npm test
```

**Frontend:**
```bash
cd client
npm test
```

#### How to View Coverage
```bash
# In server/ or client/
npm test -- --coverage
```
- Open the generated `coverage/lcov-report/index.html` in your browser for a detailed report.

---

### Debugging Techniques

- **Console Logs:** Used in backend controllers and frontend components to trace values.
- **Error Boundaries:** Implemented in `client/src/components/ErrorBoundary.jsx` to catch React errors.
- **Express Error Middleware:** Centralized error handling in `server/middleware/errorHandler.js`.
- **DevTools:** Used Chrome DevTools for inspecting network requests and React state.
- **Node.js Inspector:** Used for step-debugging backend code.

---

### Screenshots

![Client tests results](screenshots/test-result-client.png)
![Server tests results](screenshots/test-result-server.png)

---

### How to Use the App

1. **Start the Backend**
   ```bash
   cd server
   node index.js
   ```
2. **Start the Frontend**
   ```bash
   cd client
   npm start
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**
4. **Report, update, and delete bugs using the UI.**

---

