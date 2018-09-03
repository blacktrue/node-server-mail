# node-server-mail

### 3.- Install dependencies

```
npm install
```

### 2.- Copy parameters file

```
cp parameters.template.json parameters.json
```

### 3.- Configure credentials for email account

```

{
  "app": {
    "port": 3001
  },
  "mail": {
    "service": "gmail",
    "auth": {
      "user": "your_email@gmail.com",
      "password": "123456789"
    }
  }
}
```

### 4.- Run server

```
node index.js
```
