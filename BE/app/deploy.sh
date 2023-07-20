#!/bin/bash

# 저장소 업데이트
echo "저장소 갱신"
git fetch origin dev-be

REMOTE=`git rev-parse origin/dev-be`
LOCAL=`git rev-parse HEAD`

if [[ $REMOTE = $LOCAL ]]; then
        echo "저장소 내용이 동일해서 빌드할 필요가 없습니다."
        exit 0
fi

git merge origin/dev-be

TODOID=`jps | grep app | awk '{ print $1 }'`

if [ -z $TODOID ]; then
        echo "실행중인 jar가 없습니다."
else
        echo "$TODOID 프로세스를 종료합니다."
        kill -9 $TODOID
fi

echo "빌드 시작"
rm -rf build
chmod +x ./gradlew
./gradlew clean build -x test

echo "서버 시작"
nohup java -jar ~/app/todo-max/BE/app/build/libs/app-0.0.1-SNAPSHOT.jar --Dspring.config.location=~/app/application.yml > ../log.txt 2>&1 &
echo "배포 완료!"
