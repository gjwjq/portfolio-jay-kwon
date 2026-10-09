---
title: "1009 - Gradle과 Maven"
---

> 📺 공부 중인 강의: [스프링 입문 강의 (YouTube 재생목록)](https://www.youtube.com/watch?v=qyGjLVQ0Hog&list=PLumVmq_uRGHgBrimIp2-7MCnoPUskVMnd)

# 초압축

```
빌드 도구 = 라이브러리 받아 오기 + 컴파일 + 테스트 + 포장(jar)을 자동으로 해 주는 도구
Maven = 선배. pom.xml (XML로 씀)
Gradle = 후배. build.gradle (코드처럼 씀). 더 짧고 빠름
둘 다 하는 일은 똑같음
```

# 1. 빌드 도구가 뭔데?

내가 쓴 `.java` 코드를 **실행 가능한 프로그램으로 만드는 과정**을 "빌드"라고 함

```
1. 라이브러리 다운받기   (스프링, 톰캣 ...)
2. 컴파일              (.java → .class)
3. 테스트 실행
4. 포장                (.jar 파일 하나로 묶기)
```

이걸 자동으로 해 주는 게 **빌드 도구** → Maven, Gradle

비유

```
build.gradle   = 레시피 (장보기 목록)
Gradle         = 요리사
Maven Central  = 마트 (라이브러리 창고)
```

JSP 할 때랑 비교

| JSP 때 | Gradle 쓰면 |
|---|---|
| jar 직접 다운받아서 `WEB-INF/lib`에 넣음 | `build.gradle`에 한 줄 적으면 끝 |
| 버전 안 맞으면 직접 찾아서 바꿈 | 맞는 버전 알아서 골라 줌 |
| 다른 컴퓨터로 옮기면 jar도 다 챙겨야 함 | `build.gradle`만 있으면 어디서든 똑같이 재현 |

# 2. Maven vs Gradle

**하는 일은 똑같음.** 쓰는 방식이 다름

| | Maven | Gradle |
|---|---|---|
| 설정 파일 | `pom.xml` | `build.gradle` |
| 쓰는 방식 | XML (태그) | 코드 (Groovy 또는 Kotlin) |
| 길이 | 길다 | 짧다 |
| 속도 | 상대적으로 느림 | 빠름 (바뀐 부분만 다시 빌드, 캐시 사용) |
| 자유도 | 정해진 틀대로 | 원하는 대로 커스텀 쉬움 |
| 나온 순서 | 먼저 (2004) | 나중 (2012) |
| 요즘 | 옛날 프로젝트, 회사에 아직 많음 | 스프링 신규 프로젝트에서 많이 씀 |

같은 라이브러리 추가를 비교하면

**Maven (pom.xml)**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webmvc</artifactId>
</dependency>
```

**Gradle (build.gradle)**

```gradle
implementation 'org.springframework.boot:spring-boot-starter-webmvc'
```

→ 내용은 같은데 Gradle이 **한 줄**로 끝남

결론

- 처음 배우는 거면 **강의에서 쓰는 거 따라가면 됨**
- 하나 알면 다른 것도 금방 읽힘 (개념이 같아서)

# 3. Gradle 자세히

## build.gradle 구조

```gradle
plugins { ... }        // ① Gradle한테 기능 붙이기
group / version        // ② 내 프로젝트 정보
java { ... }           // ③ 자바 몇 버전 쓸지
repositories { ... }   // ④ 라이브러리 어디서 받을지
dependencies { ... }   // ⑤ 어떤 라이브러리 받을지 ★
tasks.named('test')    // ⑥ 테스트 설정
```

### ① plugins

```gradle
plugins {
	id 'java'
	id 'org.springframework.boot' version '4.1.1'
	id 'io.spring.dependency-management' version '1.1.7'
}
```

- Gradle은 원래 빈 도구 → 플러그인으로 능력 추가
- `java` → 자바 프로젝트라고 알려 줌
- `org.springframework.boot` → 스프링부트 기능. **스프링부트 버전이 여기서 정해짐**
- `dependency-management` → 라이브러리 버전 자동으로 맞춰 줌

### ② 프로젝트 정보

```gradle
group = 'study'
version = '0.0.1-SNAPSHOT'
```

- start.spring.io에서 입력한 값. `SNAPSHOT` = 아직 개발 중
- 공부할 땐 신경 안 써도 됨

### ③ 자바 버전

```gradle
java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}
```

- 자바 21로 컴파일하고 실행하라는 뜻 → 그래서 JDK 21 설치가 필요했음

### ④ repositories

```gradle
repositories {
	mavenCentral()
}
```

- **Maven Central** = 전 세계 자바 라이브러리 창고
- 이름에 Maven이 들어가지만 Gradle도 여기서 받아 옴

### ⑤ dependencies ★

```gradle
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
	implementation 'org.springframework.boot:spring-boot-starter-webmvc'
	testImplementation 'org.springframework.boot:spring-boot-starter-thymeleaf-test'
	testImplementation 'org.springframework.boot:spring-boot-starter-webmvc-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}
```

한 줄 읽는 법

```
implementation  'org.springframework.boot : spring-boot-starter-webmvc'
  언제 쓰는지         만든 곳(그룹)             라이브러리 이름
```

| 키워드 | 뜻 |
|---|---|
| `implementation` | 내 코드에서 쓰고 실행할 때도 필요 (제일 많이 씀) |
| `testImplementation` | 테스트 코드에서만 씀 |
| `testRuntimeOnly` | 테스트 실행할 때만 필요 |

각 줄 의미

- `starter-webmvc` → 웹 서버 핵심 (스프링 MVC + **내장 톰캣**). 톰캣 따로 안 깔아도 되는 이유
- `starter-thymeleaf` → html 화면 만드는 도구 (**JSP 대신**)
- `-test` 두 줄 → 위 두 개 테스트용
- `junit-platform-launcher` → 테스트 실행 엔진

**starter**란?

- 라이브러리 수십 개를 묶은 **세트**
- starter 한 줄 = 스프링 MVC + 톰캣 + JSON 변환기 ... 다 들어옴

**버전이 안 적혀 있는 이유**

- `dependency-management` 플러그인이 스프링부트 4.1.1에 맞는 버전을 알아서 골라 줌

### ⑥ 테스트 설정

```gradle
tasks.named('test') {
	useJUnitPlatform()
}
```

- 테스트는 JUnit 5로 돌리라는 뜻. 그대로 두면 됨

## 프로젝트에 있는 Gradle 관련 파일들

```
build.gradle      → 레시피 (위에서 본 거)
settings.gradle   → 프로젝트 이름 (rootProject.name = 'HelloSpring')
gradlew           → Gradle 래퍼 (맥/리눅스용)
gradlew.bat       → Gradle 래퍼 (윈도우용)
gradle/wrapper/   → 래퍼가 쓸 Gradle 버전 정보 (내 프로젝트는 9.7.1)
build/            → 빌드 결과물 (.class, .jar). 지워도 다시 생김
.gradle/          → Gradle 캐시. 무시
```

**Gradle 래퍼(gradlew)란?**

- 컴퓨터에 Gradle 안 깔아도 됨
- `gradlew`가 정해진 버전의 Gradle을 알아서 받아서 실행
- → 누가 받든 **같은 버전**으로 빌드됨

## 자주 쓰는 Gradle 명령어

터미널에서 프로젝트 폴더 기준

```bash
./gradlew build      # 컴파일 + 테스트 + jar 만들기
./gradlew bootRun    # 스프링부트 서버 실행
./gradlew test       # 테스트만 실행
./gradlew clean      # build 폴더 지우기
```

- `./gradlew build` 하면 → `build/libs/HelloSpring-0.0.1-SNAPSHOT.jar` 생김
- 이 jar는 `java -jar 파일이름.jar`로 어디서든 실행 가능 (톰캣이 안에 들어 있어서)

## IntelliJ에서 쓸 때

- `build.gradle` 고치면 → 오른쪽 위 🐘 **Load Gradle Changes** 버튼 누르기
- 오른쪽 사이드바 🐘 **Gradle** 탭 → 위 명령어들을 클릭으로 실행 가능
- 왼쪽 **External Libraries** 펼치면 → 실제로 받아진 jar 목록 볼 수 있음
