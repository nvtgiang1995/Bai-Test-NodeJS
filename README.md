# Bai-Test-NodeJS

Cronjob chạy định kỳ hàng ngày, đọc schema của db lên, merge với google sheet. Em dang set cronjob 1 phút chạy 1 lần

# Installation

```bash
npm install
```

# Database Migration
Sử dụng sequelize database postgres.
Migration:
```bash
npx sequelize-cli model:generate --name Accounts --attributes Type:integer,UserName:string,Password:string

npm run db
```

# Run

```bash
npm start
```

# Test

```bash
npm run test
```

# Document
Link file Google Sheets: [https://docs.google.com/spreadsheets/d/1Bctt9oF60A_blzEm58V12o5owyi5UJflQt89xRp-YvE/edit#gid=0](https://docs.google.com/spreadsheets/d/1Bctt9oF60A_blzEm58V12o5owyi5UJflQt89xRp-YvE/edit#gid=0)
