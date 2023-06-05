# Project 2: Drill and Practice

This is the second course project for the course [Web Software Development.](https://fitech101.aalto.fi/web-software-development)

This project is a web application for repeated practice of learned content. The application provides a list of topics and allows creating
multiple-choice questions into those topics that are then answered by self and others.

Application can be run locally using Docker. Use the command `docker-compose up` and go to http://localhost:7777 to start using the application.
Doing this creates an admin account with following credentials:

> Email: admin@admin.com
>
> Password: 123456

---

## Testing

App comes with few tests which can be run using the following command
> docker-compose run --rm drill-and-practice test --allow-all

---

## Accessing app online

App can be accessed here https://drill-and-practice-wsd.fly.dev/