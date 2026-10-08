---
title: "0608 - SQL 테이블 삭제/이름 변경/VIEW"
---

## DROP

DROP은 **테이블 자체를 삭제**한다.

```
DROP TABLE 학생;
```

삭제되는 것:

```
테이블 구조 / 테이블 데이터
```

## 핵심 암기

DROP / 테이블 자체 삭제 / 구조까지 삭제

---

## DELETE

DELETE는 **테이블 안의 행 데이터를 삭제**한다.

```
DELETE FROM 학생
WHERE 이름='철수';
```

특징:

```
WHERE 사용 가능 / 특정 행 삭제 가능 / 테이블 구조는 남음
```

## 핵심 암기

DELETE / 행 삭제 / WHERE 가능

---

## TRUNCATE

TRUNCATE는 **테이블 안의 전체 데이터를 빠르게 삭제**한다.

```
TRUNCATE TABLE 학생;
```

특징:

```
전체 데이터 삭제 / WHERE 사용 불가 / 테이블 구조는 남음
```

## 핵심 암기

TRUNCATE / 전체 데이터 삭제 / WHERE 불가 / 구조는 남음

---

## DELETE/TRUNCATE/DROP 비교

| 명령어 | 삭제 대상 | WHERE | 구조 |
| --- | --- | --- | --- |
| DELETE | 행 데이터 | 가능 | 남음 |
| TRUNCATE | 전체 데이터 | 불가능 | 남음 |
| DROP | 테이블 자체 | 불가능 | 사라짐 |

---

## RENAME

RENAME은 **테이블 이름을 변경**할 때 사용한다.

## MySQL 방식

```
RENAME TABLE 기존테이블명 TO 새테이블명;
```

예시:

```
RENAME TABLE student TO student_info;
```

뜻:

```
student 테이블 이름을 student_info로 변경
```

## ALTER TABLE 방식

DB에 따라 다음 방식도 사용한다.

```
ALTER TABLE 기존테이블명 RENAME TO 새테이블명;
```

예시:

```
ALTER TABLE student RENAME TO student_info;
```

## 핵심 암기

RENAME / 테이블 이름 변경 / RENAME TABLE old TO new

---

## VIEW

VIEW는 **SELECT 결과를 가상 테이블처럼 보여주는 것**이다.

실제 데이터를 새로 저장하는 테이블이 아니라, 기존 테이블에서 필요한 데이터만 뽑아 보여준다.

## VIEW 생성

```
CREATE VIEW 우수학생 AS
SELECT 이름, 점수
FROM 학생
WHERE 점수>=90;
```

## VIEW 조회

```
SELECT *
FROM 우수학생;
```

## VIEW 장점

| 장점 | 의미 |
| --- | --- |
| 보안성 | 필요한 컬럼만 보여줄 수 있음 |
| 편리성 | 복잡한 SELECT를 간단히 사용 |
| 독립성 | 원본 테이블 구조 변화 영향을 줄임 |
| 재사용성 | 자주 쓰는 조회문을 저장해 사용 |

## VIEW 예시

학생 테이블에 다음 정보가 있다고 할 때:

```
이름 / 점수 / 주민번호 / 전화번호
```

다른 사람에게 이름과 점수만 보여주고 싶으면:

```
CREATE VIEW 학생공개정보AS
SELECT 이름, 점수
FROM 학생;
```

## VIEW에서 틀린 설명

```
VIEW는 항상 삽입, 삭제, 갱신이 가능하다
```

이건 틀림. VIEW는 경우에 따라 수정이 제한될 수 있다.

수정이 어려운 VIEW:

```
JOIN 사용 / GROUP BY 사용 / 집계함수 사용 / DISTINCT 사용 / 계산식 사용
```

## 핵심 암기

VIEW / SELECT 결과 가상 테이블 / 보안성 / 편리성 / 항상 수정 가능 아님