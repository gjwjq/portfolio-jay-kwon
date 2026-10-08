---
title: "0603 - SQL / 트랜잭션 / CASCADE"
---

## SQL 분류

| 분류 | 명령어 | 의미 |
| --- | --- | --- |
| DDL | CREATE | 생성 |
| DDL | ALTER | 수정 |
| DDL | DROP | 삭제 |
| DML | SELECT | 조회 |
| DML | INSERT | 삽입 |
| DML | UPDATE | 수정 |
| DML | DELETE | 삭제 |
| DCL | GRANT | 권한 부여 |
| DCL | REVOKE | 권한 회수 |
| TCL | COMMIT | 확정 |
| TCL | ROLLBACK | 취소 |

---

## SELECT 기본 순서

```
SELECT 컬럼
FROM 테이블
WHERE 조건
GROUPBY 그룹기준
HAVING 그룹조건
ORDERBY 정렬기준;
```

| 문법 | 의미 |
| --- | --- |
| SELECT | 보고 싶은 열 선택 |
| FROM | 어느 테이블에서 |
| WHERE | 행 조건 |
| GROUP BY | 묶기 |
| HAVING | 묶은 결과 조건 |
| ORDER BY | 정렬 |

---

## WHERE vs HAVING

| 구분 | WHERE | HAVING |
| --- | --- | --- |
| 대상 | 일반 행 |  |
| 그룹 결과 |  |  |
| 위치 | GROUP BY 전 |  |
| GROUP BY 후 |  |  |
| 예시 | 나이 20 이상 |  |
| 평균 점수 80 이상인 반 |  |  |

**외우기:**

WHERE = 묶기 전 조건

HAVING = 묶은 후 조건

---

## 집계 함수

| 함수 | 의미 |
| --- | --- |
| COUNT | 개수 |
| SUM | 합계 |
| AVG | 평균 |
| MAX | 최댓값 |
| MIN | 최솟값 |

---

## 트랜잭션 Transaction

| 키워드 | 정리 |
| --- | --- |
| 트랜잭션 | 하나의 논리적 작업 단위 |
| 쉽게 | 여러 SQL을 하나의 작업처럼 묶은 것 |
| 예시 | 계좌이체 = 출금 + 입금 |

### 트랜잭션 명령어

| 명령어 | 의미 |
| --- | --- |
| COMMIT | 변경 내용 확정 |
| ROLLBACK | 변경 전으로 취소 |
| SAVEPOINT | 중간 저장점 |

**외우기:**

COMMIT = 저장 확정

ROLLBACK = 되돌리기

---

## 트랜잭션 ACID

| 특징 | 의미 |
| --- | --- |
| 원자성 Atomicity | 전부 실행 or 전부 취소 |
| 일관성 Consistency | 실행 후 DB 규칙 유지 |
| 격리성 Isolation | 동시에 실행해도 서로 간섭 X |
| 지속성 Durability | COMMIT 후 결과 영구 저장 |

**외우기:**

원일격지

= 원자성, 일관성, 격리성, 지속성

---

## CASCADE

| 키워드 | 정리 |
| --- | --- |
| CASCADE | 관련된 데이터까지 연쇄적으로 처리 |
| ON DELETE CASCADE | 부모 데이터 삭제 시 자식 데이터도 같이 삭제 |
| ON UPDATE CASCADE | 부모 키 변경 시 자식 외래키도 같이 변경 |

### 예시

학생 테이블과 수강 테이블이 있을 때,

학생 `철수`를 삭제하면

철수가 신청한 수강 기록도 같이 삭제됨.

→ 이게 `CASCADE`

---

## RESTRICT

| 키워드 | 정리 |
| --- | --- |
| RESTRICT | 참조 중이면 삭제/변경 못 하게 막음 |
| CASCADE와 반대 느낌 | 같이 지우는 게 아니라 막음 |

**외우기:**

CASCADE = 같이 처리

RESTRICT = 못 하게 막음