프로그래밍기능사 실기 SQL 범위를 한 번에 정리. SELECT 문법, UPDATE SET, JOIN 같은 게 헷갈려서 처음부터 다시 정리했다.

예시는 전부 아래 두 테이블로 설명한다.

**[학생]**

|학번|이름|학과코드|점수|
|---|---|---|---|
|1|김민수|A|80|
|2|이서준|B|90|
|3|최유나|A|70|
|4|박지은|NULL|60|

**[학과]**

|학과코드|학과명|
|---|---|
|A|컴퓨터|
|B|전자|
|C|기계|

---

## 1. SQL 종류

|분류|뜻|명령어|
|---|---|---|
|DDL (정의어)|테이블 구조를 만들고 바꿈|CREATE, ALTER, DROP, TRUNCATE|
|DML (조작어)|데이터를 넣고 빼고 바꿈|SELECT, INSERT, UPDATE, DELETE|
|DCL (제어어)|권한을 줌/뺏음|GRANT, REVOKE|
|TCL (트랜잭션)|작업 확정/취소|COMMIT, ROLLBACK|

- 외우는 법 : 구조는 DDL, 데이터는 DML, 권한은 DCL
- DELETE는 DML(데이터 삭제), DROP은 DDL(테이블 자체 삭제) → 자주 나오는 함정

---

## 2. SELECT 기본

sql

```sql
SELECT 이름, 점수
FROM 학생
WHERE 점수 >= 70
ORDER BY 점수 DESC;
```

|이름|점수|
|---|---|
|이서준|90|
|김민수|80|
|최유나|70|

- `SELECT *` : 모든 컬럼
- `SELECT DISTINCT 학과코드` : 중복 제거 → A, B, NULL
- `AS` : 별칭 → `SELECT 점수 AS 성적`
- `ORDER BY 점수 ASC` : 오름차순 (기본값, 생략 가능)
- `ORDER BY 점수 DESC` : 내림차순
- `ORDER BY 학과코드, 점수 DESC` : 학과코드로 먼저 정렬, 같으면 점수 내림차순

### WHERE에서 쓰는 조건

|문법|뜻|예시|
|---|---|---|
|`=`, `<>`, `!=`|같다, 다르다|`점수 <> 80`|
|`AND`, `OR`, `NOT`|그리고, 또는, 아니다|`점수 >= 70 AND 학과코드 = 'A'`|
|`BETWEEN A AND B`|A 이상 B 이하 (양 끝 포함)|`점수 BETWEEN 70 AND 80` → 80, 70|
|`IN (...)`|목록 중 하나|`학과코드 IN ('A', 'B')`|
|`LIKE`|패턴 검색|`이름 LIKE '김%'`|
|`IS NULL`|값이 없음|`학과코드 IS NULL` → 박지은|

- `LIKE '김%'` : 김으로 시작 (`%` = 0글자 이상 아무거나)
- `LIKE '%수'` : 수로 끝남
- `LIKE '%민%'` : 민이 들어감
- `LIKE '_서_'` : 3글자, 가운데가 서 (`_` = 딱 1글자)
- NULL은 `= NULL`로 비교하면 안 됨 → 반드시 `IS NULL`, `IS NOT NULL`

---

## 3. 집계함수, GROUP BY, HAVING

|함수|뜻|문자 컬럼|
|---|---|---|
|`COUNT`|개수|가능|
|`SUM`|합계|불가능|
|`AVG`|평균|불가능|
|`MAX`|최댓값|가능 (가나다순 마지막)|
|`MIN`|최솟값|가능 (가나다순 처음)|

**NULL 함정**

- `COUNT(*)` : NULL 상관없이 모든 행 개수 → 4
- `COUNT(학과코드)` : NULL 빼고 셈 → 3
- `AVG`, `SUM`도 NULL은 빼고 계산

sql

```sql
SELECT 학과코드, AVG(점수) AS 평균
FROM 학생
WHERE 학과코드 IS NOT NULL
GROUP BY 학과코드
HAVING AVG(점수) >= 80;
```

|학과코드|평균|
|---|---|
|B|90|

- A 평균은 (80+70)/2 = 75라서 HAVING에서 빠짐
- GROUP BY를 쓰면 SELECT에는 **GROUP BY에 쓴 컬럼** 또는 **집계함수**만 쓸 수 있음
- GROUP BY는 여러 컬럼 가능 → `GROUP BY 학년, 반`
- WHERE : 묶기 전에 행을 거름 → 집계함수 사용 불가
- HAVING : 묶은 후에 그룹을 거름 → 집계함수 사용 가능

### 실행 순서 (프 웨 그 해 셀 오)

1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY

- WHERE에서 SELECT 별칭 못 씀 (SELECT가 나중이라서)
- ORDER BY에서는 별칭 쓸 수 있음 (SELECT가 먼저라서)

---

## 4. INSERT, UPDATE, DELETE

### INSERT (데이터 추가)

sql

```sql
INSERT INTO 학생 (학번, 이름, 학과코드, 점수)
VALUES (5, '정하늘', 'B', 85);

INSERT INTO 학생
VALUES (6, '한지민', 'C', 75);   -- 컬럼 생략 시 모든 컬럼을 순서대로
```

- `INSERT INTO 테이블 (컬럼들) VALUES (값들)`
- 컬럼 개수와 값 개수가 같아야 함

### UPDATE (데이터 수정)

sql

```sql
UPDATE 학생
SET 점수 = 95, 학과코드 = 'A'
WHERE 이름 = '이서준';
```

- `UPDATE 테이블 SET 컬럼 = 값 WHERE 조건`
- 여러 컬럼은 쉼표로 이어 씀 (`AND` 아님 → 함정)
- `SET 점수 = 점수 + 5` : 원래 값에 더하기 가능
- **WHERE를 빼면 모든 행이 바뀜**

### DELETE (데이터 삭제)

sql

```sql
DELETE FROM 학생
WHERE 점수 < 70;
```

- `DELETE FROM 테이블 WHERE 조건`
- **WHERE를 빼면 모든 행이 삭제됨** (테이블 구조는 남음)

### DELETE vs TRUNCATE vs DROP

||삭제 대상|테이블 구조|ROLLBACK|분류|
|---|---|---|---|---|
|DELETE|행 (조건 가능)|남음|가능|DML|
|TRUNCATE|모든 행|남음|불가능|DDL|
|DROP|테이블 자체|없어짐|불가능|DDL|

---

## 5. JOIN

두 테이블을 공통 컬럼(학과코드)으로 이어 붙이는 것.

### INNER JOIN (양쪽 다 있는 것만)

sql

```sql
SELECT 학생.이름, 학과.학과명
FROM 학생
INNER JOIN 학과 ON 학생.학과코드 = 학과.학과코드;
```

|이름|학과명|
|---|---|
|김민수|컴퓨터|
|이서준|전자|
|최유나|컴퓨터|

- 박지은 : 학과코드 NULL → 짝이 없어서 빠짐
- 기계(C) : 학생이 없어서 빠짐
- `JOIN`만 써도 INNER JOIN

### LEFT JOIN (왼쪽은 전부)

sql

```sql
SELECT 학생.이름, 학과.학과명
FROM 학생
LEFT JOIN 학과 ON 학생.학과코드 = 학과.학과코드;
```

|이름|학과명|
|---|---|
|김민수|컴퓨터|
|이서준|전자|
|최유나|컴퓨터|
|박지은|NULL|

- FROM에 쓴 테이블(왼쪽)은 짝이 없어도 전부 나옴, 짝 없는 칸은 NULL

### RIGHT JOIN (오른쪽은 전부)

sql

```sql
SELECT 학생.이름, 학과.학과명
FROM 학생
RIGHT JOIN 학과 ON 학생.학과코드 = 학과.학과코드;
```

|이름|학과명|
|---|---|
|김민수|컴퓨터|
|최유나|컴퓨터|
|이서준|전자|
|NULL|기계|

### 나머지 JOIN

- `FULL OUTER JOIN` : 양쪽 전부 (LEFT + RIGHT), MySQL은 지원 안 함
- `CROSS JOIN` : 모든 조합 → 학생 4 × 학과 3 = 12행
- 셀프 조인 : 같은 테이블끼리 조인, 별칭 필수 (`FROM 직원 A JOIN 직원 B ON A.상사번호 = B.사번`)

**별칭 쓰기**

sql

```sql
SELECT S.이름, D.학과명
FROM 학생 S
JOIN 학과 D ON S.학과코드 = D.학과코드;
```

- 테이블 이름 뒤에 별칭 → 짧게 쓸 수 있음

---

## 6. 서브쿼리

쿼리 안에 쿼리를 넣는 것. 안쪽이 먼저 실행된다.

sql

```sql
SELECT 이름, 점수
FROM 학생
WHERE 점수 > (SELECT AVG(점수) FROM 학생);
```

- 안쪽 : 평균 = (80+90+70+60)/4 = 75
- 바깥 : 점수 > 75 → 김민수 80, 이서준 90

sql

```sql
SELECT 이름
FROM 학생
WHERE 학과코드 IN (SELECT 학과코드 FROM 학과 WHERE 학과명 = '컴퓨터');
```

- 안쪽 결과 : A → 김민수, 최유나

|문법|뜻|
|---|---|
|`IN`|서브쿼리 결과 중 하나와 같음|
|`EXISTS`|서브쿼리 결과가 1개라도 있으면 참|
|`> ALL`|모든 값보다 큼 (= 최댓값보다 큼)|
|`> ANY`|하나라도 보다 큼 (= 최솟값보다 큼)|

- `=` 뒤 서브쿼리는 결과가 1개여야 함, 여러 개면 `IN`을 써야 함

---

## 7. 집합 연산

sql

```sql
SELECT 학과코드 FROM 학생
UNION
SELECT 학과코드 FROM 학과;
```

|연산|뜻|
|---|---|
|`UNION`|합집합, 중복 제거|
|`UNION ALL`|합집합, 중복 그대로|
|`INTERSECT`|교집합|
|`EXCEPT` (`MINUS`)|차집합|

- 위아래 SELECT의 컬럼 개수와 타입이 같아야 함

---

## 8. DDL (테이블 만들기, 바꾸기)

### CREATE

sql

```sql
CREATE TABLE 학생 (
    학번 INT PRIMARY KEY,
    이름 VARCHAR(20) NOT NULL,
    학과코드 CHAR(1),
    점수 INT DEFAULT 0 CHECK (점수 BETWEEN 0 AND 100),
    FOREIGN KEY (학과코드) REFERENCES 학과(학과코드)
);
```

### 제약조건

|제약조건|뜻|
|---|---|
|`PRIMARY KEY`|기본키, 중복 X + NULL X, 테이블에 하나|
|`FOREIGN KEY`|외래키, 다른 테이블의 기본키를 참조|
|`UNIQUE`|중복 X (NULL은 가능)|
|`NOT NULL`|NULL X|
|`CHECK`|조건에 맞는 값만|
|`DEFAULT`|값을 안 넣으면 기본값|

- PRIMARY KEY = UNIQUE + NOT NULL
- 외래키 : 학과 테이블에 없는 학과코드는 학생에 넣을 수 없음

### ALTER

sql

```sql
ALTER TABLE 학생 ADD 전화번호 VARCHAR(20);      -- 컬럼 추가
ALTER TABLE 학생 MODIFY 이름 VARCHAR(30);       -- 컬럼 수정 (MySQL)
ALTER TABLE 학생 DROP COLUMN 전화번호;          -- 컬럼 삭제
```

### VIEW, INDEX

sql

```sql
CREATE VIEW 컴퓨터학생 AS
SELECT 이름, 점수 FROM 학생 WHERE 학과코드 = 'A';

CREATE INDEX idx_이름 ON 학생(이름);
```

- VIEW : 가상 테이블, 실제 데이터 저장 X, 보안/편의용
- INDEX : 검색 속도를 빠르게 함, 대신 INSERT/UPDATE는 느려짐

---

## 9. DCL, TCL

sql

```sql
GRANT SELECT, INSERT ON 학생 TO user1;   -- 권한 주기
REVOKE INSERT ON 학생 FROM user1;        -- 권한 뺏기

COMMIT;     -- 작업 확정
ROLLBACK;   -- 마지막 COMMIT 이후 작업 취소
```

- GRANT는 `TO`, REVOKE는 `FROM` → 함정

---

## 10. 자주 나오는 함정 모음

- GROUP BY에 없는 컬럼은 집계함수 없이 SELECT 불가 → X 문제 단골
- WHERE에 집계함수 사용 불가 → HAVING에 써야 함
- HAVING이 WHERE보다 먼저 실행 → X
- NULL 비교는 `= NULL`이 아니라 `IS NULL`
- `COUNT(*)`는 NULL 포함, `COUNT(컬럼)`은 NULL 제외
- BETWEEN은 양 끝 값 포함
- UPDATE SET의 여러 컬럼은 쉼표로 구분
- UPDATE, DELETE에서 WHERE 빼면 전체 적용
- DELETE는 DML, DROP·TRUNCATE는 DDL
- LEFT JOIN은 짝이 없으면 NULL로 채움
- 문자열은 작은따옴표 `'김민수'`