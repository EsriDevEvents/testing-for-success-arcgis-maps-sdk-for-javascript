# ArcGIS Maps SDK for JavaScript: Testing for Success

This repository showcases best practices for testing the ArcGIS Maps SDK for JavaScript. It includes a lightweight React application featuring an interactive ArcGIS map and a DataEntry tab. The map listens for user click events, places an 'X' marker at the clicked position, and extracts latitude and longitude. These coordinates are then displayed in the DataEntry tab, allowing users to store their observations directly on the map.

![Screenshot of demo application](docs/observation-app.avif)

**Testing Methodologies**

This repository covers various testing methodologies, including:

- Unit testing
- Integration testing
- End-to-end testing
- Visual regression testing

To focus on techniques we use [`vitest`](https://vitest.dev/). Vitest is a modern, fast alternative to Jest, optimized for Vite projects. Since our application is built with vite, integrating vitest was seamless.

[Test configuration](https://vitest.dev/config/) can be either in [vite.config.ts](./vite.config.ts) or a separate vitest.config.ts.

At the start, we only have it configured to run unit and integration tests on the server code. In the demo we will show how to introduce all levels of testing for the frontend app.

To get started, clone this repo and run:

```bash
npm install
npm run test
```

Which should yield the following output in the terminal:

![Screenshot of vitest output](docs/01-vitest-reporter-output.avif)

## Types of testing

### Unit Testing

Tests for individual functions, components, or modules in isolation to ensure they work as expected. Our app consists of two components, [MapContainer](./src/components/MapContainer.tsx) and [DataEntry.tsx](./src/components/DataEntry.tsx). In addition, network request logics are stored under [api/](./src/api/).

### Integration Testing

Tests that components like [DataEntry](/src/components/DataEntry.tsx) and [Map Container](/src/components/MapContainer.tsx) function together correctly, often overlapping with E2E testing in scope.

### End To End (E2E) Testing

Simulates real user interactions by testing the entire application flow from start to finish.

### Visual Regression

Ensures UI consistency by detecting unintended changes. It captures and compares screenshots before and after code updates to highlight discrepancies, preventing unwanted design or layout shifts.

## Optimization

Optimizing test execution helps reduce total testing time while maintaining accuracy. Here are key optimization techniques:

- **Mock Services**: Replace network calls with local mocks. For example, we mock ArcGIS API requests, cutting test times from minutes to seconds in Vitest.
- **Image Hashing**: In visual regression, compute image hashes locally and upload only if they differ from the server’s, minimizing network overhead.
- **Test Sharding**: Split large test suites across multiple VMs to run in parallel, drastically reducing total execution time.

## CI

Integrating tests into a CI pipeline ensures code quality, prevents regressions, and improves collaboration by providing real-time feedback to developers.

Some popular tools are:

- **GitHub Actions** – Simple, maintainable, and widely supported with built-in actions.
- **Jenkins** – A flexible, open-source automation server for building, testing, and deploying applications.

In our demo, we use Github Actions.

### Collaboration & Notifications in CI

A well-structured CI pipeline not only ensures quality but also improves team collaboration through automated notifications:

- **GitHub PR Comments** – Our Test Workflow posts test results as a comment on the PR, giving instant feedback to developers.
- **Slack or Teams Integration** – CI pipelines can be configured to send test reports or alerts to Slack, Microsoft Teams, or other messaging platforms, keeping teams informed.
- **Email Notifications** – Alerts can be sent to team members when a test fails or requires attention.
- **PR Status Checks** – GitHub prevents merging if tests fail, enforcing code quality.

Listed here are some useful actions provided from Github itself.

- **actions/checkout** – Clones the repository so workflow jobs can access and modify files
- **actions/setup-node** – Sets up a Node.js environment with caching
- **actions/github-script** – Runs JavaScript within workflows for automation tasks
- **slackapi/slack-github-action** – Sends notifications to Slack channels
- **rtCamp/action-slack-notify** – Posts test results to Slack
