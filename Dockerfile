FROM denoland/deno:alpine-1.29.2

EXPOSE 7777

WORKDIR /app

COPY ./drill-and-practice .

RUN deno cache deps.js

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-env", "--no-check", "run-locally.js" ]