#FROM openjdk:13-oracle
FROM openjdk:11-oracle
COPY coe.jar coe.jar
COPY coe.sh coe.sh
RUN yum install net-tools -y
RUN mkdir -p /data
ADD . /data
#WORKDIR /data
RUN  chmod +x ./coe.sh
RUN ls
CMD ["./coe.sh"]
EXPOSE 8082
#CMD [ "java","-jar","../coe.jar" ]