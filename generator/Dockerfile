FROM golang:1.12.4-alpine

RUN apk add --update git

RUN mkdir /opt/generator
WORKDIR /opt/generator

COPY . .

RUN go install

ENTRYPOINT [ "/go/bin/generator" ]
CMD []
