# MongoDB Development Best Practices: A Code Repository

This repository contains a collection of code snippets and scripts demonstrating best practices for developing scalable and performant applications with MongoDB. The examples are derived from real-world case studies, addressing common challenges faced by development teams.

## 1\. Data Modeling & Schema Design

Effective data modeling is crucial for application performance. These examples showcase flexible schema design patterns to solve complex business problems.

### `src/data-modeling/hr_chatbot_schema.js`

This file contains a multi-collection schema design for an HR intelligent chatbot. It demonstrates the use of:

  * **Embedded Documents**: To store frequently accessed data like `skills` and `projects` directly within the `User` document, minimizing read operations.
  * **Document Referencing**: For modeling many-to-many relationships between collections like `User` and `Projects`.
  * **Time-Series Collections**: For efficient, high-volume storage and querying of immutable data like chat messages.

### `src/data-modeling/schema_validation.js`

A script to enforce data consistency in a flexible schema environment. It uses MongoDB's `$jsonSchema` operator to:

  * Validate incoming documents at the database level.
  * Find existing documents that do not conform to a predefined schema, which is essential for data migration and cleanup.

## 2\. Performance & Cost Optimization

These scripts focus on automating performance tuning and resource management to ensure long-term efficiency.

### `src/performance-optimization/index_build_optimization.js`

This script provides a solution for intelligent index creation. It automates the process of:

  * Calculating the **cardinality** of fields to be indexed.
  * Generating optimal compound index creation commands by sorting fields from high to low cardinality.

### `src/performance-optimization/cursor_based_pagination.js`

A demonstration of the best practice for building scalable pagination. It shows how to use a **cursor-based** approach with `_id` or other ordered fields to avoid the performance pitfalls of traditional `$skip` and `$limit` pagination on large datasets. This method ensures consistent query performance regardless of page depth.

### `src/performance-optimization/auto_iops_scaling.js`

An advanced script for managing MongoDB Atlas costs and performance. This code, designed as an Atlas Serverless Function, demonstrates how to:

  * Retrieve current cluster configurations via the Atlas API.
  * Dynamically calculate target IOPS based on business logic and a predefined schedule.
  * Use a `PATCH` request to automatically adjust the cluster's IOPS, addressing a key limitation where Atlas's native autoscaling does not include IOPS.

### `src/performance-optimization/health_check_script.js`

A diagnostic script for database health checks. It automates the collection of key metrics to provide visibility into a database's internal state, including:

  * `dataSize` and `totalIndexSize` to identify storage inefficiencies.
  * `averageDocumentSize` to evaluate the effectiveness of the data model.
  * These metrics are crucial for proactive management and capacity planning.

## 3\. Real-Time Data Synchronization

These examples focus on building robust, event-driven architectures for real-time data flow.

### `src/data-sync/atlas_triggers_sync.js`

A solution using MongoDB Atlas Triggers and Serverless Functions to handle data synchronization. This code automates the process of:

  * Listening for database change events (insert, update, delete) in a source collection.
  * Automatically executing a serverless function to replicate or update data in a target collection, solving data consistency issues that arise from using embedded models.

### `src/data-sync/change_stream_resumability.js`

This code snippet demonstrates the resilience of MongoDB Change Streams. It shows how to use a `resume token` to:

  * Persist a specific point in the data stream.
  * Seamlessly re-establish a connection and continue processing from the last successfully processed event after an interruption. This ensures data integrity and prevents data loss in the face of transient failures.

-----

**Disclaimer**: The code snippets provided are for demonstration purposes. Before using them in a production environment, ensure you understand the full implications and adapt them to your specific security and performance requirements.