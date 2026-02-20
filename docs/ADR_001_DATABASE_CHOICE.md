# ADR 001: Database Selection (MongoDB vs PostgreSQL)

## Context
The Smart Mirror App requires a database to store:
1.  **User Profiles**: Structured data (Name, Email).
2.  **Wardrobe/Clothing**: Highly variable attributes. A "T-shirt" has varying metadata compared to "Shoes" or "Accessories".
3.  **Recommendations/AI**: Data likely coming in JSON format from AI services.
4.  **Scalability**: Need to support future expansion of features without rigid schema migrations.

## Decision
We have decided to use **MongoDB**.

## Rationale
1.  **Schema Flexibility (Polymorphism)**: Fashion items have diverse attributes. MongoDB allows us to store arbitrary `metadata` fields for different clothing categories without creating complex join tables or Entity-Attribute-Value (EAV) patterns required in SQL.
2.  **AI Integration**: Generative AI and ML models typically work with JSON. Storing inference results directly as documents is more efficient.
3.  **Iteration Speed**: Faster to prototype and expand features (e.g., adding a "Mood Board" complex object) without writing database migrations for every change.
4.  **Performance**: High write throughput for user interactions and logging.

## Consequences
-   We must ensure data integrity at the application level (Mongoose models) since the database layer is flexible.
-   Complex join-heavy queries (analytics) might need aggregation pipelines, which can be steeper to learn than SQL, but are powerful.
