# web-management
## Build Setup

```bash
# install dependencies
$ npm install

# migrate database 
before migrate database create table first. change the example.env with .env and set config in this file
$ npm run migrate_up

# serve with hot reload at localhost:3000
before run this please check token address in .env file
$ npm run start
```

## Login
```bash
# user: admin@ecoc.io
# password: 12345678 
```


# script
## create_user  
agv1 = email
agv2 = password
example node create_user test@test 12345678

## change_password 
agv1 = email
agv2 = password
agv3 = new password
example node create_user test@test 12345678 new12345