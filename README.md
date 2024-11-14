# kumagotchi-server

### ERD v0.1

```mermaid
erDiagram
  Topics ||--o{ Comments : topicId

  Users {
    string _id
    string wallet
    string timezone
    string ens
    string profileImg
    string refreshToken
    date createdAt
  }

  Chat {
    string _id
    string contents
    string userWallet
    date createdAt
  }

  Character {
    string _id
    number poolIn
    string address
    string imageUrl
    string level
    number stroke
    number feed
    number praise
    number sleep
    date createdAt
  }
```
