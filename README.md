# MongoDB Development Best Practices: A Code Repository

This repository contains a collection of code snippets and scripts demonstrating best practices for developing scalable and performant applications with MongoDB. The examples are derived from real-world case studies, addressing common challenges faced by development teams.

## 1. Data Modeling & Schema Design

Effective data modeling is crucial for application performance. [cite_start]These examples showcase flexible schema design patterns to solve complex business problems[cite: 277, 287].

### `src/data-modeling/hr_chatbot_schema.js`

[cite_start]This file contains a multi-collection schema design for an HR intelligent chatbot[cite: 277]. It demonstrates the use of:
* [cite_start]**Embedded Documents:** To store frequently accessed data like `skills` and `projects` directly within the `User` document, minimizing read operations[cite: 290, 291].
* [cite_start]**Document Referencing:** For modeling many-to-many relationships between collections like `User` and `Projects`[cite: 293].
* [cite_start]**Time-Series Collections:** For efficient, high-volume storage and querying of immutable data like chat messages[cite: 296].

### `src/data-modeling/schema_validation.js`

[cite_start]A script to enforce data consistency in a flexible schema environment[cite: 511, 514]. It uses MongoDB's `$jsonSchema` operator to:
* [cite_start]Validate incoming documents at the database level[cite: 519, 520].
* [cite_start]Find existing documents that do not conform to a predefined schema, which is essential for data migration and cleanup[cite: 522].

## 2. Performance & Cost Optimization

These scripts focus on automating performance tuning and resource management to ensure long-term efficiency.

### `src/performance-optimization/index_build_optimization.js`

[cite_start]This script provides a solution for intelligent index creation[cite: 353, 359]. It automates the process of:
* [cite_start]Calculating the **cardinality** of fields to be indexed[cite: 366, 367].
* [cite_start]Generating optimal compound index creation commands by sorting fields from high to low cardinality[cite: 358, 368, 371].

### `src/performance-optimization/cursor_based_pagination.js`

[cite_start]A demonstration of the best practice for building scalable pagination[cite: 239, 248]. [cite_start]It shows how to use a **cursor-based** approach with `_id` or other sorted fields to avoid the performance pitfalls of traditional `$skip` and `$limit` pagination on large datasets[cite: 240, 244]. [cite_start]This method ensures consistent query performance regardless of page depth[cite: 273].

### `src/performance-optimization/auto_iops_scaling.js`

[cite_start]An advanced script for managing MongoDB Atlas costs and performance[cite: 440]. This code, designed as an Atlas Serverless Function, demonstrates how to:
* [cite_start]Retrieve current cluster configurations via the Atlas API[cite: 454].
* [cite_start]Dynamically calculate target IOPS based on business logic and a predefined schedule[cite: 449, 455].
* [cite_start]Use a `PATCH` request to automatically adjust the cluster's IOPS, addressing a key limitation where Atlas's native autoscaling does not include IOPS[cite: 446, 456].

### `src/performance-optimization/health_check_script.js`

[cite_start]A diagnostic script for database health checks[cite: 553, 564]. [cite_start]It automates the collection of key metrics to provide visibility into a database's internal state[cite: 555], including:
* [cite_start]`dataSize` and `totalIndexSize` to identify storage inefficiencies[cite: 560, 561].
* [cite_start]`averageDocumentSize` to evaluate the effectiveness of the data model[cite: 572].
* [cite_start]These metrics are crucial for proactive management and capacity planning[cite: 606, 608].

## 3. Real-Time Data Synchronization

These examples focus on building robust, event-driven architectures for real-time data flow.

### `src/data-sync/atlas_triggers_sync.js`

[cite_start]A solution using MongoDB Atlas Triggers and Serverless Functions to handle data synchronization[cite: 111, 115]. This code automates the process of:
* [cite_start]Listening for database change events (insert, update, delete) in a source collection[cite: 112].
* [cite_start]Automatically executing a serverless function to replicate or update data in a target collection, solving data consistency issues that arise from using embedded models[cite: 108, 116].

### `src/data-sync/change_stream_resumability.js`

[cite_start]This code snippet demonstrates the resilience of MongoDB Change Streams[cite: 149]. It shows how to use a `resume token` to:
* [cite_start]Persist a specific point in the data stream[cite: 155].
* [cite_start]Seamlessly re-establish a connection and continue processing from the last successfully processed event after an interruption[cite: 156]. [cite_start]This ensures data integrity and prevents data loss in the face of transient failures[cite: 158].

---
**Disclaimer**: The code snippets provided are for demonstration purposes. Before using them in a production environment, ensure you understand the full implications and adapt them to your specific security and performance requirements.