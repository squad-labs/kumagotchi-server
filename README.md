# kumagotchi-server

### ERD v0.1

```mermaid
erDiagram
  Topics ||--o{ Comments : topicId

  Users {
    string _id
    string wallet
    string timezone
    string refreshToken
    date updateShareAt
    date createdAt
  }

  Comments {
    string _id
    string contents
    string userWallet
    date createdAt
  }
```
